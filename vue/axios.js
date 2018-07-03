import axios from 'axios'
import { Message } from 'element-ui'

const mode = process.env.NODE_ENV === 'development'? '' : '';

let instance = axios.create({
    baseURL: mode,
    //timeout: 1000,
    headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
    transformRequest: [function (data, headers) {
        let formData = new FormData();
        //const params = new URLSearchParams();
        Object.keys(data).forEach(function(key){
            formData.append(key, data[key])
        });
        return formData;
    }]
});

instance.interceptors.request.use(function (config) {
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (res) {
    //console.log(res)
    if (res.data.statusCode !== 200) {
        Message.error(res.data.message);
    }
    return res
}, function (err) {
    switch (err.response.status) {
        case 400:
            Message.error('错误请求！请联系客服处理');
            break;
        case 404:
            Message.error('页面不存在！');
            break;
        case 500:
            Message.error('服务器出错，请联系客服处理！');
            break;
    }
});


export default instance
