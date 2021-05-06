/* 定数を定義
---------------------------------------------------------------------------- */
DEFAULT_IS_EDITTING = true;
DEFAULT_EXPORT_FILE_TYPE_IS_TEXT = false;

/* DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // 編集可否を切り替え
  const edittingSwitch = new EdittingSwitch(DEFAULT_IS_EDITTING);
  // 
  const autoLoad = new AutoSessionLoad();
  const autoSave = new AutoSessionSave();
  const reset = new Reset();
  const close = new Close();
  const fileImport = new Import();
  const fileExport = new Export();
  const help = new Help();

},false);

/* EdittingSwitch
 入力領域の編集可否を切り替えする
---------------------------------------------------------------------------- */
class EdittingSwitch{
  constructor(flg) {
    this.inputFields = document.querySelectorAll('.input-field');
    this.isEditing = document.getElementById('isEditing');
    this.isEditing.addEventListener('change', ()=>{this.switch()}); // アロー関数内にメソッドをラップして、コールバック引数へ渡す理由としてはthisをこのクラスにするため
    console.log(this.isEditing);
    this.init(flg);
  }
  /* 初期化
  ------------------------------------------------------ */
  init(flg){
    // 起動時に編集可能状態にする
    if (flg) {
      this.isEditing.checked = true;
      console.log(this.isEditing);
      this.inputFields.forEach(elem=>{
        elem.contentEditable = true;
      });
      document.querySelector('.input-field[autofocus]').focus();
    }
  }
  /* 編集可否を切り替える
  ------------------------------------------------------ */
  switch(){
    console.log('switch()', this);
    if(this.isEditing.checked) {
      this.inputFields.forEach(elem=>{
        elem.contentEditable = true;
      });
    } else {
      this.inputFields.forEach(elem=>{
        elem.contentEditable = false;
      });
    }
  }
}
/* AutoSave
 各入力領域の内容を自動保存する
---------------------------------------------------------------------------- */
class AutoSessionSave{
  constructor(){
    this.inputFields = document.querySelectorAll('.input-field');
    this.inputFields.forEach(inputField=>{
      // 入力した時に保存する
      // TODO:場合によっては'change'や'keyup'を検討する
      inputField.addEventListener('input', ()=>{this.save()});
    });
  }
  save(){
    if(document.activeElement.id) {
      console.log('hage');
      sessionStorage.setItem(document.activeElement.id, document.activeElement.innerText);
    } 
  }
}
/* AutoLoad
 各入力領域の内容を自動読み込みする
---------------------------------------------------------------------------- */
class AutoSessionLoad{
  constructor(){
    this.inputFields = document.querySelectorAll('.input-field');
    this.load();
  }
  load(){
    this.inputFields.forEach(inputField=>{
      if(sessionStorage.getItem(inputField.id)) { // IDと一致するキーが存在した場合に値を読み込む
        inputField.innerText = sessionStorage.getItem(inputField.id);
      }
    });
  }
}
/* Reset
 各入力領域の内容を全てリセットする
---------------------------------------------------------------------------- */
class Reset {
  constructor() {
    this.inputFields = document.querySelectorAll('.input-field');
    this.resetButton = document.getElementById('reset');
    this.resetButton.addEventListener('click', ()=>{this.reset()});
    console.log(sessionStorage.length);
  }
  reset(){
    if(window.confirm('入力内容全てを消去します。よろしいですか？')){
      this.inputFields.forEach(inputField=>{
        inputField.innerText = '';
      });
      sessionStorage.clear();
    }
  }
}
/* Close
 ページを閉じます
---------------------------------------------------------------------------- */
class Close{
  constructor() {
    this.closeButton = document.getElementById('close');
    this.closeButton.addEventListener('click', ()=>{this.close()});
  }
  close(){
    // TODO: 入力内容がファイル保存した内容と変化した場合に伺うようにする。
    if(window.confirm('ページを閉じます。入力内容は破棄されます。よろしいですか？')){
      sessionStorage.clear();
      window.close();
    }
  }
}
/* Import
 JSONファイルを読み取って編集内容を反映します。
---------------------------------------------------------------------------- */
class Import {
  constructor(){
    this.inputFields = document.querySelectorAll('.input-field');
    this.importButton = document.getElementById('import');
    this.importButton.addEventListener('change', (event)=>{this.import(event)});
  }
  import(event){
    console.log('import', this.importButton.files);
    // 選択したファイルを読み込んで、その内容を各入力欄へ反映する
    const file = this.importButton.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    // 読み込み成功の時
    reader.addEventListener('load',()=>{
      // console.log(reader.result);
      // console.log(JSON.parse(reader.result));
      const readJson = JSON.parse(reader.result);

      for (let key in readJson) {
        // console.log(key, readJson[key]);
        sessionStorage.setItem(key, readJson[key]);
      }
      this.inputFields.forEach((inputField)=>{
        const value = sessionStorage.getItem(inputField.id);
        if(value) {
          inputField.innerText = value;
        }
      });
    });
    // 読み込み失敗の時
    reader.addEventListener('error', ()=>{
      console.log(reader.error);
    });
  }
}
/* Export
 JSONファイルに編集内容を保存します。
---------------------------------------------------------------------------- */
class Export {
  constructor(){
    this.inputFields = document.querySelectorAll('.input-field');
    this.exportButton = document.getElementById('export');
    this.exportButton.addEventListener('click', ()=>{this.export()});
  }
  export(){
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

    const jsonStr = JSON.stringify(list);
    const blob = DEFAULT_EXPORT_FILE_TYPE_IS_TEXT
      ? new Blob([jsonStr],{type: 'text/plain'}) // utf-8テキスト
      : new Blob([jsonStr],{type: 'application/json'}); // json
      // : new Blob([jsonStr],{type: 'application/octet-stream'}); // 任意のバイナリー
    const link = document.createElement('a');
    link.download = 'resume.json';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
/* Help
 ヘルプ表示します。
---------------------------------------------------------------------------- */
class Help {
  constructor(){
    this.helpButton = document.getElementById('help');
    this.helpButton.addEventListener('click', ()=>{this.help()});
  }
  help(){
    console.log('help');
  }
}
