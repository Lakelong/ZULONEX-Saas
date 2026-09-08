import { readFile } from 'node:fs/promises'

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

const appSource = await readFile(new URL('../src/App.vue', import.meta.url), 'utf8')
const businessSource = await readFile(new URL('./verify-business-contract.mjs', import.meta.url), 'utf8')

assert(!/placeholder="请选择[^"]*(时间|日期)"[^>]*readonly/.test(appSource), '日期/时间字段不得使用只读文本伪选择器')
assert(!/<input[^>]*v-model="orderFilterState\.orderTime"[^>]*type="text"/.test(appSource), '订单下单时间必须使用真实日期控件')
assert(/v-model="orderFilterState\.orderTime"[^>]*type="date"/s.test(appSource), '订单下单时间缺少 type=date')
assert(appSource.includes('filters.orderTime'), '订单日期筛选没有接入过滤逻辑')

for (const field of ['stage', 'subject', 'owner']) {
  assert(appSource.includes(`v-model="deliveryFilterState.${field}"`), `交付筛选 ${field} 缺少 v-model`)
  assert(appSource.includes(`filters.${field}`), `交付筛选 ${field} 没有接入过滤逻辑`)
}
assert(appSource.includes('deliveryCalendarMode = !deliveryCalendarMode'), '交付日历视图必须是真实模式切换，不能只是 toast')
assert(appSource.includes('class="schedule-board"'), '交付日历视图缺少可视化排课面板')
assert(appSource.includes('isScheduleRegistry'), '学习中心排课类子模块必须识别为日历型工作台')
assert(appSource.includes("registryScheduleView === 'calendar'"), '教师排课必须支持周历视图')
assert(appSource.includes('shiftScheduleWeek(-1)') && appSource.includes('shiftScheduleWeek(1)'), '教师排课周历必须支持上一周/下一周切换')
assert(appSource.includes('selectedScheduleTeacher'), '教师排课周历必须支持按教师筛选')
assert(appSource.includes('scheduleItemsForSlot'), '教师排课周历必须按日期和时间格展示课节')

for (const field of ['purchaseType', 'paymentStatus', 'supplier', 'expectedAt']) {
  assert(appSource.includes(`v-model="purchaseFilterState.${field}"`), `采购筛选 ${field} 缺少 v-model`)
  assert(appSource.includes(`filters.${field}`), `采购筛选 ${field} 没有接入过滤逻辑`)
}
assert(!appSource.includes("toast('采购筛选面板已打开')"), '采购筛选按钮不得停留在 toast 占位')

assert(appSource.includes('partnerFieldInputType(field)'), '合作入驻表单没有按字段类型渲染输入控件')
assert(appSource.includes('registryInputType(column)'), '动态台账表单没有按字段类型渲染输入控件')
assert(appSource.includes('type="file"'), '资料附件必须使用文件上传控件')
assert(appSource.includes("type: 'date'"), '日期字段契约必须声明为 date 类型')
assert(appSource.includes("type: 'tel'"), '手机号字段契约必须声明为 tel 类型')

assert(
  businessSource.includes("split.settlementBills.length > 0") &&
    businessSource.includes("split.transferCheck === '已完成'"),
  '分账打款完成校验必须先确认存在结算单，避免 every([]) 漏洞'
)

const unboundSelectBlocks = appSource.match(/<select(?![\s\S]*?<\/select>)/g) || []
assert(unboundSelectBlocks.length === 0, '存在未闭合 select 标签')

if (failures.length) {
  console.error(`研发准入检查失败（${failures.length} 项）：`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('研发准入检查通过：控件语义、筛选绑定、关键模式切换和表单字段类型已达标。')
