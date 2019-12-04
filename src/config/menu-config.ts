export class FormatDate {
	date: any = "";
	constructor() { }
	result(date: any) {
		this.date = new Date();
		var y = this.date.getFullYear();
		var m = this.date.getMonth() + 1;
		var d = this.date.getDate();
		m = m < 10 ? "0" + m : m;
		d = d < 10 ? "0" + d : d;
		return y + "-" + m + "-" + d;
	}
}
let formatDate = new FormatDate();

export default [
	{
		title: "订单管理",
		name: "order",
		children: [
			{
				title: "订单列表",
				name: "order-list",
				baserouteurl: "/home/order-list",
				config: {
					apiurl: "/merchant/depositlist?",
					formList: [
						{
							type: "text",
							label: "商户号",
							name: "merchantno",
							value: "",
							regx: null,
							required: false,
							func: (callback: Function) => (callback ? callback() : null)
						},
						{
							type: "select",
							value: {
								id: 0,
								value: "alipay",
								label: "支付宝订单"
							},
							label: "列表类型",
							name: "listtype",
							changeEvent: (command: any, item: any) => {
								item.value = command;
							},
							option: [
								{
									id: 0,
									value: "alipay",
									label: "支付宝订单"
								},
								{
									id: 1,
									value: "ysf",
									label: "云闪付订单"
								},
								{
									id: 2,
									value: "weixin",
									label: "微信订单"
								},
								{
									id: 3,
									value: "xweixin",
									label: "小额微信订单"
								},
								{
									id: 4,
									value: "xalipay",
									label: "小额支付宝订单"
								},
								{
									id: 5,
									value: "xweixingzh",
									label: "小额微信公众号订单"
								},
								{
									id: 6,
									value: "xalipaywap",
									label: "小额wap支付宝订单"
								},
								{
									id: 7,
									value: "xyinlian",
									label: "小额银联订单"
								},
								{
									id: 8,
									value: "qt",
									label: "其他订单"
								}
							]
						},
						{
							type: "select",
							value: {
								id: 0,
								value: '',
								label: "全部"
							},
							label: "支付状态",
							name: "liststatus",
							changeEvent: (command: any, item: any) => {
								item.value = command;
							},
							option: [
								{
									id: 0,
									value: '',
									label: "全部"
								},
								{
									id: 1,
									value: 1,
									label: "未支付"
								},
								{
									id: 2,
									value: 2,
									label: "已支付"
								},
								{
									id: 3,
									value: 3,
									label: "支付失败"
								}
							]
						},
						{
							type: "date",
							label: "下发时间",
							value: [new Date(), new Date()],
							startDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							endDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							labal: ["开始时间", "结束时间"],
							name: ["begin_time", "end_time"],
							func: [
								(callback: Function) => (callback ? callback() : null),
								(callback: Function) => (callback ? callback() : null)
							]
						}
					]
				},
				listtype: {
					ysf: '云闪付',
					alipay: '支付宝',
					weixin: '微信',
					xweixin: '小额微信订单',
					xalipay: '小额支付宝订单',
					xweixingzh: '小额微信公众号订单',
					xalipaywap: '小额wap支付宝订单',
					xyinlian: '小额银联订单',
					qt: '其他订单'
				},
				liststatus: {
					'1': '未支付',
					'2': '已支付',
					'3': '支付失败'
				},
				keyMap: {
					id: "订单ID",
					listtype: "订单类型",
					amount: "订单金额",
					payamount: "支付金额",
					feepay: "手续费",
					fee: "费率",
					liststatus: "支付状态",
					createtime: "申请时间",
					updatetime: "下单时间",
					merchantno: "商户单号",
					systemno: "系统单号",
					optConfig: {
						show: true,
						name: "操作",
						optList: [
							{
								label: "补单",
								value: "donotify",
								name: 'id',
								apiUrl: "/api/pay/donotify"
							},
						],
						downloadFlag: true,
						downApiUrl: '/merchant/orderdown?'
					}
				}
			},
			{
				title: "帐变列表",
				name: "order-change",
				baserouteurl: "/home/order-change-list",
				config: {
					apiurl: "/merchant/merchantcount?",
					formList: [
						{
							type: "text",
							label: "商户订单号",
							name: "merchantno",
							value: "",
							regx: null,
							required: false,
							func: (callback: Function) => (callback ? callback() : null)
						},
						{
							type: "text",
							label: "平台订单号",
							name: "systemno",
							value: "",
							regx: null,
							required: false,
							func: (callback: Function) => (callback ? callback() : null)
						},
						{
							type: "date",
							label: "下发时间",
							value: [new Date(), new Date()],
							startDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							endDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							labal: ["开始时间", "结束时间"],
							name: ["begin_time", "end_time"],
							func: [
								(callback: Function) => (callback ? callback() : null),
								(callback: Function) => (callback ? callback() : null)
							]
						}
					]
				},
				// listtype:  {
				//   ysf: '云闪付',
				//   alipay: '支付宝',
				//   weixin: '微信'
				// },
				// liststatus: {
				//   "1": '订单结算',
				//   "2": "下发结算",
				// },
				keyMap: {
					userid: "商户id",
					account: "订单金额",
					merchantno: "商户订单号",
					systemno: "平台订单号",
					createtime: "日期",
					listtype: "交易类型",
					// liststatus: "交易状态",
					channelname: "渠道",
					withdraw: "提交金额",
					changecash: "变动金额",
					balance: "账户余额",
					optConfig: {
						show: false,
						name: "操作",
						optList: [],
						downloadFlag: false,
						downApiUrl: ''
					}
				}
			}
		]
	},
	{
		title: "下发管理",
		name: "dispatch",
		children: [
			{
				title: "下发申请",
				name: "dispatch-apply",
				baserouteurl: "/home/dispatch-apply",
			},
			{
				title: "下发列表",
				name: "dispatch-list",
				baserouteurl: "/home/dispatch-list",
				config: {
					apiurl: "/merchant/withdrawlist?",
					formList: [
						{
							type: "text",
							label: "商户订单号",
							name: "merchantno",
							value: "",
							regx: null,
							required: false,
							func: (callback: Function) => (callback ? callback() : null)
						},
						{
							type: "date",
							label: "下发时间",
							value: [new Date(), new Date()],
							startDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							endDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							labal: ["开始时间", "结束时间"],
							name: ["begin_time", "end_time"],
							func: [
								(callback: Function) => (callback ? callback() : null),
								(callback: Function) => (callback ? callback() : null)
							]
						}
					]
				},
				status: {
					'1': '未审核',
					'2': '审核通过',
					'3': '审核失败'
				},
				keyMap: {
					account: "申请平台",
					merchantno: "商户号",
					amount: "下发金额",
					bankcard: "银行卡号",
					bankname: "银行名称",
					cardhold: "账户名称",
					bankaddress: "开户行地址",
					status: "下发状态",
					createtime: "申请时间",
					publisher: "下发操作人",
					// updatetime: "下发时间",
					optConfig: {
						show: false,
						name: "操作",
						optList: [],
						downloadFlag: false,
						downApiUrl: ''
					}
				}
			},
			{
				title: "下发银行卡管理",
				name: "dispatch-bankcard",
				baserouteurl: "/home/dispatch-bankcard-list",
				config: {
					apiurl: "/merchant/withdrawbank?",
					formList: [
						{
							type: "text",
							label: "银行卡号",
							name: "bankno",
							value: "",
							regx: null,
							required: false,
							func: (callback: Function) => (callback ? callback() : null)
						},
						{
							type: "text",
							label: "账户名",
							name: "cardhold",
							value: "",
							regx: null,
							required: false,
							func: (callback: Function) => (callback ? callback() : null)
						}
					]
				},
				status: {
					'1': '未审核',
					'2': '审核通过',
					'3': '审核失败'
				},
				keyMap: {
					account: "申请平台",
					merchantno: "商户号",
					cardno: "银行卡号",
					bankname: "银行名称",
					cardhold: "账户名称",
					bankaddress: "开户行地址",
					status: "下发状态",
					createtime: "申请时间",
					bak: "备注",
					optConfig: {
						show: true,
						name: "操作",
						optList: [
							{
								label: "弃用",
								value: "drop",
								name: 'cardno',
								apiUrl: "/merchant/bankcancel"
							},
							{
								label: "删除",
								value: "delete",
								name: 'cardno',
								apiUrl: "/merchant/bankdel"
							}
						],
						downloadFlag: false,
						downApiUrl: ''
					}
				},

			}
		]
	},
	{
		title: "公告管理",
		name: "info",
		children: [
			{
				title: "公告列表",
				name: "info-list",
				baserouteurl: "/home/info-list",
				config: {
					apiurl: "/merchant/notice?",
					formList: [
						{
							type: "text",
							label: "公告标题",
							name: "title",
							value: "",
							regx: null,
							required: false,
							func: (callback: Function) => (callback ? callback() : null)
						},
						{
							type: "date",
							label: "公告时间段",
							value: [new Date(), new Date()],
							startDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							endDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							labal: ["开始时间", "结束时间"],
							name: ["begin_time", "end_time"],
							func: [
								(callback: Function) => (callback ? callback() : null),
								(callback: Function) => (callback ? callback() : null)
							]
						}
					]
				},
				keyMap: {
					infotitle: "标题",
					content: "内容",
					createtime: "发布时间",
					updatetime: "更新时间",
					publisher: "发布人",
					updateer: "更新人",
					optConfig: {
						show: false,
						name: "操作",
						optList: [],
						downloadFlag: false,
						downApiUrl: ''
					}
				},
			}
		]
	},
	{
		title: "用户管理",
		name: "manage-user",
		children: [
			{
				title: "用户注册",
				name: "user-register",
				baserouteurl: "/home/register"
			},
			{
				title: "商户流量统计",
				name: "state-countup",
				baserouteurl: "/home/data-countup",
				config: {
					apiurl: "/merchant/statistics?",
					formList: [
						{
							type: "date",
							label: "统计时间段",
							value: [new Date(), new Date()],
							startDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							endDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							labal: ["开始时间", "结束时间"],
							name: ["begin_time", "end_time"],
							func: [
								(callback: Function) => (callback ? callback() : null),
								(callback: Function) => (callback ? callback() : null)
							]
						}
					]
				},
				deposittype: {
					ysf: '云闪付',
					alipay: '支付宝',
					weixin: '微信'
				},
				keyMap: {
					deposittype: "支付类型",
					depositamount: "订单金额",
					payamount: "支付金额",
					fee: "手续费",
					createtime: "申请时间",
					optConfig: {
						show: false,
						name: "操作",
						optList: [],
						downloadFlag: false,
						downApiUrl: ''
					}
				}
			},
			{
				title: "用户列表",
				name: "user-list",
				baserouteurl: "/home/user-list",
				config: {
					apiurl: "/merchant/userquery?",
					formList: [
						{
							type: "date",
							label: "开户时间段",
							value: [new Date(), new Date()],
							startDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							endDateChange: (event: Date, val: any) => {
								// val = event.toLocaleDateString().replace(/\//g, "-")
							},
							labal: ["开始时间", "结束时间"],
							name: ["begin_time", "end_time"],
							func: [
								(callback: Function) => (callback ? callback() : null),
								(callback: Function) => (callback ? callback() : null)
							]
						}
					]
				},
				keyMap: {
					account: "公司名称",
					username: "用户名",
					deposit_key: "充值密钥",
					withdraw_key: "提现密钥",
					create_up: "创建时间",
					update_up: "更新时间",
					mail: "邮箱地址",
					phone: "手机号码",
					merchant_no: "商户号",
					status: "状态",
					optConfig: {
						show: false,
						name: "操作",
						optList: [],
						downloadFlag: false,
						downApiUrl: ''
					}
				},
				status: {
					'1': '启用',
					'-1': '未启用'
				}
			},
			{
				title: "费率管理",
				name: "fee-rate-manager",
				baserouteurl: "/home/fee-rate-manager",
			}

		]
	},
	
];
