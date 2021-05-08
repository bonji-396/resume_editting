/* DOM解析終了イベント時の処理を定義
---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // 履歴書編集オブジェクトの生成
  const resumeEditor = new ResumeEditor();
  

},false);

/* 履歴書編集
---------------------------------------------------------------------------- */
class ResumeEditor {
  constructor() {
    /* -------------------------------------------------
     定数を定義
    ---------------------------------------------------- */
    this.DEFAULT_IS_EDITTING = true;
    this.DEFAULT_EXPORT_FILE_TYPE_IS_TEXT = false;
    
    /* UI
     - InputFields
     - IdPhoto
     - EdittingSwitchButton
     - ResethButton
     - PrintButton
     - ImportButton
     - ExportButton
     - HelpButton
     - CloseButton
     */
    /*
    Function
    - autoSave
    - autoLoad
    - save
    - load
    - changeView
    */


    /* -------------------------------------------------
     表示部を定義
    ---------------------------------------------------- */
    // 履歴書の入力要素全てを格納した配列
      // 起動リロード時に、sessionStorage自動読み込み
      // sessionStorageの自動書き込み

    // 顔写真
      // 起動リロード時に自動読み込み
      // 顔写真を追加・変更
      // 顔写真を削除
    
    /* -------------------------------------------------
     機能を定義
    ---------------------------------------------------- */
    // 編集可否を切り替え
    // 編集内容のリセットlo
    // print
    // JSONファイルのインポート
    // JSONファイルへエクスポート
    // ヘルプ
    // ウィンドウ（ブラウザタブ）を閉じる 
    // 改行抑止
    // document.execCommand("defaultParagraphSeparator", false, "div");
  }
}
class UserInterfase {
  constructor(element) {
    this.selfElement = element; 
  }
}
class InputFields extends UserInterfase {
  constructor() {
    super(document.querySelectorAll('.input-field'));
  }
}
