const regUser = new RegExp('^[a-z\u4e00-\u9fa5]{2,32}$', 'i');
const regPassword = new RegExp('^[a-z0-9_]{2,20}$', 'i');
const regPhone = new RegExp('^[0-9]{11,11}$', 'i');
let checkUser = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入姓名'));
  } else {
    if (!regUser.test(value)) {
      callback(new Error('长度在2 到 32 个字符且只能包含中文和字母'));
    }
    callback();
  }
};
let checkPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (!regPassword.test(value)) {
      callback(new Error('长度在2 到 20 个字符且只能包含英文、数字和下划线'));
    }
    callback();
  }
};
let checkPhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else {
    if (!regPhone.test(value) || value.charAt(0) == '0') {
      callback(new Error('手机号格式不正确'));
    }
    callback();
  }
};