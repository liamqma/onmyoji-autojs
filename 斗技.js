var utils = require("./utils");
var clickCenter = utils.clickCenter;

while (true) {
  toastLog("战");
  click(1789, 948);
  sleep(10000);
  toastLog("退出");
  click(78, 67);
  sleep(1000);
  toastLog("确认");
  click(1139, 641);
  sleep(3000);
  clickCenter();
  sleep(5000);
}
