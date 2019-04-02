// pages/read/read.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    read: {},
    order: null,
    isOnPull: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order = options.order

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: `https://novel.juhe.im/chapters/${app.link}`,
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          read: res.data.chapter,
          order
        })
        wx.hideLoading();
      }
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
    if (this.data.isOnPull) {
      this.setData({
        isOnPull:false
      })
      let index = this.data.order
      let that = this;
      wx.showLoading({
        title: '玩命加载中',
      })
      wx.getStorage({
        key: 'chapter',
        success(res) {
          that.setData({
            order: index - 2 >= 0 ? res.data[index - 2].order : res.data[index - 1].order
          })
          wx.request({
            url: `https://novel.juhe.im/chapters/${encodeURIComponent(index - 2 >= 0 ? res.data[index - 2].link : res.data[index - 1].link)}`,
            header: {
              'Content-Type': 'application/json'
            },
            success: res => {
              console.log(res.data)
              that.setData({
                read: res.data.chapter,
                isOnPull:true
              })
              wx.hideLoading();
              wx.stopPullDownRefresh();
            }
          })
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.order)
    let index = this.data.order
    let that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.getStorage({
      key: 'chapter',
      success(res) {
        console.log(res.data[index])
        that.setData({
          order: res.data[index] ? res.data[index].order : res.data[index - 1].order
        })
        wx.request({
          url: `https://novel.juhe.im/chapters/${encodeURIComponent(res.data[index] ? res.data[index].link : res.data[index - 1].link)}`,
          header: {
            'Content-Type': 'application/json'
          },
          success: res => {
            console.log(res.data)
            that.setData({
              read: res.data.chapter,
            })
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 0,
              success() {
                wx.hideLoading();
              }
            })

          }
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})