# Resume Editor
履歴書作成ウェブアプリです。
HTML、CSS（SCSS）、JavaScriptのみで構成されていて「フロントエンドのみで終息」します。
なので、個人情報を送信することはありません。

また、編集中データはsessionStorageに保存しているので、プラウザを閉じれば個人情報が残ることもありません。
共用端末での利用でも安心してお使いいただけます。

※ ただし、インポート、HTML出力、印刷・PDF印刷したデータの管理はご自身でしっかり行って下さい。

![pc_screenshot](https://user-images.githubusercontent.com/71716610/118612365-a8ff2d00-b7f8-11eb-898e-3909dae9ff0e.gif)


## バージョン履歴
- 2021/5/16 - version 1.0
- 2021/5/17 - version 1.0.1 スマフォ対応用にハンバーガーメニューを追加
- 2021/5/17 - version 1.0.2 スマートフォンからHTML出力した時の不具合を解消。出力したHTML要素属性で必要ないもの削除。
- 2021/5/18 - version 1.0.3 プリント時に線幅1px以下になり印刷されない現象を修正
- 2021/5/18 - version 1.0.4 スマートフォンからHTML出力した際に左位置が表示の状態と同じに出力されてしまう現象を解消
- 2021/5/19 - version 1.0.5 写真画像を比率を保ち中央トリミングする様に変更
- 2021/5/31 - version 1.0.6 1行入力欄で、入力確定し且つエンター押下時には次の入力欄へフォーカスを移動する処理を追加

### 制作時間
|項目|日時|
|---|---|
|制作開始| 2021/4/28|
|最新更新日| 2021/5/19|
|制作時間| 62時間|
|修正時間| 3時間|

## 概要
下記ページにアクセスすれば利用できます。

- [提供ページ](https://www.mikuro.works/portfolio/works/resume_editting/)
- [GitHub](https://github.com/bonji-396/resume_editting)

## 特徴と機能

- 履歴書（JIS規格）見た目のままで編集できます
- A4、A3見開き、B5、B4見開きのそれぞれを選択印刷が可能です。（PDF出力する場合はブラウザの機能を使ってください。）
- 編集内容は（sessionStorageに）自動保存します。
- 再編集用にJSON形式で保存・読み込みが可能です。
- HTMLファイル出力が可能です。リモート面談等で活用して下さい。


## 履歴書（JIS規格）見た目のままで編集できます
今時この規格で作ること自体？って感じではありますが、使い慣れたJIS規格系の形式で編集できます。
今のところPCでの編集を想定してます。（現在、スマフォ対応に修正中）

## A3見開き、A4、B4見開き、B5のそれぞれを選択が可能
以下の書式で表示切り替えし、印刷出力できます。

- A3（A3見開きで出力）
- A4（A4で左右1枚ずつ出力)
- B4（BB見開きで出力）
- B5（B5で左右1枚ずつ出力)

### 印刷
あくまでレイアウトフォーマット切り替えですので、ブラウザの印刷プレビュー等設定で印刷用紙は選択し確認してください。

### PDF出力
また、ブラウザからのPDF出力機能（印刷機能でのPDFファイルで出力）を利用すればPDFへの出力も可能です。

## HTML形式で出力が可能
そのまま提出できるようにHTML形式の保存するが可能です。

## 編集内容は（sessionStorageに）自動保存

編集中の内容はブラウザのsessionStorageに自動保存します。
ブラウザを閉じなければ、リロードしても編集内容が消えません。
（もちろん、ブラウザを閉じてしまうとデータは消えてしまいます。）

localStorageでも良かったんですが、扱うデータが個人情報なのでブラウザを閉じたら消した方がいいかなぁと。

## 再編集用にJSON形式で保存・読み込みが可能

編集内容を保存したい場合、必ずブラウザを閉じる前にエクスポートボタンを押して保存してください。
保存形式はJSON形式です。

インポートボタンで保存したJSONファイルを指定してインポートしてください。
出力したJSONファイルはご自身で管理してください。

## 顔写真
ちゃんと画像を貼り付けられます。

- 顔写真欄をクリックして画像を選択してください。
- 画像を削除するには右クリックで削除メニューが現れます。
- 画像は4Mbyt以内を目安に利用して下さい。

## 学歴・職歴
学歴、職歴、賞罰などの欄は、左揃え、中央揃え、右揃えに切り替えられます。

- 揃えを変更するには「学歴・職歴」の入力欄をダブルクリックするして切り替えてください。


## 今後

### スマートフォン対応
- スマートフォン用メニュー
- 入力編集方法の変更を検討

### ユーザビリティ向上
- TOPへスクロールを追加
- viewを100%,150%,50%,画面に合わせるに選択可能
- ドラックアンドドロップ（JSON, image）
- ショーカットキー割り当て
- 入力値の制限及びチェック
- 写真画像のサイズ制限や、固定サイズへ変換（大きいサイズの場合等考慮して）

### 機能強化
- エクスポートファイル暗号化/インポートファイル複合化

### IT環境のフォロー
- 利用者がPCやプリンターを使えない環境にいる場合をどうするか？
  - スマートフォン対応と、コンビニ印刷が最も有力候補となるが、どう対応するべきか・・・ 
