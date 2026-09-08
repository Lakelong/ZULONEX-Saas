import { readFile } from 'node:fs/promises'
import { businessEntityContracts, dataScopeRules, workflowStateTransitions } from '../src/business-contract.js'
import {
  buildCommandEnvelope,
  commandBindingStatus,
  integrationGuardrails,
  runtimeContextFields,
  runtimeIdentityContract,
  validateRuntimeIdentity,
  workflowApiContracts
} from '../src/integration-contract.js'
import { moduleCatalog, submoduleDatasets } from '../src/module-registry.js'
import { orderColumnContract, orderFieldContract, onlineModules, onlineRouteCount, verifiedPageContracts } from '../src/online-system-baseline.js'
import {
  fieldMaskingDecision,
  maskingModeLabels,
  pendingRoleAccessMatrix,
  permissionActionCatalog,
  permissionAuditDimensions,
  permissionDecision,
  previewPermissionDecision,
  roleAccessPreviewMatrix,
  sensitiveFieldCatalog,
  verifiedRoleContracts,
  workflowGuardrails
} from '../src/permission-baseline.js'
import {
  deliverySeed,
  ordersSeed,
  partnerSeed,
  purchaseSeed,
  roleStats,
  settlementSeed,
  transactionSplitSeed
} from '../src/prototype-data.js'

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}
const parseCurrency = (value) => Number(String(value || '0').replace(/[^\d.-]/g, '')) || 0

assert(onlineModules.length === 13, `线上模块数量应为 13，当前为 ${onlineModules.length}`)
assert(onlineRouteCount === 62, `线上页面路由数量应为 62，当前为 ${onlineRouteCount}`)
assert(
  Object.keys(verifiedPageContracts).length === onlineRouteCount,
  `字段级页面契约应覆盖全部 ${onlineRouteCount} 个路由，当前为 ${Object.keys(verifiedPageContracts).length}`
)

const allOnlinePaths = onlineModules.flatMap((module) => module.pages.map((page) => page.path))
assert(new Set(allOnlinePaths).size === onlineRouteCount, '线上页面路由存在重复项')
assert(moduleCatalog.length === onlineModules.length, '原型模块数量与线上模块数量不一致')
for (const path of allOnlinePaths) {
  assert(Boolean(verifiedPageContracts[path]), `线上路由 ${path} 尚未完成字段级契约`)
}

for (const [index, onlineModule] of onlineModules.entries()) {
  const localModule = moduleCatalog[index]
  assert(localModule?.title === onlineModule.name, `第 ${index + 1} 个模块应为“${onlineModule.name}”`)
  assert(
    JSON.stringify(localModule?.submodules) === JSON.stringify(onlineModule.pages.map((page) => page.name)),
    `${onlineModule.name}的页面名称或顺序与线上不一致`
  )
}

for (const [path, contract] of Object.entries(verifiedPageContracts)) {
  assert(allOnlinePaths.includes(path), `字段契约使用了不存在的线上路由 ${path}`)
  assert(contract.filters?.length > 0, `${path} 缺少筛选字段契约`)
  assert(contract.columns?.length > 0, `${path} 缺少列表字段契约`)
}

assert(permissionAuditDimensions.length === 4, '权限核验必须覆盖菜单、按钮、数据范围和字段脱敏')
assert(verifiedRoleContracts.length === 0, '尚未完成线上角色核验，不得写入正式角色授权')
assert(permissionDecision('unverified-role', 'orders:view').allowed === false, '未核验角色必须默认拒绝权限')
assert(pendingRoleAccessMatrix.length >= 6, '待核验角色矩阵必须覆盖总部、交付、商家、财务等核心角色')
assert(roleAccessPreviewMatrix.length === 11, '权限预览矩阵必须覆盖 11 类业务角色')
assert(permissionActionCatalog.length >= 15, '动作权限目录必须覆盖核心流程和系统配置')
assert(sensitiveFieldCatalog.length >= 9, '字段脱敏矩阵必须覆盖身份、联系方式、支付、证照和金额')
assert(workflowGuardrails.length >= 5, '高频流程守卫必须覆盖订单、交付、入驻、采购和财务')
assert(businessEntityContracts.length >= 5, '业务对象契约必须覆盖订单、交付、采购、入驻和结算')
assert(dataScopeRules.length >= 5, '数据范围规则必须覆盖全部、运营、交付、商家和审核区域')
assert(Object.keys(workflowStateTransitions).length >= 5, '流程状态转换表必须覆盖核心流程')
assert(workflowApiContracts.length === 5, '接口契约必须覆盖订单、交付、采购、入驻和结算')
assert(runtimeContextFields.length === runtimeIdentityContract.requiredFields.length, '运行身份字段与身份契约数量不一致')
assert(integrationGuardrails.length >= 8, '正式接口接入门禁缺少关键保护规则')

