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
    // 大写保额
    uppercaseCharacters: '',
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
      // 客户名称
      customerName: '',
      // 收件人
      recipients: '',
      // 目的港
      destinationPort: '',
      // 保险费率
      premiumRate: '',
      // 件数
      casesNumber: 1,
      // 被保险人
      theInsured: ''
    }
  },
  onLoad() {
     // 获取小程序页面基本参数
     request('base/info').then(res => {
      console.log(res)
      if (res.data.code === 0) {
        let data = res.data.data
        this.setData({
          'params.customerName': app.globalData.userInfo.name,
          'params.recipients':data.recipients,
          'params.theInsured':data.recipients,
          'params.destinationPort': data.destinationPort,
          'params.premiumRate': data.premiumRate
        })
      }
    })
  },

  // 用户输入时
  bindInput(e) {
    let key = e.currentTarget.dataset.key
    let value = e.detail.value
    
    // 处理大写保额
    if (key === 'coverage') {
      let uppercaseCharacters = this.convertCurrency(value)
      this.setData({
        uppercaseCharacters: uppercaseCharacters
      })
    }

    // 处理保费
    if (key === 'coverage') {
      let premium = value * this.data.params.premiumRate
      this.setData({
        'params.premium': this.substr(premium)
      })
    }

    let params = {
      ...this.data.params,
    }
    params[key] = value
    this.setData({
      params: params
    })
  },

  // 提交投保信息
  confirmInsured() {
    let params = {
      ...this.data.params
    }
    request('customer/insure', params).then(res => {
      if (res.data.code === 0) {
        wx.showToast({
          title: '投保成功',
          success() {
            setTimeout(() => {
              wx.navigateBack()
            }, 1500);
          }
        })
      }
    })
  },

  // 仅截取不四舍五入
  substr(c) {
    let arr = c.toString().split('.')
    arr[1] = arr[1].substr(0, 2)
    return arr.join('.')
  },

  /**
 * 数字转人民币大写
 */
  convertCurrency(currencyDigits) {
    var currencyDigitsStr="";
    if(0>parseFloat(currencyDigits)){
      currencyDigitsStr="负";
      currencyDigits=currencyDigits.substring(1, currencyDigits.length);
    }	
    var MAXIMUM_NUMBER = 99999999999.99;  //最大值
    // 定义转移字符
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "贰";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陆";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "万";
    var CN_HUNDRED_MILLION = "亿";
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "整";

    // 初始化验证:
    var integral, decimal, outputCharacters, parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d;
    var quotient, modulus;

  
    parts = currencyDigits.split(".");
    if (parts.length > 1) {
        integral = parts[0];
        decimal = parts[1];
        decimal = decimal.substr(0, 2);
    }
    else {
        integral = parts[0];
        decimal = "";
    }
    // 实例化字符大写人民币汉字对应的数字
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
    decimals = new Array(CN_TEN_CENT, CN_CENT);
    
    outputCharacters = "";
    //大于零处理逻辑
    if (Number(integral) > 0) {
        zeroCount = 0;
        for (i = 0; i < integral.length; i++) {
            p = integral.length - i - 1;
            d = integral.substr(i, 1);
            quotient = p / 4;
            modulus = p % 4;
            if (d == "0") {
                zeroCount++;
            }
            else {
                if (zeroCount > 0) {
                    outputCharacters += digits[0];
                }
                zeroCount = 0;
                outputCharacters += digits[Number(d)] + radices[modulus];
            }
            if (modulus == 0 && zeroCount < 4) {
                outputCharacters += bigRadices[quotient];
            }
        }
        outputCharacters += CN_DOLLAR;
    }
    // 包含小数部分处理逻辑
    if (decimal != "") {
        for (i = 0; i < decimal.length; i++) {
            d = decimal.substr(i, 1);
            if (d != "0") {
                outputCharacters += digits[Number(d)] + decimals[i];
            }
        }
    }
    //确认并返回最终的输出字符串
    if (outputCharacters == "") {
        outputCharacters = CN_ZERO + CN_DOLLAR;
    }
    if (decimal == "") {
        outputCharacters += CN_INTEGER;
    }

    //返回人民币大写
    return currencyDigitsStr+outputCharacters
  }

})