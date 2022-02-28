if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

function createArray(max) {
  var array = [];
  for (var index = 1; index <= max; index++) {
    array.push(index);
  }
  return array;
}

var tileNumber = dialogs.select("哪格开始", createArray(9)) + 1;
var number = dialogs.select("一共几次", createArray(30)) + 1;

var utils = require("../utils");
var clickCenter = utils.clickCenter;
var waitForImages = utils.waitForImages;
var waitForImage = utils.waitForImage;

var startPointX = 220;
var startPointY = 220;

var tileWidth = 480;
var tileHeight = 184;

var gapWidth = 18;
var gapHeight = 22;

var imgAttack = images.read("进攻.jpeg");
var imgBaoXiang = images.read("../宝箱.jpeg");
var imgFailure = images.read("../失败.jpeg");
var imgZeroSuccess = images.read("零攻破记录.jpeg");

var imgAttackWidth = 190;
var imgAttackHeight = 84;

function clickTile(number) {
  switch (number) {
    case 1:
      click(startPointX + tileWidth * 0.5, startPointY + tileHeight * 0.5);
      break;
    case 2:
      click(
        startPointX + tileWidth * 1.5 + gapWidth,
        startPointY + tileHeight * 0.5
      );
      break;
    case 3:
      click(
        startPointX + tileWidth * 2.5 + gapWidth * 2,
        startPointY + tileHeight * 0.5
      );
      break;
    case 4:
      click(
        startPointX + tileWidth * 0.5,
        startPointY + tileHeight * 1.5 + gapHeight
      );
      break;
    case 5:
      click(
        startPointX + tileWidth * 1.5 + gapWidth,
        startPointY + tileHeight * 1.5 + gapHeight
      );
      break;
    case 6:
      click(
        startPointX + tileWidth * 2.5 + gapWidth * 2,
        startPointY + tileHeight * 1.5 + gapHeight
      );
      break;
    case 7:
      click(
        startPointX + tileWidth * 0.5,
        startPointY + tileHeight * 2.5 + gapHeight
      );
      break;
    case 8:
      click(
        startPointX + tileWidth * 1.5 + gapWidth,
        startPointY + tileHeight * 2.5 + gapHeight
      );
      break;
    case 9:
      click(
        startPointX + tileWidth * 2.5 + gapWidth * 2,
        startPointY + tileHeight * 2.5 + gapHeight
      );
      break;
  }
}

function refresh() {
  sleep(2000);
  toastLog("刷新");
  click(1575, 900);
  sleep(2000);
  toastLog("确认");
  click(1150, 640);
  sleep(2000);
}

for (var finishedCount = 1; finishedCount <= number; finishedCount++) {
  clickTile(tileNumber);
  sleep(2000);
  var pAttack = findImage(captureScreen(), imgAttack, { threshold: 0.7 });
  if (!pAttack) {
    toastLog("没找进攻按钮");
    exit();
  }
  click(pAttack.x + imgAttackWidth / 2, pAttack.y + imgAttackHeight / 2);
  sleep(5000);
  click(1758, 880);
  toastLog("开始战斗");
  if (!waitForImages([imgBaoXiang, imgFailure])) {
    toastLog("没找到结束画面");
    exit();
  }
  sleep(5000);
  clickCenter();
  toastLog("战斗结束");
  sleep(5000);
  if (waitForImage(imgBaoXiang, 1000, 1)) {
    clickCenter();
    toastLog("确认奖励");
  }
  sleep(5000);
  toastLog("已完成第" + finishedCount + "/" + number);
  if (finishedCount === number) {
    exit();
  }
  if (tileNumber === 9 && !waitForImage(imgZeroSuccess, 1000, 1)) {
    refresh();
    tileNumber = 0;
  } else {
    tileNumber++;
  }
}
