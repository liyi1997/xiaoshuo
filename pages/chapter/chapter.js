// pages/chapter/chapter.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapter: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: `https://novel.juhe.im/book-chapters/${id}`,
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        for(let i=0;i<res.data.chapters.length;i++){
          res.data.chapters[i].order=i+1
        }
        wx.setStorage({
          key: 'chapter',
          data: res.data.chapters
        })
        this.setData({
          chapter: res.data
        })
        wx.hideLoading();
      }
    })
  },
  goes(e) {
    console.log(e)
    console.log(app)
    console.log(e.currentTarget.dataset)
    app.link = encodeURIComponent(e.currentTarget.dataset.link);
    app.pLink = encodeURIComponent(e.currentTarget.dataset.plink);
    app.nLink = encodeURIComponent(e.currentTarget.dataset.nlink);
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