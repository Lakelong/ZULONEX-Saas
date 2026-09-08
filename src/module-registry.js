const field = (key, label, width = 140) => ({ key, label, width })

const commonSummary = (pending, active, total, risk) => [
  { label: '待处理', value: pending, meta: '需要业务人员跟进', tone: 'blue' },
  { label: '正常运行', value: active, meta: '当前有效数据', tone: 'green' },
  { label: '数据总量', value: total, meta: '当前数据范围', tone: 'cyan' },
  { label: '风险提醒', value: risk, meta: '需要重点关注', tone: 'red' }
]

const orderLedgerColumns = [
  field('orderNo', '订单号', 180),
  field('status', '订单状态', 100),
  field('dealer', '经销商', 160),
  field('seller', '销售方', 150),
  field('orderingDealer', '代下单经销商', 170),
  field('plannerRequirement', '是否需要规划师', 130),
  field('source', '来源', 100),
  field('platform', '平台', 90),
  field('batch', '批次', 110),
  field('orderMethod', '下单方式', 100),
  field('parentName', '家长', 100),
  field('parentMobile', '家长手机号', 130),
  field('dealerReferrer', '经销商推荐人', 130),
  field('courseType', '课程类型', 100),
  field('studentName', '学员', 100),
  field('channel', '渠道', 110),
  field('courseName', '课程', 220),
  field('amount', '金额', 110),
  field('paidAmount', '实付金额', 110),
  field('paymentTransactionNo', '支付交易号', 180),
  field('logisticsNo', '物流单号', 160),
  field('allocationStatus', '是否已分配', 110),
  field('deliveryCenter', '交付中心', 150),
  field('hasPad', '含Pad', 80),
  field('firstPurchase', '是否首购', 100),
  field('orderTime', '下单时间', 160),
  field('orderRemark', '订单备注', 220)
]

