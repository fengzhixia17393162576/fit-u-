// pages/components/recommend1/recommend.js
Page({
  onShareAppMessage: function () {

  },
  backHome: function () {
    wx.switchTab({
      url: '../../index/index'
    })
  }
})
