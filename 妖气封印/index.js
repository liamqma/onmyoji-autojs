if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

var utils = require("../utils");
var clickCenter = utils.clickCenter;
var waitForImages = utils.waitForImages;
var waitForImage = utils.waitForImage;

var imgBaoXiang = images.read("../宝箱.jpeg");
var imgFailure = images.read("../失败.jpeg");
var imgPrepare = images.read("../准备.jpeg");

while (true) {
  toastLog("组队");
  click(560, 988);
  sleep(2000);

  toastLog("自动匹配");
  click(1189, 954);
  sleep(2000);

  if (!waitForImage(imgPrepare, 2000, 999)) {
    toastLog("没找到准备按钮");
    exit();
  }

  click(1758, 880);
  toastLog("开始战斗");

  if (!waitForImages([imgBaoXiang, imgFailure], 1000, 300)) {
    toastLog("没找到结束画面");
    exit();
  }

  sleep(5000);
  clickCenter();
  sleep(5000);
}
