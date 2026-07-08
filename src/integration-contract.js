export const runtimeIdentityContract = {
  sourcePages: ['/system/user', '/system/role'],
  requiredFields: [
    'userId',
    'account',
    'displayName',
    'roleIds',
    'permissionKeys',
    'scopeKey',
    'scopeEntityIds',
    'organizationId',
    'sessionId'
  ],
  rejectWhenMissing: ['userId', 'roleIds', 'scopeKey', 'sessionId'],
  fallback: 'deny'
}

export const runtimeContextFields = [
  { key: 'userId', label: '用户 ID', source: '登录态用户对象', status: '待绑定' },
  { key: 'account', label: '登录账号', source: '登录态用户对象', status: '待绑定' },
  { key: 'displayName', label: '用户名称', source: '登录态用户对象', status: '待绑定' },
  { key: 'roleIds', label: '真实角色 ID', source: '角色管理 /system/role', status: '待绑定' },
  { key: 'permissionKeys', label: '按钮权限码', source: '角色与菜单授权结果', status: '待绑定' },
  { key: 'scopeKey', label: '数据范围类型', source: '角色数据范围配置', status: '待绑定' },
  { key: 'scopeEntityIds', label: '范围对象 ID', source: '组织/运营/交付/商家树', status: '待绑定' },
  { key: 'organizationId', label: '当前组织 ID', source: '登录态组织上下文', status: '待绑定' },
  { key: 'sessionId', label: '会话 ID', source: '认证服务响应', status: '待绑定' }
]

const commonMutationFields = ['requestId', 'operatorId', 'roleIds', 'scopeKey', 'scopeEntityIds', 'version']
const commonResponseFields = ['requestId', 'auditId', 'status', 'updatedAt', 'version']

