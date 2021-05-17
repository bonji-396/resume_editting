/* 定数
---------------------------------------------------------------------------- */
TARGET_ID_NAME = 'visual-box';
DEVICE_IMAGE_FILE = 'deviceInfo.json';

/* ページロード後にDOM解析終了時の処理
---------------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', (event) => {

  const mockImages = new MockDevices({
    "targetIdName" : TARGET_ID_NAME,
    "DeviceImageFile" : DEVICE_IMAGE_FILE
  });
  mockImages.view();

},false);