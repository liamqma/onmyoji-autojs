if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

var number = Math.ceil(parseInt(rawInput("请输入体力")) / 3);

var utils = require("../utils");
var clickCenter = utils.clickCenter;
var waitForImage = utils.waitForImage;
var waitForImages = utils.waitForImages;

var imgFight = images.read("./fight.jpeg");
var imgBaoXiang = images.read("../宝箱.jpeg");
var imgFailure = images.read("../失败.jpeg");

var imgFightWidth = 103;
var imgFightHeight = 86;

for (var index = 1; index <= number; index++) {
  toastLog("探索");
  click(1422, 813);
  sleep(3000);

  var p = waitForImage(imgFight);

  console.log(p);

  if (!p) {
    toastLog("没找到怪物");
    exit();
  }

  click(p.x + imgFightWidth / 2, p.y + imgFightHeight / 2);
  toastLog("开始战斗");

  if (!waitForImages([imgBaoXiang, imgFailure])) {
    toastLog("没找到结束画面");
    exit();
  }

  sleep(5000);
  clickCenter();
  toastLog("战斗结束");
  sleep(5000);

  toastLog("退出");
  click(105, 130);
  sleep(2000);
  click(1173, 609);
  sleep(3000);
}
