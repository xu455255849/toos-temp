/**
 * 获取url参数
 * @param name
 * @returns {*}
 */

const query = (search = '') => ((querystring = '') => (q => (querystring.split('&').forEach(item => (kv => kv[0] && (q[kv[0]] = kv[1]))(item.split('='))), q))({}))(search.split('?')[1]);


function GetUrlParam(){
    let url = document.location.toString();
    let arrObj = url.split("?");
    let params = Object.create(null)
    if (arrObj.length > 1){
        arrObj = arrObj[1].split("&");
        arrObj.forEach(item=>{
            item = item.split("=");
            params[item[0]] = item[1]
        })
    }
    return params;
}
