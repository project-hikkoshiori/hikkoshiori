## Hikkoshiori-server

## 起動
```
docker-compose build
docker-compose up
```

## Document閲覧
http://0.0.0.0:8080/docs

## ライブラリ追加・削除
Docker に入る
```
docker exec -it server /bin/bash
```

コンテナ内 `/opt/poetry/` に local の`server/poetry/` とリンクした poetry定義ファイルが存在するので適宜必要なライブラリを追加する

例:
```
cd /opt/poetry
poetry add numpy
poetry add pytest --dev
poetry remove numpy
```

poetry の定義ファイルは git のワークツリーに乗せて管理する.
変更時には `pyproject.toml`や`poetry.lock` もコミットしておく.

## 本番時
> For production deployments we recommend using gunicorn with the uvicorn worker class.
https://www.uvicorn.org/#running-with-gunicorn

とあるので,
```
gunicorn app:setup -w 4 -k uvicorn.workers.UvicornWorker
```