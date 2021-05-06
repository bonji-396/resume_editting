# Resume Editor

履歴書をウェブブラウザで作成編集します。  
avaScriptを勉強がてら作りました。



## 特徴
以下の特徴があります。

### 履歴書（JIS規格）の見たままで編集できます。
今時この規格で作ること自体？って感じではありますが、使い慣れたJIS規格系の形式で編集できます。

### A4,B5それぞれの出力形式を選べます。

- A4(出力はA3):
- A4(出力はA4を2枚):
- B5(出力はB4):
- B5(出力はB5を2枚):

### sessionStorageに自動保存

編集中の内容はブラウザのsessionStorageに自動保存します。  
ブラウザを閉じなければ、リロードしても編集内容が消えません。  
ただし、ブラウザを閉じてしまうとデータは残りません。

### JSON形式で保存・読み込みが可能

編集内容を保存したい場合、必ずブラウザを閉じる前にエクスポートボタンを押して保存してください。  
保存形式はJSON形式です。  

### HTML形式で保存が可能
（そのまま提出できるようにHTML形式の保存することも検討中）

## 制作目的
- 以下の部分においてのJavaScriptの勉強
  - Web Storage APIを利用した永続的なデータの活用
  - File APIを利用した永続的なデータの活用
  - contenteditableの活用方法
  - @media printの活用

## 制作時間
5/10完成予定
