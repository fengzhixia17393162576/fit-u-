// pages/components/specific/specific.js
Page({
  onShareAppMessage: function () {
  },
  backHome: function () {
    wx.switchTab({
      url: '../../index/index'
    })
  }
})