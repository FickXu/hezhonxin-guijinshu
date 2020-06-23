import request from '../api/request'

var WXBizDataCrypt = require('../../RdWXBizDataCrypt/RdWXBizDataCrypt.js')

const app = getApp()

Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    loginPageInfo: {
      iconUrl: '../images/logo1.png',
      title: '登录',
      btnText: '微信用户快捷登录',
      // sessionKey: ''
      // 用户加密信息
      encryptedData: '',
      // 加密算法的初始向量
      iv: ''
    },
    isAuthorPhone: false,
    buttons:[
      {
        type: 'primary',
        className: '',
        text: '同意',
        value: 0
      }
    ],
    // 是否显示用户信息授权按钮
    isAuth: false,
    // 用户信息
    userInfo: {},
    // 手机号码信息
    phoneInfo: {}
  },
  bindgetuserinfo: function(e) {
    // console.log('我是授权按钮：', e.detail)

    this.setData({
      'loginPageInfo.encryptedData': e.detail.encryptedData,
      'loginPageInfo.iv': e.detail.iv
    })
  
    this._getUserInfo()
  },
  // 获取用户授权
  customerAuthor(encryptedData, iv, data) {
    let params = {
      appid: 'wx6ccf702132ec39f4',
      secret: '2a0e2b2f99a9bbb2cf7cffa23a261cae',
      grant_type: 'authorization_code',
      js_code: data.code
    }

    let pc = new WXBizDataCrypt(data.appid, data.session_key)
    let userInfo = pc.decryptData(encryptedData, iv)
    
    return userInfo
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
          request('wechatapplet/miniLogin', params, 'GET').then(res => {
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
  // 获取手机号
  getPhoneNumber(e) {
    let self = this

    self._wxLogin().then(res => {
      let _encryptedData = e.detail.encryptedData
      let _iv = e.detail.iv
      let phoneInfo = self.customerAuthor(_encryptedData, _iv, res)

      // console.log('解密后的手机号：', phoneInfo)
      // 解密后关闭弹窗
      self.setData({
        isAuthorPhone: false
      })

      // 用户注册
      let params = {
        city: self.data.userInfo.city,
        gender: self.data.userInfo.gender,
        headPortrait: self.data.userInfo.avatarUrl,
        nickName: self.data.userInfo.nickName,
        openId: self.data.userInfo.openId,
        province: self.data.userInfo.province,
        phoneNumber: phoneInfo.phoneNumber
      }
      // console.log('用户注册信息：', params)
      request('wechatapplet/registered', params).then(res => {
        if (res.data.code == 0) {
          
          let loginInfo = {
            status: 200
          }
          self.triggerEvent('login', loginInfo)
        }
      })

    })
  }
})