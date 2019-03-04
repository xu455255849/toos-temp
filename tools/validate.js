const regUser = new RegExp("^[\u4e00-\u9fa5]{2,20}$", "i");
const regPassword = new RegExp("^[a-z0-9_]{2,20}$", "i");
const regPhone = new RegExp("^1[3456789]\\d{9}$", "i");
const regDesc = new RegExp("^[a-z0-9_\u4e00-\u9fa5]{0,100}$", "i");
const regAuthcode = new RegExp("^[0-9]{4}$", "i");
let checkUser = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入名称"));
  } else {
    if (!regUser.test(value)) {
      callback(new Error("长度在2 到 20 个字符且只能包含中文"));
    }
    callback();
  }
};
let checkPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (!regPassword.test(value)) {
      callback(new Error("长度在2 到 20 个字符且只能包含英文、数字和下划线"));
    }
    callback();
  }
};
let checkPhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else {
    if (!regPhone.test(value) || value.charAt(0) === "0") {
      callback(new Error("手机号格式不正确"));
    }
    callback();
  }
};
let checkDesc = (rule, value, callback) => {
  if (!regDesc.test(value)) {
    callback(new Error("长度在 0 到 100 个字符且只能包含中英文、数字和下划线"));
  }
  callback();
};
let checkAuthcode = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  } else {
    if (!regAuthcode.test(value)) {
      callback(new Error("请输入符合格式的验证码"));
    }
    callback();
  }
};