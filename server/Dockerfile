FROM python:3.9.13-bullseye as builder

WORKDIR /app

COPY poetry.lock poetry.toml pyproject.toml ./
RUN apt-get update && apt-get install -y \
    # For psycopg2 and psycopg2 installation
    libpq-dev 

RUN pip install --upgrade --no-cache-dir pip && \
    pip install --no-cache-dir poetry && \
    poetry config virtualenvs.in-project true && \
    poetry install --no-dev --remove-untracked

FROM python:3.9.13-slim-bullseye as runner

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/.venv /app/.venv

EXPOSE 8080
