const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '和众鑫贵金属',
    PageCur: 'person-center',
    isLogin: true,
    loginCode: 0,
    quoteList: [1, 3,4,4,4,4,44,4,4,4]
  },

  // 下拉刷新
  // bindrefresherpulling: function () {
  //   console.log(234)
  // },

  // 获取定位信息
  getLocation: function () {
    // 获取位置
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log('get location', res)
      }
    })
    // 通过位置获取附近的店铺列表
    this.getNearShopsList()
  },

  // 通知登录状态
  login: function (res) {
    let detail = res.detail
    if (detail.status == 200) {
      this.setData({
        isLogin: true,
        loginCode: 0
      })
    }
  },

  // 页面导航
  routerPage: function(event) {
    let self = this
    let data = event.currentTarget.dataset.page;

    self.setData({
      PageCur: data
    })
    
    // if (!this.data.isLogin && data == 'person-center') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '用户未登录，请重新登录',
    //     success (res) {
    //       if (res.confirm) {
    //         wx.clearStorage({
    //           success () {
    //             app.globalData.loginCode = 10007
    //             self.setData({
    //               isLogin: false,
    //               showSearch: 'none',
    //               loginCode: app.globalData.loginCode
    //             })
    //           }
    //         })
    //       }
    //     }
    //   })
    //   return
    // } else {
    //   self.setData({
    //     PageCur: data,
    //     loginCode: 0,
    //     showSearch: 'block'
    //   })
    // }
  },

  // 页面显示时检查登录状态
  onShow: function () {
    let self = this
    if (app.globalData.loginCode == 10007) {
      self.setData({
        isLogin: false,
        loginCode: app.globalData.loginCode
      })
      return
    }

    wx.getStorage({
      key: 'userInfo',
      success (res) {
        // console.log('Page home:', res)
        self.setData({
          isLogin: true,
        })
        // 缓存到全局
        app.globalData.userInfo = res.data
      },
      fail (err) {
        console.log('get storage fail:', err)
        self.setData({
          isLogin: false
        })
      }
    })
  }
})