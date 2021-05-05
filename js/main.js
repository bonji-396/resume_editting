/* 定数の定義
---------------------------------------------------------------------------- */
// 起動時に編集可能かどうか
DEFAULT_IS_EDITTING = true;
// リセットボタンのリソース情報
RESET_BUTTON = {'imgPath':'img/reset.svg', 'title':'リセット', 'alt':'reset'}
// インポートボタンのリソース情報
IMPORT_BUTTON = {'imgPath':'img/import.svg', 'title':'インポート', 'alt':'import'}
// エクスポートボタンのリソース情報
EXPORT_BUTTON = {'imgPath':'img/export.svg', 'title':'エクスポート', 'alt':'export'}
// クローズボタンのリソース情報
CLOSE_BUTTON = {'imgPath':'img/close.svg', 'title':'閉じる', 'alt':'close'}

/* DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* 履歴書Editorの生成と表示 */
  const resumeEditor = new ResumeEditor();
  resumeEditor.view();

  console.log(window.sessionStorage);
  if(window.sessionStorage == 'undefined') {
    console.log('sessionStorageは利用できません。');
  }
  // sessionStorageのテスト
  try {
    console.log(sessionStorage.length);
    sessionStorage.setItem('hage','hoge');
    console.log(sessionStorage.length);
    const hage = sessionStorage.getItem('hage');
    console.log(hage);
    sessionStorage.removeItem('hage');
    console.log(sessionStorage.length);
    sessionStorage.clear();
    console.log(sessionStorage.length);      
  }catch(e){
    console.log('sessionStorageは利用できません。');
  }
  // イベントテスト
  document.body.addEventListener('click', (event)=>{
    if (event.target.closest('button')) {
      console.log('pohoge');
    } else if (event.target.closest('.isEditing')) {
      console.log('switch');
    }
  });
},false);
/* ResumeEditor
 履歴書を編集する機能を提供する
---------------------------------------------------------------------------- */
class ResumeEditor{
  constructor(){
    // リセットボタン
    this.resetButton = new Button(RESET_BUTTON);
    console.log(typeof(this.resetButton.selfElement));
    // インポートボタン
    this.importButton = new Button(IMPORT_BUTTON);
    // エクスポートボタン
    this.exportButton = new Button(EXPORT_BUTTON);
    // クロースボタン
    this.closeButton = new Button(CLOSE_BUTTON);
    // ヘッダー
    this.headerMenu = new HeaderMenu();
    // メイン
    this.main = new Resume();
    // フッター
    this.footer = new Footer();
  }
  view() {
    this.headerMenu.view();
    this.main.view();
    this.footer.view();
  }
}
/* View
 各要素を生成し表示する
---------------------------------------------------------------------------- */
class View{
  constructor(elementName){
    this.selfElement = this.createSelfElemnt(elementName);
  }
  createSelfElemnt(elementName){
    const elem = document.createElement(elementName);
    return elem;
  }
  addElementsToSefeElement(elements){
    elements.forEach(element => {
      this.selfElement.appendChild(element);      
    });
  }
  /* 自身がもつ要素を表示する 
  ------------------------------------------------------ */
  view(){
    document.body.appendChild(this.selfElement);
  }
}
/* Button
 Buttonを表示する
---------------------------------------------------------------------------- */
class Button extends View{
  constructor(resourceInfo, elementName = 'button'){
    super(elementName);
    this.selfElement.id = resourceInfo.alt;
    this.addElementsToSefeElement([this.createButtonIcon(resourceInfo)]);
  }
  createButtonIcon(resourceInfo){
    const img = document.createElement('img');
    img.src = resourceInfo.imgPath;
    img.title = resourceInfo.title;
    img.alt = resourceInfo.alt;
    return img;
  }
}

/* HeaderMenu
 Header要素内に各要素を表示する
---------------------------------------------------------------------------- */
class HeaderMenu extends View {
  constructor(elementName = 'header'){
    super(elementName);
    this.editingSwitch = this.createEditingSwitch();
    this.resetButton = this.createButton('img/reset.svg','リセット','reset');
    this.importButton = this.createButton('img/import.svg','インポート','import');
    this.exportButton = this.createButton('img/export.svg','エクスポート','export');
    this.closeButton = this.createButton('img/close.svg','閉じる','close');
    this.addElementsToSefeElement(
      [
        this.createTitle(),
        this.createMenu()
      ]
    );
  }
  /* 編集スイッチボタンを生成する
  ------------------------------------------------------ */
  createEditingSwitch(){
    const switchButton = document.createElement('div');
    switchButton.className = 'editing-switch';
    const input = document.createElement('input');
    const label = document.createElement('label');
    input.type = 'checkbox';
    input.id = 'isEditing';
    label.htmlFor = 'isEditing';
    switchButton.appendChild(input);
    switchButton.appendChild(label);
    return switchButton;
  }
  /* 画像、タイトル、Altを指定して、各ボタンを生成する 
  ------------------------------------------------------ */
  createButton(imgPath, title, alt){
    const button = document.createElement('button');
    button.id = alt;
    const img = document.createElement('img');
    img.src = imgPath;
    img.alt = alt;
    img.title = title;
    button.appendChild(img);
    return button;
  }
  /* タイトルを生成
  ------------------------------------------------------ */
  createTitle() {
    const title = document.createElement('div');
    title.className = 'title';
    const h1 = document.createElement('h1');
    h1.innerText = '履歴書 Editor';
    const p = document.createElement('p');
    p.innerText = 'ブラウザで履歴書を作成します。';

    title.appendChild(h1);
    title.appendChild(p);    
    
    return title;
  }
  /* メニュー（ボタン群）を生成
  ------------------------------------------------------ */
  createMenu(){
    const menu = document.createElement('div');
    menu.className = 'menu';
    menu.appendChild(this.editingSwitch);
    menu.appendChild(this.resetButton);
    menu.appendChild(this.importButton);
    menu.appendChild(this.exportButton);
    menu.appendChild(this.closeButton);

    return menu;
  }
}
/* Resume
 履歴書を表示する
---------------------------------------------------------------------------- */
class Resume extends View {
  constructor(elementName = 'main'){
    super(elementName);
    
  }
  /* 左ページを生成する */
  createLeftPage(){

  }
  /* 右ページを生成する */
  createRightPage(){

  }
  

}
/* Footer
 Footer要素内に各要素を表示する
---------------------------------------------------------------------------- */
class Footer extends View{
  constructor(elementName = 'footer'){
    super(elementName);
    this.copyright = this.createCopyRight('2021 mikuro.net');
    this.addElementsToSefeElement([this.copyright]);
  }
  /* コピーライトを生成する
  ------------------------------------------------------ */
  createCopyRight(words){
    const p = document.createElement('p');
    const small = document.createElement('small');
    small.innerHTML = `&copy; ${words}`;
    p.appendChild(small);
    return p;
  }
}