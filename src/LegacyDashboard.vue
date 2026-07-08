<!-- Legacy dashboard prototype retained for comparison. -->
<template>
  <div class="admin-page" :class="{ 'is-collapsed': sidebarCollapsed }">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-main">ZULONEX</div>
        <div class="brand-divider"></div>
        <div class="brand-sub">总部管理后台</div>
      </div>

      <nav class="side-nav" aria-label="后台导航">
        <button
          v-for="item in menuItems"
          :key="item.label"
          class="side-item"
          :class="{ 'is-open': item.open, 'is-muted': !item.open }"
          type="button"
          @click="handleMenuClick(item)"
        >
          <component :is="item.icon" :size="22" stroke-width="2.2" />
          <span>{{ item.label }}</span>
          <ChevronDown :size="17" stroke-width="2.4" class="side-arrow" />
        </button>

        <section class="report-group">
          <button class="side-item is-open report-title" type="button" @click="toast('数据报表已展开')">
            <Gauge :size="22" stroke-width="2.2" />
            <span>数据报表</span>
            <ChevronDown :size="17" stroke-width="2.4" class="side-arrow" />
          </button>
          <div class="report-children">
            <button
              v-for="child in reportChildren"
              :key="child"
              class="report-child"
              :class="{ active: activeReportChild === child }"
              type="button"
              @click="selectReportChild(child)"
            >
              {{ child }}
            </button>
          </div>
        </section>
      </nav>

      <button class="collapse-button" type="button" aria-label="折叠侧边栏" @click="toggleSidebar">
        <PanelLeftClose :size="21" stroke-width="2.2" />
      </button>
    </aside>

    <main class="main">
      <header class="topbar">
        <button class="notice-button" type="button" aria-label="通知" @click="toast('您有 16 条待处理通知')">
          <Bell :size="23" stroke-width="2.2" />
          <span class="notice-badge">16</span>
        </button>
        <button class="avatar-button" type="button" aria-label="账号" @click="toast('SuperAdmin')">
          <UserRound :size="28" stroke-width="2" />
        </button>
        <button class="admin-name" type="button" @click="toast('账号菜单已点击')">
          SuperAdmin
          <ChevronDown :size="18" stroke-width="2.1" />
        </button>
      </header>

      <section class="workbench">
        <div class="window-tabs">
          <button
            v-for="tab in openTabs"
            :key="tab.label"
            class="window-tab"
            :class="{ active: tab.active }"
            type="button"
            @click="activateWindowTab(tab)"
          >
            <span>{{ tab.label }}</span>
            <X :size="17" stroke-width="2" @click.stop="closeWindowTab(tab)" />
          </button>
        </div>

        <section class="board">
          <div class="board-tabs">
            <button
              v-for="tab in boardTabs"
              :key="tab.key"
              class="board-tab"
              :class="{ active: activeBoard === tab.key }"
              type="button"
              @click="switchBoard(tab.key)"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="board-rule"></div>

          <div class="board-scroll">
            <section class="course-summary" :class="`summary-${activeBoard}`">
              <div class="summary-heroes">
                <button class="hero-card hero-blue" type="button" @click="selectMetric('体验课')">
                  <div>
                    <div class="hero-title">
                      体验课
                      <ChevronRight :size="18" stroke-width="2.2" />
                    </div>
                    <strong>100</strong>
                  </div>
                  <BookOpen class="hero-icon" :size="54" stroke-width="2.1" />
                </button>
                <button class="hero-card hero-orange" type="button" @click="selectMetric('正价课')">
                  <div>
                    <div class="hero-title">
                      正价课
                      <ChevronRight :size="18" stroke-width="2.2" />
                    </div>
                    <strong>100</strong>
                  </div>
                  <GraduationCap class="hero-icon" :size="58" stroke-width="1.9" />
                </button>
              </div>

              <div class="mini-grid" :style="{ '--mini-count': boardData.miniCards.length }">
                <button
                  v-for="card in boardData.miniCards"
                  :key="card.label"
                  class="mini-card"
                  :class="{ selected: selectedMetric === card.label }"
                  type="button"
                  @click="selectMetric(card.label)"
                >
                  <span>
                    {{ card.label }}
                    <ChevronRight :size="17" stroke-width="2.1" />
                  </span>
                  <strong>{{ card.value }}</strong>
                </button>
              </div>
            </section>

            <div class="filters">
              <div class="period-switch" role="group" aria-label="时间维度">
                <button
                  v-for="period in periods"
                  :key="period.key"
                  type="button"
                  :class="{ active: activePeriod === period.key }"
                  @click="setPeriod(period.key)"
                >
                  {{ period.label }}
                </button>
              </div>

              <div class="filter-wrap">
                <button class="date-control" type="button" @click="toggleDateMenu">
                  <span>{{ selectedDateRange }}</span>
                  <CalendarDays :size="22" stroke-width="2" />
                </button>
                <div v-if="dateMenuOpen" class="floating-menu date-menu">
                  <button
                    v-for="range in dateRanges"
                    :key="range"
                    type="button"
                    :class="{ active: selectedDateRange === range }"
                    @click="selectDateRange(range)"
                  >
                    {{ range }}
                  </button>
                </div>
              </div>

              <div class="filter-wrap">
                <button class="center-control" type="button" @click="toggleCenterMenu">
                  <span>{{ selectedCenter }}</span>
                  <ChevronDown :size="18" stroke-width="2.1" />
                </button>
                <div v-if="centerMenuOpen" class="floating-menu center-menu">
                  <button
                    v-for="center in centers"
                    :key="center"
                    type="button"
                    :class="{ active: selectedCenter === center }"
                    @click="selectCenter(center)"
                  >
                    {{ center }}
                  </button>
                </div>
              </div>
            </div>

            <section class="kpi-grid" :class="`kpi-${activeBoard}`" :style="{ '--kpi-count': boardData.kpis.length }">
              <button
                v-for="kpi in boardData.kpis"
                :key="kpi.label"
                class="kpi-card"
                :class="{ selected: selectedMetric === kpi.label }"
                type="button"
                @click="selectMetric(kpi.label)"
              >
                <span>{{ kpi.label }}</span>
                <strong>{{ kpi.value }}</strong>
              </button>
            </section>

            <section class="analysis-grid">
              <section class="ranking-panel">
                <h2>{{ boardData.rankingTitle }}</h2>
                <table>
                  <thead>
                    <tr>
                      <th v-for="head in boardData.headers" :key="head">{{ head }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in boardData.rows" :key="`${row.rank}-${row.name}-${row.value}`">
                      <td>
                        <span class="rank-dot" :class="`rank-${row.rank}`">{{ padRank(row.rank) }}</span>
                      </td>
                      <td>{{ row.name }}</td>
                      <td>{{ row.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section class="chart-panel">
                <div class="chart-head">
                  <h2>{{ boardData.chartTitle }}</h2>
                  <div class="legend">
                    <span><i class="blue"></i>销售</span>
                    <span><i class="orange"></i>利润</span>
                  </div>
                </div>
                <svg class="line-chart" viewBox="0 0 1120 390" role="img" :aria-label="boardData.chartTitle">
                  <defs>
                    <linearGradient id="blueArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#3f7cff" stop-opacity="0.18" />
                      <stop offset="100%" stop-color="#3f7cff" stop-opacity="0.08" />
                    </linearGradient>
                  </defs>
                  <g class="grid-lines">
                    <line
                      v-for="line in chartGrid"
                      :key="line.label"
                      x1="82"
                      x2="1100"
                      :y1="line.y"
                      :y2="line.y"
                    />
                  </g>
                  <g class="y-axis-labels">
                    <text v-for="line in chartGrid" :key="`${line.label}-text`" x="68" :y="line.y + 6" text-anchor="end">
                      {{ line.label }}
                    </text>
                  </g>
                  <path class="area-path" :d="chartAreaPath" />
                  <path class="line-path blue-line" :d="blueLinePath" />
                  <path class="line-path orange-line" :d="orangeLinePath" />
                  <g class="x-axis-labels">
                    <text
                      v-for="point in chartXLabels"
                      :key="point.label"
                      :x="point.x"
                      y="363"
                      text-anchor="middle"
                    >
                      {{ point.label }}
                    </text>
                  </g>
                </svg>
              </section>
            </section>
          </div>
        </section>
      </section>
    </main>

    <transition name="toast">
      <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  Gauge,
  GraduationCap,
  Grid3X3,
  Network,
  PanelLeftClose,
  RectangleEllipsis,
  UserRound,
  X,
  Zap
} from '@lucide/vue'

const activeBoard = ref('delivery')
const activePeriod = ref('year')
const activeReportChild = ref('数据看板')
const selectedMetric = ref('')
const sidebarCollapsed = ref(false)
const dateMenuOpen = ref(false)
const centerMenuOpen = ref(false)
const toastMessage = ref('')
const selectedDateRange = ref('2026/02/21 - 2026/6/16')
const selectedCenter = ref('交付中心')

let toastTimer = null

const periods = [
  { key: 'year', label: '年' },
  { key: 'month', label: '月' },
  { key: 'week', label: '周' },
  { key: 'day', label: '日' }
]

const boardTabs = [
  { key: 'delivery', label: '交付看板' },
  { key: 'market', label: '市场看板' }
]

const menuItems = [
  { label: '商城管理', icon: Grid3X3, open: false },
  { label: '课程管理', icon: CalendarDays, open: false },
  { label: '订单管理', icon: FileText, open: false },
  { label: '交付中心', icon: Zap, open: false },
  { label: '合作中心', icon: Network, open: false },
  { label: '后台管理', icon: RectangleEllipsis, open: false }
]

const reportChildren = ['数据看板', '总部报表', '事业部/分公司', '园丁/导学师']

const openTabs = ref([
  { label: '数据交付看板', active: true },
  { label: '商城管理', active: false },
  { label: '订单管理', active: false }
])

const centers = ['交付中心', '总部交付中心', '鹿飞交付中心', '智鹿交付中心', '智鹿领航交付中心']
const dateRanges = ['2026/02/21 - 2026/6/16', '2026/02/21 - 2026/03/21', '2026/04/01 - 2026/06/16']

const dashboards = {
  delivery: {
    dateRange: '2026/02/21 - 2026/6/16',
    center: '交付中心',
    miniCards: [
      { label: '待分单', value: '10' },
      { label: '体验课待排课', value: '7' },
      { label: '正式课待排课', value: '7' },
      { label: '待上课', value: '9' },
      { label: '待转化', value: '10' },
      { label: '待评价', value: '10' },
      { label: '待消课', value: '10' },
      { label: '待续课', value: '10' }
    ],
    kpis: [
      { label: '已排课', value: '10' },
      { label: '已消课', value: '7' },
      { label: '已上课', value: '9' },
      { label: '已续课时', value: '10' },
      { label: '已续课包', value: '10' }
    ],
    rankingTitle: '消课排行',
    chartTitle: '消课续课波动图',
    headers: ['NO.', '老师', '交付中心'],
    rows: [
      { rank: 1, name: '沈清禾', value: '总部交付中心' },
      { rank: 2, name: '周正', value: '总部交付中心' },
      { rank: 3, name: '苏静雯', value: '总部交付中心' },
      { rank: 4, name: '陆明轩', value: '鹿飞交付中心' },
      { rank: 5, name: '苏静雯', value: '智鹿交付中心' },
      { rank: 6, name: '周勋娴', value: '智鹿领航交付中心' }
    ],
    yLabels: ['2000', '1000', '500', '200', '100', '50'],
    blueY: [300, 268, 278, 180, 96, 142, 52],
    orangeY: [236, 246, 280, 218, 128, 148, 48]
  },
  market: {
    dateRange: '2026/02/21 - 2026/03/21',
    center: '总部交付中心',
    miniCards: [
      { label: '待支付', value: '10' },
      { label: '待分单', value: '10' },
      { label: '待排课', value: '7' },
      { label: '正式待课排课', value: '7' },
      { label: '待上课', value: '9' },
      { label: '待转化', value: '10' },
      { label: '待评价', value: '10' },
      { label: '待消课', value: '10' },
      { label: '待续课', value: '10' }
    ],
    kpis: [
      { label: '总销售额', value: '¥ 130,400' },
      { label: '总退款', value: '¥ 7,400' },
      { label: '总采购', value: '¥ 7,400' },
      { label: '总退供', value: '¥ 7,400' },
      { label: '总利润', value: '¥ 7,400' },
      { label: '可提现', value: '¥ 10,400' }
    ],
    rankingTitle: '销售经理排行',
    chartTitle: '销售波动图',
    headers: ['NO.', '销售经理', '贡献'],
    rows: [
      { rank: 1, name: '沈清禾', value: '¥ 200w' },
      { rank: 2, name: '周正', value: '¥ 120w' },
      { rank: 3, name: '苏静雯', value: '¥ 100w' },
      { rank: 4, name: '陆明轩', value: '¥ 80w' },
      { rank: 5, name: '苏静雯', value: '¥ 76w' },
      { rank: 6, name: '周勋娴', value: '¥ 60w' }
    ],
    yLabels: ['¥ 200w', '¥ 100w', '¥ 50w', '¥ 20w', '¥ 10w', '¥ 5w'],
    blueY: [288, 252, 260, 150, 84, 138, 52],
    orangeY: [306, 266, 278, 190, 104, 168, 86]
  }
}

const boardData = computed(() => dashboards[activeBoard.value])

watch(activeBoard, (board) => {
  selectedMetric.value = ''
  selectedDateRange.value = dashboards[board].dateRange
  selectedCenter.value = dashboards[board].center
  dateMenuOpen.value = false
  centerMenuOpen.value = false
})

const chartPlot = {
  left: 82,
  right: 1100,
  bottom: 326
}

const chartXLabels = computed(() => {
  const labels = ['6.10', '6.11', '6.12', '6.13', '6.14', '6.15', '6.16']
  const step = (chartPlot.right - chartPlot.left) / (labels.length - 1)
  return labels.map((label, index) => ({
    label,
    x: chartPlot.left + step * index
  }))
})

const bluePoints = computed(() => toPoints(boardData.value.blueY))
const orangePoints = computed(() => toPoints(boardData.value.orangeY))
const blueLinePath = computed(() => smoothPath(bluePoints.value))
const orangeLinePath = computed(() => smoothPath(orangePoints.value))
const chartAreaPath = computed(() => {
  const points = bluePoints.value
  if (!points.length) return ''
  return `${smoothPath(points)} L ${points.at(-1).x} ${chartPlot.bottom} L ${points[0].x} ${chartPlot.bottom} Z`
})

const chartGrid = computed(() => {
  const yPositions = [78, 128, 178, 228, 278, 326]
  return boardData.value.yLabels.map((label, index) => ({ label, y: yPositions[index] }))
})

function toPoints(yValues) {
  return chartXLabels.value.map((point, index) => ({ x: point.x, y: yValues[index] }))
}

function smoothPath(points) {
  if (points.length < 2) return ''
  const command = [`M ${points[0].x} ${points[0].y}`]
  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i]
    const next = points[i + 1]
    const midX = (current.x + next.x) / 2
    command.push(`C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y}`)
  }
  return command.join(' ')
}

