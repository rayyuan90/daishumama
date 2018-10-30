//app.js
App({
  onLaunch: function () {
    var that = this;
    // 登录 log 测试
    console.log("===============================");
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('code === '+res.code)
        wx.setStorageSync('code', res.code);
        // console.log(JSON.stringify(res))
        var callback = that.requestCodeCall
        console.log(callback)
        if(callback)
          that.requestCodeCall(res.code)
      }
    })

  }
})
