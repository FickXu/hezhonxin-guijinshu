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
      password: '2eq34213',
      filialeKey: app.globalData.filialeKey,
      userAccount: 'SZHZX001071',
      openId: '2342342534534',
    }
  },

  // 用户登录
  userLogin() {
    let params = this.data.params
    request('base/login', params).then(res => {
      if (res.data.code === 0) {
        console.log(res.data.data)

        // 缓存到全局
        app.globalData.userInfo = res.data.data
        // 缓存到本地存储
        wx.setStorage()
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
  // 微信登录
  _getUserInfo: function() {
    let self = this

    self._wxLogin().then(res => {
      let _encryptedData = self.data.loginPageInfo.encryptedData
      let _iv = self.data.loginPageInfo.iv
      
      let userInfo = self.customerAuthor(_encryptedData, _iv, res)
      console.log('解密后的用户信息：', userInfo)

      // 缓存到本地的openId，持久化登录
      wx.setStorage({
        key: 'openId',
        data: userInfo.openId
      })

      // 登录信息缓存到本地（个人信息页获取）
      wx.setStorage({
        key: 'userInfo',
        data: userInfo
      })

      // 全局缓存openId，接口调用使用
      app.globalData.openId = userInfo.openId

      // 弹出手机号授权确认
      self.setData({
        isAuthorPhone: true,
        // 写入用户信息
        userInfo: userInfo
      })
    })
  },
})