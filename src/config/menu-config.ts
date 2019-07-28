export class FormatDate {
  date: any = "";
  constructor() {}
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
        baserouteurl: "/home/table",
        config: {
          apiurl: "/merchant/depositlist?",
          formList: [
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
        keyMap: {
          id: "订单ID",
          listtype: "订单类型",
          amount: "订单ID",
          payamount: "支付金额",
          fee: "手续费",
          liststatus: "保证金",
          createtime: "虚拟金币余额",
          updatetime: "订单ID",
          merchantno: "下单时间",
          systemno: "累计手续费",
          userid: "状态"
        }
      },
      // {
      //     title: "订单历史",
      //     name: "order-history"
      // baserouterl:'/home/table',
      // },
      {
        title: "帐变列表",
        name: "order-change",
        baserouteurl: "/home/table",
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
        keyMap: {
          userid: "商户id",
          account: "订单金额",
          merchantno: "商户订单号",
          systemno: "平台订单号",
          createtime: "日期",
          listtype: "	交易类型",
          channelname: "渠道",
          withdraw: "	提交金额",
          changecash: "变动金额",
          balance: "	账户余额"
        }
      }
    ]
  },
  {
    title: "下发管理",
    name: "dispatch",
    children: [
      // {
      //     title: "下发申请",
      //     name: "dispatch-apply"
      // },
      {
        title: "开户信息列表",
        name: "user-info-list",
        baserouteurl: "/home/table",
        config: {
          apiurl: "/merchant/userquery?",
          formList: [
            // {
            //   type: "text",
            //   label: "merchantno",
            //   name: "bankno",
            //   value: "",
            //   regx: null,
            //   required: false,
            //   func: (callback: Function) => (callback ? callback() : null)
            // },
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
          status: "状态"
        }
      },
      {
        title: "下发列表",
        name: "dispatch-list",
        baserouteurl: "/home/table",
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
        keyMap: {
          account: "申请平台",
          merchantno: "商户号",
          amount: "下发金额",
          cardno: "银行卡号",
          bankname: "银行名称",
          cardhold: "账户名称",
          bankaddress: "开户行地址",
          status: "下发状态",
          createtime: "申请时间",
          publisher: "下发操作人",
          updatetime: "下发时间"
        }
      },
      {
        title: "下发银行卡管理",
        name: "dispatch-bankcard",
        baserouteurl: "/home/table",
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
              name: "bankhold",
              value: "",
              regx: null,
              required: false,
              func: (callback: Function) => (callback ? callback() : null)
            }
          ]
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
          bak: "备注"
        }
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
        baserouteurl: "/home/table",
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
          title: "标题",
          content: "内容",
          createtime: "发布时间",
          updatetime: "更新时间",
          publisher: "发布人",
          updateer: "更新人"
        }
      }
      //   {
      //     title: "下发历史",
      //     name: "dispatch-history"
      //   }
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
        baserouteurl: "/home/table",
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
        keyMap: {
          deposittype: "支付类型",
          depositamount: "订单金额",
          payamount: "支付金额",
          fee: "手续费",
          createtime: "申请时间",
        }
      }
      // {
      //   title: "用户列表",
      //   name: "user-list"
      // }
    ]
  }
  // {
  //   title: "公告列表",
  //   name: "list",
  //   children: [
  //     {
  //       title: "下发列表",
  //       name: "dispatch-list"
  //     },
  //     {
  //       title: "下发历史",
  //       name: "dispatch-history"
  //     }
  //   ]
  // }
];
