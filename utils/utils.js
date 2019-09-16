/**
 * @param {Array} propNames 被验证对象中可以出现的所有的属性名
 * @param {Object} target 要验证的对象
 * @return {string | number} 返回数字1代表验证成功，返回字符串代表验证失败
 */
exports.isMoreProp = (propNames, target = {}) => {
  const targetKeys = Object.keys(target);
  for(let i = 0; i < targetKeys.length; i++){
    if(!propNames.includes(targetKeys[i])){
      return targetKeys[i];
    }
  }
  return 1;
};


/**
 * @param {Array} resource 原始数据
 * @return {object} 
 */
exports.createRule = (resource) => {
  const rules = {};
  resource.forEach(item => {
    rules[item[0]] = {
      type: item[1],
      required: item[2] ? item[2] : false
    };
  });
  return rules;
};
/**
 * @param {array} resource
 * @return {array}
 */
exports.createProp = (resource) => {
  return resource.map(item => item[0]);
};