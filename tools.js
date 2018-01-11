
exports.pausecomp = function pausecomp(millis) // The ultimate stop for a few millis script.
{
  millis = millis + 2000 * Math.random();
  var date = new Date();
  var curDate = null;

  do {
    curDate = new Date();
  } while (curDate - date < millis);
}
