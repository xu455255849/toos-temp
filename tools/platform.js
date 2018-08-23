/**
 * 判断是否是微信环境
 * @returns {boolean}
 */
function isWeixn () {
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}