export const moduleCatalog = [
  {
    key: 'masterdata',
    view: 'registry-masterdata',
    group: '业务台账',
    title: '基础管理',
    description: '统一维护教材、课程、商品、家长、学员和学情基础数据',
    total: 1286,
    summary: commonSummary('36', '1,208', '1,286', '12'),
    submodules: ['教材管理', '课程管理', '知识点管理', '学科商品', '商品套餐', '家长管理', '学员管理', '学情管理'],
    columns: [
      field('code', '业务编码', 150),
      field('name', '名称', 210),
      field('businessType', '数据类型', 120),
      field('subject', '学科', 90),
      field('grade', '适用年级', 110),
      field('stage', '课程阶段', 100),
      field('lessonHours', '课时/规格', 110),
      field('retailPrice', '销售价', 110),
      field('purchasePrice', '采购价', 110),
      field('owner', '维护人', 100),
      field('updatedAt', '更新时间', 140),
      field('status', '状态', 90)
    ],
    rows: [
      {
        id: 'master-1',
        code: 'KC26060018',
        name: '高中数学同步提升课程',
        subject: '数学',
        grade: '高中一年级',
        stage: '正式课',
        lessonHours: '40 课时',
        retailPrice: '¥ 12,800',
        purchasePrice: '¥ 7,400',
        owner: '课程中心',
        updatedAt: '06-28 09:20',
        status: '已上架'
      },
      {
        id: 'master-2',
        code: 'SP26060009',
        name: '初中英语体验课',
        subject: '英语',
        grade: '初中二年级',
        stage: '体验课',
        lessonHours: '1 课时',
        retailPrice: '¥ 99',
        purchasePrice: '¥ 60',
        owner: '商品中心',
        updatedAt: '06-27 17:42',
        status: '已上架'
      },
      {
        id: 'master-3',
        code: 'JC26050031',
        name: '高中物理必修一配套教材',
        subject: '物理',
        grade: '高中一年级',
        stage: '教材',
        lessonHours: '1 套',
        retailPrice: '¥ 199',
        purchasePrice: '¥ 86',
        owner: '教研中心',
        updatedAt: '06-26 14:10',
        status: '待审核'
      }
    ]
  },
  {
    key: 'partnerCenter',
    view: 'registry-partner-center',
    group: '业务台账',
    title: '合作中心',
    description: '管理交付中心、加盟合作、合约、奖励和组织层级',
    total: 468,
    summary: commonSummary('14', '426', '468', '7'),
    submodules: ['交付中心', '线上加盟', '合约管理', '提成奖励', '交付层级', '运营层级', '入驻申请'],
    columns: [
      field('code', '中心/合作方编码', 160),
      field('name', '中心/合作方名称', 220),
      field('businessType', '业务类型', 110),
      field('centerType', '中心类型', 120),
      field('entityType', '主体类型', 100),
      field('region', '经营区域', 150),
      field('address', '详细地址', 220),
      field('owner', '责任人', 100),
      field('mobile', '负责人手机号', 130),
      field('capacity', '可承接学员', 110),
      field('accepting', '是否接单', 90),
      field('userCount', '可用用户', 90),
      field('contractEnd', '合约到期日', 120),
      field('status', '状态', 90)
    ],
    rows: [
      {
        id: 'partner-ledger-1',
        code: 'JF260188',
        name: '总部线上交付中心',
        centerType: '线上交付中心',
        entityType: '公司',
        region: '全国',
        address: '总部业务平台',
        owner: '沈**',
        mobile: '138****2817',
        capacity: '500',
        accepting: '是',
        userCount: '28',
        contractEnd: '2027-12-31',
        remark: '总部线上课程交付',
        status: '激活'
      },
      {
        id: 'partner-ledger-2',
        code: 'JF260229',
        name: '华东线下交付中心',
        centerType: '线下交付中心',
        entityType: '私立',
        region: '浙江 / 江苏',
        address: '浙江省杭州市滨江区',
        owner: '周**',
        mobile: '186****7712',
        capacity: '320',
        accepting: '是',
        userCount: '16',
        contractEnd: '2027-08-18',
        remark: '--',
        status: '激活'
      },
      {
        id: 'partner-ledger-3',
        code: 'HZ2606270048',
        name: '杭州青禾教育',
        centerType: '线上加盟',
        entityType: '有限公司',
        region: '浙江 / 杭州',
        address: '杭州市西湖区',
        owner: '陈**',
        mobile: '138****1024',
        capacity: '待评估',
        accepting: '否',
        userCount: '0',
        contractEnd: '待签约',
        remark: '入驻审核中',
        status: '复审中'
      }
    ]
  },
  {
    key: 'learning',
    view: 'registry-learning',
    group: '业务台账',
    title: '学习中心',
    description: '覆盖体验课、正式课、排课、消课、班级和教师全流程',
    total: 8624,
    summary: commonSummary('28', '7,986', '8,624', '19'),
    submodules: ['体验课管理', '体验课排课', '正式课管理', '教师排课', '排课记录', '消课管理', '学生课程', '部门管理', '班级管理', '教师管理', '我的学员'],
    columns: [
      field('studentNo', '学员编号', 150),
      field('student', '学员', 100),
      field('mobile', '手机号', 130),
      field('businessType', '业务环节', 110),
      field('course', '课程', 200),
      field('gradeSubject', '年级/学科', 140),
      field('teacher', '教师', 100),
      field('className', '班级', 130),
      field('scheduleAt', '上课时间', 150),
      field('lessonHours', '购买课时', 100),
      field('consumedHours', '已消课时', 100),
      field('remainingHours', '剩余课时', 100),
      field('deliveryCenter', '交付中心', 150),
      field('status', '状态', 100)
    ],
    rows: [
      {
        id: 'learning-1',
        studentNo: 'ST2606270188',
        student: '陈**',
        mobile: '138****2817',
        course: '高中数学体验课',
        gradeSubject: '高一 / 数学',
        teacher: '沈老师',
        className: '一对一',
        scheduleAt: '06-28 14:00',
        lessonHours: '1',
        consumedHours: '0',
        remainingHours: '1',
        deliveryCenter: '总部交付中心',
        status: '待上课'
      },
      {
        id: 'learning-2',
        studentNo: 'ST2605200096',
        student: '赵**',
        mobile: '177****4380',
        course: '初中数学正式课',
        gradeSubject: '初三 / 数学',
        teacher: '周老师',
        className: '初三数学 A 班',
        scheduleAt: '06-29 10:00',
        lessonHours: '40',
        consumedHours: '18',
        remainingHours: '22',
        deliveryCenter: '总部交付中心',
        status: '交付中'
      },
      {
        id: 'learning-3',
        studentNo: 'ST2604180032',
        student: '周**',
        mobile: '159****9074',
        course: '小学语文正式课',
        gradeSubject: '六年级 / 语文',
        teacher: '苏老师',
        className: '小升初冲刺班',
        scheduleAt: '07-01 16:00',
        lessonHours: '30',
        consumedHours: '28',
        remainingHours: '2',
        deliveryCenter: '华东交付中心',
        status: '待续课'
      }
    ]
  },
  {
    key: 'onlineOrders',
    view: 'registry-online-orders',
    group: '交易台账',
    title: '线上订单',
    description: '查询线上订单、退货售后和特殊订单',
    total: 2335,
    summary: commonSummary('12', '2,286', '2,335', '7'),
    submodules: ['订单查询', '退货管理', '特殊订单'],
    columns: orderLedgerColumns,
    rows: [
      {
        id: 'online-order-ledger-1',
        orderNo: 'ZL52809199884812',
        status: '待支付',
        dealer: '杭州青禾教育',
        seller: '总部商城',
        orderingDealer: '--',
        plannerRequirement: '手动指定',
        source: '线上订单',
        platform: '小程序',
        batch: '202606-A',
        orderMethod: '家长',
        parentName: '陈家长',
        parentMobile: '138****2817',
        dealerReferrer: '陈老师',
        courseType: '正式课',
        studentName: '陈同学',
        channel: '线上商城',
        courseName: '高中数学正式课 40 课时',
        amount: '¥ 12,800',
        paidAmount: '¥ 12,800',
        paymentTransactionNo: '20260627****8621',
        logisticsNo: '--',
        allocationStatus: '未分配',
        deliveryCenter: '--',
        hasPad: '否',
        firstPurchase: '是',
        orderTime: '2026-06-27 09:26',
        orderRemark: '支付状态待人工核验'
      },
      {
        id: 'online-order-ledger-2',
        orderNo: 'ZL52805925401750',
        status: '已支付',
        dealer: '华东渠道中心',
        seller: '总部商城',
        orderingDealer: '--',
        plannerRequirement: '不需要',
        source: '线上订单',
        platform: '小程序',
        batch: '202606-A',
        orderMethod: '家长',
        parentName: '张家长',
        parentMobile: '186****0932',
        dealerReferrer: '--',
        courseType: '体验课',
        studentName: '张同学',
        channel: '渠道推广',
        courseName: '初中英语体验课',
        amount: '¥ 99',
        paidAmount: '¥ 99',
        paymentTransactionNo: '20260627****1750',
        logisticsNo: '--',
        allocationStatus: '未分配',
        deliveryCenter: '--',
        hasPad: '否',
        firstPurchase: '是',
        orderTime: '2026-06-27 09:10',
        orderRemark: '--'
      },
      {
        id: 'online-order-ledger-3',
        orderNo: 'ZL52758783840709',
        status: '已支付',
        dealer: '总部直营',
        seller: '总部商城',
        orderingDealer: '--',
        plannerRequirement: '不需要',
        source: '线上订单',
        platform: '小程序',
        batch: '202606-A',
        orderMethod: '家长',
        parentName: '李家长',
        parentMobile: '181****5639',
        dealerReferrer: '--',
        courseType: '正式课',
        studentName: '李同学',
        channel: '线上商城',
        courseName: '初中数学正式课 20 课时',
        amount: '¥ 399',
        paidAmount: '¥ 399',
        paymentTransactionNo: '20260626****0709',
        logisticsNo: '--',
        allocationStatus: '已分配',
        deliveryCenter: '华北交付中心',
        hasPad: '否',
        firstPurchase: '否',
        orderTime: '2026-06-26 14:17',
        orderRemark: '已提交退款申请',
        afterSaleStatus: '退款中'
      }
    ]
  },
  {
    key: 'offlineOrders',
    view: 'registry-offline-orders',
    group: '交易台账',
    title: '线下订单',
    description: '管理线下录单、收款、履约和退货记录',
    total: 1289,
    summary: commonSummary('9', '1,240', '1,289', '5'),
    submodules: ['订单查询', '退货管理'],
    columns: orderLedgerColumns,
    rows: [
      {
        id: 'offline-order-1',
        orderNo: 'XL2606270038',
        status: '收款确认中',
        dealer: '成都星途成长中心',
        seller: '成都星途成长中心',
        orderingDealer: '成都星途成长中心',
        plannerRequirement: '手动指定',
        source: '手动导入',
        platform: '录入',
        batch: '202606-B',
        orderMethod: '代下单',
        parentName: '王家长',
        parentMobile: '150****6721',
        dealerReferrer: '刘老师',
        courseType: '正式课',
        studentName: '王同学',
        channel: '商家录单',
        courseName: '高中物理正式课 60 课时',
        amount: '¥ 18,600',
        paidAmount: '¥ 18,600',
        paymentTransactionNo: 'OFFLINE-20260627-0038',
        logisticsNo: '--',
        allocationStatus: '已分配',
        deliveryCenter: '总部交付中心',
        hasPad: '否',
        firstPurchase: '是',
        orderTime: '2026-06-27 08:54',
        orderRemark: '等待财务确认银行转账'
      },
      {
        id: 'offline-order-2',
        orderNo: 'XL2606260091',
        status: '已取消',
        dealer: '杭州青禾教育',
        seller: '杭州青禾教育',
        orderingDealer: '杭州青禾教育',
        plannerRequirement: '不需要',
        source: '手动导入',
        platform: '录入',
        batch: '202606-B',
        orderMethod: '代下单',
        parentName: '周家长',
        parentMobile: '159****9074',
        dealerReferrer: '陈老师',
        courseType: '正式课',
        studentName: '周同学',
        channel: '商家录单',
        courseName: '初中数学正式课 30 课时',
        amount: '¥ 9,600',
        paidAmount: '¥ 0',
        paymentTransactionNo: '--',
        logisticsNo: '--',
        allocationStatus: '未分配',
        deliveryCenter: '--',
        hasPad: '否',
        firstPurchase: '否',
        orderTime: '2026-06-26 17:20',
        orderRemark: '家长取消订单'
      }
    ]
  },
  {
    key: 'onlinePurchase',
    view: 'registry-online-purchase',
    group: '交易台账',
    title: '线上采购',
    description: '管理销售单、采购单、销售退货和采购退供',
    total: 986,
    summary: commonSummary('18', '932', '986', '6'),
    submodules: ['销售单', '采购单', '销售退货', '采购退供'],
    columns: [
      field('documentNo', '单据编号', 180),
      field('businessType', '单据类型', 110),
      field('relatedOrder', '关联订单', 180),
      field('supplier', '供应商', 160),
      field('buyer', '采购方', 150),
      field('product', '商品', 220),
      field('quantity', '数量', 80),
      field('unitPrice', '采购单价', 110),
      field('amount', '采购金额', 110),
      field('refundAmount', '退供金额', 110),
      field('paymentStatus', '付款状态', 100),
      field('logisticsNo', '物流单号', 170),
      field('createdAt', '创建时间', 150),
      field('status', '单据状态', 100)
    ],
    rows: [
      {
        id: 'online-purchase-1',
        documentNo: 'CG2606270018',
        relatedOrder: 'ZL52804736554803',
        supplier: '智鹿科技供应链',
        buyer: '总部商城',
        product: 'iPad 学习套餐',
        quantity: '1',
        unitPrice: '¥ 7,400',
        amount: '¥ 7,400',
        refundAmount: '¥ 0',
        paymentStatus: '已付款',
        logisticsNo: 'SF14****8206',
        createdAt: '06-27 09:02',
        status: '待发货'
      },
      {
        id: 'online-purchase-2',
        documentNo: 'CG2606260066',
        relatedOrder: 'ZL52758783840709',
        supplier: '智鹿配件中心',
        buyer: '总部商城',
        product: '学习平板配件包',
        quantity: '1',
        unitPrice: '¥ 220',
        amount: '¥ 220',
        refundAmount: '¥ 220',
        paymentStatus: '退款中',
        logisticsNo: '待回寄',
        createdAt: '06-26 14:22',
        status: '采购退供'
      }
    ]
  },
  {
    key: 'offlinePurchase',
    view: 'registry-offline-purchase',
    group: '交易台账',
    title: '线下采购',
    description: '管理线下采购、销售、销售退货和采购退供',
    total: 642,
    summary: commonSummary('11', '606', '642', '4'),
    submodules: ['采购管理', '销售单', '销售退货', '采购退供'],
    columns: [
      field('documentNo', '采购编号', 180),
      field('businessType', '业务类型', 110),
      field('merchant', '采购商家', 160),
      field('supplier', '供应商', 160),
      field('product', '采购商品', 220),
      field('specification', '规格', 120),
      field('quantity', '数量', 80),
      field('amount', '采购金额', 110),
      field('paidAmount', '已付金额', 110),
      field('operator', '经办人', 100),
      field('voucherNo', '付款凭证', 160),
      field('expectedAt', '预计到货', 130),
      field('createdAt', '创建时间', 150),
      field('status', '状态', 100)
    ],
    rows: [
      {
        id: 'offline-purchase-1',
        documentNo: 'XCG2606270012',
        merchant: '华东交付中心',
        supplier: '启航教育物资',
        product: '高中数学纸质教材',
        specification: '学生版',
        quantity: '60',
        amount: '¥ 5,160',
        paidAmount: '¥ 5,160',
        operator: '周**',
        voucherNo: 'FK2606****0012',
        expectedAt: '06-30',
        createdAt: '06-27 10:18',
        status: '运输中'
      },
      {
        id: 'offline-purchase-2',
        documentNo: 'XCG2606260049',
        merchant: '总部交付中心',
        supplier: '智鹿设备中心',
        product: '教学平板',
        specification: '10.9 英寸',
        quantity: '10',
        amount: '¥ 32,000',
        paidAmount: '¥ 16,000',
        operator: '沈**',
        voucherNo: '待补充',
        expectedAt: '07-02',
        createdAt: '06-26 16:42',
        status: '待付款'
      }
    ]
  },
  {
    key: 'financeReports',
    view: 'registry-finance-reports',
    group: '经营管理',
    title: '财务报表',
    description: '管理应收、应付、推荐费、年度奖和采购收入明细',
    total: 3246,
    summary: commonSummary('23', '3,081', '3,246', '8'),
    submodules: ['海南返点', '应收账单', '应付账单', '线上推荐费', '线上年度奖', '线下推荐费', '线下年度奖', '采购收入明细'],
    columns: [
      field('billNo', '账单编号', 180),
      field('businessType', '账单类型', 110),
      field('accountPeriod', '账期', 130),
      field('partner', '结算对象', 180),
      field('businessAmount', '业务金额', 120),
      field('receivableAmount', '应收金额', 120),
      field('payableAmount', '应付金额', 120),
      field('paidAmount', '已结金额', 120),
      field('difference', '差额', 100),
      field('invoiceStatus', '发票状态', 100),
      field('settlementStatus', '结算状态', 100),
      field('owner', '负责人', 100),
      field('createdAt', '生成时间', 150),
      field('status', '状态', 100)
    ],
    rows: [
      {
        id: 'finance-report-1',
        billNo: 'YS2606270018',
        accountPeriod: '06/20 - 06/26',
        partner: '杭州青禾教育',
        businessAmount: '¥ 86,400',
        receivableAmount: '¥ 18,420',
        payableAmount: '¥ 0',
        paidAmount: '¥ 18,100',
        difference: '¥ 320',
        invoiceStatus: '待开票',
        settlementStatus: '核对中',
        owner: '财务一组',
        createdAt: '06-27 08:00',
        status: '有差额'
      },
      {
        id: 'finance-report-2',
        billNo: 'YF2606270013',
        accountPeriod: '06/20 - 06/26',
        partner: '华东交付中心',
        businessAmount: '¥ 236,900',
        receivableAmount: '¥ 0',
        payableAmount: '¥ 56,900',
        paidAmount: '¥ 0',
        difference: '¥ 0',
        invoiceStatus: '已收票',
        settlementStatus: '待打款',
        owner: '财务二组',
        createdAt: '06-27 08:00',
        status: '待打款'
      }
    ]
  },
  {
    key: 'investment',
    view: 'registry-investment',
    group: '经营管理',
    title: '招商管理',
    description: '维护招商公司和合作方关系、区域、负责人及签约进度',
    total: 286,
    summary: commonSummary('16', '248', '286', '5'),
    submodules: ['招商公司管理', '合作方管理'],
    columns: [
      field('code', '招商编码', 150),
      field('name', '公司/合作方', 220),
      field('businessType', '对象类型', 110),
      field('level', '合作等级', 100),
      field('region', '负责区域', 150),
      field('owner', '负责人', 100),
      field('mobile', '负责人手机号', 130),
      field('leadCount', '线索数', 90),
      field('signedCount', '签约数', 90),
      field('contractAmount', '合同金额', 120),
      field('contractEnd', '合约到期日', 120),
      field('createdAt', '创建时间', 150),
      field('status', '状态', 100)
    ],
    rows: [
      {
        id: 'investment-1',
        code: 'ZS260018',
        name: '华东招商事业部',
        level: '一级',
        region: '浙江 / 江苏 / 安徽',
        owner: '苏**',
        mobile: '133****8920',
        leadCount: '128',
        signedCount: '36',
        contractAmount: '¥ 1,860,000',
        contractEnd: '2027-12-31',
        createdAt: '2025-08-18',
        status: '合作中'
      },
      {
        id: 'investment-2',
        code: 'HZ2606270048',
        name: '杭州青禾教育',
        level: '待评级',
        region: '浙江 / 杭州',
        owner: '陈**',
        mobile: '138****1024',
        leadCount: '0',
        signedCount: '0',
        contractAmount: '待签约',
        contractEnd: '待签约',
        createdAt: '06-27 09:40',
        status: '审核中'
      }
    ]
  },
  {
    key: 'marketing',
    view: 'registry-marketing',
    group: '经营管理',
    title: '营销中心',
    description: '管理渠道、二维码和渠道转化统计',
    total: 1864,
    summary: commonSummary('21', '1,726', '1,864', '9'),
    submodules: ['渠道管理', '二维码管理', '渠道统计', '渠道明细'],
    columns: [
      field('channelCode', '渠道编码', 150),
      field('channelName', '渠道名称', 180),
      field('businessType', '数据类型', 110),
      field('channelType', '渠道类型', 110),
      field('owner', '负责人', 100),
      field('partner', '归属合作方', 170),
      field('qrCount', '二维码数', 90),
      field('visitCount', '访问量', 100),
      field('leadCount', '有效线索', 100),
      field('orderCount', '下单数', 90),
      field('paidCount', '支付数', 90),
      field('conversion', '支付转化率', 110),
      field('amount', '成交金额', 120),
      field('status', '状态', 90)
    ],
    rows: [
      {
        id: 'marketing-1',
        channelCode: 'QD260018',
        channelName: '华东城市合伙人',
        channelType: '合作渠道',
        owner: '周**',
        partner: '华东招商事业部',
        qrCount: '36',
        visitCount: '18,620',
        leadCount: '2,486',
        orderCount: '628',
        paidCount: '516',
        conversion: '20.8%',
        amount: '¥ 1,268,400',
        status: '启用'
      },
      {
        id: 'marketing-2',
        channelCode: 'QD260027',
        channelName: '短视频体验课推广',
        channelType: '线上投放',
        owner: '陈**',
        partner: '总部市场中心',
        qrCount: '12',
        visitCount: '32,180',
        leadCount: '3,120',
        orderCount: '986',
        paidCount: '724',
        conversion: '23.2%',
        amount: '¥ 368,900',
        status: '启用'
      }
    ]
  },
  {
    key: 'growth',
    view: 'registry-growth',
    group: '经营管理',
    title: '成长中心',
    description: '管理成长中心加盟和全国分布数据',
    total: 326,
    summary: commonSummary('13', '298', '326', '6'),
    submodules: ['成长中心加盟', 'AI成长中心分布'],
    columns: [
      field('code', '中心编码', 150),
      field('name', '成长中心名称', 210),
      field('businessType', '数据类型', 110),
      field('province', '省份', 100),
      field('city', '城市', 100),
      field('address', '详细地址', 220),
      field('owner', '负责人', 100),
      field('mobile', '手机号', 130),
      field('studentCount', '服务学员数', 110),
      field('deviceCount', '设备数', 90),
      field('openedAt', '开业时间', 120),
      field('contractEnd', '合约到期日', 120),
      field('status', '状态', 100)
    ],
    rows: [
      {
        id: 'growth-1',
        code: 'CZ260128',
        name: '杭州滨江 AI 成长中心',
        province: '浙江',
        city: '杭州',
        address: '滨江区江南大道',
        owner: '陈**',
        mobile: '138****1024',
        studentCount: '268',
        deviceCount: '36',
        openedAt: '2025-09-18',
        contractEnd: '2028-09-17',
        status: '营业中'
      },
      {
        id: 'growth-2',
        code: 'CZ260216',
        name: '成都高新 AI 成长中心',
        province: '四川',
        city: '成都',
        address: '高新区天府三街',
        owner: '刘**',
        mobile: '186****7783',
        studentCount: '186',
        deviceCount: '28',
        openedAt: '2026-02-16',
        contractEnd: '2029-02-15',
        status: '营业中'
      }
    ]
  },
  {
    key: 'wechat',
    view: 'registry-wechat',
    group: '经营管理',
    title: '微信服务号',
    description: '维护服务号菜单、自动回复和永久素材',
    total: 386,
    summary: commonSummary('8', '352', '386', '3'),
    submodules: ['自定义菜单', '关键字自动回复', '永久素材'],
    columns: [
      field('code', '内容编码', 150),
      field('name', '名称', 200),
      field('businessType', '内容类型', 110),
      field('keyword', '关键字/菜单键', 160),
      field('replyType', '回复类型', 100),
      field('materialType', '素材类型', 100),
      field('content', '内容摘要', 240),
      field('matchMode', '匹配方式', 100),
      field('sort', '排序', 80),
      field('owner', '维护人', 100),
      field('updatedAt', '更新时间', 150),
      field('status', '状态', 100)
    ],
    rows: [
      {
        id: 'wechat-1',
        code: 'WXCD260018',
        name: '课程服务',
        keyword: 'MENU_COURSE',
        replyType: '跳转网页',
        materialType: '菜单',
        content: '我的课程、上课提醒、学习报告',
        matchMode: '菜单点击',
        sort: '1',
        owner: '用户运营',
        updatedAt: '06-27 16:20',
        status: '已发布'
      },
      {
        id: 'wechat-2',
        code: 'WXHF260026',
        name: '体验课咨询',
        keyword: '体验课',
        replyType: '图文回复',
        materialType: '图文素材',
        content: '体验课预约与常见问题',
        matchMode: '半匹配',
        sort: '10',
        owner: '市场运营',
        updatedAt: '06-26 11:42',
        status: '启用'
      }
    ]
  },
  {
    key: 'systemAdmin',
    view: 'registry-system-admin',
    group: '系统管理',
    title: '系统管理',
    description: '维护用户、菜单、角色、应用和数据权限',
    total: 428,
    summary: commonSummary('7', '398', '428', '4'),
    submodules: ['用户管理', '菜单管理', '角色管理', '应用管理'],
    columns: [
      field('account', '登录账号', 150),
      field('name', '姓名/名称', 140),
      field('businessType', '管理对象', 110),
      field('mobile', '手机号', 130),
      field('organization', '所属组织', 180),
      field('department', '部门', 130),
      field('role', '角色', 140),
      field('dataScope', '数据范围', 150),
      field('application', '可用应用', 160),
      field('lastLoginAt', '最后登录', 150),
      field('createdAt', '创建时间', 150),
      field('status', '状态', 100)
    ],
    rows: [
      {
        id: 'system-user-1',
        account: 'superadmin',
        name: '总部管理员',
        mobile: '138****0001',
        organization: '智鹿总部',
        department: '平台运营部',
        role: '超级管理员',
        dataScope: '全部数据',
        application: '总部后台',
        lastLoginAt: '06-28 09:08',
        createdAt: '2025-01-08',
        status: '启用'
      },
      {
        id: 'system-user-2',
        account: 'delivery_0018',
        name: '沈**',
        mobile: '138****2817',
        organization: '总部交付中心',
        department: '交付一组',
        role: '交付负责人',
        dataScope: '本中心及下级',
        application: '总部后台 / 商家端',
        lastLoginAt: '06-28 08:42',
        createdAt: '2025-09-18',
        status: '启用'
      },
      {
        id: 'system-user-3',
        account: 'merchant_0048',
        name: '陈**',
        mobile: '138****1024',
        organization: '杭州青禾教育',
        department: '商家运营',
        role: '商家负责人',
        dataScope: '本商家',
        application: '商家端',
        lastLoginAt: '未登录',
        createdAt: '06-27 09:40',
        status: '待开通'
      }
    ]
  }
]

