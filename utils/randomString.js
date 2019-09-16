const baseRandomString = () =>
  Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('');
const randomString = (num=4) => {
  let arr = [];
  for(let i = 0; i < num; i++){
    arr.push(baseRandomString());
  }
  return arr.join('-');
};

module.exports = randomString;