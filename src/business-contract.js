export const businessEntityContracts = [
  {
    key: 'order',
    name: '订单',
    identityField: 'orderNo',
    requiredFields: [
      'orderNo',
      'status',
      'dealer',
      'seller',
      'orderMethod',
      'parentName',
      'parentMobile',
      'studentName',
      'courseType',
      'courseName',
      'amount',
      'paidAmount',
      'paymentTransactionNo',
      'allocationStatus',
      'deliveryCenter',
      'orderTime',
      'nextAction'
    ],
    statuses: ['待支付', '收款确认中', '已支付', '已取消'],
    relationKeys: ['studentName', 'parentName', 'parentMobile', 'courseName']
  },
  {
    key: 'delivery',
    name: '学习交付',
    identityField: 'orderNo',
    requiredFields: [
      'orderNo',
      'studentNo',
      'studentName',
      'parentName',
      'parentMobile',
      'courseName',
      'subjectProduct',
      'deliveryCenter',
      'teacherName',
      'className',
      'totalHours',
      'scheduledHours',
      'consumedHours',
      'remainingHours',
      'reservedHours',
      'evaluationStatus',
      'status'
    ],
    statuses: ['待分配', '待排课', '时间冲突', '交付中', '待续课', '待评价', '已完课'],
    relationKeys: ['studentName', 'parentName', 'parentMobile', 'courseName']
  },
  {
    key: 'purchase',
    name: '采购',
    identityField: 'purchaseNo',
    requiredFields: [
      'purchaseNo',
      'purchaseType',
      'relatedOrder',
      'studentName',
      'parentName',
      'parentMobile',
      'merchant',
      'supplier',
      'product',
      'quantity',
      'amount',
      'paidAmount',
      'paymentStatus',
      'voucherNo',
      'logisticsNo',
      'expectedAt',
      'status',
      'nextAction'
    ],
    statuses: ['待付款', '待确认付款', '待发货', '运输中', '采购退供', '已到货', '已退供'],
    relationKeys: ['studentName', 'parentName', 'parentMobile']
  },
  {
    key: 'partner',
    name: '合作入驻',
    identityField: 'applicationNo',
    requiredFields: [
      'applicationNo',
      'company',
      'entityType',
      'contact',
      'mobile',
      'region',
      'address',
      'licenseNo',
      'licenseExpiresAt',
      'completeness',
      'risk',
      'status',
      'accountStatus',
      'contractStatus'
    ],
    statuses: ['待初审', '待补充', '复审中', '证照预警', '已通过'],
    relationKeys: ['company', 'contact', 'mobile']
  },
  {
    key: 'settlement',
    name: '财务结算',
    identityField: 'billNo',
    requiredFields: [
      'billNo',
      'partner',
      'period',
      'businessAmount',
      'receivableAmount',
      'payableAmount',
      'paidAmount',
      'amount',
      'diff',
      'invoiceStatus',
      'settlementStatus',
      'owner',
      'status'
    ],
    statuses: ['待确认', '核对中', '有差额', '待打款', '已完成'],
    relationKeys: ['partner', 'period']
  },
  {
    key: 'settlementSplit',
    name: '分账流水',
    identityField: 'orderNo',
    requiredFields: [
      'orderNo',
      'transactionNo',
      'studentName',
      'partner',
      'deliveryCenter',
      'paidAmount',
      'merchantShare',
      'deliveryCost',
      'hqGross',
      'refundFrozen',
      'auditDiff',
      'settlementBills',
      'paymentCheck',
      'allocationCheck',
      'splitCheck',
      'billCheck',
      'transferCheck',
      'blocker',
      'checkStatus',
      'status',
      'rule',
      'nextAction'
    ],
    statuses: ['已核对', '待核验', '冻结', '差额'],
    relationKeys: ['orderNo', 'transactionNo', 'studentName', 'partner', 'deliveryCenter']
  }
]

export const workflowStateTransitions = {
  order: {
    待支付: ['已支付', '已取消'],
    收款确认中: ['已支付', '待支付'],
    已支付: ['已分配', '退款中'],
    退款中: ['已退款', '退款驳回']
  },
  delivery: {
    待分配: ['待排课'],
    待排课: ['交付中'],
    时间冲突: ['交付中'],
    交付中: ['待评价', '待续课', '已完课'],
    待评价: ['已完课'],
    待续课: ['交付中', '已完课']
  },
  purchase: {
    待付款: ['待确认付款'],
    待确认付款: ['待发货'],
    待发货: ['运输中'],
    运输中: ['已到货'],
    采购退供: ['已退供']
  },
  partner: {
    待初审: ['复审中', '待补充'],
    待补充: ['待初审'],
    复审中: ['已通过', '待补充'],
    证照预警: ['复审中', '待补充']
  },
  settlement: {
    待确认: ['核对中', '待打款'],
    核对中: ['有差额', '待打款'],
    有差额: ['核对中', '待确认'],
    待打款: ['已完成']
  }
}

export const dataScopeRules = [
  { key: 'all', label: '全部数据', appliesTo: ['超级管理员'], boundary: '不限制组织、商家、交付中心和区域' },
  { key: 'operationTree', label: '运营层级', appliesTo: ['总部运营', '财务人员', '质控专员'], boundary: '按运营组织及下级组织过滤' },
  { key: 'deliveryTree', label: '交付层级', appliesTo: ['交付负责人', '学管师', '规划师', '客服'], boundary: '按交付中心、服务家庭、班级和学员归属过滤' },
  { key: 'personalTeaching', label: '本人教学范围', appliesTo: ['导学师'], boundary: '仅本人负责学科下的班级、课程、课节和学员' },
  { key: 'qualityScope', label: '质控课堂范围', appliesTo: ['质控专员'], boundary: '按授权交付中心、教师、学科、课堂和质控批次过滤' },
  { key: 'dealer', label: '经销商/商家', appliesTo: ['商家负责人'], boundary: '仅本商家及授权下级商家订单、学员和结算' },
  { key: 'partnerReview', label: '合作审核区域', appliesTo: ['合作审核员'], boundary: '按入驻申请区域、合作对象和审核责任人过滤' }
]
