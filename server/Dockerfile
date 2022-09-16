FROM python:3.9.13-bullseye

ENV POETRY_CACHE_DIR=/usr/local/.cache/pypoetry

WORKDIR /server
COPY poetry.lock pyproject.toml ./
RUN apt-get update && apt-get install -y \
    # For psycopg2 and psycopg2 installation
    libpq-dev 

RUN pip install --upgrade --no-cache-dir pip && \
    pip install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install

WORKDIR /server/app
EXPOSE $PORT
