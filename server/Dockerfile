FROM python:3.9.13

RUN apt-get update && apt-get install -y \
    && pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

ENV DB_PATH  postgres://wnwbajprwbdsuk:019c21ecab80dd21b5ae3249f41306b9a78eb54eb8c4d26796146cea6be12c8a@ec2-3-214-2-141.compute-1.amazonaws.com:5432/d2vk9sdaupfmnc

EXPOSE $PORT
