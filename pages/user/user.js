// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: ['借阅记录', '借阅记录', '借阅记录', '借阅记录'],
    itemWidth: 0,
    itemHeight: 0,
    mleft: 0,
    mRigth: 0,
    headTop: 0,
    top: 0,
    top1: 0,
    top2: 0,
    homeIco:'../../imgs/home/bnav1.png',
    personIco:'../../imgs/home/bnav4.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let width = wx.getSystemInfoSync().windowWidth;
    let height = wx.getSystemInfoSync().windowHeight;
    // 273 113
    let itemWidth = width / 750 * 273
    let itemHeight = itemWidth * 113 / 273
    // 225 382
    let left = width / 382 * 225 - itemWidth / 2
    // 5208 457
    let right = width / 5208 * 457
    let headTop = width / 5208 * 120
    //130 30
    let top = width / 750 * 120
    let top1 = width / 750 * 30
    let top3 = height / 1335 * 400
    this.setData({
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      mleft: left,
      mRigth: right,
      headTop: headTop,
      top: top,
      top1: top1,
      top2: top3
    })
    let that = this;
    let qSearch = wx.createSelectorQuery();
    qSearch.select('.head').boundingClientRect()
    qSearch.exec(function(res) {
      let headHeight = res[0].height
      let top2 = width / 750 * 170 - headHeight - headTop - 10
      that.setData({
        top: top2
      })
    });
  },

  borrow:function(){
    wx.navigateTo({
      url: '/pages/borrow/borrow',
    })
  },
  /*
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title:'分享',
      path: '/pages/index/index',

    }
  },
  address:function(){
    wx.navigateTo({
      url: '/pages/local/local',
    })
  },
  baby:function(){
    wx.navigateTo({
      url: '/pages/baby/baby',
    })
  },
  goHome:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})
