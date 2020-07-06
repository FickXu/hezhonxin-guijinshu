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
    title: '定价列表',
    params: {
      // 当前页码
      currentPage: 1,
      // 每页条数
      pagesize: 10,
      // 定价单号
      priceListNo: '',
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
      {
        priceListNo: 20495304,
        customerId: 1,
        customerName: 'niubi',
        filialeKey: 'niubi',
        priceListStatueName: '已结束',
        drauPrice: '67万',
        drauPriceWeight: '1000g',
        drptPrice: '67万',
        drptPriceWeight: '1000g',
        drpdPrice: '67万',
        drpdPriceWeight: '1000g',
        dragPrice: '67万',
        dragPriceWeight: '1000g',
        dcauPrice: '67万',
        dcauPriceWeight: '1000g',
        dcptPrice: '67万',
        dcptPriceWeight: '1000g',
        dcpdPrice: '67万',
        dcpdPriceWeight: '1000g',
        dcagPrice: '67万',
        dcagPriceWeight: '1000g',
      }
    ],
    rtStatus: false
  },
  
  onLoad() {
    this.queryList()
  },

  DateChange(e) {
    this.setData({
      'params.startTime': e.detail.value
    })
  },

  DateChange1(e) {
    this.setData({
      'params.endTime': e.detail.value
    })
  },

  // 离开顶部时触发
  bindrefresherpulling() {
    this.setData({
      'params.currentPage': 1,
      'params.pagesize': 10,
      'params.priceListNo': '',
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
    // console.log(this.data.params.currentPage)

    // let arr = this.data.list
    // arr.push(this.data.list[0])
    // this.setData({
    //   list: arr
    // })
  },
  
  // 查询列表
  queryList() {
    let params = {
      ...this.data.params
    }
    request('customer/pricelistlist', params).then(res => {
      if (res.data.code == 0 && res.data.data.length > 0) {
        let arr = []
        if (this.data.params.currentPage == 1) {
          arr = res.data.data
        } else {
          arr = this.data.list
          arr.push(res.data.data)
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