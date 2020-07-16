import request from '../api/request'

var WXBizDataCrypt = require('../../RdWXBizDataCrypt/RdWXBizDataCrypt.js')

const app = getApp()

Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    loginPageInfo: {
      iconUrl: '../images/logo.png',
      title: '登录',
    },
    params: {
      password: '111111',
      filialeKey: app.globalData.filialeKey,
      userAccount: 'SZHZX001071',
    }
  },

  // 用户输入事件
  bindinput(e) {
    let key = e.currentTarget.dataset.key
    let value = e.detail.value

    let obj = {
      ...this.data.params
    }
    obj[key] = value

    this.setData({
      params: obj
    })
  },

  // 用户登录
  bindgetuserinfo(e) {
    this._getUserInfo()
  },

  userLogin() {

    request('base/login', this.data.params).then(res => {
      if (res.data.code === 0) {
        console.log(res.data.data)
  
        // 缓存到全局
        app.globalData.userInfo = res.data.data
        // 缓存到本地存储
        wx.setStorage({
          key: 'userInfo',
          data: res.data.data
        })
        // {name: "戴宇斌测试", headPortrait: null, sex: 0, age: null, birthday: ""}
        wx.showToast({
          icon: 'success',
          title: '登录成功',
          success() {
            setTimeout(() => {
              wx.navigateBack()
            }, 1500);
          }
        })
      }
    })
  },

  // 微信登录获取code
  _wxLogin: function() {
    return new Promise((resolve, reject) => {
      // 微信登录获取code
      wx.login({
        success: res => {
          let params = {
            code: res.code
          }
          // 通过code获取session_key和openid
          request('base/miniLogin', params).then(res => {
            if (res.data.code == 0) {
              let data = JSON.parse(res.data.data)
              resolve(Object.assign(params, data))
            } else {
              reject(res)
            }
          })
        }
      })
    })
  },
  // 微信登录
  _getUserInfo: function() {
    let self = this

    self._wxLogin().then(res => {
      // 缓存到本地的openId，持久化登录
      wx.setStorage({
        key: 'openId',
        data: res.openid
      })

      // 全局缓存openId，接口调用使用
      app.globalData.openId = res.openid

      // 登录
      self.userLogin()

    })
  },
})