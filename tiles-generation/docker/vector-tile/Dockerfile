#
# Copyright OpenSearch Contributors
# SPDX-License-Identifier: Apache-2.0
#

FROM amazonlinux:2

RUN yum clean all && \
    yum update -y && \
    amazon-linux-extras install epel && \
    yum install -y java-17-amazon-corretto-headless wget tar go make python37

RUN wget https://github.com/onthegomap/planetiler/releases/download/v0.5.0/planetiler.jar

RUN wget -O mbutil.tar.gz https://github.com/mapbox/mbutil/archive/refs/tags/v0.3.0.tar.gz && \
    tar -xzf mbutil.tar.gz && \
    cd /mbutil-0.3.0 && \
    python3 setup.py install

RUN wget -O s5cmd.tar.gz https://github.com/peak/s5cmd/archive/refs/tags/v2.0.0-beta.2.tar.gz && \
    tar -xzf s5cmd.tar.gz
COPY modified-s5cmd/s3.go /s5cmd-2.0.0-beta.2/storage/s3.go
COPY modified-s5cmd/storage.go /s5cmd-2.0.0-beta.2/storage/storage.go
COPY modified-s5cmd/cp.go /s5cmd-2.0.0-beta.2/command/cp.go
RUN cd /s5cmd-2.0.0-beta.2/ && \
    CGO_ENABLED=0 make build && \
    mv /s5cmd-2.0.0-beta.2/s5cmd /

COPY entrypoint.sh /
RUN chmod +x entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
