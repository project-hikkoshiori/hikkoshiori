### 構成
- デプロイ先→heroku
#### hikkoshiori-stg
- server + db
#### hekkoshiori-stg-front
- front

### デプロイ手順
```
heroku login

heroku container:login

heroku container:push server --app hikkoshiori-stg
heroku container:push front --app hikkoshiori-stg-front

heroku container:release server --app hikkoshiori-stg
heroku container:release front --app hikkoshiori-stg-front

heroku open --app hikkoshiori-stg
heroku open --app hikkoshiori-stg-front
```

### DBコンテナに入る
```
heroku pg:psql
```
