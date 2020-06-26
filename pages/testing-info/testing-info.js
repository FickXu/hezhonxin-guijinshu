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
    title: '检测详情',
    detail: {}
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendData', function(data) {
      let params = {
        ...data.data
      }
      request('customer/instorageinfo', params).then(res => {
        if (res.data.code == 0) {
          this.setData({
            detail: res.data.data
          })
        }
      })
    })
  },
})