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
 * 随机数字
 */
function sixNumber() {
  // 方法1
  Math.random().toString().slice(-6);
  // 方法2
  Math.random().toFixed(6).slice(-6);
}

/**
 * 随机颜色
 * @returns {string}
 */
function randomColor() {
  return '#' + ('00000' + (Math.random()* 0x1000000 << 0).toString(16)).slice(-6);
}


var url = 'http://www.baidu.com?a=1&b=2'



console.log(query(url))