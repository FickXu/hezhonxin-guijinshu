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
    title: '压料列表',
    params: {
      // 当前页码
      currentPage: 1,
      // 每页条数
      pagesize: 10,
      // 压料单号
      pressureOrderNo: '',
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
      //   pressureOrderNo: 24534534,
      //   customerName: 'fick',
      //   pressureTypeName: '钯金',
      //   pressureAmount: 24534534,
      //   aa: 24534534,
      //   bb: 24534534,
      //   interestStartTime: '2020-6-26',
      //   interestEndTime: '2020-6-26',
      //   interestRate: 24534534,
      //   interest: 24534534,
      //   pressureStatus: 24534534,
      //   pressureOrderNo: 24534534,
      //   remark: 24534534,
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
    request('customer/pressureorderlist', params).then(res => {
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