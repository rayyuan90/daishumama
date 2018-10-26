const BASE_PATH = "https://www.kangaroo-book.com/"
const URL_ARR = [
  '/api/product/query', //0:首页列表
  '/api/user/decode', //1:解密手机
  '/api/user/appLogin', //2:登录
  '/api/address/query', //3:地址查询
  '/api/address/add', //4:添加地址
  '/api/address/update',//5:更新地址
  '/api/borrow/select',//6:查询用户记录
  '/api/borrow/submit',//7:进行借阅
  '/api/baby/query',//8:宝宝查询
  '/api/baby/update',//9:宝宝更新
  '/api/baby/add',//10:添加宝宝
  '/api/product/firstBuy',//11:第一次购买
  '/api/product/buy',//12:第二次购买
]
const local = [{
    'id': 2,
    'name': '滨江区'
  }, {
    'id': 3,
    'name': '上城区'
  },
  {
    'id': 4,
    'name': '下城区'
  },
  {
    'id': 5,
    'name': '江干区'
  },
  {
    'id': 6,
    'name': '拱墅区'
  },
  {
    'id': 7,
    'name': '西湖区'
  },
  {
    'id': 8,
    'name': '萧山区'
  }
]
const getUrl = index => {
  return BASE_PATH + URL_ARR[index]
}
const login = () => {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(res.code)
      console.log(JSON.stringify(res))
      wx.setStorageSync("code", res.code);
    }
  })
}
const isEmpty = str => {
  return str === undefined || str === null || str.length <= 0
}

module.exports = {
  getUrl: getUrl,
  login: login,
  isEmpty: isEmpty,
  local: local
}