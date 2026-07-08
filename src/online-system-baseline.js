const route = (name, path) => ({ name, path })

export const onlineModules = [
  {
    name: '基础管理',
    pages: [
      route('教材管理', '/masterdata/textbook'),
      route('课程管理', '/masterdata/course'),
      route('知识点管理', '/masterData/knowledge_point'),
      route('学科商品', '/courseProduct'),
      route('商品套餐', '/product'),
      route('家长管理', '/parent'),
      route('学员管理', '/masterdata/student'),
      route('学情管理', '/masterdata/studentLearning')
    ]
  },
  {
    name: '合作中心',
    pages: [
      route('交付中心', '/partnerCenter/deliveryCenter'),
      route('线上加盟', '/partnerCenter/partner'),
      route('合约管理', '/partnerCenter/contract'),
      route('提成奖励', '/partnerCenter/reward'),
      route('交付层级', '/deliveryCenterTree'),
      route('运营层级', '/operationTree'),
      route('入驻申请', '/partnerCenter/onboarding')
    ]
  },
  {
    name: '学习中心',
    pages: [
      route('体验课管理', '/learningCenter/trialClass'),
      route('体验课排课', '/learningCenter/trialTeacherSchedule'),
      route('正式课管理', '/learningCenter/student'),
      route('教师排课', '/learningCenter/teacherSchedule'),
      route('排课记录', '/learningCenter/scheduleList'),
      route('消课管理', '/learningCenter/consume'),
      route('学生课程', '/studentCourse'),
      route('部门管理', '/learningCenter/department'),
      route('班级管理', '/learningCenter/deliveryClass'),
      route('教师管理', '/learningCenter/teacher'),
      route('我的学员', '/learningCenter/myStudent/')
    ]
  },
  {
    name: '线上订单',
    pages: [
      route('订单查询', '/order/table'),
      route('退货管理', '/order/return'),
      route('特殊订单', '/order/special/table')
    ]
  },
  {
    name: '线下订单',
    pages: [
      route('订单查询', '/offline/order/table'),
      route('退货管理', '/offline/order/refund')
    ]
  },
  {
    name: '线上采购',
    pages: [
      route('销售单', '/purchase/supplier'),
      route('采购单', '/purchase/order'),
      route('销售退货', '/purchase/purchaseReturn'),
      route('采购退供', '/purchase/purchaseReturnSupplier')
    ]
  },
  {
    name: '线下采购',
    pages: [
      route('采购管理', '/offline/purchase/table'),
      route('销售单', '/offline/purchase/supplier'),
      route('销售退货', '/offline/purchase/purchaseReturn'),
      route('采购退供', '/offlinePurchase/purchaseReturnSupplier')
    ]
  },
  {
    name: '财务报表',
    pages: [
      route('海南返点', '/settlement/offlineRebateFee'),
      route('应收账单', '/settlement/receiverBill'),
      route('应付账单', '/settlement/payeeBill'),
      route('线上推荐费', '/settlement/recommendationFeeDetail'),
      route('线上年度奖', '/settlement/recommendationCourseDetail'),
      route('线下推荐费', '/settlement/offlineRecommendationFee'),
      route('线下年度奖', '/settlement/offlineAccountUsageFee'),
      route('采购收入明细', '/settlement/purchaseDetail')
    ]
  },
  {
    name: '招商管理',
    pages: [
      route('招商公司管理', '/investmentCompany/company'),
      route('合作方管理', '/investmentCompany/dealer')
    ]
  },
  {
    name: '营销中心',
    pages: [
      route('渠道管理', '/channel'),
      route('二维码管理', '/qrcode'),
      route('渠道统计', '/channelReport/summary'),
      route('渠道明细', '/channelReport/detail')
    ]
  },
  {
    name: '成长中心',
    pages: [
      route('成长中心加盟', '/growth'),
      route('AI成长中心分布', '/growth/mapDashboard')
    ]
  },
  {
    name: '微信服务号',
    pages: [
      route('自定义菜单', '/wechat/menu'),
      route('关键字自动回复', '/wechat/reply'),
      route('永久素材', '/wechat/material')
    ]
  },
  {
    name: '系统管理',
    pages: [
      route('用户管理', '/system/user'),
      route('菜单管理', '/system/menu'),
      route('角色管理', '/system/role'),
      route('应用管理', '/system/application')
    ]
  }
]

