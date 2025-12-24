if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}
var utils = require("../utils");
var clickCenter = utils.clickCenter;
var waitForImage = utils.waitForImage;
var waitForImages = utils.waitForImages;
var createArray = utils.createArray;

var tileNumber = dialogs.select("哪格开始", createArray(9)) + 1;
var number = dialogs.select("一共几次", createArray(30)) + 1;

var startPointX = 268;
var startPointY = 220;

var tileWidth = 585;
var tileHeight = 184;

var gapWidth = 22;
var gapHeight = 22;

var imgAttack = images.read("进攻.jpeg");
var imgBaoXiang = images.read("../宝箱.jpeg");
var imgFailure = images.read("../失败.jpeg");
var imgRefresh = images.read("刷新.jpeg");

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
  click(1785, 900);
  sleep(2000);
  toastLog("确认");
  click(1351, 640);
  sleep(5000);
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
  click(2145, 880);
  toastLog("开始战斗");

  var response = waitForImages([imgBaoXiang, imgFailure], 200, 2000);

  if (!response) {
    toastLog("没找到结束画面");
    exit();
  }

  if (response.i === 1) {
    number = number + 1;
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
  if (tileNumber === 9) {
    if (waitForImage(imgRefresh)) {
      refresh();
      tileNumber = 1;
    } else {
      exit();
    }
  } else {
    tileNumber++;
  }
}