export const moduleByView = Object.fromEntries(moduleCatalog.map((module) => [module.view, module]))

const parentColumns = [
  field('parentName', '家长姓名', 120),
  field('gender', '性别', 80),
  field('mobile', '手机号', 130),
  field('studentRelation', '与学生关系', 110),
  field('status', '状态', 100),
  field('createdAt', '创建时间', 160),
  field('updatedAt', '更新时间', 160),
  field('createdBy', '创建人', 120),
  field('updatedBy', '更新人', 120)
]

const parentRows = [
  {
    id: 'parent-1',
    parentName: '陈家长',
    gender: '女',
    mobile: '138****2817',
    studentRelation: '母亲',
    status: '正常',
    createdAt: '2026-06-27 09:26',
    updatedAt: '2026-06-27 09:26',
    createdBy: '总部',
    updatedBy: '总部'
  },
  {
    id: 'parent-2',
    parentName: '张家长',
    gender: '男',
    mobile: '186****0932',
    studentRelation: '父亲',
    status: '正常',
    createdAt: '2026-06-27 09:10',
    updatedAt: '2026-06-27 09:10',
    createdBy: '总部',
    updatedBy: '--'
  }
]

const studentColumns = [
  field('studentNo', '学号', 110),
  field('studentName', '学员姓名', 120),
  field('gender', '性别', 80),
  field('birthday', '出生日期', 110),
  field('mobile', '手机号', 130),
  field('school', '就读学校', 180),
  field('selectedSubjects', '意向/已选学科', 160),
  field('stage', '阶段', 130),
  field('registeredAt', '报名时间', 150),
  field('status', '学员状态', 100),
  field('createdAt', '创建时间', 160),
  field('updatedAt', '更新时间', 160),
  field('createdBy', '创建人', 120),
  field('updatedBy', '更新人', 120)
]

