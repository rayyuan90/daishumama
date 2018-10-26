// pages/baby/baby.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userId = wx.getStorageSync('userId');
    console.log("userId = " + userId);
    if (!util.isEmpty(userId))
      this.list(userId)
  },
  list: function(userid) {
    let that = this
    wx.request({
      url: util.getUrl(8),
      data: {
        'userId': userid
      },
      method: 'POST',
      success: function(res) {
        let data = res.data
        let code = data.code
        if (code === 1) {
          that.setData({
            list: data.data,
            count: data.data.length
          })
        }
      }
    })
  },
  addBaby:function(){
    wx.navigateTo({
      url: '/pages/addBaby/addBaby',
    })
  },
  editBaby:function(e){
    let item = e.currentTarget.dataset.item

    wx.navigateTo({
      url: '/pages/addBaby/addBaby?item=' + JSON.stringify(item) + '&edit=1',
    })
  }
})