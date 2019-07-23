export default [
    {
        title: "订单管理",
        name: "order",
        url:'',
        children: [
            {
                title: "订单列表",
                name: "order-list",
                config: {
                    url: "/merchant/depositlist",
                    formList: [
                        // {
                        //     type: "date",
                        //     labal: "开始时间",
                        //     name: "begin_time",
                        //     func: (callback: Function) => (callback ? callback() : null)
                        // },
                        {
                           type: 'text',
                           laybel: '测试输入框',
                           name: 'tes_input',
                           value:'',
                           regx: null,
                           required: false,
                           func: (callback: Function) => (callback ? callback() : null)
                        },
                        {
                            type: 'select',
                            value: {
                                id: 0,
                                value: "alipay",
                                label: "支付宝订单"
                            },
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
                            label: '下发时间',
                            value: ['', ''],
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
                        }, 
                    ],
                }
            },
            {
                title: "订单历史",
                name: "order-history"
            },
            {
                title: "帐变列表",
                name: "order-change"
            }
        ]
    },
    {
        title: "下发管理",
        name: "dispatch",
        children: [
            {
                title: "下发申请",
                name: "dispatch-apply"
            },
            {
                title: "下发列表",
                name: "dispatch-list"
            },
            {
                title: "下发银行卡管理",
                name: "dispatch-bankcard"
            }
        ]
    },
    {
        title: "公告管理",
        name: "info"
        // children: [
        //   {
        //     title: "下发列表",
        //     name: "dispatch-list"
        //   },
        //   {
        //     title: "下发历史",
        //     name: "dispatch-history"
        //   }
        // ]
    },
    {
        title: "用户管理",
        name: "admin",
        children: [
            {
                title: "用户注册",
                name: "user-signup"
            },
            {
                title: "用户列表",
                name: "user-list"
            }
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
