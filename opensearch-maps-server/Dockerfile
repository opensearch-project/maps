FROM amazonlinux:2

WORKDIR /usr/src/app

RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs wget tar gzip unzip python37 && \
    yum clean all

RUN pip3 install --no-cache --upgrade \
    "requests>=2.18.4,<=2.22.0"

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

RUN wget -O oss_compliance.zip https://aws-dlinfra-utilities.s3.amazonaws.com/oss_compliance.zip \
    && unzip oss_compliance.zip \
    && chmod +x oss_compliance/generate_oss_compliance.sh \
    && oss_compliance/generate_oss_compliance.sh /usr/src/app python3 \
    && cp oss_compliance/python_packages/piplicenses/PACKAGES_LICENSES_JSON.json PACKAGES_LICENSES_JSON.json \
    && rm -rf oss_compliance*