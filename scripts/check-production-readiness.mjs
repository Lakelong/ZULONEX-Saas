import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import {
  runtimeContextFields,
  workflowApiContracts
} from '../src/integration-contract.js'
import {
  roleAccessPreviewMatrix,
  verifiedRoleContracts
} from '../src/permission-baseline.js'

const root = resolve(import.meta.dirname, '..')
const env = loadEnv('production', root, '')
const blockers = []

if (env.VITE_APP_MODE !== 'production') {
  blockers.push('VITE_APP_MODE 必须设置为 production')
}

for (const field of runtimeContextFields) {
  if (field.status !== '已绑定') blockers.push(`运行身份字段未绑定：${field.label}`)
}

if (verifiedRoleContracts.length !== roleAccessPreviewMatrix.length) {
  blockers.push(
    `正式角色契约未完成：已核验 ${verifiedRoleContracts.length}/${roleAccessPreviewMatrix.length}`
  )
}

for (const workflow of workflowApiContracts) {
  if (!workflow.listEndpoint) blockers.push(`${workflow.name}列表接口未绑定`)
  if (!workflow.detailEndpoint) blockers.push(`${workflow.name}详情接口未绑定`)
  for (const command of workflow.commands) {
    if (!command.endpoint) blockers.push(`${workflow.name}/${command.label}写接口未绑定`)
  }
}

const appSource = await readFile(resolve(root, 'src/App.vue'), 'utf8')
if (appSource.includes('ordersSeed') || appSource.includes('deliverySeed')) {
  blockers.push('正式页面仍直接加载模拟业务数据')
}

if (!appSource.includes('runtimeMode.isPreview')) {
  blockers.push('页面缺少生产模式写操作保护')
}

if (blockers.length) {
  console.error('正式环境部署检查未通过：')
  for (const blocker of blockers) console.error(`- ${blocker}`)
  process.exit(1)
}

console.log('正式环境部署检查通过')

