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
    title: '投保信息',
    params: {
      // 快递单号
      courierNumber: '',
      // 起运港
      shipmentPort: '',
      // 保额
      coverage: '',
      // 保费
      premium: '',
      // 备注
      coverDesc: '',
    }
  },
  onLoad() {
  },
  // 输入要求
  textareaBInput(e) {}
})