const permissionKeys = new Set(permissionActionCatalog.map((permission) => permission.key))
const allWorkflowCommands = workflowApiContracts.flatMap((workflow) => workflow.commands)
assert(allWorkflowCommands.length === 20, `核心流程写接口应为 20 个，当前为 ${allWorkflowCommands.length}`)
assert(
  allWorkflowCommands.every((command) => command.endpoint === null),
  '未读取真实接口地址前不得写入猜测的接口路径'
)
assert(
  !validateRuntimeIdentity({ userId: 'preview-user' }).ready,
  '缺少角色、范围和会话上下文时不得通过身份校验'
)
assert(
  commandBindingStatus('order', 'confirmPayment').ready === false,
  '真实支付核验接口未绑定前不得标记为可调用'
)
assert(
  buildCommandEnvelope({
    flowKey: 'order',
    commandKey: 'confirmPayment',
    context: {},
    payload: {}
  }).ready === false,
  '缺少身份、字段和接口绑定时不得构造可发送请求'
)

for (const workflow of workflowApiContracts) {
  assert(workflow.identityField, `${workflow.name}接口契约缺少业务主键`)
  assert(workflow.listEndpoint === null, `${workflow.name}未核验前不得猜测列表接口`)
  assert(workflow.detailEndpoint === null, `${workflow.name}未核验前不得猜测详情接口`)
  assert(workflow.listQueryFields.includes('scopeKey'), `${workflow.name}列表查询缺少数据范围字段`)
  assert(permissionKeys.has(workflow.listPermission), `${workflow.name}使用了未登记的列表权限`)
  for (const command of workflow.commands) {
    assert(permissionKeys.has(command.permission), `${workflow.name}/${command.label}使用了未登记的动作权限`)
    for (const field of ['requestId', 'operatorId', 'roleIds', 'scopeKey', 'scopeEntityIds', 'version']) {
      assert(command.requestFields.includes(field), `${workflow.name}/${command.label}缺少请求字段 ${field}`)
    }
    for (const field of ['requestId', 'auditId', 'status', 'updatedAt', 'version']) {
      assert(command.responseFields.includes(field), `${workflow.name}/${command.label}缺少回执字段 ${field}`)
    }
  }
}

for (const role of pendingRoleAccessMatrix) {
  assert(role.verification.includes('待'), `${role.roleName} 不得标记为正式已核验权限`)
  assert(role.dataScope, `${role.roleName} 缺少数据范围说明`)
  assert(role.menus.length > 0, `${role.roleName} 缺少菜单范围`)
  assert(role.actions.length > 0, `${role.roleName} 缺少按钮动作范围`)
  assert(role.requiredFields.length > 0, `${role.roleName} 缺少必备字段范围`)
}

const prototypeRoleKeys = Object.keys(roleStats)
const previewRoleKeys = roleAccessPreviewMatrix.map((role) => role.roleKey)
assert(
  JSON.stringify(previewRoleKeys) === JSON.stringify(prototypeRoleKeys),
  '权限预览角色顺序和工作台角色视角不一致'
)

