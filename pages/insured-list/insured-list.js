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
    title: '投保列表',
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
      //   insureType: 'niubi',
      //   shipmentPort: '深圳',
      //   destinationPort: '杭州',
      //   coverage: '100万',
      //   premium: '10万',
      //   inStorageDesc: '谁看得见',
      //   premium: '10万',
      //   createDate: '2020-6-25'
      // }
    ]
  },
  onLoad() {
    this.queryList()
  },

  // 查询列表
  queryList() {
    let params = {
      ...this.data.params
    }
    request('customer/insurelist', params).then(res => {
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