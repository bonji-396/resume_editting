/* DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const allContenteditables = document.querySelectorAll('[contenteditable="true"]');
  console.log(allContenteditables);


},false);