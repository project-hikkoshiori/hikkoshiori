## デプロイ手順

### 方針
- サーバー：heroku
  - releaseブランチにプッシュすることで自動デプロイ
- DB：heroku postgres

### マニュアル

#### command
- server
```
heroku git:remote -a hikkoshiori
git subtree push --prefix server heroku main
```
- front
```
heroku git:remote -a hikkoshiori-front
git subtree push --prefix front/app heroku main
```

#### フロント

#### サーバー
- github action から制御
  - poetryだとキャッシュのパスが固定されないとかでどうやってもエラーになるので一旦pipに吐き出す
  - actionで一通りのbuildが通るとheroku上でdeployが起こる

#### DB
- addonで追加してる
- テーブル操作は手動でやっているのでなんとかしないといけない→何かあれば認証の都合上僕がやるしかない