const studentRows = [
  {
    id: 'student-1',
    studentNo: '2041',
    studentName: '陈同学',
    gender: '--',
    birthday: '--',
    mobile: '--',
    school: '--',
    selectedSubjects: '数学',
    stage: '初中/二年级',
    registeredAt: '--',
    status: '正常',
    createdAt: '2026-06-28 11:22',
    updatedAt: '2026-06-28 11:22',
    createdBy: '--',
    updatedBy: '--'
  },
  {
    id: 'student-2',
    studentNo: '2040',
    studentName: '张同学',
    gender: '女',
    birthday: '2012-08-18',
    mobile: '--',
    school: '示例中学',
    selectedSubjects: '英语',
    stage: '初中/一年级',
    registeredAt: '2026-06-27',
    status: '正常',
    createdAt: '2026-06-28 11:01',
    updatedAt: '2026-06-28 11:01',
    createdBy: '总部',
    updatedBy: '总部'
  }
]

const learningRecordColumns = [
  field('studentNo', '学员编号', 150),
  field('student', '学员', 100),
  field('businessType', '记录类型', 100),
  field('gradeSubject', '年级/学科', 140),
  field('diagnosis', '学情诊断', 220),
  field('target', '学习目标', 180),
  field('currentScore', '当前成绩', 100),
  field('targetScore', '目标成绩', 100),
  field('plan', '学习计划', 220),
  field('teacher', '负责教师', 100),
  field('updatedAt', '最近更新', 150),
  field('status', '状态', 100)
]

