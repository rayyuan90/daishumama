// pages/addBaby/addBaby.js
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
    toastText: '',
    isShowToast: false,
    isEdit: false,
    babyId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let arr = this.data.ageArray
    console.log(JSON.stringify(arr))
    for (let i = 3; i < 12; i++) {
      arr.push(i)
    }
    this.setData({
      ageArray: arr
    })

    let edit = options.edit
    let item = JSON.parse(options.item)
    let age = item.age - 2
    let sex = item.sex
    this.setData({
      isEdit: edit == 1,
      age: age,
      sex: sex,
      name: item.name,
      babyId: item.id
    })
    if(edit == 1){
      wx.setNavigationBarTitle({
        title: '修改宝宝',
      })
    }
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
  add: function() {
    let userId = wx.getStorageSync('userId')
    let name = this.data.name
    let sex = this.data.sex
    let age = this.data.ageArray[this.data.age]
    if (util.isEmpty(name)){
      this.showToast('请添加宝宝名字')
      return
    }
    let babyId = this.data.babyId
    let data = {
      'userId': userId,
      'name': name,
      'age': age,
      'sex': sex,
      'id': babyId
    }
    let url = util.getUrl(10)
    if (this.data.isEdit == true) {
      url = util.getUrl(9)
    }
    wx.request({
      url: url,
      method: 'POST',
      data:data,
      success: function(res) {
       let code = res.data.code
       if(code === 1){
         wx.navigateBack({

         })
       }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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