export const orderFieldContract = [
  'orderNo',
  'status',
  'dealer',
  'seller',
  'orderingDealer',
  'plannerRequirement',
  'source',
  'platform',
  'batch',
  'orderMethod',
  'parentName',
  'parentMobile',
  'dealerReferrer',
  'courseType',
  'studentName',
  'channel',
  'courseName',
  'amount',
  'paidAmount',
  'paymentTransactionNo',
  'logisticsNo',
  'allocationStatus',
  'deliveryCenter',
  'hasPad',
  'firstPurchase',
  'orderTime',
  'orderRemark'
]

export const orderColumnContract = [
  ['orderNo', '订单号'],
  ['status', '订单状态'],
  ['dealer', '经销商'],
  ['seller', '销售方'],
  ['orderingDealer', '代下单经销商'],
  ['plannerRequirement', '是否需要规划师'],
  ['source', '来源'],
  ['platform', '平台'],
  ['batch', '批次'],
  ['orderMethod', '下单方式'],
  ['parentName', '家长'],
  ['parentMobile', '家长手机号'],
  ['dealerReferrer', '经销商推荐人'],
  ['courseType', '课程类型'],
  ['studentName', '学员'],
  ['channel', '渠道'],
  ['courseName', '课程'],
  ['amount', '金额'],
  ['paidAmount', '实付金额'],
  ['paymentTransactionNo', '支付交易号'],
  ['logisticsNo', '物流单号'],
  ['allocationStatus', '是否已分配'],
  ['deliveryCenter', '交付中心'],
  ['hasPad', '含Pad'],
  ['firstPurchase', '是否首购'],
  ['orderTime', '下单时间'],
  ['orderRemark', '订单备注']
]

const orderFilters = [
  '交付层级',
  '订单号',
  '订单状态',
  '是否需要规划师',
  '来源',
  '平台',
  '下单方式',
  '家长',
  '课程类型',
  '学员',
  '是否已分配',
  '含Pad',
  '下单时间'
]

const orderColumns = orderColumnContract.map(([, label]) => label)

const onlinePurchaseFilters = ['单据编号', '关联订单', '供应商', '采购方', '商品', '付款状态', '单据状态', '创建时间']
const onlinePurchaseColumns = [
  '单据编号',
  '单据类型',
  '关联订单',
  '供应商',
  '采购方',
  '商品',
  '数量',
  '采购单价',
  '采购金额',
  '退供金额',
  '付款状态',
  '物流单号',
  '创建时间',
  '单据状态',
  '操作'
]

const offlinePurchaseFilters = ['采购编号', '采购商家', '供应商', '采购商品', '付款状态', '状态', '创建时间']
const offlinePurchaseColumns = [
  '采购编号',
  '业务类型',
  '采购商家',
  '供应商',
  '采购商品',
  '规格',
  '数量',
  '采购金额',
  '已付金额',
  '经办人',
  '付款凭证',
  '预计到货',
  '创建时间',
  '状态',
  '操作'
]

const financeReportFilters = ['账单编号', '账期', '结算对象', '结算状态', '发票状态', '生成时间']
const financeReportColumns = [
  '账单编号',
  '账单类型',
  '账期',
  '结算对象',
  '业务金额',
  '应收金额',
  '应付金额',
  '已结金额',
  '差额',
  '发票状态',
  '结算状态',
  '负责人',
  '生成时间',
  '状态',
  '操作'
]

const onboardingFilters = ['申请编号', '申请主体', '主体类型', '经营区域', '联系人', '风险等级', '审核状态']
const onboardingColumns = [
  '申请编号',
  '申请主体',
  '申请类型',
  '主体类型',
  '经营区域',
  '联系人',
  '联系人手机号',
  '营业执照号',
  '证照有效期',
  '资料完整度',
  '风险等级',
  '审核人',
  '提交时间',
  '审核状态',
  '操作'
]

const contractFilters = ['合约编号', '合作方', '合约类型', '到期日期', '状态']
const contractColumns = [
  '合约编号',
  '合作方',
  '业务类型',
  '合约类型',
  '签约日期',
  '生效日期',
  '到期日期',
  '合同金额',
  '提成比例',
  '奖励金额',
  '负责人',
  '状态',
  '操作'
]

