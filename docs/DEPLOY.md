## デプロイ手順

### 方針
- フロント：amplify
  - releaseブランチにプッシュすることで自動デプロイ
- サーバー：heroku
  - releaseブランチにプッシュすることで自動デプロイ
- DB：heroku postgres

### マニュアル

#### フロント
- amplify.yml から制御
  - npm export でfront/app/out以下にファイルが配置される
  - これをもとにデプロイするので忘れないように(弄る必要がある)

#### サーバー
- github action から制御
  - poetryだとキャッシュのパスが固定されないとかでどうやってもエラーになるので一旦pipに吐き出す
  - actionで一通りのbuildが通るとheroku上でdeployが起こる

#### DB
- addonで追加してる
- テーブル操作は手動でやっているのでなんとかしないといけない→何かあれば認証の都合上僕がやるしかない
