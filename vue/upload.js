import axios from 'axios'
const mode = process.env.NODE_ENV === 'development'? '' : '';

async function uploadQiniu(file) {
  let formData = new FormData();
  let res = await axios({
    method: 'get',
    url: mode + '/token/image'
  });
  formData.append('token', res.data.uptoken);
  formData.append('file', file);

  return axios({
    method: 'post',
    url: 'http://upload.qiniu.com/',
    headers: {'Content-Type' : 'multipart/form-data'},
    data: formData
  })
}

async function uploadImg(key) {
  let formData = new FormData();
  formData.append('link', link);
  return await axios({
    method: 'post',
    url: '/business/image/execute',
    baseURL: mode,
    headers: {'Content-Type' : 'multipart/form-data'},
    data: formData
  });
}

export  {
  uploadQiniu,
  uploadImg
}
