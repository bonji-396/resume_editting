# Resume Editor
履歴書作成ウェブアプリです。
HTML、CSS（SCSS）、JavaScriptのみで構成されていて「フロントエンドのみで収束」します。

## 概要
下記ページにアクセスすれば利用できます。

- [提供ページ]()
- [説明ページ](https://www.mikuro.works/resume_editting)
- [GitHub](https://github.com/bonji-396/resume_editting)

## 特徴と機能

- 履歴書（JIS規格）見た目のままで編集できます
- A4、A3見開き、B5、B4見開きのそれぞれを選択印刷が可能です。（PDF出力する場合はブラウザの機能を使ってください。）
- 編集内容は（sessionStorageに）自動保存します。
- 再編集用にJSON形式で保存・読み込みが可能です。


## 履歴書（JIS規格）見た目のままで編集できます
今時この規格で作ること自体？って感じではありますが、使い慣れたJIS規格系の形式で編集できます。
今のところPCでの編集を想定してます。（現在、スマフォ対応に修正中）

## A4、A3見開き、B5、B4見開きのそれぞれを選択印刷が可能
以下の形式で出力できます。
印刷プレビューで確認してください。

- A3（A3見開きで出力）
- A4（A4で左右1枚ずつ出力)
- B4（BB見開きで出力）
- B5（B5で左右1枚ずつ出力)

そのまま提出できるようにHTML形式の保存することも検討中。

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

### 顔写真
ちゃんと画像を貼り付けられます。

- 顔写真欄をクリックして画像を選択してください。
- 画像を削除するには右クリックで削除メニューが現れます。

## 学歴・職歴
学歴、職歴、賞罰などの欄は、左揃え、中央揃え、右揃えに切り替えられます。

- 揃えを変更するには「学歴・職歴」の入力欄をダブルクリックするして切り替えてください。

