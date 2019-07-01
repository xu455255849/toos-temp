/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {Promise}
 */
function getBlob(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    
    xhr.send();
  });
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');
    
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    
    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);
    
    link.click();
    body.removeChild(link);
    
    window.URL.revokeObjectURL(link.href);
  }
}

// 实例
getBlob(url).then(blob => {
  saveAs(blob, name)
})


function downloadFile(filename, data){
    let DownloadLink = document.createElement('a');
    
    if ( DownloadLink ){
        document.body.appendChild(DownloadLink);
        DownloadLink.style = 'display: none';
        DownloadLink.download = filename;
        DownloadLink.href = data;
        
        if ( document.createEvent ){
            let DownloadEvt = document.createEvent('MouseEvents');
            
            DownloadEvt.initEvent('click', true, false);
            DownloadLink.dispatchEvent(DownloadEvt);
        }
        else if ( document.createEventObject )
            DownloadLink.fireEvent('onclick');
        else if (typeof DownloadLink.onclick == 'function' )
            DownloadLink.onclick();
        
        document.body.removeChild(DownloadLink);
    }
}
