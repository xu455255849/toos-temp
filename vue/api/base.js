import axios from 'axios'
import { STATUS_CODE } from './conf/base'

const mode = process.env.NODE_ENV === 'development' ? 'http://dashboard.yunxi.tv/' : ''

function ApiResult (statusCode, data, message) {
  this.statusCode = statusCode || -1
  this.data = data || {}
  this.message = message || ''
  this.succeed = function () {
    return this.statusCode === STATUS_CODE.SUCCEED
  }
  this.fail = function () {
    return this.statusCode !== STATUS_CODE.SUCCEED
  }
}

axios.defaults.baseURL = mode
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

function handleReponse (response) {
  let result = response
  if (typeof result === 'string') {
    try {
      result = JSON.parse(result)
    } catch (e) {
      return new ApiResult(STATUS_CODE.PARSE_JSON, {}, '解析数据出错，请稍后重试。')
    }
  }
  return new ApiResult(result.data.statusCode, result.data.data, result.data.message)
}

export async function get (apiName, params) {
  try {
    let response = await axios({
      method: 'get',
      url: apiName,
      params: params
    })
    return handleReponse(response)
  } catch (e) {
    let resp = e.response
    return new ApiResult(resp.status, e, resp.statusText)
  }
}

export async function post (apiName, data) {
  try {
    /*let formData = new FormData()
    for (let key in data) {
      formData.append(key, data[key])
    }*/
    let params = new URLSearchParams();
    for (let key in data) {
      params.append(key, data[key])
    }
    let response = await axios({
      method: 'post',
      url: apiName,
      data: params
    })
    return handleReponse(response)
  } catch (e) {
    let resp = e.response
    return new ApiResult(resp.status, e, resp.statusText)
  }
}