export const workflowApiContracts = [
  {
    key: 'order',
    name: '订单任务',
    identityField: 'orderNo',
    listPermission: 'orders.view',
    listEndpoint: null,
    detailEndpoint: null,
    listQueryFields: ['page', 'pageSize', 'status', 'orderNo', 'studentName', 'parentName', 'deliveryCenterId', 'scopeKey'],
    commands: [
      {
        key: 'confirmPayment',
        label: '核验支付',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_ORDER_CONFIRM_PAYMENT',
        permission: 'orders.handle',
        requestFields: [...commonMutationFields, 'orderNo', 'decision', 'paymentTransactionNo', 'paidAmount', 'reason'],
        responseFields: [...commonResponseFields, 'paymentStatus', 'riskStatus']
      },
      {
        key: 'allocateDeliveryCenter',
        label: '分配交付中心',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_ORDER_ALLOCATE',
        permission: 'orders.handle',
        requestFields: [...commonMutationFields, 'orderNo', 'deliveryCenterId', 'reason'],
        responseFields: [...commonResponseFields, 'allocationStatus', 'deliveryCenterId']
      },
      {
        key: 'sendPaymentReminder',
        label: '发送付款提醒',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_ORDER_REMIND',
        permission: 'orders.handle',
        requestFields: [...commonMutationFields, 'orderNo', 'channel'],
        responseFields: [...commonResponseFields, 'remindedAt']
      },
      {
        key: 'reviewRefund',
        label: '审核退款',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_ORDER_REFUND_REVIEW',
        permission: 'orders.refund',
        requestFields: [...commonMutationFields, 'orderNo', 'decision', 'refundAmount', 'reason'],
        responseFields: [...commonResponseFields, 'afterSaleStatus', 'refundStatus']
      }
    ]
  },
  {
    key: 'delivery',
    name: '交付任务',
    identityField: 'orderNo',
    listPermission: 'delivery.view',
    listEndpoint: null,
    detailEndpoint: null,
    listQueryFields: ['page', 'pageSize', 'status', 'studentName', 'teacherId', 'classId', 'deliveryCenterId', 'scopeKey'],
    commands: [
      {
        key: 'assignTeacher',
        label: '分配教师',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_DELIVERY_ASSIGN_TEACHER',
        permission: 'delivery.assign',
        requestFields: [...commonMutationFields, 'orderNo', 'studentNo', 'teacherId', 'reason'],
        responseFields: [...commonResponseFields, 'teacherId', 'deliveryStatus']
      },
      {
        key: 'scheduleClass',
        label: '排课/改期',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_DELIVERY_SCHEDULE',
        permission: 'delivery.schedule',
        requestFields: [...commonMutationFields, 'orderNo', 'studentNo', 'teacherId', 'classMode', 'startAt', 'endAt', 'reason'],
        responseFields: [...commonResponseFields, 'scheduleId', 'deliveryStatus']
      },
      {
        key: 'consumeClass',
        label: '消课/回退课时',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_DELIVERY_CONSUME',
        permission: 'delivery.consume',
        requestFields: [...commonMutationFields, 'orderNo', 'studentNo', 'scheduleId', 'hours', 'operation', 'reason'],
        responseFields: [...commonResponseFields, 'consumedHours', 'remainingHours', 'deliveryStatus']
      },
      {
        key: 'submitEvaluation',
        label: '提交评价',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_DELIVERY_EVALUATE',
        permission: 'delivery.consume',
        requestFields: [...commonMutationFields, 'orderNo', 'studentNo', 'scheduleId', 'score', 'content'],
        responseFields: [...commonResponseFields, 'evaluationStatus']
      }
    ]
  },
  {
    key: 'purchase',
    name: '采购任务',
    identityField: 'purchaseNo',
    listPermission: 'purchase.view',
    listEndpoint: null,
    detailEndpoint: null,
    listQueryFields: ['page', 'pageSize', 'status', 'purchaseNo', 'relatedOrder', 'supplierId', 'scopeKey'],
    commands: [
      {
        key: 'confirmPayment',
        label: '确认采购付款',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PURCHASE_CONFIRM_PAYMENT',
        permission: 'purchase.handle',
        requestFields: [...commonMutationFields, 'purchaseNo', 'paidAmount', 'voucherNo', 'reason'],
        responseFields: [...commonResponseFields, 'paymentStatus']
      },
      {
        key: 'registerLogistics',
        label: '登记物流',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PURCHASE_LOGISTICS',
        permission: 'purchase.handle',
        requestFields: [...commonMutationFields, 'purchaseNo', 'logisticsCompany', 'logisticsNo', 'expectedAt'],
        responseFields: [...commonResponseFields, 'logisticsNo', 'purchaseStatus']
      },
      {
        key: 'confirmArrival',
        label: '确认到货',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PURCHASE_ARRIVAL',
        permission: 'purchase.handle',
        requestFields: [...commonMutationFields, 'purchaseNo', 'arrivedAt', 'quantity', 'reason'],
        responseFields: [...commonResponseFields, 'purchaseStatus']
      },
      {
        key: 'confirmSupplierReturn',
        label: '确认退供',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PURCHASE_RETURN',
        permission: 'purchase.handle',
        requestFields: [...commonMutationFields, 'purchaseNo', 'returnAmount', 'reason'],
        responseFields: [...commonResponseFields, 'refundStatus', 'purchaseStatus']
      }
    ]
  },
  {
    key: 'partner',
    name: '入驻审核',
    identityField: 'applicationNo',
    listPermission: 'partner.view',
    listEndpoint: null,
    detailEndpoint: null,
    listQueryFields: ['page', 'pageSize', 'status', 'company', 'regionCode', 'reviewerId', 'scopeKey'],
    commands: [
      {
        key: 'passInitialReview',
        label: '初审通过',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PARTNER_INITIAL_REVIEW',
        permission: 'partner.review',
        requestFields: [...commonMutationFields, 'applicationNo', 'risk', 'documentResults', 'reason'],
        responseFields: [...commonResponseFields, 'reviewStatus']
      },
      {
        key: 'returnSupplement',
        label: '退回补充',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PARTNER_RETURN',
        permission: 'partner.review',
        requestFields: [...commonMutationFields, 'applicationNo', 'missingDocumentKeys', 'reason'],
        responseFields: [...commonResponseFields, 'reviewStatus', 'completeness']
      },
      {
        key: 'passFinalReview',
        label: '复审通过',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PARTNER_FINAL_REVIEW',
        permission: 'partner.review',
        requestFields: [...commonMutationFields, 'applicationNo', 'risk', 'contractId', 'reason'],
        responseFields: [...commonResponseFields, 'reviewStatus', 'contractStatus']
      },
      {
        key: 'activateAccount',
        label: '开通账号',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_PARTNER_ACTIVATE',
        permission: 'partner.review',
        requestFields: [...commonMutationFields, 'applicationNo', 'accountId', 'roleIds', 'scopeKey', 'scopeEntityIds'],
        responseFields: [...commonResponseFields, 'accountStatus']
      }
    ]
  },
  {
    key: 'settlement',
    name: '结算任务',
    identityField: 'billNo',
    listPermission: 'finance.view',
    listEndpoint: null,
    detailEndpoint: null,
    listQueryFields: ['page', 'pageSize', 'status', 'billNo', 'partnerId', 'period', 'scopeKey'],
    commands: [
      {
        key: 'confirmBill',
        label: '确认账单',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_SETTLEMENT_CONFIRM',
        permission: 'finance.handle',
        requestFields: [...commonMutationFields, 'billNo', 'decision', 'reason'],
        responseFields: [...commonResponseFields, 'settlementStatus']
      },
      {
        key: 'reconcileDifference',
        label: '差额核对',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_SETTLEMENT_RECONCILE',
        permission: 'finance.handle',
        requestFields: [...commonMutationFields, 'billNo', 'diffAmount', 'result', 'reason'],
        responseFields: [...commonResponseFields, 'diffAmount', 'settlementStatus']
      },
      {
        key: 'confirmTransfer',
        label: '确认打款',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_SETTLEMENT_TRANSFER',
        permission: 'finance.handle',
        requestFields: [...commonMutationFields, 'billNo', 'transferNo', 'transferredAt', 'amount'],
        responseFields: [...commonResponseFields, 'paidAmount', 'settlementStatus']
      },
      {
        key: 'registerInvoice',
        label: '登记发票',
        method: 'POST',
        endpoint: null,
        endpointBindingKey: 'VITE_API_SETTLEMENT_INVOICE',
        permission: 'finance.handle',
        requestFields: [...commonMutationFields, 'billNo', 'invoiceNo', 'invoiceType', 'invoiceAmount'],
        responseFields: [...commonResponseFields, 'invoiceStatus']
      }
    ]
  }
]

