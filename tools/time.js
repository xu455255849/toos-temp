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
  
  console.log(format1(new Date(), 'yy-M-d h:m:s'))