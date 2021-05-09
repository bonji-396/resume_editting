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
    /* -----------------------------
     User Interfaces
    -------------------------------- */
    this.inputFields = new InputFields();
    this.idPhoto = new IDPhoto();
    this.eittingSwitchButton = new EdittingSwitchButton((checked)=>{this.edittingSwitch(checked)});
    this.resetButton = new ResetButton(()=>{this.reset()});
    this.printButton = new PrintButton(()=>{this.print()});
    this.importButton = new ImportButton(()=>{this.load()});
    this.exportButton = new ExportButton(()=>{this.export(this.DEFAULT_EXPORT_FILE_TYPE_IS_TEXT)});
    this.helpButton = new HelpButton(()=>{this.help()});
    this.closeButton = new CloseButton(()=>{this.close()});
    this.init();
  }
  /* ---------------------------------------------------
    編集可否の初期化
  ------------------------------------------------------ */
  init() {
    // 編集可否の初期化
    this.eittingSwitchButton.selfElement.checked = this.DEFAULT_IS_EDITTING;
    this.edittingSwitch(this.DEFAULT_IS_EDITTING);
    // 
  }
  /* ---------------------------------------------------
    編集可否を切り替える
  ------------------------------------------------------ */
  edittingSwitch(isEditting) {
    if(isEditting) {
      this.inputFields.makeItEditable();
      this.idPhoto.toEnable();
    } else {
      this.inputFields.makeItUnEditable();
      this.idPhoto.toDisable();
    }
  }
  /* ---------------------------------------------------
    編集内容をsessionStorageも含めて全てクリアリセットする
  ------------------------------------------------------ */
  reset() {
    if(window.confirm('入力内容全てを消去します。よろしいですか？')){
      this.inputFields.allClear();
      this.idPhoto.delete();
    }
  }
  /* ---------------------------------------------------
    印刷
  ------------------------------------------------------ */
  print(){
    console.log('printにゃーーー');
  }
  /* ---------------------------------------------------
    sessionStorageからデータを読み込む
  ------------------------------------------------------ */
  load(){
    this.inputFields.load();
    this.idPhoto.load();
  }
  /* ---------------------------------------------------
    ヘルプ表示
  ------------------------------------------------------ */
  help(){
    console.log('helpにゃーーー');
    const helpWindow = document.getElementById('help-window');
    helpWindow.classList.add("show");
 
    document.body.addEventListener('click', (event)=>{

      if (helpWindow.classList.contains('show')
        && !event.target.closest('#help-window')) {
          helpWindow.classList.remove("show");
          console.log('hage');
      }
    });
    // }, { once: true });
  }
  /* ---------------------------------------------------
    ページ又はタブを閉じる
  ------------------------------------------------------ */
  close(){
    // TODO: 入力内容がファイル保存した内容と変化した場合に伺うようにする。
    if(window.confirm('ページを閉じます。入力内容は破棄されます。よろしいですか？')){
      sessionStorage.clear();
      window.close();
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
  TODO: 改行処理を実装
  TODO: 入力内容精査
  TDOD: 制作日時を自動反映
  　例；リロード時に本日日付と制作日付が異なる場合、更新するか確認する。
---------------------------------------------------------------------------- */
class InputFields extends UserInterfase {
  constructor() {
    super();
    this.selfElement = document.querySelectorAll('.input-field');
    this.selfElement.forEach(inputField=>{
      inputField.addEventListener('input', (event)=>{this.autoSave(event)});
    });
    // sessionStorageのデータを反映
    this.supression();
    this.load();
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
      if(sessionStorage.getItem(inputField.id)) {
        inputField.innerText = sessionStorage.getItem(inputField.id);
      }else {
        inputField.innerHTML = '';
      }
    });
  }
  /* ---------------------------------------------------
    編集内容をクリアリセットする
  ------------------------------------------------------ */
  clear() {
    this.selfElement.forEach(inputField=>{
      inputField.innerText = '';
    });
  }
  /* ---------------------------------------------------
    編集内容とsessionStorageをクリアリセットする
  ------------------------------------------------------ */
  allClear() {
    this.selfElement.forEach(inputField=>{
      inputField.innerText = '';
    });
    sessionStorage.clear();
  }
  
}
/* -------------------------------------------------------------------------
 顔写真UI（IDPhoto） 
---------------------------------------------------------------------------- */
class IDPhoto extends UserInterfase {
  constructor() {
    super('id-photo');
    this.selfElement.addEventListener('change', (event)=>{this.addIDPhoto(event)});

    this.idPhotoImage = document.getElementById('photo-image');
    this.idPhotoImage.addEventListener('contextmenu', (event)=>{this.contextmenuShow(event)});
    
    this.photoDelete = document.getElementById('photo-delete')
    this.photoDelete.addEventListener('click', ()=>{this.delete()});

    this.load();
  }
  /* ---------------------------------------------------
    右クリックメニューを表示
  ------------------------------------------------------ */
  contextmenuShow(event){
    const contextmenu = document.getElementById('contextmenu');
    contextmenu.style.display = 'block';
    contextmenu.style.top = event.pageY + 'px';
    contextmenu.style.left = event.pageX + 'px'
    event.preventDefault();
  }
  /* ---------------------------------------------------
    IDPhotoの編集を有効化
  ------------------------------------------------------ */
  toEnable(){
    this.selfElement.disabled = false;
  }
  /* ---------------------------------------------------
    IDPhotoの編集を無効化
  ------------------------------------------------------ */
  toDisable(){
    this.selfElement.disabled = true;
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
    顔写真を初期化 ※ FIX:画像がすぐに反映しない
    TODO: （300px x 400px）解像度、サイズを変換 
  ------------------------------------------------------ */
  addIDPhoto(event){
    const file = this.selfElement.files[0];
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', ()=>{
      // 選択した画像を表示する
      this.idPhotoImage.src = reader.result;
      // SessonStorageにも保存
      sessionStorage.setItem(this.idPhotoImage.id, reader.result)
    });
    reader.addEventListener('error', ()=>{
      console.log(reader.error);
    });
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
    document.getElementById('contextmenu').style.display = 'none';
  }
}

/* -------------------------------------------------------------------------
 編集可否変更ボタンUI（EdittingSwitchButton） CallBack
---------------------------------------------------------------------------- */
class EdittingSwitchButton extends UserInterfase {
  constructor(callback) {
    super('isEditing');
    this.selfElement.addEventListener('change', ()=>{callback(this.selfElement.checked)});
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
    console.log('import', this.selfElement.files);
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
    console.log('export');
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
  HELP表示
  TODO: ヘルプ内容を
---------------------------------------------------------------------------- */
class HelpButton extends ButtonUI {
  constructor(callback) {
    super('help', callback);
  }
}
/* -------------------------------------------------------------------------
  ウィンド又はタブページを閉じる
---------------------------------------------------------------------------- */
class CloseButton extends ButtonUI {
  constructor(callback) {
    super('close', callback);
  }
}