/* -------------------------------------------------------------------------
 DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // 履歴書編集オブジェクトの生成
  const resumeEditor = new ResumeEditor();
},false);
/* -------------------------------------------------------------------------
 履歴書編集クラス（ResumeEditor）
---------------------------------------------------------------------------- */
class ResumeEditor {
  constructor() {
    /* -----------------------------
     定数を定義
    -------------------------------- */
    this.DEFAULT_IS_EDITTING = true;
    this.DEFAULT_EXPORT_FILE_TYPE_IS_TEXT = false;
    this.DEFAULT_PAGE_SIZE = 'b4';
    /* -----------------------------
     Style sheet link object
    -------------------------------- */
    this.styleSheet = new StyleSheet();
    /* -----------------------------
     User Interfaces
    -------------------------------- */
    this.inputFields = new InputFields();
    this.idPhoto = new IDPhoto((event)=>{this.showContextMenu(event)});
    this.selectPaperSizeDropDownList = new SelectPaperSizeDropDownList((size)=>{this.changeStyleSheet(size)});
    this.eittingSwitchButton = new EdittingSwitchButton((checked)=>{this.edittingSwitch(checked)});
    this.rightClickMenu  = new RightClickMenu(()=>{this.idPhotoImageDelete()});
    this.helpWindow = new HelpWindow(()=>{});
    this.resetButton = new ResetButton(()=>{this.reset()});
    this.importButton = new ImportButton(()=>{this.load()});
    this.exportButton = new ExportButton(()=>{this.export(this.DEFAULT_EXPORT_FILE_TYPE_IS_TEXT)});
    this.printButton = new PrintButton(()=>{this.print()});
    this.outputButton = new HTMLOutputButton(()=>{this.output()});
    this.helpButton = new HelpButton(()=>{this.help()});
    // ウィンドウを閉じる、リロードするときに、確認メッセージを行う
    //（リロードするときに表示したくなく、今回は使っていない。初心者メモ）
    // window.addEventListener('beforeunload', (event)=>{this.close(event)});
    
    // 初期化
    this.init();
    // （リロード時に）sessionStorageの反映
    this.load();
  }
  /* ---------------------------------------------------
    編集可否の初期化
  ------------------------------------------------------ */
  init() {
    // 編集可否の初期化
    this.eittingSwitchButton.selfElement.checked = this.DEFAULT_IS_EDITTING;
    this.edittingSwitch(this.DEFAULT_IS_EDITTING);
  }
  /* ---------------------------------------------------
    編集可否を切り替える
  ------------------------------------------------------ */
  edittingSwitch(isEditting) {
    if(isEditting) {
      console.log('enable');
      this.inputFields.makeItEditable();
      this.idPhoto.toEnable();
    } else {
      console.log('disable');
      this.inputFields.makeItUnEditable();
      this.idPhoto.toDisable();
    }
  }
  /* ---------------------------------------------------
    スタイルシートを変更する
  ------------------------------------------------------ */
  changeStyleSheet(size){
    this.styleSheet.cangehlef(size);
    this.selectPaperSizeDropDownList.save();
  }
  /* ---------------------------------------------------
    sessionStorageからデータを読み込む
  ------------------------------------------------------ */
  load(){
    this.inputFields.load();
    this.idPhoto.load();
    this.styleSheet.load(this.selectPaperSizeDropDownList.load(this.DEFAULT_PAGE_SIZE));
  }
  /* ---------------------------------------------------
    右クリックメニューを表示する
  ------------------------------------------------------ */
  showContextMenu(event){
    // 表示
    this.rightClickMenu.show(event);
    // ブラウザ標準のコンテキストメニューを表示させない
    event.preventDefault();
  }
  /* ---------------------------------------------------
    顔写真を削除
  ------------------------------------------------------ */
  idPhotoImageDelete(){
    this.idPhoto.delete();
    this.rightClickMenu.close();
  }
  /* ---------------------------------------------------
    編集内容をsessionStorageも含めて全てクリアリセットする
  ------------------------------------------------------ */
  reset() {
    if(window.confirm('入力内容全てを消去します。よろしいですか？')){
      this.inputFields.allClear();
      this.idPhoto.delete();
      this.selectPaperSizeDropDownList.save(); // クリアしても用紙サイズは変更しない
      // スタイルシートはリロードしてないので改めて変更等する必要はないが・・
      // リロードした時、上記のSaveで整合性を保つ。サイズまでリセットするなら以下が必要
      // this.styleSheet.load(this.selectPaperSizeDropDownList.load());

      // サーバとのやりとりが必要な場合は、内容がをクリアしても同Sesson扱いとなるケースとなるため、
      // window.location.reload()を最後に行った方が良いかもしれない。

    }
  }
  /* ---------------------------------------------------
    印刷
  ------------------------------------------------------ */
  print(){
    window.print();
  }
  /* ---------------------------------------------------
    履歴書をHTML出力
  ------------------------------------------------------ */
  output() {
    console.log('html output!!!!!!!');
  }
  /* ---------------------------------------------------
    ヘルプ表示
  ------------------------------------------------------ */
  help(){
    this.helpWindow.open();
    document.body.addEventListener('click', (event)=>{
      if (this.helpWindow.selfElement.classList.contains('show')
        && !event.target.closest('#help-window')) {
          this.helpWindow.close();
      }
    }, { once: true }); // １回のみのイベント
  }
  /* ---------------------------------------------------
    ページを閉じる
  ------------------------------------------------------ */
  close(event){
    event.returnValue = '';
    event.preventDefault();
  }
}
/* -------------------------------------------------------------------------
 StyleSheet
---------------------------------------------------------------------------- */
class StyleSheet {
  constructor(){
    this.selfElement = document.getElementById('combines-styles');
  }
  /* ---------------------------------------------------
    スタイルシートを変更する
  ------------------------------------------------------ */
  cangehlef(size){
    this.selfElement.href = `css/${size}.css`;
  }
  /* ---------------------------------------------------
    引数の値からスタイルを反映する
  ------------------------------------------------------ */
  load(size) {
    if(size) {
      this.cangehlef(size);
    }
  }
}
/* -------------------------------------------------------------------------
 UserInterfase
---------------------------------------------------------------------------- */
class UserInterfase {
  constructor(idName) {
    this.selfElement = document.getElementById(idName); 
  }
}
/* -------------------------------------------------------------------------
  入力編集領域UI（InputFields） 
  TODO: 入力内容精査
  TDOD: 制作日時を自動反映
  　例；リロード時に本日日付と制作日付が異なる場合、更新するか確認する。
---------------------------------------------------------------------------- */
class InputFields extends UserInterfase {
  constructor() {
    super();
    this.selfElement = document.querySelectorAll('.input-field');
    // 全入力欄にイベント処理を付与
    this.selfElement.forEach(inputField=>{
      // input時に自動保存
      inputField.addEventListener('input', (event)=>{this.autoSave(event)});
      // フォーカス時に全選択
      inputField.addEventListener('focus',()=>{
        document.execCommand('focus',false,null);
        console.log('focus');
      });
    });
    // 学歴・職歴/免許・資格 欄
    this.careerAndQualifications = document.querySelectorAll('[id*="-contents-"]');
    // ダブルクリックで文字揃え変更処理を付与
    this.careerAndQualifications.forEach(elem=>{
      elem.addEventListener('dblclick',(event)=>{this.changeTextAlign(event)});
    });
    // 編集領域の改行可否 
    this.supression();
  }
  /* ---------------------------------------------------
   入力編集可能にする
  ------------------------------------------------------ */
  makeItEditable() {
    this.selfElement.forEach(inputField=>{
      inputField.contentEditable = true;
    });
    // フォーカスを最初の位置に戻す
    document.querySelector('.input-field[autofocus]').focus();
  }
  /* ---------------------------------------------------
   入力編集不可にする
  ------------------------------------------------------ */
  makeItUnEditable() {
    this.selfElement.forEach(inputField=>{
      inputField.contentEditable = false;
    });
  }
  /* ---------------------------------------------------
   入力編集領域をSessionStorageへ自動保存 
  ------------------------------------------------------ */
  autoSave(event) {
    sessionStorage.setItem(event.target.id, event.target.innerText);
    // フォーカスが当たっている要素を取得する場合
    // if(document.activeElement.id) {
    //   sessionStorage.setItem(document.activeElement.id, document.activeElement.innerText);
    // }
  }
  /* ---------------------------------------------------
  　 入力編集領域の編集領域の改行可否 
  ------------------------------------------------------ */
  supression() {
    this.selfElement.forEach(inputField=>{
      if(!inputField.classList.contains('multiple-lines')) {
        inputField.addEventListener('keydown', (event)=>{
          // console.log(event.key, event.keyCode);
          /* 改行をさせない */
          if(!event.isComposing && event.key === 'Enter') {
            return false; // 何もしない
          }
        });  
      } else {
        // console.log(inputField);
      }
    });
  }
  /* ---------------------------------------------------
   SessionStorageデータを読み込み、入力編集領域反映する
  ------------------------------------------------------ */
  load() {
    this.selfElement.forEach(inputField=>{
      // IDと一致するキーが存在した場合に値を読み込む
      if (sessionStorage.getItem(inputField.id)) {
        inputField.innerText = sessionStorage.getItem(inputField.id);
      } else {
        inputField.innerHTML = '';
      }
    });
    const haveContent = (idName, content)=>{
      if(!sessionStorage.getItem(idName)) {
        document.getElementById(idName).innerText = content;
      }
    }
    haveContent('gender', '男・女')
    haveContent('marital-status', '有・無')
    haveContent('obligation-to-support-spouse', '有・無')

    //// 揃え情報を読み込んで反映する　TODO: //////////////////////////


    const applyTextAlign = (direction)=>{

      if (sessionStorage.getItem(direction)) {
        let items = sessionStorage.getItem(direction).split(',');
        items.forEach(item=>{
          // console.log(direction,item);
          const field = document.getElementById(item);
          field.dataset.textAlign = direction
        });
      }

    }

    applyTextAlign('left');
    applyTextAlign('center');
    applyTextAlign('right');
  }
  /* ---------------------------------------------------
    TextAlignをcenter,right,leftのローテンションで変更する
  ------------------------------------------------------ */
  changeTextAlign(event) {

    switch (event.target.dataset.textAlign) {
      case undefined:
        event.target.dataset.textAlign = 'center';
        break;
      case 'left':
        event.target.dataset.textAlign = 'center';
        break;
      case 'center':
        event.target.dataset.textAlign = 'right';
        break;
      case 'right':
        event.target.dataset.textAlign = 'left';
        break;          
      default:
        break;
    }
    // sessionStorageへ保存する
    this.dataTextAlignSave(event.target.dataset.textAlign, event.target.id);
  }
  /* ---------------------------------------------------
    揃え方角をsessionStorage情報に保存 
    TODO: リファクタリング（共通化）
  ------------------------------------------------------ */
  dataTextAlignSave(key, value){
    // console.log(key, value);

    const removeFromArray = (item)=>{
      if(item !== value){
        return item;
      }
    };

    let left = [];
    if (sessionStorage.getItem('left')) {
      left = sessionStorage.getItem('left').split(',');
      let tmp = left.filter(removeFromArray);
      left = tmp;
    }
    let center = [];
    if (sessionStorage.getItem('center')) {
      center = sessionStorage.getItem('center').split(',');
      let tmp = center.filter(removeFromArray);
      center = tmp;
    }
    let right = [];
    if (sessionStorage.getItem('right')) {
      right = sessionStorage.getItem('right').split(',');
      let tmp = right.filter(removeFromArray);
      right = tmp;
    }
   
    switch (key) {
      case 'left':
        left.push(value);
        break;
      case 'center':
        center.push(value);
        break;
      case 'right':
        right.push(value);
        break;
      default:
        break;
    }

    sessionStorage.removeItem('left');
    sessionStorage.removeItem('center');
    sessionStorage.removeItem('right');

    if(left.length) {
      sessionStorage.setItem('left', left);      
    }
    if(center.length) {
      sessionStorage.setItem('center', center);
    }
    if(right.length) {
      sessionStorage.setItem('right', right);
    }

    // console.log(left,'\n', center,'\n', right);
  }
  /* ---------------------------------------------------
    編集内容をクリアリセットする
  ------------------------------------------------------ */
  clear() {
    this.selfElement.forEach(inputField=>{
      inputField.innerText = '';
    });
    document.getElementById('gender').innerText = '男・女';
    document.getElementById('marital-status').innerText = '有・無';
    document.getElementById('obligation-to-support-spouse').innerText = '有・無';
  }
  /* ---------------------------------------------------
    編集内容とsessionStorageをクリアリセットする
  ------------------------------------------------------ */
  allClear() {
    this.clear();
    sessionStorage.clear();
  }
}
/* -------------------------------------------------------------------------
 顔写真UI（IDPhoto） 
---------------------------------------------------------------------------- */
class IDPhoto extends UserInterfase {
  constructor(callback) {
    // 写真欄
    super('id-photo');
    // 写真欄（input[type=file]）で、ファイル選択をされた時のイベント
    this.selfElement.addEventListener('change', ()=>{this.addIDPhoto()});
    // 画像要素
    this.idPhotoImage = document.getElementById('photo-image');
    // コールバックを保存
    this.callback = callback;
  }
  /* ---------------------------------------------------
    IDPhotoの編集を有効化
  ------------------------------------------------------ */
  toEnable(){
    this.selfElement.disabled = false;
    // 画像要素を右クリックした時のイベント
    this.idPhotoImage.addEventListener('contextmenu', this.callback);
  }
  /* ---------------------------------------------------
    IDPhotoの編集を無効化
  ------------------------------------------------------ */
  toDisable(){
    this.selfElement.disabled = true;
    console.log('remove');
    this.idPhotoImage.removeEventListener('contextmenu',  this.callback, false);
  }
  /* ---------------------------------------------------
    SessionStorageに保存された画像を読み込む
  ------------------------------------------------------ */
  load() {
    this.idPhotoImage.src = 
      sessionStorage.getItem(this.idPhotoImage.id)
      ? sessionStorage.getItem(this.idPhotoImage.id)
      : '';
  }
  /* ---------------------------------------------------
    顔写真を追加
    TODO: （300px x 400px）解像度、サイズを変換 
  ------------------------------------------------------ */
  addIDPhoto(){
    // this.addIDPhotoInDataURLFormat();
    this.addIDPhotoInDataURLFormat();
  }
  /* ---------------------------------------------------
    顔写真を追加（Blob URI形式）
  ------------------------------------------------------ */
  addIDPhotoIBlogURLFormat(){
    const file = this.selfElement.files[0];
    // 選択した画像を表示する
    // FIX:importButtonと同じようにすると、一旦SessionStorageに保存し、ResumeEditor.lode();で読み込むべき
    this.idPhotoImage.setAttribute('src', file);
    // SessonStorageにも保存
    sessionStorage.setItem(this.idPhotoImage.id, file);
  }
  /* ---------------------------------------------------
    顔写真を追加（Data URI形式）← 不利用（メモとして残す）
  ------------------------------------------------------ */
  addIDPhotoInDataURLFormat(){
    const file = this.selfElement.files[0];
    const reader = new FileReader();
    // Data URI（画像をテキスト化）形式で表示
    // readAsDataURL完了後
    reader.addEventListener('load', ()=>{
      // 選択した画像を表示する
      this.idPhotoImage.setAttribute('src', reader.result);
      // SessonStorageにも保存
      sessionStorage.setItem(this.idPhotoImage.id, reader.result);
      // !!!!!!!!!!!!!!!!!!!!!!!
      // HTTPリクエストを発生させずにテキストとして埋め込んでいるので、リロードするなどしないと表示しない。
      // !!!!!!!!!!!!!!!!!!!!!!! 
      location.reload(); 
      // importButtonと同じようにすると、
      // 一旦SessionStorageに保存し、ResumeEditor.lode();で読み込むべき
      // その場合上記のreload要らない。
    });
    // readAsDataURLでのエラー
    reader.addEventListener('error', ()=>{
      console.log(reader.error);
    });
    reader.readAsDataURL(file); // readAsDataURL()は非同期で処理される 
  }
  /* ---------------------------------------------------
    顔写真を初期化
  ------------------------------------------------------ */
  reset() {
    this.delete();
  }
  /* ---------------------------------------------------
    顔写真を削除
  ------------------------------------------------------ */
  delete() {
    this.idPhotoImage.src = '';
    sessionStorage.removeItem(this.idPhotoImage.id);
  }
}
/* -------------------------------------------------------------------------
  EdittingSwitchButton: 編集可否変更ボタンUI
---------------------------------------------------------------------------- */
class EdittingSwitchButton extends UserInterfase {
  constructor(callback) {
    super('isEditing');
    this.selfElement.addEventListener('change', ()=>{callback(this.selfElement.checked)});
  }
}
/* -------------------------------------------------------------------------
 select-papersize: 用紙サイズ変更ドロップリスト
---------------------------------------------------------------------------- */
class SelectPaperSizeDropDownList extends UserInterfase {
  constructor(callback){
    super('paper-size');
    this.selfElement.addEventListener('change', (event)=>{callback(this.selfElement.value);});
  }
  /* ---------------------------------------------------
    sessionStorageからページサイズ情報を読み込む
  ------------------------------------------------------ */
  load(defaultSize) {
    if(sessionStorage.getItem(this.selfElement.id)) {
      this.selfElement.value = sessionStorage.getItem(this.selfElement.id);
    } else {
      this.selfElement.value = defaultSize;
    }
    return this.selfElement.value;
  }
  /* ---------------------------------------------------
    sessionStorageにページサイズ情報を書き込む
  ------------------------------------------------------ */
  save(size = this.selfElement.value) {
    sessionStorage.setItem(this.selfElement.id, size);
  }
}
/* -------------------------------------------------------------------------
 ButtonUI
---------------------------------------------------------------------------- */
class ButtonUI extends UserInterfase {
  constructor(idName, callback) {
    super(idName);
    this.selfElement.addEventListener('click', (event)=>{
      event.stopPropagation(); // callbackで'click'イベントを使っている場合があるため、イベント伝播停止して対策
      callback();
    }); 
  }
}
/* -------------------------------------------------------------------------
  ResetButtonUI: 編集内容を全て消去し初期化するボタンUI
---------------------------------------------------------------------------- */
class ResetButton extends ButtonUI {
  constructor(callback) {
    super('reset', callback);
  }
}
/* -------------------------------------------------------------------------
  PrintButtonUI: 印刷機能ボタンUI
---------------------------------------------------------------------------- */
class PrintButton extends ButtonUI {
  constructor(callback) {
    super('print', callback);
  }
}
/* -------------------------------------------------------------------------
  ImportButtonUI: ファイルからデータを読み込み表示させるボタンUI
---------------------------------------------------------------------------- */
class ImportButton extends UserInterfase {
  constructor(callback) {
    super('import');
    this.selfElement.addEventListener('change', (event)=>{this.import(event, callback)});
  }
  /* ---------------------------------------------------
    ファイルからデータを読み込みsessionStorageに保存する。
    その後、コールバックで表示に反映する。
  ------------------------------------------------------ */
  import(event, callback){
    // console.log('import', this.selfElement.files);
    // 選択したファイルを読み込んで、その内容を各入力欄へ反映する
    const file = this.selfElement.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    
    /* 読み込み成功時に、
    sessionStorageへ読み込んだデータを保存し、
    その保存データをもとに各要素に反映する */
    reader.addEventListener('load',()=>{
      // console.log(reader.result);
      // console.log(JSON.parse(reader.result));
      const readJson = JSON.parse(reader.result);
      sessionStorage.clear();
      for (let key in readJson) {
        // console.log(key, readJson[key]);
        sessionStorage.setItem(key, readJson[key]);
      }
      callback();
    });
    /* 読み込み失敗時にエラーをコンソールに出力 */
    reader.addEventListener('error', ()=>{
      console.log(reader.error);
    });
  }
}
/* -------------------------------------------------------------------------
  ExportButtonUI: 編集内容をファイルにエクスポートするボタンUI
---------------------------------------------------------------------------- */
class ExportButton extends ButtonUI {
  constructor(flg) {
    super('export',()=>{this.export(flg)});
  }
  /* ---------------------------------------------------
    sessionStorageデータをJSONテキストファイルとして保存
  ------------------------------------------------------ */
  export(flg){
    // console.log('export');
    const list =  {};
    // セッションストレージの内容を連想配列に格納
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      // console.log(key, sessionStorage.getItem(key));
      list[key] = sessionStorage.getItem(key);
    }
    // console.log(list);
    // console.log('window.performance.memory:', window.performance.memory);

