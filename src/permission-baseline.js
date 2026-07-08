export const permissionAuditDimensions = [
  {
    key: 'menu',
    name: '菜单权限',
    requirement: '逐角色核对 13 个模块、62 个页面的可见范围'
  },
  {
    key: 'action',
    name: '按钮权限',
    requirement: '核对新增、编辑、删除、导入、导出和状态动作'
  },
  {
    key: 'dataScope',
    name: '数据范围',
    requirement: '核对交付层级、运营层级、经销商及上下级范围'
  },
  {
    key: 'masking',
    name: '字段脱敏',
    requirement: '核对姓名、手机号、支付流水及证照字段的展示规则'
  }
]

export const pendingRoleAccessMatrix = [
  {
    key: 'superAdmin',
    roleName: '超级管理员',
    scenario: '总部平台 owner，负责全系统配置、异常兜底和灰度验收',
    dataScope: '全部组织、全部交付中心、全部商家、全部订单',
    menus: ['工作台', '订单任务', '交付任务', '入驻审核', '结算任务', '全部业务台账', '经营分析', '系统管理'],
    actions: ['查看', '新增', '编辑', '删除', '导入', '导出', '分单', '审核', '结算确认', '权限配置'],
    fieldPolicy: '可查看完整业务字段；手机号、支付流水、证照号按线上脱敏规则展示',
    requiredFields: ['学员', '家长', '家长手机号', '订单号', '课程', '交付中心', '支付交易号', '证照有效期'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'headquartersOperator',
    roleName: '总部运营',
    scenario: '处理订单、分单、异常、售后和跨中心协调',
    dataScope: '总部及授权运营层级数据',
    menus: ['工作台', '订单任务', '交付任务', '线上订单', '线下订单', '学习中心', '合作中心'],
    actions: ['查看', '导出', '录入订单', '核验支付', '分配交付中心', '处理退款', '查看交付进度'],
    fieldPolicy: '必须展示学员、家长、课程、经销商、支付与交付字段；证照字段默认不可见',
    requiredFields: ['学员', '家长', '家长手机号', '经销商', '课程', '订单状态', '是否已分配', '交付中心'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'deliveryManager',
    roleName: '交付负责人',
    scenario: '承接订单后的教师分配、排课、消课、续课和交付异常处理',
    dataScope: '本交付中心及授权下级交付中心',
    menus: ['工作台', '交付任务', '学习中心', '学员管理', '订单只读'],
    actions: ['查看', '分配教师', '排课', '改期', '消课', '回退预占课时', '提醒评价', '导出'],
    fieldPolicy: '必须展示学员、家长联系方式、课程、课时和排课状态；金额字段只读或隐藏按线上规则',
    requiredFields: ['学员', '家长手机号', '课程', '总课时', '已排课课时', '已消课时', '剩余课时', '教师', '班级'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'tutor',
    roleName: '导学师',
    scenario: '按学科负责上课、消课、学情录入和课后报告',
    dataScope: '本人名下学员、班级、学科课程和课节',
    menus: ['工作台', '我的课表', '我的学员', '课堂记录', '消课管理'],
    actions: ['查看', '开始上课', '申请调课', '发起消课', '录入学情', '提交课后报告'],
    fieldPolicy: '展示本人授课所需的学员和家长联系信息；订单、结算、商家合同不可见',
    requiredFields: ['学员', '家长手机号', '学科', '课程', '课节', '上课时间', '课堂状态', '学情', '课后报告'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'studentManager',
    roleName: '学管师',
    scenario: '负责排课调课、核销审批、课时台账、续费预警和家长服务',
    dataScope: '本交付中心负责的学员、家庭和课程',
    menus: ['工作台', '排课管理', '学员管理', '消课管理', '课时台账', '续费管理'],
    actions: ['查看', '排课', '改期', '核销审批', '回退课时', '发起续费', '记录家长沟通'],
    fieldPolicy: '完整展示服务所需的学员、家长和课时信息；支付流水与商家合同不可见',
    requiredFields: ['学员', '家长', '家长手机号', '课程', '教师', '总课时', '已消课时', '剩余课时', '续费状态'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'planner',
    roleName: '规划师',
    scenario: '负责体验课首追、学习方案、持续跟进、出题单和转正分单',
    dataScope: '本交付中心待转化及本人负责的学员',
    menus: ['工作台', '体验课管理', '学员管理', '订单只读', '转化看板'],
    actions: ['查看', '记录首追', '维护跟进', '生成学习方案', '出题单', '确认转正', '提交分单'],
    fieldPolicy: '完整展示转化所需的学员、家长、课程和报价摘要；支付流水与结算不可见',
    requiredFields: ['学员', '家长', '家长手机号', '体验课程', '体验结果', '意向等级', '跟进记录', '题单状态'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'qualityControl',
    roleName: '质控专员',
    scenario: '回看课堂录像、执行五维评分、下发整改并复核教学质量',
    dataScope: '总部授权的全部或指定交付中心课堂',
    menus: ['工作台', '待质检课堂', '质控记录', '整改复核', '质控报表'],
    actions: ['查看录像', '五维评分', '提交质检', '下发整改', '复核整改', '导出报告'],
    fieldPolicy: '展示质检所需的学员、课程、教师和课堂资料；家长联系方式按需脱敏，交易字段不可见',
    requiredFields: ['学员', '教师', '课程', '课节', '课堂录像', '五维评分', '问题项', '整改状态'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'customerService',
    roleName: '客服',
    scenario: '处理家长消息、服务群预警、投诉退费工单和结案回访',
    dataScope: '本交付中心服务中的家庭、学员和工单',
    menus: ['工作台', '家长消息', '服务工单', '学员管理', '售后订单只读'],
    actions: ['查看', '回复消息', '创建工单', '推进工单', '协同退费', '结案', '回访'],
    fieldPolicy: '完整展示服务所需的学员、家长和联系方式；金额仅展示售后摘要，支付凭证不可见',
    requiredFields: ['学员', '家长', '家长手机号', '服务群', '问题类型', '工单状态', '负责人', '处理时限'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'merchantOwner',
    roleName: '商家负责人',
    scenario: '查看本商家订单、学员交付、渠道数据和可提现结算',
    dataScope: '本商家及授权下级商家数据',
    menus: ['工作台', '订单任务', '交付任务', '线上订单', '线下订单', '渠道统计', '结算任务'],
    actions: ['查看', '代下单', '提醒支付', '查看交付进度', '提交售后', '确认账单', '提现申请'],
    fieldPolicy: '展示本商家学员、家长、订单和结算字段；其他商家、总部成本和供应商字段不可见',
    requiredFields: ['学员', '家长', '家长手机号', '订单号', '课程', '订单金额', '交付中心', '结算状态'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'financeOperator',
    roleName: '财务人员',
    scenario: '处理收款确认、账单核对、差额处理、打款和发票状态',
    dataScope: '总部财务授权账套和结算对象',
    menus: ['结算任务', '财务报表', '线上采购', '线下采购', '线上订单只读', '线下订单只读'],
    actions: ['查看', '导出', '确认收款', '核对账单', '发起差额核对', '确认打款', '登记发票'],
    fieldPolicy: '展示金额、支付流水、结算对象和发票字段；教学过程字段只读摘要',
    requiredFields: ['订单号', '支付交易号', '业务金额', '应收金额', '应付金额', '已结金额', '差额', '发票状态'],
    verification: '待按线上角色管理页逐项核验'
  },
  {
    key: 'partnerAuditor',
    roleName: '合作审核员',
    scenario: '处理入驻申请、交付中心、合约、提成奖励和证照风险',
    dataScope: '合作中心授权区域及合作对象',
    menus: ['入驻审核', '合作中心', '招商管理', '系统用户只读'],
    actions: ['查看', '初审', '复审', '退回补充', '新增交付中心', '维护合约', '导出'],
    fieldPolicy: '展示主体、联系人、证照、合约和层级字段；订单支付流水不可见',
    requiredFields: ['申请编号', '申请主体', '联系人', '联系人手机号', '营业执照号', '证照有效期', '资料完整度'],
    verification: '待按线上角色管理页逐项核验'
  }
]

export const workflowGuardrails = [
  {
    key: 'order',
    name: '订单任务',
    ownerRoles: ['总部运营', '商家负责人', '财务人员'],
    statuses: ['待支付', '收款确认中', '已支付', '已分配', '退款中', '已取消'],
    requiredFields: ['学员', '家长', '课程', '经销商', '销售方', '金额', '实付金额', '支付交易号', '交付中心'],
    criticalActions: ['核验支付', '提醒支付', '分配交付中心', '审核退款', '查看履约进度']
  },
  {
    key: 'delivery',
    name: '学习交付',
    ownerRoles: ['交付负责人', '导学师', '学管师', '规划师', '质控专员', '客服', '总部运营'],
    statuses: ['待分配', '待排课', '时间冲突', '交付中', '待评价', '待续课', '已完课'],
    requiredFields: ['学员', '家长手机号', '课程', '教师', '班级', '总课时', '已排课课时', '已消课时', '剩余课时'],
    criticalActions: ['分配教师', '排课', '改期', '消课', '回退预占课时', '去评价']
  },
  {
    key: 'partner',
    name: '合作入驻',
    ownerRoles: ['合作审核员', '超级管理员'],
    statuses: ['待初审', '待补充', '复审中', '已通过', '证照预警'],
    requiredFields: ['申请编号', '申请主体', '联系人', '手机号', '经营区域', '营业执照号', '资料完整度', '风险等级'],
    criticalActions: ['初审通过', '退回补充', '提交复审', '审核通过', '开通账号']
  },
  {
    key: 'purchase',
    name: '采购履约',
    ownerRoles: ['财务人员', '总部运营', '商家负责人'],
    statuses: ['待付款', '已付款', '待发货', '运输中', '采购退供', '退款中'],
    requiredFields: ['采购编号', '关联订单', '供应商', '采购方', '商品', '数量', '采购金额', '付款凭证', '物流单号'],
    criticalActions: ['补充付款凭证', '确认付款', '登记物流', '发起采购退供', '确认退款']
  },
  {
    key: 'finance',
    name: '财务结算',
    ownerRoles: ['财务人员', '商家负责人', '超级管理员'],
    statuses: ['待确认', '核对中', '有差额', '待打款', '已完成'],
    requiredFields: ['账单编号', '账期', '结算对象', '业务金额', '应收金额', '应付金额', '已结金额', '差额', '发票状态'],
    criticalActions: ['确认账单', '发起差额核对', '确认打款', '登记发票', '导出账单']
  }
]

export const permissionActionCatalog = [
  { key: 'orders.view', group: '订单', label: '查看订单' },
  { key: 'orders.handle', group: '订单', label: '核验支付/分单' },
  { key: 'orders.refund', group: '订单', label: '处理退款' },
  { key: 'delivery.view', group: '交付', label: '查看交付' },
  { key: 'delivery.assign', group: '交付', label: '分配教师' },
  { key: 'delivery.schedule', group: '交付', label: '排课/改期' },
  { key: 'delivery.consume', group: '交付', label: '消课/评价' },
  { key: 'delivery.learningRecord', group: '导学', label: '学情/课后报告' },
  { key: 'delivery.consumeApproval', group: '学管', label: '核销审批/回退课时' },
  { key: 'delivery.renewal', group: '学管', label: '续费预警/家长沟通' },
  { key: 'delivery.convert', group: '规划', label: '首追/方案/转正' },
  { key: 'quality.review', group: '质控', label: '录像评分/整改复核' },
  { key: 'service.message', group: '客服', label: '家长消息/群预警' },
  { key: 'service.ticket', group: '客服', label: '工单推进/结案' },
  { key: 'purchase.view', group: '采购', label: '查看采购' },
  { key: 'purchase.handle', group: '采购', label: '付款/物流/退供' },
  { key: 'partner.view', group: '合作', label: '查看入驻' },
  { key: 'partner.review', group: '合作', label: '审核/退回' },
  { key: 'finance.view', group: '财务', label: '查看账单' },
  { key: 'finance.handle', group: '财务', label: '核对/打款/发票' },
  { key: 'registry.export', group: '台账', label: '导出台账' },
  { key: 'registry.edit', group: '台账', label: '编辑台账' },
  { key: 'system.configure', group: '系统', label: '配置权限' }
]

// This matrix drives the prototype's role preview only. It is never treated as
// a production authorization source until matched to an online role id.
export const roleAccessPreviewMatrix = [
  {
    roleKey: 'superAdmin',
    contractKey: 'superAdmin',
    roleName: '超级管理员',
    onlineRoleId: null,
    verification: '待线上角色ID、菜单、按钮和数据范围逐项核验',
    defaultScope: '全国业务',
    selectableScopes: ['全国业务', '总部运营层级', '总部交付中心', '本中心及下级', '华东区域', '本商家', '本人学员'],
    scopeDimensions: ['组织', '运营层级', '交付层级', '商家', '区域', '负责人'],
    menuViews: [
      'workbench',
      'orders',
      'delivery',
      'purchase',
      'partners',
      'finance',
      'registry-masterdata',
      'registry-partner-center',
      'registry-learning',
      'registry-online-orders',
      'registry-offline-orders',
      'registry-online-purchase',
      'registry-offline-purchase',
      'registry-finance-reports',
      'registry-investment',
      'registry-marketing',
      'registry-growth',
      'registry-wechat',
      'registry-system-admin',
      'analytics',
      'system'
    ],
    permissions: permissionActionCatalog.map((permission) => permission.key)
  },
  {
    roleKey: 'operations',
    contractKey: 'headquartersOperator',
    roleName: '总部运营',
    onlineRoleId: null,
    verification: '待线上角色ID、跨中心边界和售后按钮逐项核验',
    defaultScope: '总部运营层级',
    selectableScopes: ['总部运营层级', '总部交付中心', '华东区域'],
    scopeDimensions: ['运营组织', '下级组织', '交付中心', '订单归属'],
    menuViews: [
      'workbench',
      'orders',
      'delivery',
      'purchase',
      'partners',
      'registry-masterdata',
      'registry-partner-center',
      'registry-learning',
      'registry-online-orders',
      'registry-offline-orders',
      'registry-online-purchase',
      'registry-offline-purchase',
      'registry-marketing',
      'analytics',
      'system'
    ],
    permissions: [
      'orders.view',
      'orders.handle',
      'orders.refund',
      'delivery.view',
      'delivery.assign',
      'delivery.schedule',
      'purchase.view',
      'purchase.handle',
      'partner.view',
      'registry.export',
      'registry.edit'
    ]
  },
  {
    roleKey: 'delivery',
    contractKey: 'deliveryManager',
    roleName: '交付负责人',
    onlineRoleId: null,
    verification: '待线上交付层级、中心下级和金额字段逐项核验',
    defaultScope: '本中心及下级',
    selectableScopes: ['本中心及下级', '总部交付中心'],
    scopeDimensions: ['交付中心', '下级中心', '班级', '教师', '学员'],
    menuViews: ['workbench', 'orders', 'delivery', 'registry-masterdata', 'registry-learning', 'analytics', 'system'],
    permissions: [
      'orders.view',
      'delivery.view',
      'delivery.assign',
      'delivery.schedule',
      'delivery.consume',
      'registry.export',
      'registry.edit'
    ]
  },
  {
    roleKey: 'tutor',
    contractKey: 'tutor',
    roleName: '导学师',
    onlineRoleId: null,
    verification: '待线上导学师角色ID、本人学员和课后动作逐项核验',
    defaultScope: '本人学员',
    selectableScopes: ['本人学员'],
    scopeDimensions: ['当前用户', '本人学科', '本人班级', '本人课程', '本人学员'],
    menuViews: ['workbench', 'delivery', 'registry-learning', 'system'],
    permissions: ['delivery.view', 'delivery.schedule', 'delivery.consume', 'delivery.learningRecord']
  },
  {
    roleKey: 'studentManager',
    contractKey: 'studentManager',
    roleName: '学管师',
    onlineRoleId: null,
    verification: '待线上学管师角色ID、中心学员和核销审批逐项核验',
    defaultScope: '本交付中心',
    selectableScopes: ['本交付中心'],
    scopeDimensions: ['交付中心', '负责家庭', '学员', '课程', '课时台账'],
    menuViews: ['workbench', 'orders', 'delivery', 'registry-masterdata', 'registry-learning', 'system'],
    permissions: [
      'orders.view',
      'delivery.view',
      'delivery.schedule',
      'delivery.consumeApproval',
      'delivery.renewal',
      'registry.edit'
    ]
  },
  {
    roleKey: 'planner',
    contractKey: 'planner',
    roleName: '规划师',
    onlineRoleId: null,
    verification: '待线上规划师角色ID、转化学员范围和转正动作逐项核验',
    defaultScope: '本交付中心',
    selectableScopes: ['本交付中心'],
    scopeDimensions: ['交付中心', '本人负责学员', '体验课', '转化阶段'],
    menuViews: ['workbench', 'orders', 'delivery', 'registry-learning', 'analytics', 'system'],
    permissions: ['orders.view', 'delivery.view', 'delivery.convert', 'registry.edit']
  },
  {
    roleKey: 'qualityControl',
    contractKey: 'qualityControl',
    roleName: '质控专员',
    onlineRoleId: null,
    verification: '待线上质控角色ID、跨中心课堂范围和整改动作逐项核验',
    defaultScope: '全交付中心',
    selectableScopes: ['全交付中心', '总部交付中心', '华东区域'],
    scopeDimensions: ['交付中心', '教师', '学科', '课堂', '质控批次'],
    menuViews: ['workbench', 'delivery', 'registry-learning', 'analytics', 'system'],
    permissions: ['delivery.view', 'quality.review', 'registry.export']
  },
  {
    roleKey: 'customerService',
    contractKey: 'customerService',
    roleName: '客服',
    onlineRoleId: null,
    verification: '待线上客服角色ID、服务家庭范围和售后工单动作逐项核验',
    defaultScope: '本交付中心',
    selectableScopes: ['本交付中心'],
    scopeDimensions: ['交付中心', '服务家庭', '学员', '服务群', '工单'],
    menuViews: ['workbench', 'orders', 'delivery', 'finance', 'registry-learning', 'system'],
    permissions: [
      'orders.view',
      'orders.refund',
      'delivery.view',
      'finance.view',
      'service.message',
      'service.ticket'
    ]
  },
  {
    roleKey: 'merchant',
    contractKey: 'merchantOwner',
    roleName: '商家负责人',
    onlineRoleId: null,
    verification: '待线上商家上下级、代下单和提现按钮逐项核验',
    defaultScope: '本商家',
    selectableScopes: ['本商家'],
    scopeDimensions: ['商家', '授权下级商家', '订单归属', '结算对象'],
    menuViews: [
      'workbench',
      'orders',
      'delivery',
      'finance',
      'registry-online-orders',
      'registry-offline-orders',
      'registry-marketing',
      'analytics',
      'system'
    ],
    permissions: ['orders.view', 'orders.handle', 'delivery.view', 'finance.view', 'registry.export']
  },
  {
    roleKey: 'finance',
    contractKey: 'financeOperator',
    roleName: '财务人员',
    onlineRoleId: null,
    verification: '待线上账套、结算对象和打款按钮逐项核验',
    defaultScope: '总部运营层级',
    selectableScopes: ['总部运营层级', '华东区域'],
    scopeDimensions: ['财务账套', '运营组织', '结算对象', '订单归属'],
    menuViews: [
      'workbench',
      'orders',
      'purchase',
      'finance',
      'registry-online-orders',
      'registry-offline-orders',
      'registry-online-purchase',
      'registry-offline-purchase',
      'registry-finance-reports',
      'analytics',
      'system'
    ],
    permissions: [
      'orders.view',
      'purchase.view',
      'purchase.handle',
      'finance.view',
      'finance.handle',
      'registry.export'
    ]
  },
  {
    roleKey: 'partnerAuditor',
    contractKey: 'partnerAuditor',
    roleName: '合作审核员',
    onlineRoleId: null,
    verification: '待线上审核区域、合作对象和账号开通按钮逐项核验',
    defaultScope: '华东区域',
    selectableScopes: ['华东区域'],
    scopeDimensions: ['审核区域', '合作对象', '审核责任人'],
    menuViews: [
      'workbench',
      'partners',
      'registry-partner-center',
      'registry-investment',
      'registry-system-admin',
      'system'
    ],
    permissions: ['partner.view', 'partner.review', 'registry.export', 'registry.edit']
  }
]

export const maskingModeLabels = {
  full: '完整',
  partial: '脱敏',
  hidden: '隐藏'
}

export const sensitiveFieldCatalog = [
  {
    key: 'studentName',
    label: '学员姓名',
    category: '教学身份',
    policies: {
      superAdmin: 'full',
      operations: 'full',
      delivery: 'full',
      tutor: 'full',
      studentManager: 'full',
      planner: 'full',
      qualityControl: 'full',
      customerService: 'full',
      merchant: 'full',
      finance: 'partial',
      partnerAuditor: 'hidden'
    }
  },
  {
    key: 'parentName',
    label: '家长姓名',
    category: '教学身份',
    policies: {
      superAdmin: 'full',
      operations: 'full',
      delivery: 'full',
      tutor: 'full',
      studentManager: 'full',
      planner: 'full',
      qualityControl: 'partial',
      customerService: 'full',
      merchant: 'full',
      finance: 'partial',
      partnerAuditor: 'hidden'
    }
  },
  {
    key: 'parentMobile',
    label: '家长手机号',
    category: '联系方式',
    policies: {
      superAdmin: 'partial',
      operations: 'full',
      delivery: 'full',
      tutor: 'full',
      studentManager: 'full',
      planner: 'full',
      qualityControl: 'hidden',
      customerService: 'full',
      merchant: 'partial',
      finance: 'partial',
      partnerAuditor: 'hidden'
    }
  },
  {
    key: 'contactName',
    label: '合作联系人',
    category: '合作主体',
    policies: {
      superAdmin: 'partial',
      operations: 'partial',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'hidden',
      qualityControl: 'hidden',
      customerService: 'hidden',
      merchant: 'hidden',
      finance: 'hidden',
      partnerAuditor: 'full'
    }
  },
  {
    key: 'contactMobile',
    label: '联系人手机号',
    category: '合作主体',
    policies: {
      superAdmin: 'partial',
      operations: 'partial',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'hidden',
      qualityControl: 'hidden',
      customerService: 'hidden',
      merchant: 'hidden',
      finance: 'hidden',
      partnerAuditor: 'full'
    }
  },
  {
    key: 'paymentTransactionNo',
    label: '支付交易号',
    category: '支付凭证',
    policies: {
      superAdmin: 'partial',
      operations: 'partial',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'hidden',
      qualityControl: 'hidden',
      customerService: 'hidden',
      merchant: 'hidden',
      finance: 'full',
      partnerAuditor: 'hidden'
    }
  },
  {
    key: 'licenseNo',
    label: '营业执照号',
    category: '主体证照',
    policies: {
      superAdmin: 'partial',
      operations: 'hidden',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'hidden',
      qualityControl: 'hidden',
      customerService: 'hidden',
      merchant: 'hidden',
      finance: 'hidden',
      partnerAuditor: 'full'
    }
  },
  {
    key: 'businessAmount',
    label: '业务金额',
    category: '经营金额',
    policies: {
      superAdmin: 'full',
      operations: 'full',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'partial',
      qualityControl: 'hidden',
      customerService: 'partial',
      merchant: 'full',
      finance: 'full',
      partnerAuditor: 'hidden'
    }
  },
  {
    key: 'supplier',
    label: '供应商',
    category: '采购关系',
    policies: {
      superAdmin: 'full',
      operations: 'full',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'hidden',
      qualityControl: 'hidden',
      customerService: 'hidden',
      merchant: 'partial',
      finance: 'full',
      partnerAuditor: 'hidden'
    }
  },
  {
    key: 'settlementAmount',
    label: '结算金额',
    category: '财务结算',
    policies: {
      superAdmin: 'full',
      operations: 'partial',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'hidden',
      qualityControl: 'hidden',
      customerService: 'partial',
      merchant: 'full',
      finance: 'full',
      partnerAuditor: 'hidden'
    }
  },
  {
    key: 'address',
    label: '主体地址',
    category: '主体证照',
    policies: {
      superAdmin: 'partial',
      operations: 'hidden',
      delivery: 'hidden',
      tutor: 'hidden',
      studentManager: 'hidden',
      planner: 'hidden',
      qualityControl: 'hidden',
      customerService: 'hidden',
      merchant: 'hidden',
      finance: 'hidden',
      partnerAuditor: 'full'
    }
  }
]

export const sensitiveFieldAliases = {
  student: 'studentName',
  studentName: 'studentName',
  parent: 'parentName',
  parentName: 'parentName',
  contact: 'contactName',
  mobile: 'contactMobile',
  phone: 'parentMobile',
  parentMobile: 'parentMobile',
  contactMobile: 'parentMobile',
  paymentTransactionNo: 'paymentTransactionNo',
  transactionNo: 'paymentTransactionNo',
  voucherNo: 'paymentTransactionNo',
  licenseNo: 'licenseNo',
  businessAmount: 'businessAmount',
  orderAmount: 'businessAmount',
  amount: 'businessAmount',
  paidAmount: 'businessAmount',
  receivableAmount: 'settlementAmount',
  payableAmount: 'settlementAmount',
  settlementAmount: 'settlementAmount',
  diff: 'settlementAmount',
  supplier: 'supplier',
  address: 'address'
}

export function previewPermissionDecision(roleKey, permissionKey) {
  const contract = roleAccessPreviewMatrix.find((role) => role.roleKey === roleKey)
  const allowed = Boolean(contract?.permissions.includes(permissionKey))
  return {
    allowed,
    verified: false,
    source: 'prototype-preview',
    reason: allowed ? '体验层业务基线允许，仍待线上核验' : '体验层业务基线拒绝'
  }
}

export function fieldMaskingDecision(roleKey, fieldKey) {
  const canonicalKey = sensitiveFieldAliases[fieldKey] || fieldKey
  const field = sensitiveFieldCatalog.find((item) => item.key === canonicalKey)
  return {
    fieldKey: canonicalKey,
    mode: field?.policies[roleKey] || 'full',
    verified: false
  }
}

// Only roles verified against the online role, menu and data-scope pages may enter this list.
export const verifiedRoleContracts = []

export function permissionDecision(roleKey, permissionKey) {
  const roleContract = verifiedRoleContracts.find((role) => role.key === roleKey)
  if (!roleContract) {
    return {
      allowed: false,
      verified: false,
      reason: '角色权限尚未完成线上核验'
    }
  }

  return {
    allowed: roleContract.permissions.includes(permissionKey),
    verified: true,
    reason: roleContract.permissions.includes(permissionKey) ? '线上权限契约允许' : '线上权限契约拒绝'
  }
}
