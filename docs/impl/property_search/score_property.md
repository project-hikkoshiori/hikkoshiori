# 仕様書

## 機能のグルーピング

物件探し

## 機能を一言で

要件による付近の物件のスコアリング

## どんなことがしたいか(機能詳細)

いくつか要件を入力することでそれを満たしているかどうかにより付近の物件のスコアリングを行う。要件の例としては以下が考えられる。
- 最寄り駅
- 間取り
- 口コミ
- コンビニ分布など特定の建物があるか
- 犯罪件数
- 家賃
物件一覧は他主要サイトから引っ張ってくるとして、表示と、そのサイトへのリンクも添付しておく。
リコメンドも結構ここに絡んでくると思っていて、各スコアごとのソート機能、合計スコアのソートなどが出来るようになるとよい。

## 話し合っておきたい・聞きたいポイント

## どんな作業がいるか
- 物件一覧とリンクをもってくる
- スコアリングのロジック
  - 犯罪件数などどこから持ってくるかわからないものは一旦後回しでもよさそう→取れるものからとってこれる感じで
- areaのスコアと物件のスコアってうまく統合できそうな気がするけどどうだろう？
  - 単純にフロントの負担がかなり重いのでこっちに仕様を寄せるほうが助かる

## Server(ざっくり)