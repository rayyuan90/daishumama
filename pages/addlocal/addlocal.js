// pages/addlocal/addlocal.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputWidth: wx.getSystemInfoSync().windowWidth * 0.55,
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
    isEdit: false,
    localId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(JSON.stringify(options))
    let edit = options.edit
    console.log('edit = ' + edit)
    let item = JSON.parse(options.item)
    let regionId = item.regionId - 2
    let provinceName = item.provinceName
    let cityName = item.cityName
    let regionName = item.regionName
    let info = item.info.replace(provinceName,'').replace(cityName,'').replace(regionName,'')
    this.setData({
      isEdit: edit == 1,
      region: regionId,
      local: info,
      localId: item.id
    })
    if (edit == 1) {
      wx.setNavigationBarTitle({
        title: '修改地址',
      })
    }
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
    let data = {
      'id': localId,
      'provinceId': provJson.id,
      'provinceName': provJson.name,
      'cityId': cityJson.id,
      'cityName': cityJson.name,
      'regionId': regionJson.id,
      'regionName': regionJson.name,
      'info': local,
      'userId': userId
    }
    let url = util.getUrl(4)
    console.log(this.data.isEdit)
    if (this.data.isEdit == true) {
      url = util.getUrl(5)
    }
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function(res) {
        let code = res.data.code
        if (code === 1) {
          wx.navigateBack({

          })
        }
      }
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
  }
})