var scFile = require('../../utils/school-calendar.js')
var schoolCalendar = new scFile.SchoolCalendar();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost: 0,//开支
    costtemp: 0,
    breakfast:[],
    lunch:[],
    dinner:[],
    add1:[],
    add2:[],
    add3:[],
    note: '',//备注
    notetemp: null,
    x: 0, //缓存数据的位置
    y: true,
    budgetstore: true, //预算
    daybudgetmin: 0,
    daybudgetmax: 0, //预算范围
    lastday: false,//用于系统自动添加前一天的开支信息
    /*menuitems: [
      { text: '备注', url: '', icon: '/public/images/rocket.png', tips: '输入备注' },
      { text: '备注', url: '', icon: '/public/images/rocket.png', tips: '输入备注' }
    ],*/
    array1: [270, 124, 40,120,500,227],
    array2: ['油条', '生煎', '豆浆', '豆腐脑', '鲜肉小馄饨','猪肉包子'],
    showModalStatus: false
  },
  backHome: function () {
    wx.switchTab({
      url: '../../logs/logs'
    })
  },
  powerDrawer:function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util:function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  //初始化x、time、event、note等信息
  onLoad: function (options) {

    var xstore = wx.getStorageSync('x')
    if (xstore == "") {
      this.setData({ x: 0 })
    }
    else {
      this.setData({ x: xstore })
    }
    console.log(this.data.x)
    wx.setStorageSync('x', this.data.x)


    var time = wx.getStorageSync('time')
    var event = wx.getStorageSync('event')
    var curDate1 = new Date();
    var curYear1 = curDate1.getFullYear();
    var curMonth1 = curDate1.getMonth();
    var curDay1 = curDate1.getDate();
    var curDay2 = curDay1 - 1;

    if (curDay1 == 30 || curDay1 == 31)
      this.setData({ lastday: true })
    else
      this.setData({ lastday: false })

    var mon1 = curMonth1 + 1;
    if (mon1 < 10) {
      mon1 = "0" + mon1
    }
    if (curDay1 < 10) {
      curDay1 = "0" + curDay1
    }
    if (curDay2 < 10) {
      curDay2 = "0" + curDay2
    }
    var vdate1 = curYear1 + "" + mon1 + "" + curDay1
    var vdate2 = curYear1 + "" + mon1 + "" + curDay2

    var k = 0
    for (let i = 0; i < time.length; i++) {
      if (time[i] == vdate2) {
        k = 0;
        break
      }
      else
        k = 1
    }
    //用户前一天忘记记录的情况
    

  },


  //输入花费信息
  costInput: function (event) {
    this.setData({ costtemp: event.detail.value })
    console.log('结果是', this.data.costtemp)
    var select = Number(wx.getStorageSync('select'))
    if(select=='1'){
      var k = this.data.costtemp
      this.setData({ breakfast: this.data.array2[k - 1] })
      wx.setStorageSync('breakfast', this.data.breakfast)
      console.log('结果就是啊', this.data.breakfast)
      var b = this.data.costtemp - 1
      var cal = this.data.array1[b]
      this.setData({ add1: cal })//新添加的食物的卡路里
      wx.setStorageSync('add1', this.data.add1)
      console.log('结果就是啊啊', this.data.add1)
    }
    else if(select=='2'){
      var k = this.data.costtemp
      this.setData({ lunch: this.data.array2[k - 1] })
      wx.setStorageSync('lunch', this.data.lunch)
      console.log('结果就是', lunch)
      var b = this.data.costtemp - 1
      var cal = this.data.array1[b]
      this.setData({ add2: cal })//新添加的食物的卡路里
      wx.setStorageSync('add2', this.data.add2)
    }
    else{
      var k = this.data.costtemp
      this.setData({ dinner: this.data.array2[k - 1] })
      wx.setStorageSync('dinner', this.data.dinner)
      console.log('结果就是', this.data.dinner)
      var b = this.data.costtemp - 1
      var cal = this.data.array1[b]
      this.setData({ add3: cal })//新添加的食物的卡路里
      wx.setStorageSync('add3', this.data.add3)
    }
    
  },
  //输入备注信息



  //将输入的信息添加的缓存中
  btnClick: function (e) {
    var j = this.data.costtemp-1
    var cal = this.data.array1[j]
    var costest = Number(this.data.cost) + Number(cal)
    this.setData({ cost: costest })
    wx.setStorageSync('cost', this.data.cost)//总卡路里

    if (this.data.notetemp)
      var notetest = this.data.note + '\n' + this.data.notetemp
    else
      var notetest = this.data.note
    this.setData({ note: notetest })
    //console.log(notetest)
    wx.setStorageSync('note', this.data.note)
    
    var total_s = wx.getStorageSync('total')
    if (total_s == "") {
      var i = new Number(this.data.cost)
    }
    else {
      var i = Number(total_s) + Number(cal)
    }
    wx.setStorageSync('total', i)
    console.log(i)

    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth();
    var curDay = curDate.getDate();

    var tempx = this.data.x;
    var tempcost = this.data.cost;
    var tempnote = this.data.note;

    var d = new Date(curYear, curMonth, curDay);
    if (!schoolCalendar.setcost(d, tempx, tempcost, tempnote))
      this.setData({ x: (tempx + 1) % 100 })

    wx.setStorageSync('x', this.data.x)
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)

  },

  toGraph: function () {
    wx.switchTab({
      url: '../logs/logs',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //每次切换回该界面，重新刷新显示的数据
  onShow: function () {
    var budget = wx.getStorageSync('totoalcalorie')
    if (budget == "") {
      this.setData({ budgetstore: false })
    }
    else {
      this.setData({ budgetstore: true })
    }
    this.setData({ daybudgetmin: budget / 40 })
    this.setData({ daybudgetmax: budget / 20 })

    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth();
    var curDay = curDate.getDate();

    var d = new Date(curYear, curMonth, curDay);
    console.log(d)
    var time = wx.getStorageSync('time')
    var event = wx.getStorageSync('event')
    var snote = wx.getStorageSync('snote')
    var curDate1 = new Date();
    var curYear1 = curDate1.getFullYear();
    var curMonth1 = curDate1.getMonth();
    var curDay1 = curDate1.getDate();
    var curDay2 = curDay1 - 1;

    var mon1 = curMonth1 + 1;
    if (mon1 < 10) {
      mon1 = "0" + mon1
    }
    if (curDay1 < 10) {
      curDay1 = "0" + curDay1
    }
    if (curDay2 < 10) {
      curDay2 = "0" + curDay2
    }
    var vdate1 = curYear1 + "" + mon1 + "" + curDay1
    var vdate2 = curYear1 + "" + mon1 + "" + curDay2

    var j = 0
    for (let i = 0; i < time.length; i++) {
      if (time[i] == vdate1) {
        j = 0;
        this.setData({ cost: event[i] })
        this.setData({ note: snote[i] })
        break
      }
      else
        j = 1
    }

    if (j == 1) {
      this.setData({ cost: 0 })
      this.setData({ note: '' })
    }

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

  }
})