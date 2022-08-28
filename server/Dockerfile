FROM python:3.9.13-bullseye

WORKDIR /opt/poetry
COPY poetry/* /opt/poetry/
RUN apt-get update && apt-get install -y \
    # For psycopg2 and psycopg2 installation
    libpq-dev 

WORKDIR /opt/poetry
RUN pip install --upgrade --no-cache-dir pip && \
    pip install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install

WORKDIR /app
EXPOSE 8080
