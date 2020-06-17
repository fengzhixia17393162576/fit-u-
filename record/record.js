// pages/components/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  backHome: function () {
    wx.switchTab({
      url: '../../personal/personal'
    })
  },

  fooddetail: function (e) {
    var breakfast = wx.getStorageSync('breakfast')//早餐记录
    if(breakfast!=null){
      this.setData({ breakfast: breakfast })
    }
    else{
      this.setData({ breakfast: '(您还没有记录哦)' })
    }
    
    var lunch = wx.getStorageSync('lunch')
    if (lunch != null) {
      this.setData({ lunch:lunch })
    }
    else {
      this.setData({ lunch: '(您还没有记录哦)' })
    }

    var dinner = wx.getStorageSync('dinner')
    if (dinner != null) {
      this.setData({ dinner: dinner })
    }
    else {
      this.setData({ dinner: '您还没有记录哦' })
    }

    var add1 = wx.getStorageSync('add1')
    if (add1 != null) {
      this.setData({ add1: add1 })
    }
    else {
      this.setData({ add1: '您还没有记录哦' })
    }
    
    var add2 = wx.getStorageSync('add2')
    if (add2 != null) {
      this.setData({ add2: add2 })
    }
    else {
      this.setData({ add2: '您还没有记录哦' })
    }

    var add3 = wx.getStorageSync('add3')
    if (add3 != null) {
      this.setData({ add3: add3 })
    }
    else {
      this.setData({ add31: '您还没有记录哦' })
    }

  },
})