const learningRecordRows = [
  {
    id: 'learning-record-1',
    studentNo: 'ST2606270188',
    student: '陈**',
    gradeSubject: '高一 / 数学',
    diagnosis: '函数与数列基础薄弱',
    target: '期末达到 110 分',
    currentScore: '82',
    targetScore: '110',
    plan: '每周 2 次一对一 + 错题复盘',
    teacher: '沈老师',
    updatedAt: '06-28 10:20',
    status: '执行中'
  },
  {
    id: 'learning-record-2',
    studentNo: 'ST2605200096',
    student: '赵**',
    gradeSubject: '初三 / 数学',
    diagnosis: '几何综合题失分较多',
    target: '中考达到 A 等',
    currentScore: '96',
    targetScore: '115',
    plan: '专题训练 + 每周测评',
    teacher: '周老师',
    updatedAt: '06-27 18:10',
    status: '执行中'
  }
]

const deliveryCenterColumns = [
  field('name', '交付中心名称', 210),
  field('code', '交付中心编码', 150),
  field('centerType', '交付中心类型', 140),
  field('entityType', '主体类型', 110),
  field('address', '详细地址', 220),
  field('owner', '责任人', 100),
  field('mobile', '负责人手机号', 130),
  field('capacity', '可承接学员数量', 130),
  field('accepting', '是否接单', 90),
  field('status', '状态', 90),
  field('userCount', '可用用户数量', 110),
  field('remark', '备注', 180)
]

const contractColumns = [
  field('contractNo', '合约编号', 170),
  field('name', '合作方', 200),
  field('businessType', '业务类型', 110),
  field('contractType', '合约类型', 120),
  field('signedAt', '签约日期', 120),
  field('effectiveAt', '生效日期', 120),
  field('contractEnd', '到期日期', 120),
  field('contractAmount', '合同金额', 120),
  field('commissionRate', '提成比例', 100),
  field('rewardAmount', '奖励金额', 110),
  field('owner', '负责人', 100),
  field('status', '状态', 100)
]

const contractRows = [
  {
    id: 'contract-1',
    contractNo: 'HT2606270048',
    name: '杭州青禾教育',
    contractType: '线上加盟',
    signedAt: '06-27',
    effectiveAt: '07-01',
    contractEnd: '2027-06-30',
    contractAmount: '¥ 168,000',
    commissionRate: '12%',
    rewardAmount: '¥ 18,600',
    owner: '合作中心',
    status: '待生效'
  },
  {
    id: 'contract-2',
    contractNo: 'HT2509180026',
    name: '华东交付中心',
    contractType: '交付合作',
    signedAt: '2025-09-18',
    effectiveAt: '2025-10-01',
    contractEnd: '2028-09-30',
    contractAmount: '¥ 360,000',
    commissionRate: '18%',
    rewardAmount: '¥ 56,900',
    owner: '合作中心',
    status: '履约中'
  }
]

const hierarchyColumns = [
  field('nodeCode', '节点编码', 150),
  field('name', '节点名称', 200),
  field('businessType', '层级类型', 100),
  field('parentName', '上级节点', 180),
  field('level', '层级', 80),
  field('region', '数据区域', 150),
  field('owner', '负责人', 100),
  field('mobile', '手机号', 130),
  field('memberCount', '成员数', 90),
  field('centerCount', '下属中心数', 110),
  field('updatedAt', '更新时间', 150),
  field('status', '状态', 100)
]

const hierarchyRows = [
  {
    id: 'hierarchy-1',
    nodeCode: 'ORG-HQ-001',
    name: '总部交付中心',
    parentName: '智鹿总部',
    level: '一级',
    region: '全国',
    owner: '沈**',
    mobile: '138****2817',
    memberCount: '28',
    centerCount: '7',
    updatedAt: '06-28 09:12',
    status: '启用'
  },
  {
    id: 'hierarchy-2',
    nodeCode: 'ORG-EAST-018',
    name: '华东交付中心',
    parentName: '总部交付中心',
    level: '二级',
    region: '浙江 / 江苏 / 安徽',
    owner: '周**',
    mobile: '186****7712',
    memberCount: '16',
    centerCount: '3',
    updatedAt: '06-27 16:30',
    status: '启用'
  }
]

