/**
 * 特殊字符转译
 * @param str
 * @returns {string}
 */
function htmlspecialchars (str) {
  var str = str.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '&quot;');
  return str;
}
var html = '<p>qweqw qweqweqw</p>'
console.log(htmlspecialchars(html))

/**
 * 过滤对象空值
 * @param data
 * @returns {*}
 */
function filterParams (data) {
  for (let key in data) {
    if (data[key] === '') {
      delete data[key]
    }
  }
  return data
}