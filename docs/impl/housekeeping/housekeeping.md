# 仕様書

金額リスト

## UpdatedAt

2022-08-05

## 機能のグルーピング

家計簿

## 機能を一言で

必要なお金(敷金とか)を入力(自動？)してもらって、閲覧する。

## どんなことがしたいか(機能詳細)

引っ越しにあたり必要なお金の項目を提示、それぞれ入力してもらって保存し、閲覧できるようにしておく。
用意したお金とそうでないお金でcheckboxとかいれてfilterできるとよい。
デフォルト値についてはできればいい感じの平均値とかをもってこれるようにできるとよい。

## 話し合っておきたい・聞きたいポイント

## どんな作業がいるか

## Server

- 項目の作成とDB設計
  - DB
    - id
    - name
    - columns
      - array
        - id
        - name
        - value
- GetHousekeeping
- AddHousekeeping
- UpdateHousekeeping
- Deletehousekeeping(優先度低め)
- defaultの取得(優先度低め)