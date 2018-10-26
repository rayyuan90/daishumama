// pages/info/info.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    sex: 0,
    age: 0,
    inputWidth: wx.getSystemInfoSync().windowWidth * 0.55,
    sexArray: ["男", "女"],
    ageArray: [],
    regionArray: util.local,
    region: 0,
    cityArray: [{
      'id': 1,
      'name': "杭州市"
    }],
    city: 0,
    provinceArray: [{
      'id': 9,
      'name': "浙江省"
    }],
    province: 0,
    local: '',
    toastText: '',
    isShowToast: false,
    productId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let productId = options.productId
    let arr = this.data.ageArray
    console.log(JSON.stringify(arr))
    for (let i = 3; i < 12; i++) {
      arr.push(i)
    }
    this.setData({
      ageArray: arr,
      productId: productId
    })
  },
  sex: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  age: function(e) {
    this.setData({
      age: e.detail.value
    })
  },
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  addlocal: function(e) {
    this.setData({
      local: e.detail.value
    })
  },
  bindRegion: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindCity: function(e) {
    this.setData({
      city: e.detail.value
    })
  },
  bindProvince: function(e) {
    this.setData({
      province: e.detail.value
    })
  },
  showToast: function(text) {
    let duration = 2000;
    let _this = this;
    _this.setData({
      toastText: text,
      isShowToast: true
    })
    setTimeout(function() {
      _this.setData({
        isShowToast: false
      });
    }, duration);
  },
  add: function() {
    let local = this.data.local
    if (util.isEmpty(local)) {
      this.showToast('地址不能为空！')
      return
    }
    let city = this.data.city
    let cityJson = this.data.cityArray[city]
    let province = this.data.province
    let provJson = this.data.provinceArray[province]
    let region = this.data.region
    let regionJson = this.data.regionArray[region]
    let userId = wx.getStorageSync('userId')
    let localId = this.data.localId
    let name = this.data.name
    let sex = this.data.sex
    let productId = this.data.productId
    let age = this.data.ageArray[this.data.age]
    if (util.isEmpty(name)) {
      this.showToast('请添加宝宝名字')
      return
    }

    let data = {
      'userid': userId,
      'name': name,
      'sex': sex,
      'age': age,
      'provinceId': provJson.id,
      'provinceName': provJson.name,
      'cityId': cityJson.id,
      'cityName': cityJson.name,
      'regionId': regionJson.id,
      'regionName': regionJson.name,
      'info': local,
      'productId': productId
    }
    wx.setStorageSync('firstBuy', JSON.stringify(data))
    wx.navigateBack({

    })
  }
})