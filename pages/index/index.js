//index.js
//获取应用实例

const util = require('../../utils/util.js')

Page({
  data: {
    banners: ['../../imgs/home/banner/1.png', '../../imgs/home/banner/2.png', '../../imgs/home/banner/3.png'],
    list: [],
    imgHeight: 0,
    isShowPupop: false,
    phone: "",
    homeIco:'../../imgs/home/bnav1.png',
    personIco:'../../imgs/home/bnav4.png'
  },
  onLoad: function() {
    let width = wx.getSystemInfoSync().windowWidth;
    let height = width / 751 * 419
    this.setData({
      imgHeight: height
    })
    wx.setStorageSync('phone', "13720444165")
    let phone = wx.getStorageSync('phone')
    if (util.isEmpty(phone)) {
      this.setData({
        isShowPupop: true
      })
    } else {
      this.setData({
        phone: phone
      })
    }
    const app = getApp()
    let isLogo = false;
    console.log("================3===============");
    app.requestCodeCall = function(code) {
      console.log(code)
      if (!isLogo) {
        this.login(code, phone)
        isLogo = true;
      }
    }
    let code = wx.getStorageSync("code");
    if (!isLogo && !util.isEmpty(code)) {
      isLogo = true;
      this.login(code, phone)
    }

    console.log("================4===============");
    this.getList()
  },
  getList: function() {
    let that = this;
    wx.request({
      url: util.getUrl(0),
      success: function(res) {
        console.log(JSON.stringify(res))
        let code = res.data.code
        if (code === 1) {
          that.setData({
            list: res.data.data
          })

        }
      }
    })
  },
  itemClick: function(e) {
    console.log(JSON.stringify(e))
    let productId = e.currentTarget.dataset.item.id
    let babySize = wx.getStorageSync('babySize')
    let addressSize = wx.getStorageSync('addressSize')
    let firstBuy = wx.getStorageSync('firstBuy')
    if (!util.isEmpty(firstBuy)) {
      let data = JSON.parse(firstBuy)
      this.firstBuy(data)
      return
    }
    if (util.isEmpty(babySize) || babySize === 0 ||
      util.isEmpty(addressSize) || addressSize === 0) {
      wx.navigateTo({
        url: '/pages/info/info?productId=' + productId,
      })
      return
    }


    this.buy(productId)

  },
  opinion: function(e) {
    console.log(JSON.stringify(e))
  },
  getPhoneNumber: function(e) {

    console.log(e.detail.errMsg)
    let iv = e.detail.iv
    console.log(e.detail.iv)
    let enData = e.detail.encryptedData
    console.log(enData)
    let code = wx.getStorageSync('code')
    // this.login(code, iv, enData)
  },
  firstBuy: function(data) {
    wx.request({
      url: util.getUrl(11),
      method: 'POST',
      data: data,
      success: function(res) {

      }
    })
  },
  buy: function (productId) {
    let userid = wx.getStorageSync('userId')
    let data = {
      'productId': productId,
      'userId': userid
    }
    wx.request({
      url: util.getUrl(12),
      method: 'POST',
      data: data,
      success: function(res) {

      }
    })
  },
  login: function(code, mobile) {
    let data = {
      "code": code,
      "mobile": mobile
    }
    wx.request({
      url: util.getUrl(2),
      data: data,
      method: "POST",
      success: function(res) {
        console.log(JSON.stringify(res));
        let c = res.data.code
        let msg = res.data.msg
        if (c === 1 && msg === "登录成功") {
          let data = res.data.data
          console.log("userId =   " + data.user_id);
          let length = data.address.length
          let babyLeght = data.baby.length
          wx.setStorageSync('babySize', babyLeght)
          wx.setStorageSync('addressSize', length)
          wx.setStorageSync('userId', data.user_id)
          wx.setStorageSync('data', JSON.stringify(data))
        }
      }
    })
  },
  goUser:function(){
    wx.navigateTo({
      url: '/pages/user/user',
    })
  }
})
