//import { HOST_API } from "../../api/conf/base";

function getTokenUrl() {
  var _CONFig = {};
  if (location.host.includes("localhost")) {
    _CONFig.serverUrl = "/upload/storage/token";
    _CONFig.ayUrl = "http://yunxi-material-test.oss-cn-hangzhou.aliyuncs.com/";
  } else if (location.host === HOST_API.test_host) {
    _CONFig.serverUrl = `${HOST_API.test_api}/upload/storage/token`;
    _CONFig.ayUrl = "http://yunxi-material-test.oss-cn-hangzhou.aliyuncs.com/";
  } else if (location.host === HOST_API.dev_host) {
    _CONFig.serverUrl = `${HOST_API.dev_api}/upload/storage/token`;
    _CONFig.ayUrl = "http://yunxi-material-test.oss-cn-hangzhou.aliyuncs.com/";
  } else if (location.host === HOST_API.online_host) {
    _CONFig.serverUrl = `${HOST_API.online_api}/upload/storage/token`;
    _CONFig.ayUrl =
      "//yunxi-material-library-prod.oss-cn-hangzhou.aliyuncs.com/";
  }
  
  var url = {
    ossUrl: `${_CONFig.serverUrl}`,
    upUrl: _CONFig.ayUrl
  };
  return url;
}

function getSuffix(filename) {
  const pos = filename.lastIndexOf(".");
  let suffix = "";
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

function randomString(len) {
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const maxPos = chars.length;
  let pwd = "";
  for (let i = 0; i < len; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function getUploadParam(names, type) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", getTokenUrl(type).ossUrl, false);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.withCredentials = true;
  xmlhttp.send(JSON.stringify({ type: type }));
  const token = JSON.parse(JSON.parse(xmlhttp.responseText).data.token);
  let randomName = randomString(10) + getSuffix(names);
  let keys = token.dir + randomName;
  let param = {
    data: {
      url: token.host,
      data: {
        key: keys,
        policy: token.policy,
        OSSAccessKeyId: token.accessid,
        success_action_status: "200",
        signature: token.signature,
        name: names
      }
    },
    token: token,
    key: keys
  };
  return param;
}

export { getUploadParam };


// 实例

function fileSelect (param) {
  if (param.file.type !== 'image/jpeg' && param.file.type !== 'image/png' ) {
    this.$message.warning('请上传jpg 或 png 格式的图片')
  } else if (param.file.size / 1024 / 1024 > 5) {
    this.$message.warning("文件大小不能超过5M")
    return false
  }
  const params = getUploadParam(param.file.name, 'images')
  const uploader = new Uploader(params.data)
  uploader.upload(param.file)
  uploader.on('success', (res, file) => {
    this.form.avatar = params.token.host + params.key
    this.form.saveAvatar = params.key
  })
}