const hierarchyFilters = ['节点编码', '节点名称', '上级节点', '层级', '状态']
const hierarchyColumns = [
  '节点编码',
  '节点名称',
  '层级类型',
  '上级节点',
  '层级',
  '数据区域',
  '负责人',
  '手机号',
  '成员数',
  '下属中心数',
  '更新时间',
  '状态',
  '操作'
]

const masterdataFilters = ['业务编码', '名称', '数据类型', '学科', '适用年级', '状态']
const masterdataColumns = [
  '业务编码',
  '名称',
  '数据类型',
  '学科',
  '适用年级',
  '课程阶段',
  '课时/规格',
  '销售价',
  '采购价',
  '维护人',
  '更新时间',
  '状态',
  '操作'
]

const learningScheduleFilters = ['学员', '排课类型', '课程', '教师', '上课时间', '状态']
const learningScheduleColumns = [
  '排课编号',
  '学员',
  '排课类型',
  '课程',
  '教师',
  '班级/授课形式',
  '上课时间',
  '课时长度',
  '教室/会议号',
  '交付中心',
  '冲突检测',
  '排课人',
  '状态',
  '操作'
]

const learningOrganizationFilters = ['名称', '所属组织', '部门', '岗位/角色', '授课学科', '状态']
const learningOrganizationColumns = [
  '组织/人员编码',
  '名称',
  '管理类型',
  '所属组织',
  '部门',
  '岗位/角色',
  '授课学科',
  '授课年级',
  '学员数',
  '班级数',
  '本周课量',
  '负责人',
  '状态',
  '操作'
]

const studentCourseFilters = ['学员', '学科商品', '教师', '交付中心', '状态']
const studentCourseColumns = [
  '学员',
  '教师',
  '学科商品',
  '班级',
  '交付中心',
  '总课时',
  '已排课课时',
  '已消费课时',
  '剩余课时',
  '预占课时',
  '过期课时',
  '课时生效时间',
  '课时到期时间',
  '教学方式',
  '授课方式',
  '状态',
  '规划师',
  '创建时间',
  '创建人',
  '更新人',
  '操作'
]

const investmentFilters = ['招商编码', '公司/合作方', '合作等级', '负责区域', '负责人', '状态']
const investmentColumns = [
  '招商编码',
  '公司/合作方',
  '对象类型',
  '合作等级',
  '负责区域',
  '负责人',
  '负责人手机号',
  '线索数',
  '签约数',
  '合同金额',
  '合约到期日',
  '创建时间',
  '状态',
  '操作'
]

const marketingFilters = ['渠道编码', '渠道名称', '渠道类型', '归属合作方', '负责人', '状态']
const marketingColumns = [
  '渠道编码',
  '渠道名称',
  '数据类型',
  '渠道类型',
  '负责人',
  '归属合作方',
  '二维码数',
  '访问量',
  '有效线索',
  '下单数',
  '支付数',
  '支付转化率',
  '成交金额',
  '状态',
  '操作'
]

const growthFilters = ['中心编码', '成长中心名称', '省份', '城市', '负责人', '状态']
const growthColumns = [
  '中心编码',
  '成长中心名称',
  '数据类型',
  '省份',
  '城市',
  '详细地址',
  '负责人',
  '手机号',
  '服务学员数',
  '设备数',
  '开业时间',
  '合约到期日',
  '状态',
  '操作'
]

const wechatFilters = ['内容编码', '名称', '内容类型', '关键字/菜单键', '回复类型', '状态']
const wechatColumns = [
  '内容编码',
  '名称',
  '内容类型',
  '关键字/菜单键',
  '回复类型',
  '素材类型',
  '内容摘要',
  '匹配方式',
  '排序',
  '维护人',
  '更新时间',
  '状态',
  '操作'
]

const systemUserFilters = ['登录账号', '姓名/名称', '所属组织', '部门', '角色', '状态']
const systemUserColumns = [
  '登录账号',
  '姓名/名称',
  '管理对象',
  '手机号',
  '所属组织',
  '部门',
  '角色',
  '数据范围',
  '可用应用',
  '最后登录',
  '创建时间',
  '状态',
  '操作'
]

