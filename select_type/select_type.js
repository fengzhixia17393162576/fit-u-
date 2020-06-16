Page({

  /**
   * 页面的初始数据
   */
  data: {
     select:[]
  },

  breakfast: function (e) {
    wx.navigateTo({
      url: '../shenghuo/shenghuo',
    })
    this.setData({
      select: '1'//早餐
    })
    wx.setStorageSync('select', this.data.select)
    console.log('输出为', this.data.select)
  },

  lunch: function () {
    wx.navigateTo({
      url: '../shenghuo1/shenghuo1',
    })
    this.setData({
      select: '2'
    })
    wx.setStorageSync('select', this.data.select)
    console.log('输出为', this.data.select)
  }, 
  dinner: function () {
    wx.navigateTo({
      url: '../shenghuo2/shenghuo2',
    })
    this.setData({
      select: '3'
    })
    wx.setStorageSync('select', this.data.select)
    console.log('输出为', select)
   }, 
   others: function () {
     wx.navigateTo({
       url: '../food/food',
     })
   },

})