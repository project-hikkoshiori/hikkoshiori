FROM python:3.8-alpine

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN apk add --no-cache build-base \
    && pip install --no-cache-dir --trusted-host pypi.python.org -r requirements.txt \
    && apk del build-base

EXPOSE 8080

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]