const trialAllocationColumns = [
  field('studentName', '学员', 110),
  field('stage', '学段', 120),
  field('teacherName', '教师', 110),
  field('subjectProduct', '学科商品', 200),
  field('className', '班级', 140),
  field('deliveryCenter', '交付中心', 150),
  field('totalHours', '总课时', 90),
  field('scheduledHours', '已排课课时', 110),
  field('consumedHours', '已消费课时', 110),
  field('remainingHours', '剩余课时', 100),
  field('reservedHours', '预占课时', 100),
  field('expiredHours', '过期课时', 100),
  field('ipadSubscription', 'iPad 订阅', 100),
  field('effectiveAt', '课时生效时间', 160),
  field('expiresAt', '课时到期时间', 160),
  field('teachingMode', '教学方式', 100),
  field('deliveryMode', '授课方式', 100),
  field('status', '状态', 90),
  field('planner', '规划师', 100),
  field('createdAt', '创建时间', 160),
  field('createdBy', '创建人', 110),
  field('updatedBy', '更新人', 110)
]

const trialAllocationRows = [
  {
    id: 'trial-allocation-1',
    studentName: '陈同学',
    stage: '初中',
    teacherName: '沈老师',
    subjectProduct: '初中数学体验课',
    className: '--',
    deliveryCenter: '总部交付中心',
    totalHours: '1',
    scheduledHours: '1',
    consumedHours: '0',
    remainingHours: '1',
    reservedHours: '1',
    expiredHours: '0',
    ipadSubscription: '否',
    effectiveAt: '2026-06-27 09:26',
    expiresAt: '2026-07-27 23:59',
    teachingMode: '一对一',
    deliveryMode: '线上',
    status: '正常',
    planner: '需要',
    createdAt: '2026-06-27 09:26',
    createdBy: '总部',
    updatedBy: '总部'
  }
]

const formalAllocationColumns = trialAllocationColumns.filter(
  (column) => !['stage', 'ipadSubscription'].includes(column.key)
)

const formalAllocationRows = [
  {
    ...trialAllocationRows[0],
    id: 'formal-allocation-1',
    subjectProduct: '高中数学正式课',
    totalHours: '40',
    scheduledHours: '12',
    consumedHours: '10',
    remainingHours: '30',
    reservedHours: '2',
    expiresAt: '2027-06-27 23:59',
    planner: '沈老师'
  }
]

const scheduleColumns = [
  field('scheduleNo', '排课编号', 170),
  field('student', '学员', 100),
  field('businessType', '排课类型', 100),
  field('course', '课程', 190),
  field('teacher', '教师', 100),
  field('className', '班级/授课形式', 140),
  field('scheduledAt', '上课时间', 150),
  field('duration', '课时长度', 100),
  field('classroom', '教室/会议号', 150),
  field('deliveryCenter', '交付中心', 150),
  field('conflict', '冲突检测', 100),
  field('createdBy', '排课人', 100),
  field('status', '状态', 100)
]

const scheduleRows = [
  {
    id: 'schedule-1',
    scheduleNo: 'PK2606280018',
    student: '陈**',
    course: '高中数学体验课',
    teacher: '沈老师',
    className: '线上一对一',
    scheduledAt: '06-28 14:00',
    duration: '45 分钟',
    classroom: '腾讯会议 86****21',
    deliveryCenter: '总部交付中心',
    conflict: '无冲突',
    createdBy: '交付一组',
    status: '待上课'
  },
  {
    id: 'schedule-2',
    scheduleNo: 'PK2606280022',
    student: '王**',
    course: '高中物理正式课',
    teacher: '陆老师',
    className: '线下一对一',
    scheduledAt: '06-28 17:00',
    duration: '90 分钟',
    classroom: '华东中心 301',
    deliveryCenter: '华东交付中心',
    conflict: '已解决',
    createdBy: '交付二组',
    status: '已确认'
  },
  {
    id: 'schedule-3',
    scheduleNo: 'PK2606290011',
    student: '赵**',
    course: '初中数学正式课',
    teacher: '周老师',
    className: '初三数学 A 班',
    scheduledAt: '06-29 19:00',
    duration: '90 分钟',
    classroom: '腾讯会议 62****09',
    deliveryCenter: '总部交付中心',
    conflict: '无冲突',
    createdBy: '交付一组',
    status: '待上课'
  },
  {
    id: 'schedule-4',
    scheduleNo: 'PK2606300008',
    student: '刘**',
    course: '高中英语体验课',
    teacher: '陈老师',
    className: '线上一对一',
    scheduledAt: '06-30 20:00',
    duration: '45 分钟',
    classroom: '腾讯会议 71****36',
    deliveryCenter: '华东交付中心',
    conflict: '无冲突',
    createdBy: '交付二组',
    status: '待上课'
  },
  {
    id: 'schedule-5',
    scheduleNo: 'PK2607010015',
    student: '周**',
    course: '小学语文正式课',
    teacher: '苏老师',
    className: '小升初冲刺班',
    scheduledAt: '07-01 16:00',
    duration: '90 分钟',
    classroom: '腾讯会议 25****18',
    deliveryCenter: '华东交付中心',
    conflict: '无冲突',
    createdBy: '交付二组',
    status: '已确认'
  },
  {
    id: 'schedule-6',
    scheduleNo: 'PK2607020026',
    student: '张**',
    course: '初中英语体验课',
    teacher: '王老师',
    className: '线上一对一',
    scheduledAt: '07-02 10:00',
    duration: '45 分钟',
    classroom: '腾讯会议 39****41',
    deliveryCenter: '总部交付中心',
    conflict: '冲突待处理',
    createdBy: '交付一组',
    status: '时间冲突'
  }
]

const scheduleRecordColumns = [
  field('scheduleTitle', '排课标题', 210),
  field('scheduleType', '排课类型', 110),
  field('studentOrClass', '学员/班级', 130),
  field('courseType', '课程类型', 100),
  field('teacherName', '教师', 110),
  field('deliveryCenter', '交付中心', 150),
  field('subjectProduct', '学科商品', 190),
  field('courseName', '课程', 190),
  field('lesson', '课节', 120),
  field('classDate', '上课日期', 110),
  field('classStart', '上课时间', 100),
  field('classEnd', '下课时间', 100),
  field('status', '排课状态', 100),
  field('remark', '备注', 180),
  field('createdAt', '创建时间', 160),
  field('updatedAt', '更新时间', 160),
  field('createdBy', '创建人', 110),
  field('updatedBy', '更新人', 110)
]

const scheduleRecordRows = [
  {
    id: 'schedule-record-1',
    scheduleTitle: '陈同学-初中数学首次课',
    scheduleType: '1对1排课',
    studentOrClass: '陈同学',
    courseType: '正式课',
    teacherName: '沈老师',
    deliveryCenter: '总部交付中心',
    subjectProduct: '初中数学正式课',
    courseName: '同步提升课程',
    lesson: '第 1 课',
    classDate: '2026-06-28',
    classStart: '14:00',
    classEnd: '14:45',
    status: '未上课',
    remark: '--',
    createdAt: '2026-06-27 18:20',
    updatedAt: '2026-06-27 18:20',
    createdBy: '交付一组',
    updatedBy: '交付一组'
  }
]

