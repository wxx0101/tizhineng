


module.exports = (addRule) => {
  // 测试一个规则
  addRule('>10', (rule, value) => {
    if(isNaN(value)){
      return '不是数字';
    }
    if(value <= 10){
      return '数字不大于10';
    }
  });

  // orgCode的规则
  addRule('orgCode', () => {
    // if(isNaN(value)){
    //   return `字段${rule.type}，规定必须是数字`;
    // }
    // if(value <= 10000){
    //   return `字段${rule.type},规定必选大于10000`;
    // }
  });

  // 身份证规则
  addRule('idCard', (rule, value) => {
    const idCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if(!idCardReg.test(String(value))){
      return `字段${rule.type}，身份证格式不符合规则`;
    }
  });

  // 日期规则
  addRule('datetime', (rule, value) => {
    const datetimeReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    if(typeof value !== 'string'){
      return `字段${rule.type}，规定必须是字符串`;
    }
    if(!datetimeReg.test(value)){
      return `字段${rule.type}，日期格式不合法`;
    }
  });

  // 布尔类型参数的规则
  addRule('sex', (rule, value) => {
    if(![1,0].includes(value)){
      return `字段${rule.type}，规定必须是1或者0`;
    }
  });

  // 手机号的规则
  addRule('tel', (rule, value) => {
    const telReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if(!telReg.test(value)){
      return `字段${rule.type}，手机号可能不符合规则`;
    }
  });

  // 邮箱的验证规则
  addRule('email', (rule, value) => {
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(!emailReg.test(value)){
      return `字段${rule.type}，邮箱可能不符合规则`;
    }
  });
  // 备注规则
  addRule('notes', (rule, value) => {
    if(typeof value !== 'string'){
      return `字段${rule.type}，不是字符串`;
    }
    if(value.length > 150){
      return `字段${rule.type},字数超过150`;
    }
  });

  // 登录的用户名规则
  addRule('username', (rule, value) => {
    const userNameReg = /^\w{3,8}$/;
    if(!userNameReg.test(value)){
      return `字段${rule.type},必须是最少6位字母或数字`;
    }
  });
  // 登录的用户密码规则
  addRule('userpwd', (rule, value) => {
    const userPwdReg = /^\w{5,}$/;
    if(!userPwdReg.test(value)){
      return `字段${rule.type},不符合规则，必须是最少6位字母或数字`;
    }
  });
};