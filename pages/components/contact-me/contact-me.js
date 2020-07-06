import request from '../../api/request'

const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
      loginPageInfo: {
        iconUrl: '../../images/logo1.png',
        title: '联系我们',
      },
      logoImg: "https://www.hzx9999.com/file/base/logo/SZHZX.jpg",
      qqNumber: "",
      companyProfile: "",
      mobileNumber: "",
      wechatNumber: ""
  },
  ready () {
    // 获取小程序页面基本参数
    request('base/info').then(res => {
      console.log(res)
      if (res.data.code === 0) {
        let data = res.data.data
        this.setData({
          logoImg: data.logoImg,
          qqNumber: data.qqNumber,
          companyProfile: data.companyProfile,
          mobileNumber: data.mobileNumber,
          wechatNumber: data.wechatNumber
        })
        // appId: "wx838aed569cf27546"
        // appSecret: "5470343563c3212a2f7d7b7c040c8bf7"
        // companyProfile: null
        // destinationPort: ""
        // filialeKey: "SZHZX"
        // isInsure: 1
        // isPricing: 1
        // mobileNumber: ""
        // premiumRate: 0.0004
        // qqNumber: ""
        // recipients: ""
        // wechatNumber: ""
      }
    })
  },
  methods: {
    // 输入事件
    bindinput: function(e) {
        this.data.iptTxt = e.detail.value;
        console.log('lll：', this.data.iptTxt);
    },
    // 打电话
    callPhone: function(e) {
        let txt = e.currentTarget.dataset.text
        wx.makePhoneCall({
        phoneNumber: txt //仅为示例，并非真实的电话号码
        })
    },
    // 复制文本
    copyText: function(e) {
        let txt = e.currentTarget.dataset.text
        wx.setClipboardData({
            data: txt,
            success (res) {
              wx.getClipboardData({
                success (res) {
                  console.log(res.data) // data
                }
              })
            }
        })
    }
  }
})