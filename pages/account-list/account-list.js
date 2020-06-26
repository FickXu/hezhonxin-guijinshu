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
    title: '账单列表',
    params: {
      // 当前页码
      currentPage: 1,
      // 每页条数
      pagesize: 10,
      // 备注
      remark: '',
      // 客户主键
      customerId: '',
      // 客户名称
      customerName: '',
      // 定价类别
      priceListType: '',
      // 开始时间
      startTime: '2020-6-26',
      // 结束时间
      endTime: '2020-6-26',
    },
    list: [
      // {
      //   aaa: 20495304,
      //   aaa: 1,
      //   customerName: 'niubi',
      //   cashInAndOut: 'niubi',
      //   bankCardInAndOut: '已结束',
      //   systemJsinAndOut: '67万',
      //   auInAndOutMaterial: '67万',
      //   ptInAndOutMaterial: '67万',
      //   pdInAndOutMaterial: '67万',
      //   agInAndOutMaterial: '67万',
      //   auPriceNumber: '1000g',
      //   auPricePrice: '67万',
      //   ptPriceNumber: '1000g',
      //   ptPricePrice: '67万',
      //   pdPriceNumber: '1000g',
      //   pdPricePrice: '67万',
      //   agPriceNumber: '1000g',
      //   agPricePrice: '67万',
      //   dealWithAu: '67万',
      //   dealWithPt: '67万',
      //   dealWithPd: '67万',
      //   dealWithAg: '67万',
      //   remark: '1000g',
      // }
    ]
  },
  onLoad() {
    this.queryList()
  },
  
  DateChange(e) {
    this.setData({
      "params.startTime": e.detail.value
    })
  },

  DateChange1(e) {
    this.setData({
      'params.endTime': e.detail.value
    })
  },

  // 查询列表
  queryList() {
    let params = {
      ...this.data.params
    }
    request('customer/billlist', params).then(res => {
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

  // 选择压料状态
  bindchange(e) {
    console.log(e.detail.value)
    this.setData({
      'params.priceListType': e.detail.value
    })
  }
})