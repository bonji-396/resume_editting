/* DOM解析終了イベント時の処理を定義
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
    this.resetButton = new ResetButton();
    this.printButton = new PrintButton();
    this.importButton = new ImportButton();
    this.exportButton = new ExportButton();
    this.helpButton = new HelpButton();
    this.closeButton = new CloseButton();
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
}
class UserInterfase {
  constructor(element) {
    this.selfElement = element; 
  }
}
class ChangeUI extends UserInterfase {
  constructor(element){
    super(element);
  }
  autoSave() {

  }
  autoLoad() {

  }
  save() {

  }
  load() {

  }
  changeUI() {

  }
}
/* -------------------------------------------------------------------------
 入力編集領域UI（InputFields） 
---------------------------------------------------------------------------- */
class InputFields extends UserInterfase {
  constructor() {
    super(document.querySelectorAll('.input-field'));
    this.selfElement.forEach(inputField=>{
      inputField.addEventListener('input', (event)=>{this.autoSave(event)});
    });
    this.makeItUnEditable();
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
   入力編集領域の自動保存 
  ------------------------------------------------------ */
  autoSave(event) {
    console.log(event.target);
    sessionStorage.setItem(event.target.id, event.target.innerText);
    // フォーカスが当たっている要素を取得する場合
    // if(document.activeElement.id) {
    //   sessionStorage.setItem(document.activeElement.id, document.activeElement.innerText);
    // }
  }

}
/* -------------------------------------------------------------------------
 顔写真UI（IDPhoto） 
---------------------------------------------------------------------------- */
class IDPhoto extends UserInterfase {
  constructor() {
    super(document.getElementById('id-photo'));
    this.idPhotoImage = document.getElementById('photo-image');
    this.toDisable();
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

}

/* -------------------------------------------------------------------------
 編集可否変更ボタンUI（EdittingSwitchButton） CallBack
---------------------------------------------------------------------------- */
class EdittingSwitchButton extends UserInterfase {
  constructor(callback) {
    super(document.getElementById('isEditing'));
    this.selfElement.addEventListener('change', ()=>{callback(this.selfElement.checked)});
  }
}
class ResetButton extends UserInterfase {
  constructor() {
    super(document.getElementById('reset'));
  }
}
class PrintButton extends UserInterfase {
  constructor() {
    super(document.getElementById('print'));
  }
}
class ImportButton extends UserInterfase {
  constructor() {
    super(document.getElementById('import'));
  }
}
class ExportButton extends UserInterfase {
  constructor() {
    super(document.getElementById('export'));
  }
}
class HelpButton extends UserInterfase {
  constructor() {
    super(document.getElementById('help'));
  }
}
class CloseButton extends UserInterfase {
  constructor() {
    super(document.getElementById('close'));
  }
}