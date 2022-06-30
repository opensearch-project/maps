FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN cd public/vectors/data && \
    wget -O vectors.zip https://staging.vectors.maps.opensearch.org/natural_earth_geo_json.zip && \
    unzip vectors.zip && \
    rm vectors.zip

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 8080
