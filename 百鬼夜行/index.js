if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

var utils = require("../utils");
var waitForImages = utils.waitForImages;
var deviceWidth = utils.deviceWidth;
var deviceHeight = utils.deviceHeight;
var createArray = utils.createArray;

var number = dialogs.select("一共几次", createArray(99)) + 1;

var imgShare = images.read("分享.jpeg");
var imgEnter = images.read("进入.jpeg");

for (var index = 1; index <= number; index++) {
  toastLog("邀请好友");
  // click(466, 900);
  // sleep(2000);

  // click(920, 391);
  // sleep(2000);

  toastLog("进入");
  click(1875, 903);
  sleep(5000);

  toastLog("选人");
  click(deviceWidth / 2, 675);
  sleep(5000);
  toastLog("开始");
  click(2048, 909);
  sleep(6000);

  while (!waitForImages([imgShare, imgEnter], 100, 1)) {
    click(deviceWidth / 2, 690);
    sleep(1000);
  }

  click(deviceWidth / 2, deviceHeight - 50);
  sleep(2000);
}
