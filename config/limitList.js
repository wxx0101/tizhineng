const ExtendList = require('../utils/extendList');

// 去掉可访问接口，返回最终的受限接口,其类型为 ExtendList;
/**
 * 
 * @param {Array} visibleApis 所有可访问的api接口编号组成的数组
 * @return {ExtendLit} 当前身份受限的api接口列表 
 */
function removeVisibleApi(visibleApis){
  const limitAPisArray = Object.keys(limitAPis).map(item => {
    return {
      ...limitAPis[item],
      index: parseInt(item)
    };
  });
  let allList = new ExtendList(limitAPisArray);
  visibleApis.forEach(item => {
    allList.remove({index: item});
  });
  return allList;
}

// 去掉可以访问视图，返回最终的受限视图
/**
 * 
 * @param {Array} routesElements 类似于['0-1-0']这样的数组，第一数字代表当前受限的路由，第二个数字代该路由是否可以访问，后边的数字分别代表受限的按钮
 * 
 * @return {ExtendLit} 当前身份受限的视图列表
 */
function removeVisibleRoutesElements(routesElements){
  // 最终受限的视图
  let allRoutesElements = Object.keys(limitsRoutesElements).map(item => {
    return {
      ...limitsRoutesElements[item],
      elements: {...limitsRoutesElements[item].elements},
      index: parseInt(item)
    };
  });
  allRoutesElements = new ExtendList(allRoutesElements);
  routesElements.map(item => {
    let arr = item.split('-');
    return [...arr].map(item => parseInt(item));
  }).forEach(item => {
    const [route, isVisible] = item;
    let index = allRoutesElements.find({index: route});
    allRoutesElements.toString()[index].routeIsVisible = isVisible;
    item.slice(2).forEach(item => {
      delete allRoutesElements.toString()[index].elements[item];
    });

  });
  return allRoutesElements;

}


// 所有的受限api接口
const limitAPis = {
  0:{

  }
};

// 所有的受限的路由和元素

const limitsRoutesElements = {
  0: {
    routerId: 'management',  //  员工管理
    routeIsVisible: 0,
    elements: {}
  },
  1: {
    routerId: 'checkWork',  // 员工考勤
    routeIsVisible: 0,
    elements: {}
  },
  2: {
    routerId: 'plan',  // 工作计划
    routeIsVisible: 1, 
    elements: {}
  },
  3: {
    routerId: 'customer', // 客户管理
    routeIsVisible: 0,
    elements: {}
  },
  4: {
    routerId: 'college', // 亚太学院
    routeIsVisible: 0,
    elements: {}
  },
  5: {
    routerId: 'level', // 级别考核
    routeIsVisible: 0,
    elements: {}
  },
  6: {
    routerId: 'assistant', // 管理助手
    routeIsVisible: 0,
    elements: {}
  },
  7: {
    routerId: 'integral', // 积分管理
    routeIsVisible: 0,
    elements: {}
  },
  8: {
    routerId: 'home', // 首页
    routeIsVisible: 0,
    elements: {}
  }
};
let authority = {};
authority.management = {
  name: '员工管理',
  vieibleRoutesElements: ['0-1'],
  visibleApi: []
};
authority.checkWork = {
  name: '员工考勤',
  vieibleRoutesElements: ['1-1'],
  visibleApi: []
};
authority.plan = {
  name: '工作计划',
  vieibleRoutesElements: ['2-1'],
  visibleApi: []
};
authority.customer = {
  name: '客户管理',
  vieibleRoutesElements: ['3-1'],
  visibleApi: []
};
authority.college = {
  name: '亚太学院',
  vieibleRoutesElements: ['4-1'],
  visibleApi: []
}
authority.level = {
  name: '级别考核',
  vieibleRoutesElements: ['5-1'],
  visibleApi: []
}
authority.assistant = {
  name: '管理助手',
  vieibleRoutesElements: ['6-1'],
  visibleApi: []
}
authority.integral = {
  name: '积分管理',
  vieibleRoutesElements: ['7-1'],
  visibleApi: []
}
authority.home = {
  name: '首页',
  vieibleRoutesElements: ['8-1'],
  visibleApi: []
}

module.exports = {
  authority,
  removeVisibleApi,
  removeVisibleRoutesElements
};