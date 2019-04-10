// 检测中文
export function checkChinese (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let cnPattern = /^[\u4E00-\u9FA5]+$/;
    res = cnPattern.test(value);
    if (!res) {
      msg = '请输入简体中文！'
    }
  }
  return {res: res, msg: msg}
}

// 检测手机号
export function checkPhoneNumber (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let phoneNumberPattern1 = /^[0-9]+$/;
    res = phoneNumberPattern1.test(value);
    if (!res) {
      msg = '请输入11位数字！'
    } else if (res && value.length < 11) {
      res = false;
      msg = '输入的数字少于11位！'
    } else if (res && value.length > 11) {
      res = false;
      msg = '输入的数字多于11位！'
    } else {
      let phoneNumberPattern2 = /^1[3-578]\d{9}$/;
      res = phoneNumberPattern2.test(value);
      if (!res) {
        msg = '输入的手机号不合法！'
      }
    }
  }
  return {res: res, msg: msg}
}

// 检测邮箱
export function checkEMail (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let EMailPattern = /^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+\.){1,63}[A-Za-z0-9]+$/;
    res = EMailPattern.test(value);
    if (!res) {
      msg = '请输入正确的邮箱！'
    }
  }
  return {res: res, msg: msg}
}

// 检测QQ号
export function checkQQ (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let QQPattern = /^[0-9]+$/;
    res = QQPattern.test(value);
    if (!res) {
      msg = '请输入5-10位数字！'
    } else if (res && value.length < 5) {
      res = false;
      msg = '输入的数字少于5位！'
    } else if (res && value.length > 10) {
      res = false;
      msg = '输入的数字多于10位！'
    } else if (res && value.substr(0, 1) === '0') {
      res = false;
      msg = '输入的QQ号不合法！'
    }
  }
  return {res: res, msg: msg}
}

// 检测微信号
export function checkWeChat (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let WeChatPattern = /^[A-Za-z]([_-]*[A-Za-z0-9])*$/;
    res = WeChatPattern.test(value);
    if (!res) {
      msg = '请输入正确的微信号！'
    }
  }
  return {res: res, msg: msg}
}

// 检测身份证号
export function checkIdentityNum (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let identityNumPattern = /^([A-Z157][0-9]{6}\([A0-9]\))|([A-Z][0-9]{9})$/;
    res = identityNumPattern.test(value);
    if (!res) {
      msg = '请输入正确格式的身份证号！例如：<br>' +
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp香港：A123456(1)<br>' +
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp澳门：1234567(1)<br>' +
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp台湾：A123456789'
    }
  }
  return {res: res, msg: msg}
}

// 检测邮政编码
export function checkPostal (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let postalPattern = /^[0-9]+$/;
    res = postalPattern.test(value);
    if (!res) {
      msg = '请输入数字邮编！'
    } else if (res && value.length < 5) {
      res = false;
      msg = '输入的数字少于5位！'
    } else if (res && value.length > 6) {
      res = false;
      msg = '输入的数字多于6位！'
    }
  }
  return {res: res, msg: msg}
}

// 检测时间格式
export function checkDate (value) {
  let res = true;
  let msg = '';
  if (value === '') {
    res = true
  } else {
    let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    res = datePattern.test(value);
    if (!res) {
      msg = '请输入正确的时间格式，如2019-01-01！'
    } else {
      let datePattern = /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/;
      res = datePattern.test(value);
      if (!res) {
        msg = '输入的时间不合法！'
      }
    }
  }
  return {res: res, msg: msg}
}
