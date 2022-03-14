#!/usr/bin/env python

#  Copyright OpenSearch Contributors
#  SPDX-License-Identifier: Apache-2.0

# Adapted from https://svn.openstreetmap.org/applications/rendering/mapnik/generate_tiles.py

from math import pi,sin,log,exp,atan
import os
from queue import Queue
import logging

import threading

try:
    import mapnik2 as mapnik
except:
    import mapnik

DEG_TO_RAD = pi/180
RAD_TO_DEG = 180/pi

def minmax (a,b,c):
    a = max(a,b)
    a = min(a,c)
    return a

class GoogleProjection:
    def __init__(self,levels=18):
        self.Bc = []
        self.Cc = []
        self.zc = []
        self.Ac = []
        c = 256
        for d in range(0,levels):
            e = c/2
            self.Bc.append(c/360.0)
            self.Cc.append(c/(2 * pi))
            self.zc.append((e,e))
            self.Ac.append(c)
            c *= 2

    def fromLLtoPixel(self,ll,zoom):
         d = self.zc[zoom]
         e = round(d[0] + ll[0] * self.Bc[zoom])
         f = minmax(sin(DEG_TO_RAD * ll[1]),-0.9999,0.9999)
         g = round(d[1] + 0.5*log((1+f)/(1-f))*-self.Cc[zoom])
         return (e,g)

    def fromPixelToLL(self,px,zoom):
         e = self.zc[zoom]
         f = (px[0] - e[0])/self.Bc[zoom]
         g = (px[1] - e[1])/-self.Cc[zoom]
         h = RAD_TO_DEG * ( 2 * atan(exp(g)) - 0.5 * pi)
         return (f,h)



class RenderThread:
    def __init__(self, tile_dir, mapfile, q, printLock, maxZoom):
        self.tile_dir = tile_dir
        self.q = q
        self.m = mapnik.Map(256, 256)
        self.printLock = printLock
        # Load style XML
        mapnik.load_map(self.m, mapfile, False)
        # Obtain <Map> projection
        self.prj = mapnik.Projection(self.m.srs)
        # Projects between tile pixel co-ordinates and LatLong (EPSG:4326)
        self.tileproj = GoogleProjection(maxZoom+1)


    def render_tile(self, tile_uri, x, y, z):

        # Calculate pixel positions of bottom-left & top-right
        p0 = (x * 256, (y + 1) * 256)
        p1 = ((x + 1) * 256, y * 256)

        # Convert to LatLong (EPSG:4326)
        l0 = self.tileproj.fromPixelToLL(p0, z);
        l1 = self.tileproj.fromPixelToLL(p1, z);

        # Convert to map projection (e.g. mercator co-ords EPSG:900913)
        c0 = self.prj.forward(mapnik.Coord(l0[0],l0[1]))
        c1 = self.prj.forward(mapnik.Coord(l1[0],l1[1]))

        # Bounding box for the tile
        if hasattr(mapnik,'mapnik_version') and mapnik.mapnik_version() >= 800:
            bbox = mapnik.Box2d(c0.x,c0.y, c1.x,c1.y)
        else:
            bbox = mapnik.Envelope(c0.x,c0.y, c1.x,c1.y)
        render_size = 256
        self.m.resize(render_size, render_size)
        self.m.zoom_to_box(bbox)
        if(self.m.buffer_size < 128):
            self.m.buffer_size = 128

        # Render image with default Agg renderer
        im = mapnik.Image(render_size, render_size)
        mapnik.render(self.m, im)
        im.save(tile_uri, 'png256')


    def loop(self):
        try:
            while True:
                #Fetch a tile from the queue and render it
                r = self.q.get()
                if (r == None):
                    self.q.task_done()
                    break
                else:
                    (name, tile_uri, x, y, z) = r

                exists= ""
                if os.path.isfile(tile_uri):
                    exists= "exists"
                else:
                    try:
                        self.render_tile(tile_uri, x, y, z)
                    except:
                        # print ("Exception generating file ", name)
                        logging.exception("Exception generating file")
                        self.q.task_done()
                        break
                empty= ''
                try:
                    bytes=os.stat(tile_uri)[6]
                    if bytes == 103:
                        empty = " Empty Tile "
                except:
                    pass
                self.printLock.acquire()
                print(name, ":", z, x, y, exists, empty)

                self.printLock.release()
                self.q.task_done()
        except:
            print ("Uncaught exception in thread")
            pass


