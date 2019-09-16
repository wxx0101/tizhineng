'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 实现列表类
 * 描述：列表是一组有序的数据。每个列表中的数据项称为元素。
 * 在 JavaScript 中，列表中的元素 可以是任意数据类型。
 * 列表中可以保存多少元素并没有事先限定，实际使用时元素的数量 受到程序内存的限制。
 */
class List {
  constructor(dataStore = []) {
    _defineProperty(this, 'listSize', dataStore.length);

    _defineProperty(this, 'pos', 0);

    _defineProperty(this, 'dataStore', dataStore);
  }

  // 初始化一个空数组来保存来列表元素
  clear() {
    // 清空列表元素
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
  }

  append(element) {
    // 给列表追加一个元素
    this.dataStore[this.listSize++] = element;
  }

  find(element) {
    // 根据元素查找其位置
    for (let i = 0; i < this.listSize; i++) {
      if (element === this.dataStore[i]) {
        return i;
      }
    }

    return -1;
  }

  remove(element) {
    // 删除列表中的指定元素
    const foundAt = this.find(element);
    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1);
      --this.listSize;
      return true;
    }

    return false;
  }

  length() {
    // 返回列表中的元素个数
    return this.listSize;
  }

  toString() {
    // 显示列表中的原始数据
    return this.dataStore;
  }

  insert(element, after) {
    // 向列表中插入一个新元素
    const insertPos = this.find(after);

    if (insertPos > -1) {
      this.dataStore.splice(insertPos, 0, element);
      ++this.listSize;
      return true;
    }

    return false;
  }

  contains(element) {
    // 判断给定值是否在列表中
    const pos = this.find(element);

    if (pos > -1) {
      return true;
    }

    return false;
  }

  front() {
    // 把当前位置移动到最开始的位置；
    this.pos = 0;
  }

  end() {
    // 把当前的位置移动到最末尾的位置；
    this.pos = this.listSize - 1;
  }

  prev() {
    // 把当前的位置往前移动一位
    if (this.pos > 0) {
      --this.pos;
    }
  }

  next() {
    // 把当前的位置往后移动一位
    if (this.pos < this.listSize - 1) {
      ++this.pos;
    }
  }

  currPos() {
    // 返回当前的位置
    return this.pos;
  }

  moveTo(position) {
    // 把当前位置移动到指定位置
    this.pos = position;
  }

  getElement() {
    // 返回当前位置所对应的元素
    return this.dataStore[this.pos];
  }

}

var _default = List;
exports.default = _default;