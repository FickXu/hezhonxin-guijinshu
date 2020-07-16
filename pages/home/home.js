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
    detail: {},
    status1: '',
    status2: '',
    status3: '',
    status4: '',
    status5: '',
    status6: '',
    status7: '',
    status8: '',
    // 是否已经登录
    // isLogin: false
  },

  // 通知登录状态
  openLoginPage: function (res) {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  bindgetuserinfo(e) {
    console.log(e)
  },
  // 页面导航
  routerPage: function(event) {
    let self = this
    let data = event.currentTarget.dataset.page;

    // self.setData({
    //   PageCur: data
    // })
    
    if (!wx.getStorageSync('openId') && data == 'person-center') {
      wx.showModal({
        title: '提示',
        content: '用户未登录，请重新登录',
        success (res) {
          if (res.confirm) {
            wx.clearStorage({
              success () {
                // app.globalData.loginCode = 10007
                // self.setData({
                //   isLogin: false,
                //   loginCode: app.globalData.loginCode
                // })
                wx.navigateTo({
                  url: '../login/login'
                })
              }
            })
          }
        }
      })
      return
    } else {
      self.setData({
        PageCur: data,
      })
    }
  },

  // 查询价格
  queryPrice() {
    request(`base/price/${this.data.filialeKey}`).then(res => {
      if (res.data.code === 0) {
        let detail = res.data.data
        this.setData({
          status1: detail.auBuyPrice > this.data.detail.auBuyPrice ? 'green' : (detail.auBuyPrice < this.data.detail.auBuyPrice ? 'red' : ''),
          status2: detail.auSendPrice > this.data.detail.auSendPrice ? 'green' : (detail.auSendPrice < this.data.detail.auSendPrice ? 'red' : ''),
          status3: detail.ptBuyPrice > this.data.detail.ptBuyPrice ? 'green' : (detail.ptBuyPrice < this.data.detail.ptBuyPrice ? 'red' : ''),
          status4: detail.ptSendPrice > this.data.detail.ptSendPrice ? 'green' : (detail.ptSendPrice < this.data.detail.ptSendPrice ? 'red' : ''),
          status5: detail.pdBuyPrice > this.data.detail.pdBuyPrice ? 'green' : (detail.pdBuyPrice < this.data.detail.pdBuyPrice ? 'red' : ''),
          status6: detail.pdSendPrice > this.data.detail.pdSendPrice ? 'green' : (detail.pdSendPrice < this.data.detail.pdSendPrice ? 'red' : ''),
          status7: detail.agBuyPrice > this.data.detail.agBuyPrice ? 'green' : (detail.agBuyPrice < this.data.detail.agBuyPrice ? 'red' : ''),
          status8: detail.agSendPrice > this.data.detail.agSendPrice ? 'green' : (detail.agSendPrice < this.data.detail.agSendPrice ? 'red' : ''),
          detail: detail
        })

      }
    })
  },

  // 投保页面
  openInsurePage() {

    if (!wx.getStorageSync('userInfo')) {
      wx.showModal({
        title: '提示',
        content: '用户未登录，是否登录？',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        }
      })
      return
    }

    // 已登录跳转到投保页面
    wx.navigateTo({
      url: '../../pages/insured-info/insured-info'
    })
  },

  // 投保页面
  openPricePage() {

    if (!wx.getStorageSync('userInfo')) {
      wx.showModal({
        title: '提示',
        content: '用户未登录，是否登录？',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login'
            })
          }
        }
      })
      return
    }

    // 已登录跳转到微信定价页面
    wx.navigateTo({
      url: '../../pages/wechat-pricing/wechat-pricing'
    })
  },

  // 页面显示时
  onShow: function () {

    // 首次加载
    this.queryPrice()

    setInterval(() => {
      this.queryPrice()
    }, 1000)
    
  },
})