    /* jsonテキストファイルとして保存
    -------------------------------- */
    const jsonStr = JSON.stringify(list);
    const blob = flg
      ? new Blob([jsonStr],{type: 'text/plain'}) // utf-8テキスト
      : new Blob([jsonStr],{type: 'application/json'}); // json
      // : new Blob([jsonStr],{type: 'application/octet-stream'}); // 任意のバイナリー
    const link = document.createElement('a'); // ダミーリンク
    link.download = 'resume.json';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
/* -------------------------------------------------------------------------
  HTMLOutputButton: ウィンド又はタブページを閉じるボタンUI
---------------------------------------------------------------------------- */
class HTMLOutputButton extends ButtonUI {
  constructor(callback) {
    super('output', callback);
  }
}
/* -------------------------------------------------------------------------
  HelpButton: HELP表示ボタンUI
---------------------------------------------------------------------------- */
class HelpButton extends ButtonUI {
  constructor(callback) {
    super('help', callback);
  }
}
/* -------------------------------------------------------------------------
 RightClickMenu: 右クリックメニュー（id photo delete）
---------------------------------------------------------------------------- */
class RightClickMenu extends UserInterfase{
  constructor(callback) {
    super('contextmenu');
    // 画像を削除リスト
    this.photoDelete = document.getElementById('photo-delete')
    // 画像を削除リストをクリックした時のイベント
    this.photoDelete.addEventListener('click', ()=>{callback()});
  }
  /* ---------------------------------------------------
    自身の要素を表示する
  ------------------------------------------------------ */
  show(event){
    this.selfElement.style.top = event.pageY + 'px';
    this.selfElement.style.left = event.pageX + 'px';
    this.selfElement.classList.add('show');
    /*
      自身の要素を以外をクリックしたら自身を閉じる
    ---------------------- */
    document.body.addEventListener('click',(event)=>{
      if (this.selfElement.classList.contains('show')
        && !event.target.closest('#contextmenu')) {
          this.close()
      }
    }, { once: true });
  }
  /* ---------------------------------------------------
    自身の要素を閉じる
  ------------------------------------------------------ */
  close(){
    this.selfElement.classList.remove('show');
  }
}
/* -------------------------------------------------------------------------
  HelpWindow: ヘルプモーダルウィンドウ
---------------------------------------------------------------------------- */
class HelpWindow extends UserInterfase{
  constructor(){
    super('help-window');
    this.closeButton = document.querySelector('#help-window>.help-close');
    this.closeButton.addEventListener('click', ()=>{this.close()});
  }
  open() {
    this.selfElement.classList.add('show');
  }
  close() {
    this.selfElement.classList.remove('show');
  }
}