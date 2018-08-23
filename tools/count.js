/**
 * 统计文字个数
 * @param data
 * @returns {number}
 */
function wordCount(data) {
  var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  var m = data.match(pattern);
  var count = 0;
  if ( m === null) return count;
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

/**
 * 统计字符串相同字符出现次数
 * @param str
 */
function sameCount(str) {
  var info = str.split('').reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});
}



console.log("★★★★★☆☆☆☆☆".slice(5 - 5, 10 - 5) )