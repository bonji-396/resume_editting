DEFAULT_IS_EDITTING = true;

/* DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* 入力領域の編集可否を切り替えする
  ------------------------------------------------------ */
  const inputFields = document.querySelectorAll('.input-field');
  const isEditing = document.getElementById('isEditing');  
  isEditing.addEventListener('change',()=>{
    if (isEditing.checked) {
      inputFields.forEach(elem=>{
        // elem.setAttribute('contenteditable', 'true');
        elem.contentEditable = true;
      });
    } else {
      inputFields.forEach(elem=>{
        // elem.removeAttribute('contenteditable');
        // elem.setAttribute('contenteditable', 'false');
        elem.contentEditable = false;
      });
    }
  });
  // 起動時に編集可能状態にする
  if (DEFAULT_IS_EDITTING) {
    isEditing.checked = true;
    inputFields.forEach(elem=>{
      elem.contentEditable = true;
    });
    document.querySelector('.input-field[autofocus]').focus();
  }
},false);