function switchBoard(board) {
  if (activeBoard.value === board) return
  activeBoard.value = board
  toast(board === 'delivery' ? '已切换至交付看板' : '已切换至市场看板')
}

function setPeriod(period) {
  activePeriod.value = period
  const label = periods.find((item) => item.key === period)?.label
  toast(`时间维度：${label}`)
}

function selectMetric(label) {
  selectedMetric.value = label
  toast(`已选择：${label}`)
}

function toggleDateMenu() {
  dateMenuOpen.value = !dateMenuOpen.value
  centerMenuOpen.value = false
  toast('请选择时间范围')
}

function selectDateRange(range) {
  selectedDateRange.value = range
  dateMenuOpen.value = false
  toast(`时间已更新：${range}`)
}

function toggleCenterMenu() {
  centerMenuOpen.value = !centerMenuOpen.value
  dateMenuOpen.value = false
  toast('请选择交付中心')
}

function selectCenter(center) {
  selectedCenter.value = center
  centerMenuOpen.value = false
  toast(`已切换：${center}`)
}

function selectReportChild(child) {
  activeReportChild.value = child
  toast(`当前模块：${child}`)
}

function handleMenuClick(item) {
  toast(`${item.label} 已点击`)
}

function activateWindowTab(tab) {
  openTabs.value = openTabs.value.map((item) => ({ ...item, active: item.label === tab.label }))
  toast(`已打开：${tab.label}`)
}

function closeWindowTab(tab) {
  if (tab.active) {
    toast('当前看板保持打开')
    return
  }
  openTabs.value = openTabs.value.filter((item) => item.label !== tab.label)
  toast(`已关闭：${tab.label}`)
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  toast(sidebarCollapsed.value ? '侧边栏已收起' : '侧边栏已展开')
}

function padRank(rank) {
  return String(rank).padStart(2, '0')
}

function toast(message) {
  toastMessage.value = message
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastMessage.value = ''
  }, 1400)
}
</script>