def render_tiles(bbox, mapfile, tile_dir, minZoom, maxZoom, name, renderNumThread, tms_scheme=False):
    print("render_tiles(",bbox, mapfile, tile_dir, minZoom,maxZoom, name,")")

    # Launch rendering threads
    queue = Queue(32)
    printLock = threading.Lock()
    renderers = {}
    for i in range(renderNumThread):
        renderer = RenderThread(tile_dir, mapfile, queue, printLock, maxZoom)
        render_thread = threading.Thread(target=renderer.loop)
        render_thread.start()
        print ("Started render thread %s" % render_thread.getName())
        renderers[i] = render_thread

    if not os.path.isdir(tile_dir):
         os.mkdir(tile_dir)

    gprj = GoogleProjection(maxZoom+1)

    ll0 = (bbox[0],bbox[3])
    ll1 = (bbox[2],bbox[1])

    for z in range(minZoom,maxZoom + 1):
        px0 = gprj.fromLLtoPixel(ll0,z)
        px1 = gprj.fromLLtoPixel(ll1,z)

        # check if we have directories in place
        zoom = "%s" % z
        if not os.path.isdir(tile_dir + zoom):
            os.mkdir(tile_dir + zoom)
        for x in range(int(px0[0]/256.0),int(px1[0]/256.0)+1):
            # Validate x co-ordinate
            if (x < 0) or (x >= 2**z):
                continue
            # check if we have directories in place
            str_x = "%s" % x
            if not os.path.isdir(tile_dir + zoom + '/' + str_x):
                os.mkdir(tile_dir + zoom + '/' + str_x)
            for y in range(int(px0[1]/256.0),int(px1[1]/256.0)+1):
                # Validate x co-ordinate
                if (y < 0) or (y >= 2**z):
                    continue
                # flip y to match OSGEO TMS spec
                if tms_scheme:
                    str_y = "%s" % ((2**z-1) - y)
                else:
                    str_y = "%s" % y
                tile_uri = tile_dir + zoom + '/' + str_x + '/' + str_y + '.png'
                # Submit tile to be rendered into the queue
                t = (name, tile_uri, x, y, z)
                try:
                    queue.put(t)
                except KeyboardInterrupt:
                    raise SystemExit("Ctrl-c detected, exiting...")

    # wait for pending rendering jobs to complete
    queue.join()

if __name__ == "__main__":
    # Default number of rendering threads to spawn, should be roughly equal to number of CPU cores available
    tileDir = "/var/lib/mod_tile/"
    mapfile = "/home/renderer/src/openstreetmap-carto/mapnik.xml"
    if not tileDir.endswith('/'):
        tileDir = tileDir + '/'
    if "THREADS" in os.environ:
        renderNumThread = int(os.environ['THREADS'])
    else:
        renderNumThread = 4
    if "MIN_ZOOM" in os.environ:
        minZoom = int(os.environ['MIN_ZOOM'])
    else:
        minZoom = 0
    if "MAX_ZOOM" in os.environ:
        maxZoom = int(os.environ['MAX_ZOOM'])
    else:
        maxZoom = 10
    if "BBOX" in os.environ:
        bbox = list(map(float, os.environ.get('BBOX').split(',')))
    else:
        bbox = (-180.0,-90.0, 180.0,90.0)
    render_tiles(bbox, mapfile, tileDir, minZoom, maxZoom, "TileGenerateWork", renderNumThread)
    os._exit(0)