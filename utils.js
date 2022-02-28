var deviceWidth = 1920;
var deviceHeight = 1080;

function clickCenter() {
  click(deviceWidth / 2, deviceHeight / 2);
}

function waitForImage(img, interval, maxRetry, options) {
  if (!interval) interval = 1000;
  if (!maxRetry) maxRetry = 99;
  if (!options) options = { threshold: 0.7 };
  for (var count = 1; count <= maxRetry; count++) {
    var p = findImage(captureScreen(), img, options);
    if (p) return p;
    sleep(interval);
  }
  return null;
}

function waitForImages(images, interval, maxRetry, options) {
  if (!interval) interval = 1000;
  if (!maxRetry) maxRetry = 99;
  if (!options) options = { threshold: 0.7 };
  for (var count = 1; count <= maxRetry; count++) {
    var screenshot = captureScreen();
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      var p = findImage(screenshot, img, options);
      if (p) return p;
    }
    sleep(interval);
  }
  return null;
}

module.exports = {
  clickCenter: clickCenter,
  deviceWidth: deviceWidth,
  deviceHeight: deviceHeight,
  waitForImage: waitForImage,
  waitForImages: waitForImages,
};
