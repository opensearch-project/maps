FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN cd public/vectors/data && \
    wget -O vectors.tar.gz https://maps.opensearch.org/offline/natural-earth-geo-json.tar.gz && \
    tar -xzf vectors.tar.gz --strip-components=1 && \
    rm vectors.tar.gz

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 8080
