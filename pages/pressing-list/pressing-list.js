import request from '../api/request'
import {formatTime} from '../../utils/util'

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
      startTime: '',
      // 结束时间
      endTime: '',
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

   // 离开顶部时触发
   bindrefresherpulling() {
    this.setData({
      'params.currentPage': 1,
      'params.pagesize': 10,
      'params.pressureOrderNo': '',
      'params.customerId': '',
      'params.customerName': '',
      'params.priceListType': '',
      'params.startTime': '',
      'params.endTime': '',
    })

    setTimeout(() => {
      this.setData({
        rtStatus: false
      })
    }, 2000);
    this.queryList()
  },
  
  // 滚动到底部时触发
  bindscrolltolower() {
    this.setData({
      'params.currentPage': ++this.data.params.currentPage,
    })

    this.queryList()
  },

  // 查询列表
  queryList() {
    let params = {
      ...this.data.params
    }
    request('customer/pressureorderlist', params).then(res => {
      if (res.data.code == 0 && res.data.data.length > 0) {
        let arr = []
        if (this.data.params.currentPage == 1) {
          arr = res.data.data
          arr.forEach(item => {
            item.createDate = formatTime(new Date(item.createDate))
          })
        } else {
          let _arr = res.data.data
          _arr.forEach(item => {
            item.createDate = formatTime(new Date(item.createDate))
          })
          arr = [].concat(this.data.list, _arr)
        }
        this.setData({
          list: arr
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