for (const role of roleAccessPreviewMatrix) {
  assert(role.onlineRoleId === null, `${role.roleName} 未核验前不得绑定线上角色ID`)
  assert(role.verification.includes('待'), `${role.roleName} 权限预览不得标记为正式已核验`)
  assert(role.menuViews.includes('workbench'), `${role.roleName} 缺少工作台入口`)
  assert(role.menuViews.includes('system'), `${role.roleName} 缺少灰度权限基线入口`)
  assert(role.selectableScopes.includes(role.defaultScope), `${role.roleName} 默认范围不在可选范围内`)
  assert(role.scopeDimensions.length > 0, `${role.roleName} 缺少数据范围过滤维度`)
  assert(new Set(role.menuViews).size === role.menuViews.length, `${role.roleName} 存在重复菜单`)
  assert(new Set(role.permissions).size === role.permissions.length, `${role.roleName} 存在重复动作权限`)
  for (const permissionKey of role.permissions) {
    assert(permissionKeys.has(permissionKey), `${role.roleName} 使用了未登记动作权限 ${permissionKey}`)
  }
}

for (const field of sensitiveFieldCatalog) {
  assert(field.label && field.category, `敏感字段 ${field.key} 缺少名称或分类`)
  for (const roleKey of prototypeRoleKeys) {
    assert(Boolean(maskingModeLabels[field.policies[roleKey]]), `${field.label} 缺少 ${roleKey} 的脱敏策略`)
  }
}

for (const roleKey of ['operations', 'delivery', 'tutor', 'studentManager', 'planner', 'qualityControl', 'customerService', 'merchant']) {
  assert(fieldMaskingDecision(roleKey, 'studentName').mode === 'full', `${roleKey} 的学员姓名必须完整展示`)
}
assert(fieldMaskingDecision('finance', 'paymentTransactionNo').mode === 'full', '财务人员必须可核验完整支付交易号')
assert(fieldMaskingDecision('partnerAuditor', 'licenseNo').mode === 'full', '合作审核员必须可核验完整营业执照号')
assert(previewPermissionDecision('operations', 'orders.handle').allowed, '总部运营预览必须允许订单处理')
assert(previewPermissionDecision('tutor', 'delivery.learningRecord').allowed, '导学师必须可填写学情与课后报告')
assert(previewPermissionDecision('studentManager', 'delivery.renewal').allowed, '学管师必须可处理续费预警')
assert(previewPermissionDecision('planner', 'delivery.convert').allowed, '规划师必须可处理体验课转化')
assert(previewPermissionDecision('qualityControl', 'quality.review').allowed, '质控专员必须可执行课堂质检')
assert(previewPermissionDecision('customerService', 'service.ticket').allowed, '客服必须可推进服务工单')
assert(!previewPermissionDecision('tutor', 'finance.handle').allowed, '导学师不得处理财务结算')
assert(!previewPermissionDecision('unknown-role', 'orders.view').allowed, '未知预览角色必须默认拒绝')

for (const flow of workflowGuardrails) {
  assert(flow.statuses.length >= 4, `${flow.name} 缺少完整状态链路`)
  assert(flow.requiredFields.length >= 6, `${flow.name} 缺少业务必备字段`)
  assert(flow.criticalActions.length >= 4, `${flow.name} 缺少关键动作`)
}

const entitySamples = {
  order: ordersSeed,
  delivery: deliverySeed,
  purchase: purchaseSeed,
  partner: partnerSeed,
  settlement: settlementSeed,
  settlementSplit: transactionSplitSeed
}

for (const entity of businessEntityContracts) {
  const samples = entitySamples[entity.key]
  assert(samples?.length > 0, `${entity.name}缺少样例数据`)
  for (const record of samples || []) {
    for (const key of entity.requiredFields) {
      assert(Object.hasOwn(record, key), `${entity.name} ${record.id} 缺少契约字段 ${key}`)
    }
    assert(entity.statuses.includes(record.status), `${entity.name} ${record.id} 状态“${record.status}”不在允许状态内`)
  }
}

const roleStatKeyByContract = {
  headquartersOperator: 'operations',
  deliveryManager: 'delivery',
  merchantOwner: 'merchant',
  financeOperator: 'finance'
}

for (const role of pendingRoleAccessMatrix) {
  const statKey = roleStatKeyByContract[role.key] || role.key
  const hasWorkbenchView = Boolean(roleStats[statKey])
  assert(hasWorkbenchView, `${role.roleName} 缺少工作台视角数据`)
}

for (const record of ordersSeed) {
  for (const key of orderFieldContract) {
    assert(Object.hasOwn(record, key), `订单 ${record.id} 缺少字段 ${key}`)
  }
  assert(!Object.hasOwn(record, 'customer'), `订单 ${record.id} 不得继续使用 customer 代替学员`)
}

