# Copyright OpenSearch Contributors
# SPDX-License-Identifier: Apache-2.0

########################### Stage 0 ########################
FROM amazonlinux:2 AS stage_0

WORKDIR /src

RUN yum install -y tar gzip unzip && yum clean all

RUN mkdir GeoJSONData  && \
    cd GeoJSONData && \
    curl -SL -o geo-json-files.tar.gz https://maps.opensearch.org/offline/natural-earth-geo-json.tar.gz && \
    tar -xzf geo-json-files.tar.gz --strip-components=1 && \
    rm geo-json-files.tar.gz && pwd && ls

RUN mkdir oss_compliance  && \
    cd oss_compliance && \
    curl -SL -o oss_compliance.zip https://aws-dlinfra-utilities.s3.amazonaws.com/oss_compliance.zip && \
    unzip oss_compliance.zip && \
    rm oss_compliance.zip

########################### Stage 1 ########################
FROM amazonlinux:2

WORKDIR /usr/src/app

COPY --from=stage_0 /src/GeoJSONData public/vectors/data
COPY --from=stage_0 /src/oss_compliance .

RUN curl -SL https://rpm.nodesource.com/setup_16.x | bash && \
    yum install -y nodejs-16.17.1 python3 tar gzip && pip3 install requests==2.28.1 && yum clean all

COPY package*.json ./
RUN npm install
COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

RUN chmod +x oss_compliance/generate_oss_compliance.sh && \
    oss_compliance/generate_oss_compliance.sh /usr/src/app python3 && \
    cp oss_compliance/python_packages/piplicenses/PACKAGES_LICENSES_JSON.json PACKAGES_LICENSES_JSON.json && \
    rm -rf oss_compliance* \

EXPOSE 8080
