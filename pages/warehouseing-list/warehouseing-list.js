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
    title: '入库列表',
    params: {
      // 当前页码
      currentPage: 1,
      // 每页条数
      pagesize: 10,
      // 快递单号
      courierNumber: '',
      // 客户主键
      customerId: '',
      // 客户名称
      customerName: '',
      // 录入步骤 0投保单 1毛重 2板重 3成色 4确认入库 5已经入库
      enterStep: '',
      // 是否到货 0 已到 1 未到
      isGet: '',
    },
    list: [
      // {
      //   courierNumber: 20495304,
      //   customerId: 1,
      //   customerName: 'niubi',
      //   filialeKey: 'niubi',
      //   enterDesc: 'niubi',
      //   coverDesc: '深圳',
      //   enterTimeRough: '2020-6-25',
      //   enterTimeTidiness: '2020-6-25',
      //   enterTimePut: '2020-6-25',
      //   enterTimeAlloy: '2020-6-25'
      // }
    ]
  },
  
  onLoad() {
    this.queryList()
  },

  // 检测详情
  openDetailPage(e) {
    let params = {
      courierNumber: e.currentTarget.dataset.key
    }

    wx.navigateTo({
      url: '../testing-info/testing-info',
      success: res => {
        res.eventChannel.emit('sendData', { data: params })
      }
    })
  },

  // 查询列表
  queryList() {
    let params = {
      ...this.data.params
    }
    request('customer/instoragelist', params).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
      }
    })
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
})