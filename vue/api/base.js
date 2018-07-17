import axios from 'axios'
import { STATUS_CODE } from "./conf/base";

const mode = process.env.NODE_ENV === 'development'? 'http://dashboard.test.yunpaishe.com' : '';

function ApiResult(statusCode, data, message) {
    this.statusCode = statusCode || -1
    this.data = data || {}
    this.message = message || ""
    
    this.succeed = function() {
        return this.statusCode == STATUS_CODE.SUCCEED
    }
    
    this.fail = function() {
        return this.statusCode != STATUS_CODE.SUCCEED
    }
}

axios.defaults.baseURL = mode;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

function handleReponse(response) {
    var result = response;
    if(typeof result == "string") {
        try {
            result = JSON.parse(result)
        } catch(e) {
            return new ApiResult(STATUS_CODE.PARSE_JSON, {}, "解析数据出错，请稍后重试。");
        }
    }
    return new ApiResult(result.data.statusCode, result.data.data, result.data.message);
}

export async function get(apiName, params) {
    try {
        var response = await axios({
            method: 'get',
            url: apiName,
            params: params
        })
        return handleReponse(response)
    } catch(e) {
        var resp = e.response
        if(resp) {
            new ApiResult(resp.status, e, resp.statusText);
        }
        return new ApiResult(-1, e, "请求失败，请稍后重试。");
    }
}

export async function post(apiName, data) {
    try {
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        var response = await axios({
            method: 'post',
            url: apiName,
            data: formData
        })
        return handleReponse(response)
    } catch(e) {
        var resp = e.response
        if(resp) {
            new ApiResult(resp.status, e, resp.statusText);
        }
        return new ApiResult(-1, e, "请求失败，请稍后重试。");
    }
}