const consumeColumns = [
  field('scheduleTitle', '排课标题', 210),
  field('teacherName', '教师', 110),
  field('studentName', '学员', 110),
  field('status', '消课状态', 100),
  field('evaluationStatus', '评价状态', 100),
  field('deliveryCenter', '交付中心', 150),
  field('subjectProduct', '学科商品', 190),
  field('courseType', '课程类型', 100),
  field('courseName', '课程', 190),
  field('lesson', '课节', 120),
  field('classDate', '上课日期', 110),
  field('classStart', '上课时间', 100),
  field('classEnd', '下课时间', 100),
  field('consumedHours', '消费课时', 100),
  field('remark', '备注', 180),
  field('createdAt', '创建时间', 160),
  field('updatedAt', '更新时间', 160),
  field('createdBy', '创建人', 110),
  field('updatedBy', '更新人', 110)
]

const consumeRows = [
  {
    id: 'consume-1',
    scheduleTitle: '赵同学-初中数学第 18 课',
    teacherName: '周老师',
    studentName: '赵同学',
    status: '已消课',
    evaluationStatus: '是',
    deliveryCenter: '总部交付中心',
    subjectProduct: '初中数学正式课',
    courseType: '正式课',
    courseName: '同步提升课程',
    lesson: '第 18 课',
    classDate: '2026-06-27',
    classStart: '19:00',
    classEnd: '20:30',
    consumedHours: '2',
    remark: '--',
    createdAt: '2026-06-26 18:10',
    updatedAt: '2026-06-27 21:02',
    createdBy: '交付一组',
    updatedBy: '周老师'
  },
  {
    id: 'consume-2',
    scheduleTitle: '刘同学-高中英语体验课',
    teacherName: '陈老师',
    studentName: '刘同学',
    status: '未上课',
    evaluationStatus: '否',
    deliveryCenter: '华东交付中心',
    subjectProduct: '高中英语体验课',
    courseType: '体验课',
    courseName: '高中英语体验课',
    lesson: '第 1 课',
    classDate: '2026-06-28',
    classStart: '20:00',
    classEnd: '20:45',
    consumedHours: '0',
    remark: '--',
    createdAt: '2026-06-27 09:10',
    updatedAt: '2026-06-27 09:10',
    createdBy: '交付二组',
    updatedBy: '--'
  }
]

const organizationColumns = [
  field('code', '组织/人员编码', 160),
  field('name', '名称', 180),
  field('businessType', '管理类型', 100),
  field('organization', '所属组织', 180),
  field('department', '部门', 140),
  field('role', '岗位/角色', 130),
  field('subject', '授课学科', 100),
  field('grade', '授课年级', 120),
  field('studentCount', '学员数', 90),
  field('classCount', '班级数', 90),
  field('workload', '本周课量', 100),
  field('owner', '负责人', 100),
  field('status', '状态', 100)
]

const organizationRows = [
  {
    id: 'organization-1',
    code: 'TC260018',
    name: '沈老师',
    organization: '总部交付中心',
    department: '交付一组',
    role: '数学教师',
    subject: '数学',
    grade: '高中',
    studentCount: '18',
    classCount: '2',
    workload: '12 节',
    owner: '交付负责人',
    status: '在岗'
  },
  {
    id: 'organization-2',
    code: 'CLASS260062',
    name: '初三数学 A 班',
    organization: '总部交付中心',
    department: '正式课组',
    role: '教学班',
    subject: '数学',
    grade: '初中三年级',
    studentCount: '12',
    classCount: '1',
    workload: '4 节',
    owner: '周老师',
    status: '开班中'
  }
]

const systemConfigColumns = [
  field('code', '配置编码', 160),
  field('name', '名称', 180),
  field('businessType', '配置类型', 100),
  field('parentName', '上级菜单/应用', 180),
  field('permission', '权限标识', 180),
  field('route', '路由/应用地址', 210),
  field('dataScope', '数据范围', 150),
  field('memberCount', '关联用户', 100),
  field('sort', '排序', 80),
  field('owner', '维护人', 100),
  field('updatedAt', '更新时间', 150),
  field('status', '状态', 100)
]

const systemConfigRows = [
  {
    id: 'system-config-1',
    code: 'MENU-ORDER-001',
    name: '线上订单',
    parentName: '总部业务平台',
    permission: 'order:list',
    route: '/order/table',
    dataScope: '按角色',
    memberCount: '186',
    sort: '40',
    owner: '平台管理员',
    updatedAt: '06-28 09:18',
    status: '启用'
  },
  {
    id: 'system-config-2',
    code: 'ROLE-DELIVERY',
    name: '交付负责人',
    parentName: '总部后台',
    permission: 'delivery:*',
    route: '--',
    dataScope: '本中心及下级',
    memberCount: '28',
    sort: '20',
    owner: '平台管理员',
    updatedAt: '06-27 17:36',
    status: '启用'
  }
]

const onboardingColumns = [
  field('applicationNo', '申请编号', 170),
  field('name', '申请主体', 210),
  field('businessType', '申请类型', 110),
  field('entityType', '主体类型', 100),
  field('region', '经营区域', 150),
  field('contact', '联系人', 100),
  field('mobile', '联系人手机号', 130),
  field('licenseNo', '营业执照号', 180),
  field('licenseExpiresAt', '证照有效期', 120),
  field('completeness', '资料完整度', 110),
  field('risk', '风险等级', 100),
  field('reviewer', '审核人', 100),
  field('submittedAt', '提交时间', 150),
  field('status', '审核状态', 100)
]

const onboardingRows = [
  {
    id: 'onboarding-1',
    applicationNo: 'HZ2606270048',
    name: '杭州青禾教育',
    entityType: '有限公司',
    region: '浙江 / 杭州',
    contact: '陈**',
    mobile: '138****1024',
    licenseNo: '9133********2048',
    licenseExpiresAt: '2029-05-16',
    completeness: '100%',
    risk: '低风险',
    reviewer: '合作中心',
    submittedAt: '06-27 09:40',
    status: '复审中'
  },
  {
    id: 'onboarding-2',
    applicationNo: 'CD2606270031',
    name: '成都星途成长中心',
    entityType: '个体工商户',
    region: '四川 / 成都',
    contact: '刘**',
    mobile: '186****7783',
    licenseNo: '9251********0031',
    licenseExpiresAt: '2027-08-03',
    completeness: '75%',
    risk: '中风险',
    reviewer: '合作中心',
    submittedAt: '06-27 08:15',
    status: '待补充'
  }
]

const applicationRows = [
  {
    id: 'system-app-1',
    code: 'APP-BOSS',
    name: '总部管理后台',
    parentName: '智鹿业务平台',
    permission: 'boss:*',
    route: 'https://boss.zulonex.com',
    dataScope: '总部数据',
    memberCount: '286',
    sort: '10',
    owner: '平台管理员',
    updatedAt: '06-28 09:20',
    status: '启用'
  },
  {
    id: 'system-app-2',
    code: 'APP-MERCHANT',
    name: '商家工作台',
    parentName: '智鹿业务平台',
    permission: 'merchant:*',
    route: '/merchant',
    dataScope: '商家数据',
    memberCount: '428',
    sort: '20',
    owner: '平台管理员',
    updatedAt: '06-27 16:40',
    status: '启用'
  }
]

