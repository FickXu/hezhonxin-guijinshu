import request from '../api/request'

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    filialeKey: app.globalData.filialeKey,
    title: '和众鑫贵金属',
    PageCur: 'home',
    detail: {}
  },

  // 下拉刷新
  // bindrefresherpulling: function () {
  //   console.log(234)
  // },

  // 通知登录状态
  openLoginPage: function (res) {
    this.setData({
      PageCur: 'login'
    })
    
    // let detail = res.detail
    // if (detail.status == 200) {
    //   this.setData({
    //     isLogin: true,
    //     loginCode: 0
    //   })
    // }
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

  // 查询价格
  queryPrice() {
    request(`base/price/${this.data.filialeKey}`).then(res => {
      console.log(res.data)
      if (res.data.code === 0)
        this.setData({
          detail: res.data.data
        })
    })
  },

  // 投保页面
  openInsurePage() {
    wx.navigateTo({
      url: '../../pages/insured-info/insured-info'
    })
  },

  // 投保页面
  openPricePage() {
    wx.navigateTo({
      url: '../../pages/wechat-pricing/wechat-pricing'
    })
  },

  // 页面显示时
  onShow: function () {
    // 首次加载
    this.queryPrice()

    // setInterval(() => {
    //   this.queryPrice()
    // }, 2000);
  }
})