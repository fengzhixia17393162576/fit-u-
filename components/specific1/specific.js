// pages/components/specific1/specific.js
Page({
  onShareAppMessage: function () {

  },
  backHome: function () {
    wx.switchTab({
      url: '../../index/index'
    })
  }
})