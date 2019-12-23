var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    citaarry: [],
    morencitaarry: ["北京市", '北京市'],
    nowweather:'',
    province:'',
    longitude:'',
    latitude:'',
    longitude:''
  },
  changcity(value){
    this.setData({
      citaarry: value.detail.value
    })
    this.getweather(value.detail.value)
   
  },
  getposition(){
    
  },

  getweather(citaarry){
    var that = this
    var param = { location: citaarry[1], key: '6ab2187c79514d1d9491f11934e7cb48'}
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: param,
      success: function(res) {
        // console.log(res.data)
        that.setData({
          nowweather: res.data.HeWeather6[0].now
        })
      },
      fail: function(res) {},

    })
  },


  getLocal: function (latitude, longitude){
    var that= this
    
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log("cehngg")
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        that.data.citaarry.push(province, city)
        wx.setStorageSync("ussercity", that.data.citaarry)
        let citaarry = wx.getStorageSync("ussercity")
        console.log(citaarry)
        that.setData({
          citaarry: province+'-' + city,
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })
        that.getweather(citaarry)

      },
    fail(err){
      console.log(err)
    }
    })
  },


  heandeluse(){
    var than = this
    wx.getSetting({
      success(res) {
        
        wx.getLocation({
          type: 'wgs84', //返回可以用于wx.openLocation的经纬度
          success(res) {
           console.log(res)
            var latitude = res.latitude
            var longitude = res.longitude
     
            than.getLocal(latitude, longitude)
          
          }
        })
      }

    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'SB5BZ-VIWKX-E644G-7GRIK-TYTKS-WKBPU'
    });

    this.getposition();
      let citaarry = wx.getStorageSync("ussercity")
    console.log(citaarry)
    if (citaarry){
      this.setData({
        citaarry: citaarry
      })
      this.getweather(citaarry)
    }

    this.getweather(this.data.morencitaarry)
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
    
  }
})