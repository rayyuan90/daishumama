// pages/local/local.js
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
  onShow: function() {
    let userId = wx.getStorageSync('userId');
    console.log("userId = " + userId);
    if (!util.isEmpty(userId))
      this.getLocalList(userId)
  },
  getLocalList: function(userId) {
    let that = this;
    wx.request({
      url: util.getUrl(3),
      data: {
        'userId': userId
      },
      method: 'POST',
      success: function(res) {
        console.log('local list = \n' + JSON.stringify(res));
        let code = res.data.code
        if (code === 1) {
          let list = res.data.data
          let count = list.length
          console.log("count = "+count)
          that.setData({
            list: list,
            count: count
          })

        }
      }
    })
  },
  addLocal: function() {
    wx.navigateTo({
      url: '/pages/addlocal/addlocal',
    })
  },
  editLocal:function(e){
    console.log(JSON.stringify(e))
    let item = e.currentTarget.dataset.item

    wx.navigateTo({
      url: '/pages/addlocal/addlocal?item='+JSON.stringify(item)+'&edit=1',
    })
  }

})