## server-sideで知っていてほしいこととか

### test
- pytestをつかう
```
docker exec server pytest
```

### linter/formatter
- black採用
- pre-commitでチェックを入れる、以下に導入だけ示してある(git管理してるルートでやること)
```
pip install black
pip install pre-commit
pre-commit install
git commit --allow-empty -m test-lint
```
- pre-commit走ればOK
- autoupdateとかのwarnがもしかしたら出るかも、わからなかったら聞いてください
- 一応手動でできるよというやつ
```
black .
```
