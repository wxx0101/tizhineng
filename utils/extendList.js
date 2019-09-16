const List = require('./List').default;

class ExtendList extends List{
  /**
     * 
     * @param {object} api
     * @api {reg | string} url
     * @api {string} method 
     */
  find(api){
    const {url, method, index} = api;
    if(index !== undefined && typeof index === 'number'){
      let findIndex = this.dataStore.findIndex(item => item.index === index);
      return findIndex;
    }
    for (let i = 0; i < this.listSize; i++) {
      if(typeof this.dataStore[i].url === 'string'){
        if(this.dataStore[i].url === url && this.dataStore[i].method === method){
          return i;
        }
      }else{
        if(this.dataStore[i].url.test(url) && this.dataStore[i].method === method){
          return i;
        }
      }
    }
    return -1;
  }
}

module.exports = ExtendList;