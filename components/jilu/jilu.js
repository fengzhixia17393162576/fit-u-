//index.js
var scFile = require('../../utils/school-calendar.js')
var schoolCalendar = new scFile.SchoolCalendar();
var charts = require('../../components/mars/modules/charts.js')
var hiway = require('../../components/mars/modules/mars.js')


//月份天数
var DAY_OF_MONTH = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

//判断当前年是否为闰年
var isLeapYear = function (year) {
  if (year % 400 == 0 || year % 4 == 0 && year % 100 != 0)
    return 1
  else
    return 0
};

//获取当月有多少天
var getDayCount = function (year, month) {
  return DAY_OF_MONTH[isLeapYear(year)][month];
};


var pageData = {
  date: "",        //当前日期字符串
  styleshow: '显示月份总结',
  onehidden: '',
  twohidden: 'twohidden',
  //arr数据是与索引对应的数据信息
  arrIsShow: [],     //是否显示此日期
  isToday: [],        //是否是今天
  infoIsShow: [],     // 学校事件是否显示
  arrDays: [],       //关于几号的信息
  arrInfoEx: [],     //学校事件等扩展信息

}





//刷新全部数据
var refreshPageData = function (year, month) {
  pageData.date = year + '年' + (month + 1) + '月';
  var offset = new Date(year, month, 1).getDay();//该月第一天是星期X
  for (var i = 0; i < 42; i++) {
    var dayCount = getDayCount(year, month)//该月的天数
    pageData.arrIsShow[i] = i < offset || i >= dayCount + offset ? false : true;

    var today = new Date();
    if (year == today.getFullYear() && month == today.getMonth() && (i - offset + 1) == today.getDate()) {
      pageData.isToday[i] = 'isToday'
    }
    else {
      pageData.isToday[i] = ''
    }
    pageData.arrDays[i] = i - offset + 1;
    var d = new Date(year, month, i - offset + 1);//42个日期
    var dEx = schoolCalendar.school(d);
    if (dEx != null) {
      pageData.arrInfoEx[i] = dEx;
      pageData.infoIsShow[i] = 'infoIsShow';
    }
    else {
      pageData.arrInfoEx[i] = '';
      pageData.infoIsShow[i] = '';
    }
  }
};


var curDate = new Date();
var curYear = curDate.getFullYear();
var curMonth = curDate.getMonth();
var curDay = curDate.getDate();
refreshPageData(curYear, curMonth);


