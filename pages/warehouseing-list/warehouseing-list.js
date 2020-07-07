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
    title: '入库列表',
    params: {
      // 当前页码
      currentPage: 1,
      // 每页条数
      pagesize: 10,
      // 快递单号
      courierNumber: '',
      // 备注
      coverDesc: '',
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

    console.log(this.data.params.currentPage)

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
      if (res.data.code == 0 && res.data.data.length > 0) {
        let arr = []
        if (this.data.params.currentPage == 1) {
          arr = res.data.data
          arr.forEach(item => {
            item.enterTimePut = formatTime(new Date(item.enterTimePut))
          })
        } else {
          arr = this.data.list
          let _arr = res.data.data
          _arr.forEach(item => {
            item.enterTimePut = formatTime(new Date(item.enterTimePut))
          })
          arr.push(_arr)
        }
        this.setData({
          list: arr
        })
        console.log('==================', this.data.list)
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