for (const record of deliverySeed) {
  for (const key of [
    'studentName',
    'parentName',
    'parentMobile',
    'courseName',
    'deliveryCenter',
    'teacherName',
    'className',
    'totalHours',
    'scheduledHours',
    'consumedHours',
    'remainingHours',
    'evaluationStatus'
  ]) {
    assert(Object.hasOwn(record, key), `交付任务 ${record.id} 缺少字段 ${key}`)
  }
  assert(!Object.hasOwn(record, 'customer'), `交付任务 ${record.id} 不得使用 customer 代替学员`)
  assert(!record.student.includes('**'), `交付任务 ${record.id} 学员名称不应在任务列表中完全脱敏`)
}

for (const record of purchaseSeed) {
  for (const key of [
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
    'status',
    'nextAction'
  ]) {
    assert(Object.hasOwn(record, key), `采购任务 ${record.id} 缺少字段 ${key}`)
  }
}

const ordersByNo = new Map(ordersSeed.map((order) => [order.orderNo, order]))
const settlementBillsByNo = new Set(settlementSeed.map((settlement) => settlement.billNo))
const settlementsByNo = new Map(settlementSeed.map((settlement) => [settlement.billNo, settlement]))
for (const delivery of deliverySeed) {
  const order = ordersByNo.get(delivery.orderNo)
  if (!order) continue
  for (const key of ['studentName', 'parentName', 'parentMobile', 'courseName']) {
    assert(delivery[key] === order[key], `交付任务 ${delivery.id} 与订单 ${order.orderNo} 的 ${key} 不一致`)
  }
}

for (const purchase of purchaseSeed) {
  const order = ordersByNo.get(purchase.relatedOrder)
  if (!order) continue
  for (const key of ['studentName', 'parentName', 'parentMobile']) {
    assert(purchase[key] === order[key], `采购任务 ${purchase.id} 与订单 ${order.orderNo} 的 ${key} 不一致`)
  }
}

const splitByOrderNo = new Map(transactionSplitSeed.map((split) => [split.orderNo, split]))
for (const order of ordersSeed) {
  if (parseCurrency(order.paidAmount) <= 0 || order.paymentTransactionNo === '--') continue
  assert(splitByOrderNo.has(order.orderNo), `已实付订单 ${order.orderNo} 缺少分账流水`)
}

