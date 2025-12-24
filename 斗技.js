var utils = require("./utils");
var clickCenter = utils.clickCenter;

while (true) {
  toastLog("战");
  click(2099, 911);
  sleep(15000);
  toastLog("退出");
  click(173, 50);
  sleep(2000);
  toastLog("确认");
  click(1320, 630);
  sleep(5000);
  clickCenter();
  sleep(7000);
}
