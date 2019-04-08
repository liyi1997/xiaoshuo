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
    showSet: false,
    font:"32rpx",
    height:"32rpx"
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
        this.setData({
          read: res.data.chapter,
          order
        })
        wx.hideLoading();
      }
    })
  },
  showSet() {
    this.setData({
      showSet: true
    })
  },
  source() {
    let that = this
    wx.getStorage({
      key: 'source',
      success: res => {
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          if (arr.length < 6) {
            arr.push(res.data[i].name)
          }
        }
        wx.showActionSheet({
          itemList: arr,
          success(suc) {
            wx.showLoading({
              title: "加载中",
              mask: true,
            });
            wx.request({
              url: `https://novel.juhe.im/book-chapters/${res.data[suc.tapIndex]._id}`,
              header: {
                'Content-Type': 'application/json'
              },
              success: (res) => {
                for (let i = 0; i < res.data.chapters.length; i++) {
                  res.data.chapters[i].order = i + 1
                }
                wx.setStorage({
                  key: 'chapter',
                  data: res.data.chapters
                })
                wx.request({
                  url: `https://novel.juhe.im/chapters/${encodeURIComponent(res.data.chapters[that.data.order - 1].link)}`,
                  header: {
                    'Content-Type': 'application/json'
                  },
                  success: res => {
                    that.setData({
                      read: res.data.chapter,
                      isOnPull: true
                    })
                    wx.hideLoading();
                  }
                })
              }
            })
          },
          fail(err) {
            console.log(err.errMsg)
          }
        })
      }
    })

  },

  set_font() {
    let setArr=['32rpx','40rpx','48rpx','56rpx']
    let that=this;
    wx.showActionSheet({
      itemList: setArr,
      success(suc) {
        that.setData({
          font:setArr[suc.tapIndex]
        })
      },
      fail(err) {
        console.log(err.errMsg)
      }
    })
  },

  line_height(){
    let setArr=['32rpx','64rpx','80rpx','96rpx','112rpx']
    let that=this;
    wx.showActionSheet({
      itemList: setArr,
      success(suc) {
        that.setData({
          height:setArr[suc.tapIndex]
        })
      },
      fail(err) {
        console.log(err.errMsg)
      }
    })
  },
  handletouchmove(){
    console.log("yd")
    this.setData({
      showSet:false
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
        isOnPull: false
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
                isOnPull: true
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