const systemConfigFilters = ['配置编码', '名称', '配置类型', '权限标识', '状态']
const systemConfigColumns = [
  '配置编码',
  '名称',
  '配置类型',
  '上级菜单/应用',
  '权限标识',
  '路由/应用地址',
  '数据范围',
  '关联用户',
  '排序',
  '维护人',
  '更新时间',
  '状态',
  '操作'
]

export const verifiedPageContracts = {
  '/order/table': {
    title: '订单查询',
    filters: orderFilters,
    columns: orderColumns,
    pageActions: ['批量导入', '录入订单', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['已支付', '待支付', '收款确认中', '已取消'],
    dataScopes: ['交付层级', '运营层级', '经销商']
  },
  '/offline/order/table': {
    title: '订单查询',
    filters: orderFilters,
    columns: orderColumns,
    pageActions: ['录入订单', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['收款确认中', '已取消'],
    dataScopes: ['交付层级', '运营层级', '经销商']
  },
  '/order/return': {
    title: '退货管理',
    filters: orderFilters,
    columns: orderColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '审核退款', '更多'],
    observedStatuses: ['退款中', '已退款', '退款驳回'],
    dataScopes: ['交付层级', '运营层级', '经销商']
  },
  '/order/special/table': {
    title: '特殊订单',
    filters: orderFilters,
    columns: orderColumns,
    pageActions: ['录入订单', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待支付', '已支付', '收款确认中', '已取消'],
    dataScopes: ['交付层级', '运营层级', '经销商']
  },
  '/offline/order/refund': {
    title: '退货管理',
    filters: orderFilters,
    columns: orderColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '审核退款', '更多'],
    observedStatuses: ['退款中', '已退款', '退款驳回'],
    dataScopes: ['交付层级', '运营层级', '经销商']
  },
  '/masterdata/student': {
    title: '学员管理',
    filters: ['学号', '学员姓名', '手机号', '学员状态'],
    columns: [
      '学号',
      '学员姓名',
      '性别',
      '出生日期',
      '手机号',
      '就读学校',
      '意向/已选学科',
      '阶段',
      '报名时间',
      '学员状态',
      '创建时间',
      '更新时间',
      '创建人',
      '更新人',
      '操作'
    ],
    pageActions: ['列高设置', '列设置'],
    rowActions: ['详情', '更多']
  },
  '/parent': {
    title: '家长管理',
    filters: ['家长姓名', '性别', '手机号', '与学生关系', '状态'],
    columns: ['家长姓名', '性别', '手机号', '与学生关系', '状态', '创建时间', '更新时间', '创建人', '更新人', '操作'],
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '删除']
  },
  '/partnerCenter/deliveryCenter': {
    title: '交付中心',
    filters: ['交付中心名称', '交付中心类型', '主体类型', '状态'],
    columns: [
      '交付中心名称',
      '交付中心编码',
      '交付中心类型',
      '主体类型',
      '详细地址',
      '责任人',
      '负责人手机号',
      '可承接学员数量',
      '是否接单',
      '状态',
      '可用用户数量',
      '备注',
      '操作'
    ],
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多']
  },
  '/learningCenter/trialClass': {
    title: '学员分配管理',
    filters: ['学员', '学科商品', 'iPad 订阅', '教学方式', '授课方式', '状态'],
    columns: [
      '学员',
      '学段',
      '教师',
      '学科商品',
      '班级',
      '交付中心',
      '总课时',
      '已排课课时',
      '已消费课时',
      '剩余课时',
      '预占课时',
      '过期课时',
      'iPad 订阅',
      '课时生效时间',
      '课时到期时间',
      '教学方式',
      '授课方式',
      '状态',
      '规划师',
      '创建时间',
      '创建人',
      '更新人',
      '操作'
    ],
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['排课', '更多']
  },
  '/learningCenter/student': {
    title: '学员分配管理',
    filters: ['学员', '学科商品', 'iPad 订阅', '教学方式', '授课方式', '状态'],
    columns: [
      '学员',
      '教师',
      '学科商品',
      '班级',
      '交付中心',
      '总课时',
      '已排课课时',
      '已消费课时',
      '剩余课时',
      '预占课时',
      '过期课时',
      '课时生效时间',
      '课时到期时间',
      '教学方式',
      '授课方式',
      '状态',
      '规划师',
      '创建时间',
      '创建人',
      '更新人',
      '操作'
    ],
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['排课', '更多']
  },
  '/learningCenter/scheduleList': {
    title: '排课列表',
    filters: ['学员', '排课类型', '课程类型', '教师', '上课日期', '排课状态'],
    columns: [
      '排课标题',
      '排课类型',
      '学员/班级',
      '课程类型',
      '教师',
      '交付中心',
      '学科商品',
      '课程',
      '课节',
      '上课日期',
      '上课时间',
      '下课时间',
      '排课状态',
      '备注',
      '创建时间',
      '更新时间',
      '创建人',
      '更新人',
      '操作'
    ],
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['更多']
  },
  '/learningCenter/consume': {
    title: '排课消耗管理',
    filters: ['学员', '上课时间', '教师', '消课状态', '评价状态'],
    columns: [
      '排课标题',
      '教师',
      '学员',
      '消课状态',
      '评价状态',
      '交付中心',
      '学科商品',
      '课程类型',
      '课程',
      '课节',
      '上课日期',
      '上课时间',
      '下课时间',
      '消费课时',
      '备注',
      '创建时间',
      '更新时间',
      '创建人',
      '更新人',
      '操作'
    ],
    pageActions: ['导出', '列高设置', '列设置'],
    rowActionsByState: {
      '已消课/已评价': ['撤销', '评价信息', '更多'],
      '已消课/未评价': ['撤销', '去评价', '更多'],
      未上课: ['消课', '去评价', '更多'],
      已上课: ['消课', '回退预占课时', '去评价', '更多']
    }
  },
  '/partnerCenter/partner': {
    title: '线上加盟',
    filters: onboardingFilters,
    columns: onboardingColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '审核', '更多'],
    observedStatuses: ['待初审', '待补充', '复审中', '已通过', '证照预警'],
    dataScopes: ['运营层级', '合作审核区域']
  },
  '/partnerCenter/contract': {
    title: '合约管理',
    filters: contractFilters,
    columns: contractColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['待生效', '履约中', '已到期'],
    dataScopes: ['运营层级', '经销商']
  },
  '/partnerCenter/reward': {
    title: '提成奖励',
    filters: ['合作方', '合约类型', '提成比例', '状态'],
    columns: contractColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待生效', '履约中'],
    dataScopes: ['运营层级', '经销商']
  },
  '/deliveryCenterTree': {
    title: '交付层级',
    filters: hierarchyFilters,
    columns: hierarchyColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['交付层级']
  },
  '/operationTree': {
    title: '运营层级',
    filters: hierarchyFilters,
    columns: hierarchyColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['运营层级']
  },
  '/partnerCenter/onboarding': {
    title: '入驻申请',
    filters: onboardingFilters,
    columns: onboardingColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '审核', '更多'],
    observedStatuses: ['待初审', '待补充', '复审中', '已通过', '证照预警'],
    dataScopes: ['运营层级', '合作审核区域']
  },
  '/purchase/supplier': {
    title: '销售单',
    filters: onlinePurchaseFilters,
    columns: onlinePurchaseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待发货', '采购退供', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/purchase/order': {
    title: '采购单',
    filters: onlinePurchaseFilters,
    columns: onlinePurchaseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待发货', '已付款', '采购退供'],
    dataScopes: ['运营层级', '经销商']
  },
  '/purchase/purchaseReturn': {
    title: '销售退货',
    filters: onlinePurchaseFilters,
    columns: onlinePurchaseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['退款中', '已退款'],
    dataScopes: ['运营层级', '经销商']
  },
  '/purchase/purchaseReturnSupplier': {
    title: '采购退供',
    filters: onlinePurchaseFilters,
    columns: onlinePurchaseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['采购退供', '退款中', '已退供'],
    dataScopes: ['运营层级', '经销商']
  },
  '/offline/purchase/table': {
    title: '采购管理',
    filters: offlinePurchaseFilters,
    columns: offlinePurchaseColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['待付款', '运输中', '已到货'],
    dataScopes: ['运营层级', '经销商']
  },
  '/offline/purchase/supplier': {
    title: '销售单',
    filters: offlinePurchaseFilters,
    columns: offlinePurchaseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['运输中', '已到货'],
    dataScopes: ['运营层级', '经销商']
  },
  '/offline/purchase/purchaseReturn': {
    title: '销售退货',
    filters: offlinePurchaseFilters,
    columns: offlinePurchaseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['退款中', '已退款'],
    dataScopes: ['运营层级', '经销商']
  },
  '/offlinePurchase/purchaseReturnSupplier': {
    title: '采购退供',
    filters: offlinePurchaseFilters,
    columns: offlinePurchaseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['采购退供', '已退供'],
    dataScopes: ['运营层级', '经销商']
  },
  '/settlement/offlineRebateFee': {
    title: '海南返点',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待确认', '核对中', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/settlement/receiverBill': {
    title: '应收账单',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '核对', '更多'],
    observedStatuses: ['待确认', '核对中', '有差额', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/settlement/payeeBill': {
    title: '应付账单',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '核对', '更多'],
    observedStatuses: ['待确认', '待打款', '已完成'],
    dataScopes: ['运营层级', '交付层级']
  },
  '/settlement/recommendationFeeDetail': {
    title: '线上推荐费',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待确认', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/settlement/recommendationCourseDetail': {
    title: '线上年度奖',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待确认', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/settlement/offlineRecommendationFee': {
    title: '线下推荐费',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待确认', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/settlement/offlineAccountUsageFee': {
    title: '线下年度奖',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待确认', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/settlement/purchaseDetail': {
    title: '采购收入明细',
    filters: financeReportFilters,
    columns: financeReportColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['待确认', '已完成'],
    dataScopes: ['运营层级', '经销商']
  },
  '/masterdata/textbook': {
    title: '教材管理',
    filters: masterdataFilters,
    columns: masterdataColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['已上架', '待审核'],
    dataScopes: ['运营层级']
  },
  '/masterdata/course': {
    title: '课程管理',
    filters: masterdataFilters,
    columns: masterdataColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['已上架', '待审核'],
    dataScopes: ['运营层级']
  },
  '/masterData/knowledge_point': {
    title: '知识点管理',
    filters: masterdataFilters,
    columns: masterdataColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['已上架', '待审核'],
    dataScopes: ['运营层级']
  },
  '/courseProduct': {
    title: '学科商品',
    filters: masterdataFilters,
    columns: masterdataColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['已上架', '待审核'],
    dataScopes: ['运营层级', '经销商']
  },
  '/product': {
    title: '商品套餐',
    filters: masterdataFilters,
    columns: masterdataColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['已上架', '待审核'],
    dataScopes: ['运营层级', '经销商']
  },
  '/masterdata/studentLearning': {
    title: '学情管理',
    filters: ['学员编号', '学员', '年级/学科', '负责教师', '状态'],
    columns: ['学员编号', '学员', '记录类型', '年级/学科', '学情诊断', '学习目标', '当前成绩', '目标成绩', '学习计划', '负责教师', '最近更新', '状态', '操作'],
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['执行中'],
    dataScopes: ['交付层级', '教师本人']
  },
  '/learningCenter/trialTeacherSchedule': {
    title: '体验课排课',
    filters: learningScheduleFilters,
    columns: learningScheduleColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '改期', '更多'],
    observedStatuses: ['待上课', '已确认'],
    dataScopes: ['交付层级', '教师本人']
  },
  '/learningCenter/teacherSchedule': {
    title: '教师排课',
    filters: learningScheduleFilters,
    columns: learningScheduleColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '改期', '更多'],
    observedStatuses: ['待上课', '已确认'],
    dataScopes: ['交付层级', '教师本人']
  },
  '/studentCourse': {
    title: '学生课程',
    filters: studentCourseFilters,
    columns: studentCourseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '排课', '更多'],
    observedStatuses: ['正常', '待续课'],
    dataScopes: ['交付层级', '经销商']
  },
  '/learningCenter/department': {
    title: '部门管理',
    filters: learningOrganizationFilters,
    columns: learningOrganizationColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['在岗', '开班中', '启用'],
    dataScopes: ['交付层级']
  },
  '/learningCenter/deliveryClass': {
    title: '班级管理',
    filters: learningOrganizationFilters,
    columns: learningOrganizationColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['开班中', '停课'],
    dataScopes: ['交付层级']
  },
  '/learningCenter/teacher': {
    title: '教师管理',
    filters: learningOrganizationFilters,
    columns: learningOrganizationColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['在岗', '停用'],
    dataScopes: ['交付层级']
  },
  '/learningCenter/myStudent/': {
    title: '我的学员',
    filters: studentCourseFilters,
    columns: studentCourseColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '课堂记录', '更多'],
    observedStatuses: ['正常', '待续课'],
    dataScopes: ['教师本人']
  },
  '/investmentCompany/company': {
    title: '招商公司管理',
    filters: investmentFilters,
    columns: investmentColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['合作中', '审核中'],
    dataScopes: ['运营层级']
  },
  '/investmentCompany/dealer': {
    title: '合作方管理',
    filters: investmentFilters,
    columns: investmentColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['合作中', '审核中'],
    dataScopes: ['运营层级', '经销商']
  },
  '/channel': {
    title: '渠道管理',
    filters: marketingFilters,
    columns: marketingColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['运营层级', '经销商']
  },
  '/qrcode': {
    title: '二维码管理',
    filters: marketingFilters,
    columns: marketingColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '下载', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['运营层级', '经销商']
  },
  '/channelReport/summary': {
    title: '渠道统计',
    filters: marketingFilters,
    columns: marketingColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['启用'],
    dataScopes: ['运营层级', '经销商']
  },
  '/channelReport/detail': {
    title: '渠道明细',
    filters: marketingFilters,
    columns: marketingColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['启用'],
    dataScopes: ['运营层级', '经销商']
  },
  '/growth': {
    title: '成长中心加盟',
    filters: growthFilters,
    columns: growthColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['营业中', '筹备中'],
    dataScopes: ['运营层级']
  },
  '/growth/mapDashboard': {
    title: 'AI成长中心分布',
    filters: growthFilters,
    columns: growthColumns,
    pageActions: ['导出', '列高设置', '列设置'],
    rowActions: ['详情', '更多'],
    observedStatuses: ['营业中', '筹备中'],
    dataScopes: ['运营层级']
  },
  '/wechat/menu': {
    title: '自定义菜单',
    filters: wechatFilters,
    columns: wechatColumns,
    pageActions: ['新增', '发布', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['已发布', '启用'],
    dataScopes: ['运营层级']
  },
  '/wechat/reply': {
    title: '关键字自动回复',
    filters: wechatFilters,
    columns: wechatColumns,
    pageActions: ['新增', '发布', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['运营层级']
  },
  '/wechat/material': {
    title: '永久素材',
    filters: wechatFilters,
    columns: wechatColumns,
    pageActions: ['新增', '同步', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['启用', '已发布'],
    dataScopes: ['运营层级']
  },
  '/system/user': {
    title: '用户管理',
    filters: systemUserFilters,
    columns: systemUserColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '禁用', '更多'],
    observedStatuses: ['启用', '待开通'],
    dataScopes: ['全部数据']
  },
  '/system/menu': {
    title: '菜单管理',
    filters: systemConfigFilters,
    columns: systemConfigColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['全部数据']
  },
  '/system/role': {
    title: '角色管理',
    filters: systemConfigFilters,
    columns: systemConfigColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '配置权限', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['全部数据']
  },
  '/system/application': {
    title: '应用管理',
    filters: systemConfigFilters,
    columns: systemConfigColumns,
    pageActions: ['新增', '导出', '列高设置', '列设置'],
    rowActions: ['详情', '编辑', '更多'],
    observedStatuses: ['启用', '停用'],
    dataScopes: ['全部数据']
  }
}

export const onlineRouteCount = onlineModules.reduce((total, module) => total + module.pages.length, 0)

export const routeAuditIndex = Object.fromEntries(
  onlineModules.flatMap((module) =>
    module.pages.map((page) => [
      page.path,
      {
        module: module.name,
        page: page.name,
        verification: verifiedPageContracts[page.path] ? '字段已核验' : '路由已核验，字段待核验'
      }
    ])
  )
)
