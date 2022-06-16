FROM overv/openstreetmap-tile-server:v1.8.2
RUN pip3 install awscli
RUN aws configure set default.s3.max_concurrent_requests 1000
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY ./generate_tiles.py /var/lib/postgresql/src/generate_tiles.py
COPY ./postgresql.custom.conf.tmpl /etc/postgresql/12/main/postgresql.custom.conf.tmpl
RUN chmod a+x /var/lib/postgresql/src/generate_tiles.py
ENTRYPOINT ["/entrypoint.sh"]