/* -------------------------------------------------------------------------
 Author: Shuji Narumi
 Latest update date: 2021/5/18
---------------------------------------------------------------------------- */
/* MockDevices
TODO: フルードイメージをheight対応する
---------------------------------------------------------------------------- */
class MockDevices {
  constructor(parameters) {
    this.url = parameters.deviceImageFile;
    this.targetElement = document.getElementById(parameters.targetIdName);
    this.devices = [];
  }
  /* デバイスイメージ生成し表示する */
  view() {
    // デバイス情報のダウンロード
    this.download((deviesJson)=>{
      // デバイス情報を元に、Deviceインスタンスを生成
      this.createDevices(deviesJson);
      // 各img要素をターゲットの表示領域に追加する(一旦、表示する)
      this.imageElementAppendToTargetElement();

      // 最初の画像が読み終わる時の処理（実寸幅を取得する）
      // ※ 画像ロードされていないのに実寸幅を取得する場合0となる為
      this.devices[0].deviceImageElement.onload = () => {
        // 各画像のサイズと表示位置を調整する
        this.adjustTheSizeAndPositionOfTheImages();        
      };

      /* ブラウザのリサイズ時のイベントリスナを設定
      */
      window.addEventListener('resize', ()=>{
        // 各画像のサイズと表示位置を調整する
        this.adjustTheSizeAndPositionOfTheImages();
      });
    });
  }
  /* デバイス情報のダウンロード
   */
  download(callback){
    fetch(this.url)
    // レスポンス処理
    .then(response => {
      if (response.ok) {
        return response.json(); //json型に変換
      } else {
        return Promise.reject(new Error('ダウンロードエラーだよ！'));
      }
    })
    // 取得データ処理
    .then(json => {
      callback(json.devies);
    })
    // エラー処理
    .catch(e => {
      console.log(e);
    });
  }
  /* デバイス情報を元に、Deviceインスタンスを生成 */
  createDevices(deviesJson){
    for (const deviceInfo of deviesJson) {
      this.devices.push(new Device(deviceInfo));
    }
    // 各img要素の重なり順（z-index）を指定
    for (const i in this.devices) {
      const n = i * 20;
      this.devices[i].zIndex = n;　// setterで処理
      this.devices[i].zIndex = n + 10;
    }
  }
  /* 各img要素をターゲットの表示領域に追加する */
  imageElementAppendToTargetElement(){
      // 画像を表示する
      const flag = document.createDocumentFragment();
      // 各デバイスの画像を指定要素に表示する
      for (const device of this.devices) {
        flag.appendChild(device.deviceImageSet);
      }
      // this.targetElement.innerHTML = '';
      this.targetElement.appendChild(flag);

  }
  /* 表示された各画像のサイズと表示位置を調整する */
  adjustTheSizeAndPositionOfTheImages(){
    // .device要素の表示幅を取得（imgはフルードのため親要素を参照）
    const width = window.getComputedStyle(this.targetElement).getPropertyValue('width') || this.devices[0].deviceImageElement.width ;
    console.log(window.getComputedStyle(this.targetElement).getPropertyValue('width'));
    // 実寸幅取得
    const naturalWidth = this.devices[0].deviceImageElement.naturalWidth;
    const naturalHeight = this.devices[0].deviceImageElement.naturalHeight;

    // 横表示比率
    const displayWidthRatio = parseInt(width) / naturalWidth; // ゼロ Infinity
    console.log('displayWidthRatio:', displayWidthRatio, 'parseInt(width)', parseInt(width), '/ naturalWidth', naturalWidth);
    // スクリーン画像位置・縮尺の補正値(px)
    const correctionValue = 1;

    // position: absolute; 指定画像の次に来る要素が入り込む為、親要素に高さを入れる。
    this.targetElement.style.height = displayWidthRatio * naturalHeight + 'px';
    
    // 縦横表示比率を基にして、各画像のポジション算出し指定する
    for (const device of this.devices) {
      device.screenDisplayAdjustment(displayWidthRatio, correctionValue);
    }
  }
}
/* Device
---------------------------------------------------------------------------- */
class Device {
  constructor(deviceInfo) {
    this.deviceInfo = deviceInfo;
    
    this.deviceImageElement = document.createElement('img');
    this.deviceImageElement.src = deviceInfo.imgPath + deviceInfo.deviceImageFileName;
    this.deviceImageElement.alt = deviceInfo.deviceName;
    this.deviceImageElement.style.maxWidth = '100%';
    this.deviceImageElement.style.maxHeight = '100%';

    this.screenImageElement = document.createElement('img');
    this.screenImageElement.src = this.deviceInfo.imgPath + this.deviceInfo.screenImageFileName;
    this.screenImageElement.alt = this.deviceInfo.deviceName + ' Screen';
    this.screenImageElement.style.maxWidth = '100%';
    this.screenImageElement.style.maxHeight = '100%';

    this.deviceImageSet = document.createElement('div');
    this.deviceImageSet.className = 'device';
    this.deviceImageSet.style.position = 'absolute';
    ///////////// FIX
    // this.deviceImageSet.style.maxWidth = '100%'; // 縦フルード対応
    // this.deviceImageSet.style.maxHeight = '100%';// 縦フルード対応

    this.deviceImageSet.appendChild(this.deviceImageElement);
    this.deviceImageSet.appendChild(this.screenImageElement);
  }
  /* 各img要素の重なり順（z-index）を指定 */
  set zIndex(value) {
    this.deviceImageElement.style.zIndex = value + 10;
    this.screenImageElement.style.zIndex = value;
  }
  /* 各img要素の重なり順（z-index）を取得 */
  get zIndex() {
    return {
      "device" : this.deviceImageElement.style.zIndex,
      "screen" : this.screenImageElement.style.zIndex
    };
  }
  /* 表示調整 */
  screenDisplayAdjustment(displayWidthRatio, correctionValue) {
    // 画像のサイズ調整
    this.scaleAdjustment(displayWidthRatio, correctionValue);
    // 画像の位置調整
    this.positioning(displayWidthRatio, correctionValue);
  }
  //　TODO ↓ 縦比率のフルードに対応していない
  //（※　基画像から縦横比率を算出して、比率の縦横の短い方を基準にサイズを決定するべき）
  /* 画像のサイズ調整 */
  scaleAdjustment(displayWidthRatio, correctionValue) {
    console.log(displayWidthRatio, correctionValue);
    // 横表示比率を基にして、各画像の表示サイズを算出して指定する
    this.deviceImageSet.style.width =
      displayWidthRatio * this.deviceInfo.expansionRate * 
      this.deviceImageElement.naturalWidth + 'px';
    this.deviceImageSet.style.height =
      displayWidthRatio * this.deviceInfo.expansionRate * 
      this.deviceImageElement.naturalHeight + 'px';
    this.screenImageElement.style.width =
      displayWidthRatio * this.deviceInfo.expansionRate *
        (this.deviceInfo.naturalScreenCoordinates.XEnd -
          this.deviceInfo.naturalScreenCoordinates.XStart) + correctionValue + 'px';
    this.screenImageElement.style.height =
      displayWidthRatio * this.deviceInfo.expansionRate *
        (this.deviceInfo.naturalScreenCoordinates.YEnd -
          this.deviceInfo.naturalScreenCoordinates.YStart) + correctionValue + 'px';
    console.log(this.deviceImageSet.style.width, this.deviceImageSet.style.height,
       this.screenImageElement.style.width, this.screenImageElement.style.height);
  }
  /* 画像の位置調整 */
  positioning(displayWidthRatio, correctionValue) {
    // デバイス画像セットのポジションの指定     
    this.deviceImageSet.style.top =
      displayWidthRatio * this.deviceInfo.naturalAbsolutePosition.y + 'px';
    this.deviceImageSet.style.right =
      displayWidthRatio * this.deviceInfo.naturalAbsolutePosition.x + 'px';
   
    // デバイス画像のポジションを指定
    this.deviceImageElement.style.position = 'absolute';
    this.deviceImageElement.style.top = 0;
    this.deviceImageElement.style.bottom = 0;
    this.deviceImageElement.style.left = 0;
    this.deviceImageElement.style.right = 0;
   
    // スクリーン画像のポジションを指定
    this.screenImageElement.style.position = 'absolute';
    this.screenImageElement.style.top =
      displayWidthRatio * this.deviceInfo.expansionRate *
        this.deviceInfo.naturalScreenCoordinates.YStart - correctionValue +'px';
    this.screenImageElement.style.left =
      displayWidthRatio * this.deviceInfo.expansionRate *
      this.deviceInfo.naturalScreenCoordinates.XStart - correctionValue +'px';
  }  
}