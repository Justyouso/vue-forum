/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

/**
 * 验证邮箱，密码，验证码
 * @param {str} value 验证值
 * @param {str} type 验证类型
 */
export function validateEmailPwdCode(value,type){
  let reg=''
  if (type=='email') {
    reg=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  }else if (type=='pwd'){
    reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  }else if (type=='code'){
    reg = /^[a-z0-9]{6}$/;
  }else{
    return false
  }
  return reg.test(value) ? true:false
}