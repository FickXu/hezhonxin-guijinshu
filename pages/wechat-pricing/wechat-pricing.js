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
    title: '微信定价',
    date: '2020-6-20',
    date1: '2020-6-20',
    // 保证金结余
    marginBalance: '',
    // 黄金应付料库存
    stockAu: '',
    // 铂金应付料库存
    stockPt: '',
    // 钯金应付料库存
    stockPd: '',
    // 白银应付料库存
    stockAg: '',
    name: '',
    params: {
      auPriceWeight: '',
      ptPriceWeight: '',
      pdPriceWeight: '',
      agPriceWeight: '',
      // 定价单类型
      priceListType: '',
      // 定价单类型名称
      priceListTypeName: '',
    }
  },
  onLoad() {
    this.setData({
      name: wx.getStorageSync('userInfo').name
    })
  },
  
  // 单选按钮
  bindchange(e) {
    let value = e.detail.value
    this.setData({
      'params.priceListType': value,
      'params.priceListTypeName': value === 'dr' ? '回购' : (value === 'dc' ? '销售' : '')
    })
  },
  
  // 用户输入时
  bindinput(e) {
    let key = e.currentTarget.dataset.key
    let value = e.detail.value
    console.log(key, value)
    let params = {
      ...this.data.params,
    }
    params[key] = value
    this.setData({
      params: params
    })
  },

  // 定价
  confirmPrice() {
    let params = {
      ...this.data.params
    }

    request('customer/pricelistadd', params).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg
        })
        wx.navigateBack()
      }
    })
  },

  onShow() {
    // 定价-前提
    request('customer/pricelistpremise').then(res => {
      if (res.data.code === 0) {
        this.setData({
          marginBalance: res.data.data.marginBalance,
          stockAu: res.data.data.stockAu,
          stockPt: res.data.data.stockPt,
          stockPd: res.data.data.stockPd,
          stockAg: res.data.data.stockAg,
        })
      }
    })
  },
  
})