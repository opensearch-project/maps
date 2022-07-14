FROM amazonlinux:2

WORKDIR /usr/src/app

RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs wget tar gzip && \
    yum clean all

COPY package*.json ./
RUN npm install
COPY . .

RUN mkdir -p public/vectors/data  && \
    cd public/vectors/data && \
    wget -O vectors.tar.gz https://maps.opensearch.org/offline/natural-earth-geo-json.tar.gz && \
    tar -xzf vectors.tar.gz --strip-components=1 && \
    rm vectors.tar.gz

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 8080