for (const split of transactionSplitSeed) {
  const order = ordersByNo.get(split.orderNo)
  assert(Boolean(order), `分账流水 ${split.id} 关联了不存在的订单 ${split.orderNo}`)
  if (!order) continue

  assert(split.studentName === order.studentName, `分账流水 ${split.id} 学员与订单 ${order.orderNo} 不一致`)
  assert(split.transactionNo === order.paymentTransactionNo, `分账流水 ${split.id} 支付交易号与订单 ${order.orderNo} 不一致`)
  assert(parseCurrency(split.paidAmount) === parseCurrency(order.paidAmount), `分账流水 ${split.id} 实付金额与订单 ${order.orderNo} 不一致`)

  const splitTotal =
    parseCurrency(split.merchantShare) +
    parseCurrency(split.deliveryCost) +
    parseCurrency(split.hqGross) +
    parseCurrency(split.refundFrozen)
  assert(splitTotal === parseCurrency(split.paidAmount), `分账流水 ${split.id} 拆分合计与实付金额不一致`)
  assert(parseCurrency(split.auditDiff) === 0, `分账流水 ${split.id} 存在未归因差额`)

  if (split.checkStatus === '已核对') {
    assert(order.status === '已支付', `分账流水 ${split.id} 已核对但订单 ${order.orderNo} 未处于已支付`)
    assert(order.allocationStatus === '已分配', `分账流水 ${split.id} 已核对但订单 ${order.orderNo} 未完成交付分配`)
    assert(split.settlementBills.length > 0, `分账流水 ${split.id} 已核对但未关联结算单`)
    assert(split.paymentCheck === '已到账', `分账流水 ${split.id} 已核对但收款阶段未完成`)
    assert(split.allocationCheck === '已分配', `分账流水 ${split.id} 已核对但交付分配阶段未完成`)
    assert(split.splitCheck === '已拆分', `分账流水 ${split.id} 已核对但拆账阶段未完成`)
    assert(split.billCheck === '已生成', `分账流水 ${split.id} 已核对但结算单未生成`)
    assert(split.blocker === '--', `分账流水 ${split.id} 已核对但仍存在阻断原因`)
  }

  if (split.settlementBills.length > 0) {
    for (const billNo of split.settlementBills) {
      assert(settlementBillsByNo.has(billNo), `分账流水 ${split.id} 关联了不存在的结算单 ${billNo}`)
      const bill = settlementsByNo.get(billNo)
      assert(
        !bill || [split.partner, split.deliveryCenter, '总部直营'].includes(bill.partner),
        `分账流水 ${split.id} 结算单 ${billNo} 归属“${bill?.partner}”与商家或交付中心不一致`
      )
    }
  }

  if (split.billCheck === '已生成') {
    assert(split.settlementBills.length > 0, `分账流水 ${split.id} 已生成账单但缺少账单编号`)
  }

  if (split.transferCheck === '已完成') {
    assert(split.settlementBills.length > 0, `分账流水 ${split.id} 标记打款完成但缺少结算单`)
    assert(
      split.settlementBills.every((billNo) => settlementsByNo.get(billNo)?.status === '已完成'),
      `分账流水 ${split.id} 标记打款完成但存在未完成结算单`
    )
  }

  if (split.transferCheck === '待打款') {
    assert(
      split.settlementBills.some((billNo) => settlementsByNo.get(billNo)?.status === '待打款'),
      `分账流水 ${split.id} 标记待打款但没有待打款结算单`
    )
  }

  if (split.blocker !== '--') {
    assert(split.checkStatus !== '已核对', `分账流水 ${split.id} 存在阻断原因但被标记为已核对`)
  }

  if (order.riskStatus !== '--' || order.afterSaleStatus !== '--') {
    assert(parseCurrency(split.refundFrozen) > 0, `异常或售后订单 ${order.orderNo} 未冻结分账金额`)
  }
}

for (const moduleKey of ['onlineOrders', 'offlineOrders']) {
  const module = moduleCatalog.find((item) => item.key === moduleKey)
  assert(Boolean(module), `缺少模块 ${moduleKey}`)
  for (const [key, label] of orderColumnContract) {
    const column = module?.columns.find((item) => item.key === key)
    assert(Boolean(column), `${moduleKey} 缺少订单字段 ${key}`)
    assert(column?.label === label, `${moduleKey}.${key} 应显示为“${label}”`)
  }
  assert(!module?.columns.some((item) => item.label.includes('客户')), `${moduleKey} 不得用“客户”替代学员或家长`)
}

for (const path of ['/order/table', '/offline/order/table', '/masterdata/student', '/parent', '/learningCenter/consume']) {
  assert(Boolean(verifiedPageContracts[path]), `缺少已核验页面契约 ${path}`)
}

