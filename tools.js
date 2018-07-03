/**
 * 时间戳转成日期
 * @param timestamp
 * @returns {string}
 */
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m;
}


/**
 * 获取url参数
 * @param name
 * @returns {*}
 */
function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}

/**
 * 32位随机字符串生成
 * @returns {string}
 */
function getNum() {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var nums = "";

    for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61);
        nums += chars[id];
    }

    return nums;
}

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


/**
 * 评论时间函数
 * @param time
 * @returns {*}
 */
function toShowTime(time) {
    var date = new Date(parseInt(time) * 1000);
    var year = date.getFullYear();
    var month = parseInt(date.getMonth()) + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var curYear = new Date().getFullYear();
    var curMonth = parseInt(new Date().getMonth()) + 1;
    var curDay = new Date().getDate();
    var today = new Date((parseInt(time) + 86400) * 1000);
    var todayDay = today.getDate();
    var renderHtml = '';

    if (curYear == year) {
        if (month == curMonth) {
            if (day == curDay) {
                if (hour > 12) {
                    renderHtml = '下午 ' + (hour - 12) + ':';
                } else {
                    renderHtml = '上午 ' + hour + ':';
                }
            } else {
                if (todayDay == curDay) {
                    renderHtml = '昨天 ' + hour + ':';
                } else {
                    renderHtml = month + '月' + day + '日 ' + hour + ':';
                }
            }
        } else {
            renderHtml = month + '月' + day + '日 ' + hour + ':';
        }
    } else {
        renderHtml = year + '年 ' + month + '月' + day + '日 ' + hour + ':';
    }

    if (String(minute).length <= 1) {
        minute = '0' + minute;
    }

    return renderHtml + minute;
}

export {
    timestampToTime,
    getQuery,
    getNum,
    isWeixn,
    toShowTime
}
