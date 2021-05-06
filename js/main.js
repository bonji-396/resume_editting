/* 定数を定義
---------------------------------------------------------------------------- */
DEFAULT_IS_EDITTING = true;

/* DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // 編集可否を切り替え
  const edittingSwitch = new EdittingSwitch(DEFAULT_IS_EDITTING);
  // 
  // const reseButton = 
  const autoLoad = new AutoSessionLoad();
  const autoSave = new AutoSessionSave();
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
    this.inputFields.forEach(inputField=>{
      inputField.innerText = this.load(inputField.id);
    });
  }
  load(id){
    return sessionStorage.getItem(id);
  }
}