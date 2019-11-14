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


var browser = {
  
  versions: function() {
    
    var u = navigator.userAgent;
    
    return {
      
      trident: u.indexOf('Trident') > -1, //IE内核
      
      presto: u.indexOf('Presto') > -1, //opera内核
      
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      
      gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
      
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否移动终端
      
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
      
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
      
      iPhone: u.indexOf('iPhone') > -1 , //iPhone
      
      iPad: u.indexOf('iPad') > -1, //iPad
      
      webApp: u.indexOf('Safari') > -1 //Safari
      
    };
    
  }
  
}



if (browser.versions.mobile() || browser.versions.ios() || browser.versions.android() || browser.versions.iPhone() || browser.versions.iPad()) {
  
  alert('移动端');
  
}



//运行环境是浏览器
let inBrowser = typeof window !== 'undefined';
//运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
//浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase();
let isIE = UA && /msie|trident/.test(UA);
let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
let isEdge = UA && UA.indexOf('edge/') > 0;
let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

/**
 * 获取当前设备经纬度信息
 */
function getGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const crd = pos.coords;
                localStorage.setItem('longitude', crd.longitude);
                localStorage.setItem('latitude', crd.latitude);
            },
            err => {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            }
        );
    }
}

function  getOsVersion() {
    const ua = navigator.userAgent;
    const winMap = new Map();
    winMap.set('Windows NT 10.0', 'Win 10');
    winMap.set('Windows NT 6.3', 'Win 2012');
    winMap.set('Windows NT 6.2', 'Win 8');
    winMap.set('Windows NT 6.1', 'Win 7');
    winMap.set('Windows NT 6.0', 'Win Vista');
    winMap.set('Windows NT 5.2', 'Win 2003');
    winMap.set('Windows NT 5.1', 'Win XP');
    winMap.set('Windows NT 5.0', 'Win 2000');
    
    let os = '其他';
    if (navigator.platform.indexOf('Mac') > -1) return 'Mac';
    if (navigator.platform.indexOf('Win') > -1) {
        winMap.forEach( (val, key) => {
            if (ua.indexOf(key) > -1) os = val
        })
    }
    return os
}