Page({
  data: pageData,
  deviceH: 0,
  deviceW: 0,  //用于绘制图表
  cost: 0,    //当前花费信息
  note: 0,    //当前备注信息
  datetemp: null,
  showModalStatus: false,  //弹框条件判断

  onLoad: function (options) {
    let _this = this

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          deviceH: res.windowHeight,
          deviceW: res.windowWidth,
        })
      }
    })
  },
  //图表初始化
  initGraph: function () {

    var aaa = new Date();
    var temp = aaa.getDate();
    //console.log(temp)

    var y = temp % 7;
    var x = (temp - y) / 7;
    //console.log("x:"+x+" y:"+y)
    var xstore = wx.getStorageSync('x')
    var budget = wx.getStorageSync('totalcalorie')
    var time = wx.getStorageSync('time')
    var event = wx.getStorageSync('event')
    var paytemp = new Array();
    var needpay = new Array();
    if (budget == "") {
      budget = 0;
    }

    var curDate1 = new Date();
    var curYear1 = curDate1.getFullYear();
    var curMonth1 = curDate1.getMonth();
    var curDay1 = curDate1.getDate();
    var mon1 = curMonth1 + 1;
    if (mon1 < 10) {
      mon1 = "0" + mon1
    }
    if (curDay1 < 10) {
      curDay1 = "0" + curDay1
    }
    var vdate1 = curYear1 + "" + mon1 + "" + curDay1
    var j = 0
    //console.log("vdate1:"+vdate1)
    for (let i = 0; i < time.length; i++) {
      if (time[i] == vdate1) {
        j = 0;
        break
      }
      else
        j = 1
    }
    //读取存储信息，生成每周的卡路里数据
    for (let i = 0; i < x; i++) {
      var m = xstore - temp + i * 7 + j;
      //console.log("m:"+m);
      var test = Number(event[(m + 100) % 100]) + Number(event[(m + 1 + 100) % 100]) + Number(event[(m + 2 + 100) % 100]) + Number(event[(m + 3 + 100) % 100]) + Number(event[(m + 4 + 100) % 100]) + Number(event[(m + 5 + 100) % 100]) + Number(event[(m + 6 + 100) % 100]);
      paytemp.push(test);
      needpay.push(budget * 7);
      //console.log("test:" + Number(test));
    }
    m = xstore - temp + x * 7 + j;
    test = 0;
    for (let i = m; i < m + y; i++) {
      test = test + Number(event[(i + 100) % 100]);
    }
    paytemp.push(test);
    needpay.push(budget * 7);


    //title、x、y轴坐标设置
    let params = {}
    params.width = this.data.deviceW

    params.canvas_id = 'lineGraph'
    params.ytitle = '摄入卡路里 (大卡)'
    params.xcate = ['第一周', '第二周', '第三周', '第四周']
    params.data = [{
      name: '最佳摄入',
      data: needpay,
      format: function (val) {
        return val.toFixed(2);
      }
    }, {
      name: '实际摄入',
      data: paytemp,
      format: function (val) {
        return val.toFixed(2);
      }
    }]
    charts.shapeLine(params)

  },

  onReady: function () {
    this.initGraph()
  },





  //回到今日
  goToday: function (e) {
    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth();
    var curDay = curDate.getDate();
    refreshPageData(curYear, curMonth, curDay);
    this.setData(pageData);
  },
  //跳转到上个月
  goLastMonth: function (e) {
    if (curMonth == 0) {
      curYear--;
      curMonth = 11;
    } else {
      curMonth--;
    }
    refreshPageData(curYear, curMonth, curDay);
    this.setData(pageData);
  },
  //跳转到下个月
  goNextMonth: function (e) {
    if (curMonth == 11) {
      curYear++;
      curMonth = 0;
    } else {
      curMonth++;
    }
    refreshPageData(curYear, curMonth, curDay);
    this.setData(pageData);
  },

  //跳转到指定年月
  bindDateChange: function (e) {
    var arr = e.detail.value.split("-");
    refreshPageData(+arr[0], arr[1] - 1, arr[2] - 1);
    curYear = arr[0];
    curMonth = arr[1] - 1;
    this.setData(pageData);
  },
  //改变显示方式
  changeStyle: function () {

    var styleshow = this.data.styleshow;
    var onehidden = this.data.onehidden;
    var twohidden = this.data.twohidden;
    if (styleshow == '显示月份总结' && onehidden == '' && twohidden == 'twohidden') {
      styleshow = '显示详细摄入';
      onehidden = 'onehidden';
      twohidden = ''
    }
    else {
      styleshow = '显示月份总结'
      onehidden = ''
      twohidden = 'twohidden'
    }
    this.setData({
      styleshow: styleshow,
      onehidden: onehidden,
      twohidden: twohidden
    })
    this.initGraph();
  },

  //绘制图表



  fooddetail: function (event) {
    var breakfast = wx.getStorageSync('breakfast')//早餐记录
    if (breakfast != null) {
      this.setData({ breakfast: breakfast })
    }
    else {
      this.setData({ breakfast: '(您还没有记录哦)' })
    }

    var lunch = wx.getStorageSync('lunch')
    if (lunch != null) {
      this.setData({ lunch: lunch })
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

  noteInput: function (e) {
    this.setData({ note: e.detail.value })
    //wx.setStorageSync('note', this.data.note)
  },


  btnClick: function (e) {

    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  onShow: function () {
    refreshPageData(curYear, curMonth, curDay);
    this.setData(pageData);
    //月报生成
    if (curDay == 30 || curDay == 31)
      this.changeStyle()
  },
})
