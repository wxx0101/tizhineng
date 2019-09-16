"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Stack {
  constructor() {
    _defineProperty(this, "dataStore", []);

    _defineProperty(this, "top", 0);
  }

  // 记录栈顶位置-元素的个数
  push(element) {
    // 给栈中压入元素
    this.dataStore[this.top++] = element;
  }

  peek() {
    // 返回栈顶的元素，但是栈顶的位置不变
    return this.dataStore[this.top - 1];
  }

  pop() {
    // 把栈顶的元素取出来
    return this.dataStore[--this.top];
  }

  length() {
    // 返回栈内元素的个数
    return this.top;
  }

  clear() {
    // 清空一个栈
    this.top = 0;
  }

}

var _default = Stack;
exports.default = _default;