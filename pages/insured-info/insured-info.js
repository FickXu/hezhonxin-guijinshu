import request from '../api/request'

const app = getApp();
// pages/home/home.js
Page({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '投保信息',
    params: {
      // 快递单号
      courierNumber: '',
      // 起运港
      shipmentPort: '',
      // 保额
      coverage: '',
      // 保费
      premium: '',
      // 备注
      coverDesc: '',
      // 客户名称
      customerName: '',
      // 收件人
      recipients: '',
      // 目的港
      destinationPort: '',
      // 保险费率
      premiumRate: '',
      // 件数
      casesNumber: 1
    }
  },
  onLoad() {
    console.log(app.globalData.userInfo.name)
    this.setData({
      'params.customerName': app.globalData.userInfo.name,
      'params.recipients': app.globalData.userInfo.recipients || '战三',
      'params.destinationPort': app.globalData.userInfo.destinationPort || '东三',
      'params.premiumRate': app.globalData.userInfo.premiumRate || '2'
    })
    // console.log(app.globalData.userInfo.name)
  },

  // 用户输入时
  bindInput(e) {
    let key = e.currentTarget.dataset.key
    let value = e.detail.value
    // console.log(key, value)
    let params = {
      ...this.data.params,
    }
    params[key] = value
    this.setData({
      params: params
    })
  },

  // 提交投保信息
  confirmInsured() {
    let params = {
      ...this.data.params
    }
    request('customer/insure', params).then(res => {
      if (res.data.code === 0) {
        wx.showToast({
          title: '投保成功',
          success() {
            setTimeout(() => {
              wx.navigateBack()
            }, 1500);
          }
        })
      }
    })
  }
})