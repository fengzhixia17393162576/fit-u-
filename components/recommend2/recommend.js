// pages/components/recommend2/recommend.js
Page({
  onShareAppMessage: function () {

  },
  backHome: function () {
    wx.switchTab({
      url: '../../index/index'
    })
  }
})