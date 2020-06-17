// pages/components/recommend/recommend.js
Page({
  onShareAppMessage: function () {
  },
  backHome: function () {
    wx.switchTab({
      url: '../../index/index'
    })
  }
})