export const integrationGuardrails = [
  { key: 'denyMissingIdentity', label: '缺少用户、角色或会话上下文时默认拒绝' },
  { key: 'denyMissingScope', label: '缺少数据范围类型或对象 ID 时返回空数据' },
  { key: 'permissionBeforeMutation', label: '每个状态动作提交前再次校验按钮权限码' },
  { key: 'optimisticLock', label: '所有写操作携带 version，冲突时提示重新加载' },
  { key: 'idempotency', label: '所有写操作携带 requestId，重复请求不得重复落账' },
  { key: 'auditReceipt', label: '所有写操作返回 auditId、operatorId 和更新时间' },
  { key: 'maskedExport', label: '列表导出沿用当前角色字段脱敏策略' },
  { key: 'noSilentFallback', label: '接口或字段未绑定时禁止回退到演示成功状态' }
]

export function validateRuntimeIdentity(context = {}) {
  const missing = runtimeIdentityContract.rejectWhenMissing.filter((key) => {
    const value = context[key]
    return Array.isArray(value) ? value.length === 0 : value === undefined || value === null || value === ''
  })

  return {
    ready: missing.length === 0,
    missing,
    fallback: runtimeIdentityContract.fallback
  }
}

export function commandBindingStatus(flowKey, commandKey) {
  const flow = workflowApiContracts.find((item) => item.key === flowKey)
  const command = flow?.commands.find((item) => item.key === commandKey)
  if (!flow || !command) return { ready: false, reason: '未登记的业务动作' }
  if (!command.endpoint) return { ready: false, reason: `待绑定 ${command.endpointBindingKey}` }
  return { ready: true, reason: '接口已绑定' }
}

export function buildCommandEnvelope({ flowKey, commandKey, context = {}, payload = {} }) {
  const flow = workflowApiContracts.find((item) => item.key === flowKey)
  const command = flow?.commands.find((item) => item.key === commandKey)
  const identity = validateRuntimeIdentity(context)
  const binding = commandBindingStatus(flowKey, commandKey)

  if (!flow || !command) {
    return { ready: false, errors: ['未登记的业务动作'], request: null }
  }

  const source = { operatorId: context.userId, ...context, ...payload }
  const missingFields = command.requestFields.filter((key) => {
    const value = source[key]
    return Array.isArray(value) ? value.length === 0 : value === undefined || value === null || value === ''
  })
  const errors = [
    ...identity.missing.map((key) => `缺少运行上下文 ${key}`),
    ...missingFields.map((key) => `缺少请求字段 ${key}`),
    ...(binding.ready ? [] : [binding.reason])
  ]

  return {
    ready: errors.length === 0,
    errors,
    request: errors.length
      ? null
      : {
          method: command.method,
          endpoint: command.endpoint,
          permission: command.permission,
          body: Object.fromEntries(command.requestFields.map((key) => [key, source[key]]))
        }
  }
}