const getModule = (key) => moduleCatalog.find((module) => module.key === key)

export const submoduleDatasets = {
  masterdata: {
    教材管理: { columns: getModule('masterdata').columns, rows: getModule('masterdata').rows, total: 386 },
    课程管理: { columns: getModule('masterdata').columns, rows: getModule('masterdata').rows, total: 528 },
    知识点管理: { columns: getModule('masterdata').columns, rows: getModule('masterdata').rows, total: 2860 },
    学科商品: { columns: getModule('masterdata').columns, rows: getModule('masterdata').rows, total: 468 },
    商品套餐: { columns: getModule('masterdata').columns, rows: getModule('masterdata').rows, total: 186 },
    家长管理: { columns: parentColumns, rows: parentRows, total: 1845 },
    学员管理: { columns: studentColumns, rows: studentRows, total: 1779 },
    学情管理: { columns: learningRecordColumns, rows: learningRecordRows, total: 7286 }
  },
  partnerCenter: {
    交付中心: { columns: deliveryCenterColumns, rows: getModule('partnerCenter').rows, total: 468 },
    线上加盟: { columns: onboardingColumns, rows: onboardingRows, total: 286 },
    合约管理: { columns: contractColumns, rows: contractRows, total: 468 },
    提成奖励: { columns: contractColumns, rows: contractRows, total: 1286 },
    交付层级: { columns: hierarchyColumns, rows: hierarchyRows, total: 86 },
    运营层级: { columns: hierarchyColumns, rows: hierarchyRows, total: 62 },
    入驻申请: { columns: onboardingColumns, rows: onboardingRows, total: 286 }
  },
  learning: {
    体验课管理: { columns: trialAllocationColumns, rows: trialAllocationRows, total: 862 },
    体验课排课: { columns: scheduleColumns, rows: scheduleRows, total: 528 },
    正式课管理: { columns: formalAllocationColumns, rows: formalAllocationRows, total: 1771 },
    教师排课: { columns: scheduleColumns, rows: scheduleRows, total: 3286 },
    排课记录: { columns: scheduleRecordColumns, rows: scheduleRecordRows, total: 2939 },
    消课管理: { columns: consumeColumns, rows: consumeRows, total: 2982 },
    学生课程: { columns: formalAllocationColumns, rows: formalAllocationRows, total: 2864 },
    部门管理: { columns: organizationColumns, rows: organizationRows, total: 48 },
    班级管理: { columns: organizationColumns, rows: organizationRows, total: 286 },
    教师管理: { columns: organizationColumns, rows: organizationRows, total: 628 },
    我的学员: { columns: formalAllocationColumns, rows: formalAllocationRows, total: 186 }
  },
  onlineOrders: {
    订单查询: {
      columns: getModule('onlineOrders').columns,
      rows: getModule('onlineOrders').rows,
      total: 2335
    },
    退货管理: {
      columns: getModule('onlineOrders').columns,
      rows: getModule('onlineOrders').rows.filter((row) => row.afterSaleStatus === '退款中'),
      total: 86
    },
    特殊订单: {
      columns: getModule('onlineOrders').columns,
      rows: getModule('onlineOrders').rows.filter((row) => row.plannerRequirement === '手动指定'),
      total: 128
    }
  },
  offlineOrders: {
    订单查询: {
      columns: getModule('offlineOrders').columns,
      rows: getModule('offlineOrders').rows,
      total: 1289
    },
    退货管理: {
      columns: getModule('offlineOrders').columns,
      rows: getModule('offlineOrders').rows.filter((row) => row.status === '已取消'),
      total: 42
    }
  },
  onlinePurchase: {
    销售单: {
      columns: getModule('onlinePurchase').columns,
      rows: getModule('onlinePurchase').rows.filter((row) => !row.status.includes('退')),
      total: 986
    },
    采购退供: {
      columns: getModule('onlinePurchase').columns,
      rows: getModule('onlinePurchase').rows.filter((row) => row.status === '采购退供'),
      total: 36
    },
    采购单: {
      columns: getModule('onlinePurchase').columns,
      rows: getModule('onlinePurchase').rows.filter((row) => row.status !== '采购退供'),
      total: 986
    },
    销售退货: {
      columns: getModule('onlinePurchase').columns,
      rows: getModule('onlinePurchase').rows.filter((row) => row.refundAmount !== '¥ 0'),
      total: 42
    }
  },
  offlinePurchase: {
    采购管理: { columns: getModule('offlinePurchase').columns, rows: getModule('offlinePurchase').rows, total: 642 },
    销售单: {
      columns: getModule('offlinePurchase').columns,
      rows: getModule('offlinePurchase').rows.filter((row) => row.status !== '待付款'),
      total: 386
    },
    销售退货: {
      columns: getModule('offlinePurchase').columns,
      rows: getModule('offlinePurchase').rows.filter((row) => row.status === '运输中'),
      total: 28
    },
    采购退供: {
      columns: getModule('offlinePurchase').columns,
      rows: getModule('offlinePurchase').rows.filter((row) => row.status === '待付款'),
      total: 16
    }
  },
  financeReports: {
    海南返点: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows,
      total: 326
    },
    应收账单: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows.filter((row) => row.billNo.startsWith('YS')),
      total: 1286
    },
    应付账单: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows.filter((row) => row.billNo.startsWith('YF')),
      total: 986
    },
    线上推荐费: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows,
      total: 826
    },
    线上年度奖: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows,
      total: 286
    },
    线下推荐费: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows,
      total: 642
    },
    线下年度奖: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows,
      total: 198
    },
    采购收入明细: {
      columns: getModule('financeReports').columns,
      rows: getModule('financeReports').rows,
      total: 418
    }
  },
  investment: {
    招商公司管理: { columns: getModule('investment').columns, rows: getModule('investment').rows, total: 128 },
    合作方管理: { columns: getModule('investment').columns, rows: getModule('investment').rows, total: 286 }
  },
  marketing: {
    渠道管理: { columns: getModule('marketing').columns, rows: getModule('marketing').rows, total: 286 },
    二维码管理: { columns: getModule('marketing').columns, rows: getModule('marketing').rows, total: 628 },
    渠道统计: { columns: getModule('marketing').columns, rows: getModule('marketing').rows, total: 1864 },
    渠道明细: { columns: getModule('marketing').columns, rows: getModule('marketing').rows, total: 8420 }
  },
  growth: {
    成长中心加盟: { columns: getModule('growth').columns, rows: getModule('growth').rows, total: 326 },
    AI成长中心分布: { columns: getModule('growth').columns, rows: getModule('growth').rows, total: 326 }
  },
  wechat: {
    自定义菜单: { columns: getModule('wechat').columns, rows: getModule('wechat').rows, total: 36 },
    关键字自动回复: { columns: getModule('wechat').columns, rows: getModule('wechat').rows, total: 128 },
    永久素材: { columns: getModule('wechat').columns, rows: getModule('wechat').rows, total: 386 }
  },
  systemAdmin: {
    用户管理: { columns: getModule('systemAdmin').columns, rows: getModule('systemAdmin').rows, total: 428 },
    菜单管理: { columns: systemConfigColumns, rows: [systemConfigRows[0]], total: 186 },
    角色管理: { columns: systemConfigColumns, rows: [systemConfigRows[1]], total: 36 },
    应用管理: { columns: systemConfigColumns, rows: applicationRows, total: 12 }
  }
}
