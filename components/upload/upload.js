
import axios from 'vue/axios'
import { Emitter } from '../emitter/emitter'


export class Uploader extends Emitter {
  constructor(options) {
    /**
     * * 继承外部属性
     * @param {Object} options
     * @param {Array} options.file  上传的文件blob对象
     * @param {name} options.name   文件名
     * @param {name} options.headers  请求头
     * @param {name} options.data   附带参数
     * @param {name} options.withCredentials   是否携带cookie
     * @param {name} options.url   请求地址 ，默认七牛
     */
    super(options)
    this.name = options.name || 'file'
    this.headers = options.headers || {'Content-Type' : 'multipart/form-data'}
    this.withCredentials = options.withCredentials || false
    this.data = options.data || { token: '' }
    this.url = options.url || 'http://upload.qiniu.com/'
    /**
     * 类内部状态
     * @type {{fileList: Array, tempIndex: number}}
     */
    this.state = {}
    /**
     * 暴露内部方法，外部通过方法名引用
     * @type {any}
     */
    this.upload = this.upload.bind(this)
  }
  
  /**
   * 开始上传
   * @param files
   */
  upload (file, fileName) {
    if(!file) {
      throw new Error("上传文件不能为空！")
    }
    this.post(file, fileName)
  }
  
  post (file, fileName) {
    let formData = new FormData()
    if (this.data) {
      Object.keys(this.data).map(key => {
        formData.append(key, this.data[key]);
      })
    }
    if (fileName) {
      formData.append('key', fileName);
    }
    formData.append(this.name, file);
    this.emit('start', file)
    axios({
      method: 'post',
      url: this.url,
      headers: this.headers,
      withCredentials: this.withCredentials,
      data: formData,
      onUploadProgress: (e) => {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        this.emit('progress', e, file)
      },
    }).then( (res) => {
      this.emit('success', res, file);
    }).catch( (err, response) => {
      this.emit('error', err, response, file)
    })
  }
  
}
