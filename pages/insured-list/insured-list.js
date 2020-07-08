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
    title: '投保列表',
    params: {
      // 当前页码
      currentPage: 1,
      // 每页条数
      pagesize: 10,
      // 快递单号
      courierNumber: '',
      // 备注
      coverDesc: ''
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
    ],
    rtStatus: false
  },
  onLoad() {
    this.queryList()
  },

  // 离开顶部时触发
  bindrefresherpulling() {
    this.setData({
      'params.currentPage': 1,
      'params.pagesize': 10,
      'params.coverDesc': '',
      'params.courierNumber': '',
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
    request('customer/insurelist', params).then(res => {
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
})