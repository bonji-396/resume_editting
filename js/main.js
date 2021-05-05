DEFAULT_IS_EDITTING = true;

/* DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const edittingSwitch = new EdittingSwitch(DEFAULT_IS_EDITTING);

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