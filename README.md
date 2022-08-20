# hikkoshiori

## 起動
```
docker-compose build
docker-compose up
```
## コマンドの打ち方
コンテナ内でコマンドが打ちたい
```
docker exec <container_name> <command>
```
example
```
docker exec server pytest
docker exec front npm test
```
コンテナに入りたい
```
docker exec -it <container_name> /bin/sh
```
example
```
docker exec -it db /bin/sh
docker exec -it server /bin/sh
```