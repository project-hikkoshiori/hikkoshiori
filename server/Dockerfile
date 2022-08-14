FROM python:3.9.13

RUN apt-get update && apt-get install -y \
    && pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

EXPOSE 8080
