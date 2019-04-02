// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking: [],
    value: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://novel.juhe.im/rank/54d42d92321052167dfb75e3',
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          ranking: res.data.ranking
        })
      }
    })
  },
  bindinput(e) {
    this.setData({
      value:e.detail.value
    })
  },
  bindconfirm() {
    wx.navigateTo({
      url: `../search/search?search=${this.data.value}`
    })
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