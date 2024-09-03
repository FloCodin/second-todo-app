FROM ubuntu:latest
LABEL authors="FlorianRogenmoser"

ENTRYPOINT ["top", "-b"]