const auditedDatasets = [
  ['masterdata', '教材管理', '/masterdata/textbook'],
  ['masterdata', '课程管理', '/masterdata/course'],
  ['masterdata', '知识点管理', '/masterData/knowledge_point'],
  ['masterdata', '学科商品', '/courseProduct'],
  ['masterdata', '商品套餐', '/product'],
  ['masterdata', '家长管理', '/parent'],
  ['masterdata', '学员管理', '/masterdata/student'],
  ['masterdata', '学情管理', '/masterdata/studentLearning'],
  ['partnerCenter', '交付中心', '/partnerCenter/deliveryCenter'],
  ['partnerCenter', '线上加盟', '/partnerCenter/partner'],
  ['partnerCenter', '合约管理', '/partnerCenter/contract'],
  ['partnerCenter', '提成奖励', '/partnerCenter/reward'],
  ['partnerCenter', '交付层级', '/deliveryCenterTree'],
  ['partnerCenter', '运营层级', '/operationTree'],
  ['partnerCenter', '入驻申请', '/partnerCenter/onboarding'],
  ['learning', '体验课管理', '/learningCenter/trialClass'],
  ['learning', '体验课排课', '/learningCenter/trialTeacherSchedule'],
  ['learning', '正式课管理', '/learningCenter/student'],
  ['learning', '教师排课', '/learningCenter/teacherSchedule'],
  ['learning', '排课记录', '/learningCenter/scheduleList'],
  ['learning', '消课管理', '/learningCenter/consume'],
  ['learning', '学生课程', '/studentCourse'],
  ['learning', '部门管理', '/learningCenter/department'],
  ['learning', '班级管理', '/learningCenter/deliveryClass'],
  ['learning', '教师管理', '/learningCenter/teacher'],
  ['learning', '我的学员', '/learningCenter/myStudent/'],
  ['onlineOrders', '订单查询', '/order/table'],
  ['onlineOrders', '退货管理', '/order/return'],
  ['onlineOrders', '特殊订单', '/order/special/table'],
  ['offlineOrders', '订单查询', '/offline/order/table'],
  ['offlineOrders', '退货管理', '/offline/order/refund'],
  ['onlinePurchase', '销售单', '/purchase/supplier'],
  ['onlinePurchase', '采购单', '/purchase/order'],
  ['onlinePurchase', '销售退货', '/purchase/purchaseReturn'],
  ['onlinePurchase', '采购退供', '/purchase/purchaseReturnSupplier'],
  ['offlinePurchase', '采购管理', '/offline/purchase/table'],
  ['offlinePurchase', '销售单', '/offline/purchase/supplier'],
  ['offlinePurchase', '销售退货', '/offline/purchase/purchaseReturn'],
  ['offlinePurchase', '采购退供', '/offlinePurchase/purchaseReturnSupplier'],
  ['financeReports', '海南返点', '/settlement/offlineRebateFee'],
  ['financeReports', '应收账单', '/settlement/receiverBill'],
  ['financeReports', '应付账单', '/settlement/payeeBill'],
  ['financeReports', '线上推荐费', '/settlement/recommendationFeeDetail'],
  ['financeReports', '线上年度奖', '/settlement/recommendationCourseDetail'],
  ['financeReports', '线下推荐费', '/settlement/offlineRecommendationFee'],
  ['financeReports', '线下年度奖', '/settlement/offlineAccountUsageFee'],
  ['financeReports', '采购收入明细', '/settlement/purchaseDetail'],
  ['investment', '招商公司管理', '/investmentCompany/company'],
  ['investment', '合作方管理', '/investmentCompany/dealer'],
  ['marketing', '渠道管理', '/channel'],
  ['marketing', '二维码管理', '/qrcode'],
  ['marketing', '渠道统计', '/channelReport/summary'],
  ['marketing', '渠道明细', '/channelReport/detail'],
  ['growth', '成长中心加盟', '/growth'],
  ['growth', 'AI成长中心分布', '/growth/mapDashboard'],
  ['wechat', '自定义菜单', '/wechat/menu'],
  ['wechat', '关键字自动回复', '/wechat/reply'],
  ['wechat', '永久素材', '/wechat/material'],
  ['systemAdmin', '用户管理', '/system/user'],
  ['systemAdmin', '菜单管理', '/system/menu'],
  ['systemAdmin', '角色管理', '/system/role'],
  ['systemAdmin', '应用管理', '/system/application']
]

