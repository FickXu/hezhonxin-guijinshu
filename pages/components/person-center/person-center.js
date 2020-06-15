// 获取app实例，包含了用户信息和全局方法
const app = getApp();

Component({
	options: {
    addGlobalClass: true,
  },
	data: {
		title: '我的',
		userInfo: {
			avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTINhLTx15w3Bm9iamcriaia0ELLTnyXtUJD9wHibQSOabeVSAqMmaDp8L1zTV1R2DlW9YnI5kOJ1fTlLg/132",
			city: "Shenzhen",
			country: "China",
			gender: 1,
			language: "zh_CN",
			nickName: "Fick",
			province: "Guangdong"
		}
	},
	ready: function () {
		let self = this
		// console.log(app.globalData)
		// let userInfo = {
		// 	avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTINhLTx15w3Bm9iamcriaia0ELLTnyXtUJD9wHibQSOabeVSAqMmaDp8L1zTV1R2DlW9YnI5kOJ1fTlLg/132",
		// 	city: "Shenzhen",
		// 	country: "China",
		// 	gender: 1,
		// 	language: "zh_CN",
		// 	nickName: "Fick",
		// 	province: "Guangdong"
		// }
		
		// wx.getStorage({
		// 	key: 'userInfo',
		// 	success (res) {
		// 		self.setData({
		// 			userInfo: res.data
		// 		})
		// 	}
		// })
	},
	methods: {
		// 跳转页面
		goToPage: function (e) {
			let page_name = e.currentTarget.dataset.pageName
			console.log(page_name)
			wx.navigateTo({
				url: `../../pages/${page_name}/${page_name}`,
				success: function (res) {},
				fail: function (err) {
					console.error(err)
				}
			})
		},
	}
})
