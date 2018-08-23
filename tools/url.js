/**
 * 获取url参数
 * @param name
 * @returns {*}
 */
function getQueryString(key){
  var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
  var  r = window.location.search.substr(1).match(reg);
  if (r!= null) {
    return unescape(r[2]);
  }
  return null;
}

const query = (search = '') => ((querystring = '') => (q => (querystring.split('&').forEach(item => (kv => kv[0] && (q[kv[0]] = kv[1]))(item.split('='))), q))({}))(search.split('?')[1]);