for (const [moduleKey, submodule, path] of auditedDatasets) {
  const expected = verifiedPageContracts[path].columns.filter((label) => label !== '操作')
  const actual = submoduleDatasets[moduleKey]?.[submodule]?.columns.map((column) => column.label) || []
  assert(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${moduleKey}/${submodule} 字段与线上契约不一致：期望 ${expected.length} 个，当前 ${actual.length} 个`
  )
}

const appSource = await readFile(new URL('../src/App.vue', import.meta.url), 'utf8')
const mainSource = await readFile(new URL('../src/main.js', import.meta.url), 'utf8')
assert(!appSource.includes('order.customer'), 'App.vue 仍在读取 order.customer')
assert(!appSource.includes('<th>客户</th>'), '订单表格仍显示“客户”')
assert(appSource.includes('order.studentName'), '订单任务页没有显示学员姓名')
assert(appSource.includes('order.parentName'), '订单任务页没有显示家长姓名')
assert(appSource.includes('item.studentName || item.student'), '交付任务页没有优先显示学员姓名')
assert(appSource.includes('item.parentName'), '交付任务页没有显示家长姓名')
assert(appSource.includes('item.courseName'), '交付任务页没有显示课程名称')
assert(appSource.includes('pendingRoleAccessMatrix'), '系统设置页没有展示待核验角色矩阵')
assert(appSource.includes('workflowGuardrails'), '系统设置页没有展示流程状态守卫')
assert(appSource.includes('businessEntityContracts'), '系统设置页没有展示核心业务对象契约')
assert(appSource.includes('dataScopeRules'), '系统设置页没有展示数据范围规则')
assert(appSource.includes('roleAccessPreviewMatrix'), '系统设置页没有展示角色权限预览矩阵')
assert(appSource.includes('sensitiveFieldCatalog'), '系统设置页没有展示字段脱敏矩阵')
assert(appSource.includes('visibleNavGroups'), '主导航没有接入角色菜单权限')
assert(appSource.includes('availableScopes'), '数据范围下拉没有接入角色范围契约')
assert(appSource.includes('displaySensitive'), '业务页面没有接入字段脱敏策略')
assert(appSource.includes('matchesActiveScope'), '业务列表没有接入数据范围过滤')
assert(appSource.includes('currentDrawerActionAllowed'), '业务抽屉提交没有接入动作权限')
assert(appSource.includes('workflowApiContracts'), '系统设置页没有展示核心流程接口契约')
assert(appSource.includes('runtimeContextFields'), '系统设置页没有展示登录与权限上下文')
assert(appSource.includes('currentWorkflowCommand'), '业务抽屉没有展示当前写接口绑定状态')
assert(appSource.includes('runtimeMode.isPreview'), '页面缺少体验/正式环境模式判断')
assert(appSource.includes('ensurePreviewMutation'), '页面缺少生产环境模拟写入保护')
assert(appSource.includes('runtime-mode-badge'), '页面缺少持续可见的运行环境标识')
assert(appSource.includes('handleGlobalKeydown'), '页面缺少全局快捷键与 Escape 关闭行为')
assert(appSource.includes('aria-live="polite"'), '操作反馈缺少辅助技术播报')
assert(mainSource.includes('showStartupError'), '应用启动失败时缺少非白屏兜底')
assert(appSource.includes("activeView === 'purchase'"), '缺少采购任务高频页面')
assert(appSource.includes('purchaseAction'), '采购任务缺少状态动作反馈')
assert(appSource.includes("采购单: '/purchase/order'"), '采购台账页面未接入契约门禁')
assert(appSource.includes("应收账单: '/settlement/receiverBill'"), '财务报表页面未接入契约门禁')
assert(appSource.includes("入驻申请: '/partnerCenter/onboarding'"), '合作中心入驻申请未接入契约门禁')
assert(appSource.includes("教材管理: '/masterdata/textbook'"), '基础管理页面未完整接入契约门禁')
assert(appSource.includes("我的学员: '/learningCenter/myStudent/'"), '学习中心我的学员未接入契约门禁')
assert(appSource.includes("渠道统计: '/channelReport/summary'"), '营销中心页面未接入契约门禁')
assert(appSource.includes("应用管理: '/system/application'"), '系统管理页面未接入契约门禁')
assert(!appSource.includes('v-for="n in 5"'), '系统设置仍在展示未经核验的虚假权限矩阵')
assert(
  appSource.includes('currentRegistryContract && isScheduleRegistry') &&
    appSource.includes("currentRegistryContract && (!isScheduleRegistry || registryScheduleView === 'table')"),
  '未核验台账没有被业务契约门禁保护'
)
for (const action of ['撤销', '评价信息', '去评价', '消课', '回退预占课时']) {
  assert(appSource.includes(`'${action}'`), `消课状态动作缺少“${action}”`)
}

if (failures.length) {
  console.error(`业务契约校验失败（${failures.length} 项）：`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(
  `业务契约校验通过：13 个模块、${onlineRouteCount} 个路由、${businessEntityContracts.length} 类对象契约、${ordersSeed.length} 条订单、${deliverySeed.length} 条交付、${purchaseSeed.length} 条采购、${partnerSeed.length} 条入驻、${settlementSeed.length} 条结算样例。`
)
