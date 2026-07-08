<template>
  <div
    class="prototype-shell"
    :class="{ 'sidebar-collapsed': sidebarCollapsed, 'mobile-nav-open': mobileNavOpen }"
  >
    <aside class="app-sidebar">
      <button class="brand-lockup" type="button" @click="navigateTo('workbench')">
        <span class="brand-mark">Z</span>
        <span class="brand-copy">
          <strong>ZULONEX</strong>
          <small>总部业务平台</small>
        </span>
      </button>
      <button class="mobile-nav-close" type="button" aria-label="关闭全部功能" @click="mobileNavOpen = false">
        <X :size="20" />
      </button>
      <label class="sidebar-role-picker">
        <span><UserRound :size="16" />工作角色</span>
        <select :value="activeRole" @change="switchRole($event.target.value)">
          <option v-for="role in roles" :key="role.key" :value="role.key">{{ role.group }} · {{ role.label }}</option>
        </select>
      </label>

      <nav class="primary-nav" aria-label="主导航">
        <section v-for="group in visibleNavGroups" :key="group.label" class="nav-group">
          <div class="nav-group-label">{{ group.label }}</div>
          <button
            v-for="item in group.items"
            :key="item.key"
            class="nav-item"
            :class="{ active: activeView === item.key }"
            type="button"
            :title="sidebarCollapsed ? item.label : undefined"
            @click="navigateTo(item.key)"
          >
            <component :is="item.icon" :size="20" stroke-width="2" />
            <span>{{ item.label }}</span>
            <em v-if="item.badge">{{ item.badge }}</em>
          </button>
        </section>
      </nav>

      <div class="sidebar-bottom">
        <button
          class="collapse-control"
          type="button"
          :title="sidebarCollapsed ? '展开导航' : '收起导航'"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <PanelLeftOpen v-if="sidebarCollapsed" :size="20" />
          <PanelLeftClose v-else :size="20" />
          <span>{{ sidebarCollapsed ? '' : '收起导航' }}</span>
        </button>
      </div>
    </aside>
    <button
      v-if="mobileNavOpen"
      class="mobile-nav-backdrop"
      type="button"
      aria-label="关闭全部功能"
      @click="mobileNavOpen = false"
    ></button>

    <section class="app-stage">
      <header class="top-header">
        <button class="mobile-menu-button" type="button" aria-label="打开全部功能" @click.stop="mobileNavOpen = true">
          <Menu :size="21" />
        </button>
        <div class="mobile-header-brand">
          <span>Z</span>
          <strong>ZULONEX</strong>
        </div>
        <div class="scope-picker">
          <button class="scope-trigger" type="button" @click="scopeOpen = !scopeOpen">
            <Building2 :size="18" />
            <span>{{ activeScope }}</span>
            <ChevronDown :size="16" />
          </button>
          <div v-if="scopeOpen" class="menu-popover scope-menu">
            <button
              v-for="scope in availableScopes"
              :key="scope"
              type="button"
              :class="{ active: activeScope === scope }"
              @click="setScope(scope)"
            >
              {{ scope }}
              <Check v-if="activeScope === scope" :size="16" />
            </button>
          </div>
        </div>

        <div class="global-search">
          <Search :size="19" />
          <input
            ref="globalSearchInput"
            v-model="globalSearch"
            type="search"
            placeholder="搜索订单、学员、商家或课程"
            @focus="searchFocused = true"
            @click.stop="searchFocused = true"
            @input="searchFocused = true"
          />
          <kbd>⌘ K</kbd>
          <div v-if="searchFocused && globalSearch.trim().length >= 2" class="search-results">
            <button
              v-for="result in globalResults"
              :key="`${result.kind}-${result.record.id}`"
              type="button"
              @click="openGlobalResult(result)"
            >
              <span :class="`result-icon tone-${result.tone}`">
                <component :is="result.icon" :size="17" />
              </span>
              <span>
                <strong>{{ result.title }}</strong>
                <small>{{ result.meta }}</small>
              </span>
              <ChevronRight :size="17" />
            </button>
            <div v-if="globalResults.length === 0" class="empty-search">没有匹配结果</div>
          </div>
        </div>

        <label class="role-switch" title="仅切换工作台视角，不代表线上角色权限">
          <UserRound :size="16" />
          <span>工作角色</span>
          <select :value="activeRole" aria-label="工作角色" @change="switchRole($event.target.value)">
            <option v-for="role in roles" :key="role.key" :value="role.key">{{ role.group }} · {{ role.label }}</option>
          </select>
          <ChevronDown :size="15" />
        </label>

        <button class="icon-button notification-button" type="button" title="通知" aria-label="通知，7 条未读" @click="toast('当前有 7 条未读通知')">
          <Bell :size="20" />
          <span>7</span>
        </button>
        <button class="account-button" type="button" aria-label="管理员账号菜单" @click="toast('账号菜单已打开')">
          <span class="avatar">管</span>
          <span>管理员</span>
          <ChevronDown :size="16" />
        </button>
      </header>

      <main ref="appContentRef" class="app-content" @click="closeFloatingMenus">
        <header class="page-header">
          <div>
            <div class="breadcrumb">总部业务平台 / {{ currentPage.group }}</div>
            <h1>{{ currentPage.title }}</h1>
            <p>{{ currentPage.description }}</p>
          </div>
          <div class="page-actions">
            <span class="runtime-mode-badge" :class="{ production: !runtimeMode.isPreview }" :title="runtimeMode.description">
              <AlertCircle :size="14" />
              {{ runtimeMode.label }}
            </span>
            <button class="button secondary" type="button" @click="refreshView">
              <RefreshCw :size="17" />
              刷新
            </button>
          </div>
        </header>

        <section v-if="activeView === 'workbench'" class="view-content">
          <div class="role-context-band">
            <span class="role-context-icon"><UserRound :size="20" /></span>
            <div>
              <small>{{ currentRoleDefinition.group }}工作视角</small>
              <strong>{{ currentRoleAccess.roleName }}</strong>
              <p>{{ currentRoleProfile.scenario }}</p>
            </div>
            <div class="role-capability-tags">
              <span v-for="action in currentRoleProfile.actions.slice(0, 4)" :key="action">{{ action }}</span>
            </div>
            <em>{{ activeScope }}</em>
          </div>

          <div class="attention-band">
            <div>
              <span class="attention-icon"><AlertCircle :size="20" /></span>
              <span>
                <strong>今天有 {{ currentExceptions.length }} 项异常需要优先处理</strong>
                <small>{{ currentExceptions[0]?.title || '当前角色暂无需要人工介入的异常' }}</small>
              </span>
            </div>
            <button type="button" :disabled="currentExceptions.length === 0" @click="navigateTo(currentExceptions[0]?.view || 'workbench')">
              查看异常
              <ArrowRight :size="17" />
            </button>
          </div>

          <div class="metric-grid">
            <button
              v-for="metric in currentStats"
              :key="metric.key"
              class="metric-card"
              :class="`metric-${metric.tone}`"
              type="button"
              @click="navigateTo(metric.view)"
            >
              <span class="metric-icon"><component :is="metricIconFor(metric)" :size="18" /></span>
              <span class="metric-label">{{ metric.label }}</span>
              <strong>{{ metric.value }}</strong>
              <small>{{ metric.meta }}</small>
              <ArrowUpRight :size="18" />
            </button>
          </div>

          <div class="workbench-layout">
            <section class="content-section task-section">
              <div class="section-heading">
                <div>
                  <h2>我的待办</h2>
                  <p>按优先级聚合跨模块任务</p>
                </div>
                <div class="compact-tabs">
                  <button
                    v-for="tab in taskTabs"
                    :key="tab.key"
                    type="button"
                    :class="{ active: activeTaskTab === tab.key }"
                    @click="activeTaskTab = tab.key"
                  >
                    {{ tab.label }}
                  </button>
                </div>
              </div>

              <div class="table-wrap">
                <table class="data-table task-table">
                  <thead>
                    <tr>
                      <th>任务</th>
                      <th>业务对象</th>
                      <th>截止时间</th>
                      <th>负责人</th>
                      <th>状态</th>
                      <th class="align-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="visibleTasks.length === 0">
                      <td colspan="6" class="empty-table-state">
                        <CheckCircle2 :size="20" />
                        <strong>当前没有待处理任务</strong>
                        <small>切换“全部”可查看已完成事项</small>
                      </td>
                    </tr>
                    <tr v-for="task in visibleTasks" :key="task.id">
                      <td>
                        <div class="primary-cell">
                          <span class="task-category-icon" :class="`task-icon-${task.kind}`">
                            <component :is="taskIconFor(task)" :size="15" />
                          </span>
                          <span>
                            <strong>{{ task.title }}</strong>
                            <small>{{ task.category }} · {{ task.id }}</small>
                          </span>
                        </div>
                      </td>
                      <td>{{ task.subject }}</td>
                      <td :class="{ 'text-danger': task.priority === '紧急' }">{{ task.due }}</td>
                      <td>{{ task.owner }}</td>
                      <td><span class="status-pill" :class="`status-${statusTone(task.status)}`">{{ task.status }}</span></td>
                      <td class="align-right">
                        <button class="table-action" type="button" @click="openTask(task)">
                          {{ task.status === '已完成' ? '查看' : '处理' }}
                          <ChevronRight :size="15" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section class="content-section exception-section">
              <div class="section-heading">
                <div>
                  <h2>异常提醒</h2>
                  <p>只展示需要人工介入的事项</p>
                </div>
                <button class="icon-button quiet" type="button" title="提醒设置" @click="toast('提醒设置已打开')">
                  <Settings :size="18" />
                </button>
              </div>
              <div class="exception-list">
                <button
                  v-for="item in currentExceptions"
                  :key="item.id"
                  type="button"
                  @click="navigateTo(item.view)"
                >
                  <span class="exception-marker" :class="`marker-${item.tone}`">
                    <AlertCircle :size="14" />
                  </span>
                  <span>
                    <strong>{{ item.title }}</strong>
                    <small>{{ item.meta }}</small>
                  </span>
                  <ChevronRight :size="17" />
                </button>
              </div>
            </section>
          </div>

          <section class="content-section flow-section">
            <div class="section-heading">
              <div>
                <h2>今日业务进度</h2>
                <p>从订单到交付的关键转化</p>
              </div>
              <button class="text-button" type="button" @click="navigateTo('analytics')">
                查看经营分析
                <ArrowRight :size="16" />
              </button>
            </div>
            <div class="flow-rail">
              <div v-for="(stage, index) in flowStages" :key="stage.label" class="flow-stage">
                <span class="flow-node">{{ index + 1 }}</span>
                <div>
                  <small>{{ stage.label }}</small>
                  <strong>{{ stage.value }}</strong>
                  <em>{{ stage.meta }}</em>
                </div>
                <ArrowRight v-if="index < flowStages.length - 1" :size="20" class="flow-arrow" />
              </div>
            </div>
          </section>
        </section>

        <section v-else-if="activeView === 'orders'" class="view-content">
          <div class="summary-strip">
            <button
              v-for="tab in orderTabs"
              :key="tab.key"
              type="button"
              :class="{ active: activeOrderTab === tab.key }"
              @click="activeOrderTab = tab.key"
            >
              <span>{{ tab.label }}</span>
              <strong>{{ tab.value }}</strong>
              <small>{{ tab.meta }}</small>
            </button>
          </div>

          <section class="content-section list-section">
            <div class="list-toolbar">
              <div class="list-search">
                <Search :size="18" />
                <input v-model="listSearch" type="search" placeholder="搜索订单号、学员、家长或课程" />
              </div>
              <button class="button secondary" type="button" :class="{ active: filtersOpen }" @click="filtersOpen = !filtersOpen">
                <SlidersHorizontal :size="17" />
                筛选
                <span v-if="orderActiveFilterCount" class="filter-count">{{ orderActiveFilterCount }}</span>
              </button>
              <button class="button secondary" type="button" @click="toast('已保存为我的订单视图')">
                <Bookmark :size="17" />
                保存视图
              </button>
              <button class="button secondary icon-only" type="button" title="自定义列" @click="toast('列设置已打开')">
                <Columns3 :size="18" />
              </button>
              <button
                class="button secondary icon-only"
                type="button"
                title="导出"
                :disabled="!canPreviewPermission('registry.export')"
                @click="toast('导出任务已创建')"
              >
                <Download :size="18" />
              </button>
            </div>

            <div v-if="filtersOpen" class="filter-panel">
              <label>
                <span>交付层级</span>
                <select v-model="orderFilterState.deliveryScope">
                  <option value="">全部交付层级</option>
                  <option>总部交付中心</option>
                  <option>华东交付中心</option>
                  <option>华南交付中心</option>
                </select>
              </label>
              <label>
                <span>订单号</span>
                <input v-model="orderFilterState.orderNo" type="text" placeholder="请输入订单号" />
              </label>
              <label>
                <span>订单状态</span>
                <select v-model="orderFilterState.status">
                  <option value="">全部订单状态</option>
                  <option>已支付</option>
                  <option>待支付</option>
                  <option>收款确认中</option>
                  <option>已取消</option>
                </select>
              </label>
              <label>
                <span>是否需要规划师</span>
                <select v-model="orderFilterState.plannerRequirement">
                  <option value="">全部</option>
                  <option>手动指定</option>
                  <option>不需要</option>
                </select>
              </label>
              <label>
                <span>来源</span>
                <select v-model="orderFilterState.source">
                  <option value="">全部来源</option>
                  <option>线上订单</option>
                  <option>手动导入</option>
                </select>
              </label>
              <label>
                <span>平台</span>
                <select v-model="orderFilterState.platform">
                  <option value="">全部平台</option>
                  <option>小程序</option>
                  <option>录入</option>
                </select>
              </label>
              <label>
                <span>下单方式</span>
                <select v-model="orderFilterState.orderMethod">
                  <option value="">全部下单方式</option>
                  <option>家长</option>
                  <option>代下单</option>
                </select>
              </label>
              <label>
                <span>家长</span>
                <input v-model="orderFilterState.parentName" type="text" placeholder="请输入家长姓名" />
              </label>
              <label>
                <span>课程类型</span>
                <select v-model="orderFilterState.courseType">
                  <option value="">全部课程类型</option>
                  <option>体验课</option>
                  <option>正式课</option>
                </select>
              </label>
              <label>
                <span>学员</span>
                <input v-model="orderFilterState.studentName" type="text" placeholder="请输入学员姓名" />
              </label>
              <label>
                <span>是否已分配</span>
                <select v-model="orderFilterState.allocationStatus">
                  <option value="">全部</option>
                  <option>已分配</option>
                  <option>未分配</option>
                </select>
              </label>
              <label>
                <span>含Pad</span>
                <select v-model="orderFilterState.hasPad">
                  <option value="">全部</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </label>
              <label>
                <span>下单时间</span>
                <input v-model="orderFilterState.orderTime" type="text" placeholder="请选择下单时间" readonly />
              </label>
              <div class="filter-actions">
                <button class="button ghost" type="button" @click="resetOrderFilters">
                  <RotateCcw :size="16" />重置
                </button>
                <button class="button primary" type="button" @click="filtersOpen = false; toast('筛选已应用')">
                  应用筛选
                </button>
              </div>
            </div>

            <div v-if="selectedRows.length" class="bulk-bar">
              <span>已选择 {{ selectedRows.length }} 项</span>
              <button
                type="button"
                :disabled="!canPreviewPermission('orders.handle')"
                :title="canPreviewPermission('orders.handle') ? '批量分配' : '当前角色无批量分配权限'"
                @click="bulkOrderAction"
              >
                批量分配
              </button>
              <button type="button" @click="selectedRows = []">取消选择</button>
            </div>

            <div class="table-wrap">
              <table class="data-table order-table">
                <thead>
                  <tr>
                    <th class="checkbox-column">
                      <input type="checkbox" :checked="allVisibleSelected" @change="toggleAllRows(filteredOrders)" />
                    </th>
                    <th>订单</th>
                    <th>学员</th>
                    <th>家长</th>
                    <th>课程</th>
                    <th>交易主体</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>分配</th>
                    <th>下单时间</th>
                    <th>下一步</th>
                    <th class="align-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filteredOrders" :key="order.id">
                    <td class="checkbox-column">
                      <input type="checkbox" :checked="selectedRows.includes(order.id)" @change="toggleRow(order.id)" />
                    </td>
                    <td>
                      <button class="record-link" type="button" @click="openRecord('order', order)">
                        {{ order.orderNo }}
                      </button>
                      <small class="cell-meta">{{ order.source }} · {{ order.platform }}</small>
                    </td>
                    <td>
                      <strong>{{ displaySensitive(order.studentName, 'studentName') }}</strong>
                      <small class="cell-meta">{{ order.courseType }}</small>
                    </td>
                    <td>
                      <strong>{{ displaySensitive(order.parentName, 'parentName') }}</strong>
                      <small class="cell-meta">{{ displaySensitive(order.parentMobile, 'parentMobile') }}</small>
                    </td>
                    <td>{{ order.courseName }}</td>
                    <td>
                      <strong>{{ order.dealer }}</strong>
                      <small class="cell-meta">销售方：{{ order.seller }}</small>
                    </td>
                    <td class="amount-cell">
                      {{ displaySensitive(order.amount, 'businessAmount') }}
                      <small class="cell-meta">实付 {{ displaySensitive(order.paidAmount, 'businessAmount') }}</small>
                    </td>
                    <td>
                      <span class="status-pill" :class="`status-${statusTone(order.status)}`">{{ order.status }}</span>
                      <small v-if="order.riskStatus !== '--'" class="cell-alert">{{ order.riskStatus }}</small>
                      <small v-else-if="order.afterSaleStatus !== '--'" class="cell-meta">{{ order.afterSaleStatus }}</small>
                    </td>
                    <td>
                      <strong>{{ order.allocationStatus }}</strong>
                      <small class="cell-meta">{{ order.deliveryCenter }}</small>
                    </td>
                    <td>{{ order.orderTime }}</td>
                    <td>{{ order.nextAction }}</td>
                    <td class="align-right">
                      <button class="table-action" type="button" @click="openRecord('order', order)">
                        详情
                        <ChevronRight :size="15" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableFooter :total="scopeAwareTotal(2335, filteredOrders)" />
          </section>
        </section>

        <section v-else-if="activeView === 'delivery'" class="view-content">
          <div class="summary-strip delivery-summary">
            <button
              v-for="tab in deliveryTabs"
              :key="tab.key"
              type="button"
              :class="{ active: activeDeliveryTab === tab.key }"
              @click="activeDeliveryTab = tab.key"
            >
              <span>{{ tab.label }}</span>
              <strong>{{ tab.value }}</strong>
              <small>{{ tab.meta }}</small>
            </button>
          </div>

          <section class="content-section list-section">
            <div class="list-toolbar">
              <div class="list-search">
                <Search :size="18" />
                <input v-model="listSearch" type="search" placeholder="搜索学员、手机号或学科" />
              </div>
              <button class="button secondary" type="button" :class="{ active: filtersOpen }" @click="filtersOpen = !filtersOpen">
                <Filter :size="17" />
                筛选
              </button>
              <button class="button secondary" type="button" @click="toast('已切换到日历排课视图')">
                <CalendarDays :size="17" />
                日历视图
              </button>
              <button
                class="button secondary icon-only"
                type="button"
                title="导出"
                :disabled="!canPreviewPermission('registry.export')"
                @click="toast('导出任务已创建')"
              >
                <Download :size="18" />
              </button>
            </div>

            <div v-if="filtersOpen" class="filter-panel">
              <label>
                <span>课程阶段</span>
                <select>
                  <option>全部阶段</option>
                  <option>体验课</option>
                  <option>正式课</option>
                </select>
              </label>
              <label>
                <span>学科</span>
                <select>
                  <option>全部学科</option>
                  <option>数学</option>
                  <option>英语</option>
                  <option>语文</option>
                  <option>物理</option>
                </select>
              </label>
              <label>
                <span>负责人</span>
                <select>
                  <option>全部负责人</option>
                  <option>交付一组</option>
                  <option>交付二组</option>
                </select>
              </label>
              <div class="filter-actions">
                <button class="button ghost" type="button" @click="toast('筛选条件已重置')"><RotateCcw :size="16" />重置</button>
                <button class="button primary" type="button" @click="filtersOpen = false; toast('筛选已应用')">应用筛选</button>
              </div>
            </div>

            <div class="table-wrap">
              <table class="data-table delivery-table">
                <thead>
                  <tr>
                    <th>学员 / 家长</th>
                    <th>课程与课时</th>
                    <th>教师 / 班级</th>
                    <th>交付中心</th>
                    <th>处理时限</th>
                    <th>进展</th>
                    <th>状态</th>
                    <th class="align-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredDelivery" :key="item.id">
                    <td>
                      <strong>{{ displaySensitive(item.studentName || item.student, 'studentName') }}</strong>
                      <small class="cell-meta">
                        {{ displaySensitive(item.parentName, 'parentName') }} ·
                        {{ displaySensitive(item.parentMobile, 'parentMobile') }}
                      </small>
                    </td>
                    <td>
                      {{ item.courseName }}
                      <small class="cell-meta">
                        {{ item.stage }} · 总 {{ item.totalHours }} / 已消 {{ item.consumedHours }} / 剩余 {{ item.remainingHours }}
                      </small>
                    </td>
                    <td>
                      <strong>{{ item.teacherName || item.owner }}</strong>
                      <small class="cell-meta">{{ item.className }} · {{ item.teachingMode }}</small>
                    </td>
                    <td>
                      {{ item.deliveryCenter }}
                      <small class="cell-meta">{{ item.deliveryMode }} · {{ item.grade }} / {{ item.subject }}</small>
                    </td>
                    <td :class="{ 'text-danger': item.status === '时间冲突' }">{{ item.deadline }}</td>
                    <td>{{ item.issue }}</td>
                    <td><span class="status-pill" :class="`status-${statusTone(item.status)}`">{{ item.status }}</span></td>
                    <td class="align-right">
                      <button class="table-action" type="button" @click="openRecord('delivery', item)">
                        {{ deliveryAction(item.status) }}
                        <ChevronRight :size="15" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableFooter :total="scopeAwareTotal(858, filteredDelivery)" />
          </section>
        </section>

        <section v-else-if="activeView === 'purchase'" class="view-content">
          <div class="summary-strip">
            <button
              v-for="tab in purchaseTabs"
              :key="tab.key"
              type="button"
              :class="{ active: activePurchaseTab === tab.key }"
              @click="activePurchaseTab = tab.key"
            >
              <span>{{ tab.label }}</span>
              <strong>{{ tab.value }}</strong>
              <small>{{ tab.meta }}</small>
            </button>
          </div>

          <section class="content-section list-section">
            <div class="list-toolbar">
              <div class="list-search">
                <Search :size="18" />
                <input v-model="listSearch" type="search" placeholder="搜索采购单、订单、学员、供应商或商品" />
              </div>
              <button class="button secondary" type="button" @click="toast('采购筛选面板已打开')">
                <Filter :size="17" />
                筛选
              </button>
              <button
                class="button secondary"
                type="button"
                :disabled="!canPreviewPermission('registry.export')"
                @click="toast('采购导出任务已创建')"
              >
                <Download :size="17" />
                导出
              </button>
            </div>

            <div class="table-wrap">
              <table class="data-table purchase-table">
                <thead>
                  <tr>
                    <th>采购单</th>
                    <th>关联学员 / 订单</th>
                    <th>采购方 / 供应商</th>
                    <th>商品</th>
                    <th>金额</th>
                    <th>付款 / 物流</th>
                    <th>状态</th>
                    <th>下一步</th>
                    <th class="align-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredPurchases" :key="item.id">
                    <td>
                      <button class="record-link" type="button" @click="openRecord('purchase', item)">
                        {{ item.purchaseNo }}
                      </button>
                      <small class="cell-meta">{{ item.purchaseType }} · {{ item.deadline }}</small>
                    </td>
                    <td>
                      <strong>{{ displaySensitive(item.studentName, 'studentName') }}</strong>
                      <small class="cell-meta">
                        {{ item.relatedOrder }} · {{ displaySensitive(item.parentName, 'parentName') }}
                        {{ displaySensitive(item.parentMobile, 'parentMobile') }}
                      </small>
                    </td>
                    <td>
                      {{ item.merchant }}
                      <small class="cell-meta">供应商：{{ displaySensitive(item.supplier, 'supplier') }}</small>
                    </td>
                    <td>
                      {{ item.product }}
                      <small class="cell-meta">{{ item.specification }} · 数量 {{ item.quantity }}</small>
                    </td>
                    <td class="amount-cell">
                      {{ displaySensitive(item.amount, 'businessAmount') }}
                      <small class="cell-meta">已付 {{ displaySensitive(item.paidAmount, 'businessAmount') }}</small>
                    </td>
                    <td>
                      {{ item.paymentStatus }}
                      <small class="cell-meta">{{ item.logisticsNo }} · 预计 {{ item.expectedAt }}</small>
                    </td>
                    <td><span class="status-pill" :class="`status-${statusTone(item.status)}`">{{ item.status }}</span></td>
                    <td>{{ item.nextAction }}</td>
                    <td class="align-right">
                      <button class="table-action" type="button" @click="openRecord('purchase', item)">
                        {{ purchaseAction(item.status) }}
                        <ChevronRight :size="15" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableFooter :total="scopeAwareTotal(642, filteredPurchases)" />
          </section>
        </section>

        <section v-else-if="activeView === 'partners'" class="view-content">
          <div class="review-overview">
            <div>
              <span>待初审</span>
              <strong>6</strong>
              <small>平均等待 1.8 小时</small>
            </div>
            <div>
              <span>待补充</span>
              <strong>3</strong>
              <small>资料完整度低于 80%</small>
            </div>
            <div>
              <span>复审中</span>
              <strong>4</strong>
              <small>今天预计完成 3 项</small>
            </div>
            <div class="risk-overview">
              <span>证照预警</span>
              <strong>1</strong>
              <small>12 天后到期</small>
            </div>
          </div>

          <section class="content-section list-section">
            <div class="list-toolbar">
              <div class="list-search">
                <Search :size="18" />
                <input v-model="listSearch" type="search" placeholder="搜索商家名称、联系人或地区" />
              </div>
              <div class="compact-tabs partner-tabs">
                <button
                  v-for="tab in partnerTabs"
                  :key="tab.key"
                  type="button"
                  :class="{ active: activePartnerTab === tab.key }"
                  @click="activePartnerTab = tab.key"
                >
                  {{ tab.label }}
                </button>
              </div>
              <button
                class="button secondary"
                type="button"
                :disabled="!canPreviewPermission('registry.export')"
                @click="toast('已导出脱敏后的审核清单')"
              >
                <Download :size="17" />
                导出
              </button>
              <button
                class="button primary"
                type="button"
                :disabled="!canPreviewPermission('partner.review')"
                @click="openPartnerEditor(null, true)"
              >
                <Handshake :size="17" />
                新增申请
              </button>
            </div>

            <div class="table-wrap">
              <table class="data-table partner-table">
                <thead>
                  <tr>
                    <th>商家</th>
                    <th>联系人</th>
                    <th>经营地区</th>
                    <th>提交时间</th>
                    <th>资料完整度</th>
                    <th>账号 / 合约</th>
                    <th>风险</th>
                    <th>审核状态</th>
                    <th class="align-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredPartners" :key="item.id">
                    <td>
                      <strong>{{ item.company }}</strong>
                      <small class="cell-meta">{{ item.entityType }} · {{ item.applicationNo }}</small>
                    </td>
                    <td>
                      {{ displaySensitive(item.contact, 'contactName') }}
                      <small class="cell-meta">{{ displaySensitive(item.mobile, 'contactMobile') }}</small>
                    </td>
                    <td>{{ item.region }}</td>
                    <td>{{ item.submittedAt }}</td>
                    <td>
                      <div class="progress-cell">
                        <span><i :style="{ width: `${item.completeness}%` }"></i></span>
                        <em>{{ item.completeness }}%</em>
                      </div>
                    </td>
                    <td>
                      {{ item.accountStatus }}
                      <small class="cell-meta">{{ item.contractStatus }}</small>
                    </td>
                    <td><span class="risk-tag" :class="`risk-${riskTone(item.risk)}`">{{ item.risk }}风险</span></td>
                    <td><span class="status-pill" :class="`status-${statusTone(item.status)}`">{{ item.status }}</span></td>
                    <td class="align-right">
                      <div class="registry-row-actions">
                        <button class="table-action" type="button" @click="openRecord('partner', item)">
                          审核
                          <ChevronRight :size="15" />
                        </button>
                        <button class="table-action" type="button" @click="openPartnerEditor(item, false)">
                          编辑
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableFooter :total="scopeAwareTotal(14, filteredPartners)" />
          </section>
        </section>

        <section v-else-if="activeView === 'finance'" class="view-content">
          <div class="metric-grid finance-metrics">
            <button class="metric-card metric-blue" type="button" @click="toast('已筛选待确认账单')">
              <span class="metric-icon"><WalletCards :size="18" /></span><span class="metric-label">待确认账单</span><strong>12</strong><small>合计 ¥ 286,400</small><ArrowUpRight :size="18" />
            </button>
            <button class="metric-card metric-red" type="button" @click="toast('已筛选差额账单')">
              <span class="metric-icon"><AlertCircle :size="18" /></span><span class="metric-label">存在差额</span><strong>3</strong><small>差额共 ¥ 1,280</small><ArrowUpRight :size="18" />
            </button>
            <button class="metric-card metric-amber" type="button" @click="toast('已筛选待打款账单')">
              <span class="metric-icon"><WalletCards :size="18" /></span><span class="metric-label">待打款</span><strong>8</strong><small>最早等待 1 天</small><ArrowUpRight :size="18" />
            </button>
            <button class="metric-card metric-green" type="button" @click="navigateTo('analytics')">
              <span class="metric-icon"><ChartLine :size="18" /></span><span class="metric-label">本月已回款</span><strong>¥ 2.86m</strong><small>较上月 +12.4%</small><ArrowUpRight :size="18" />
            </button>
          </div>
          <section class="content-section split-audit-section">
            <div class="section-heading">
              <div><h2>交易链路与分账核验</h2><p>按订单核对支付、冻结、分账和结算单归属</p></div>
              <button class="button secondary" type="button" @click="toast('已刷新分账核验结果')"><RefreshCw :size="17" />重新核验</button>
            </div>
            <div class="split-audit-strip">
              <div>
                <span>已核对订单</span>
                <strong>{{ splitAuditSummary.checked }}</strong>
                <small>可进入结算</small>
              </div>
              <div>
                <span>待处理</span>
                <strong>{{ splitAuditSummary.pending }}</strong>
                <small>含冻结与待核验</small>
              </div>
              <div>
                <span>核验金额</span>
                <strong>{{ displaySensitive(formatCurrency(splitAuditSummary.total), 'settlementAmount') }}</strong>
                <small>来自支付流水</small>
              </div>
              <div>
                <span>未归因差额</span>
                <strong :class="{ 'text-danger': splitAuditSummary.diff > 0 }">{{ displaySensitive(formatCurrency(splitAuditSummary.diff), 'settlementAmount') }}</strong>
                <small>{{ splitAuditSummary.diff > 0 ? '需要财务介入' : '金额平衡' }}</small>
              </div>
            </div>
            <div class="table-wrap">
              <table class="data-table split-table">
                <thead>
                  <tr>
                    <th>订单 / 学员</th>
                    <th>支付流水</th>
                    <th>实付金额</th>
                    <th>商家分账</th>
                    <th>交付成本</th>
                    <th>总部留存</th>
                    <th>冻结金额</th>
                    <th>结算归属</th>
                    <th>链路阶段</th>
                    <th>状态</th>
                    <th class="align-right">下一步</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredTransactionSplits" :key="item.id">
                    <td>
                      <button class="record-link" type="button" @click="toast(`${item.orderNo} 分账链路已定位`)">{{ item.orderNo }}</button>
                      <small class="cell-meta">{{ displaySensitive(item.studentName, 'studentName') }} · {{ item.partner }}</small>
                    </td>
                    <td>{{ displaySensitive(item.transactionNo, 'paymentTransactionNo') }}</td>
                    <td class="amount-cell">{{ displaySensitive(item.paidAmount, 'businessAmount') }}</td>
                    <td>{{ displaySensitive(item.merchantShare, 'settlementAmount') }}</td>
                    <td>
                      {{ displaySensitive(item.deliveryCost, 'settlementAmount') }}
                      <small class="cell-meta">{{ item.deliveryCenter }}</small>
                    </td>
                    <td>{{ displaySensitive(item.hqGross, 'settlementAmount') }}</td>
                    <td :class="{ 'text-danger': item.refundFrozen !== '¥ 0' }">{{ displaySensitive(item.refundFrozen, 'settlementAmount') }}</td>
                    <td>
                      {{ item.settlementBills.length ? item.settlementBills.join(' / ') : '待生成' }}
                      <small class="cell-meta">{{ item.rule }}</small>
                    </td>
                    <td>
                      <div class="chain-stage-list">
                        <span :class="`stage-${chainStageTone(item.paymentCheck)}`">收款 {{ item.paymentCheck }}</span>
                        <span :class="`stage-${chainStageTone(item.allocationCheck)}`">分配 {{ item.allocationCheck }}</span>
                        <span :class="`stage-${chainStageTone(item.splitCheck)}`">拆账 {{ item.splitCheck }}</span>
                        <span :class="`stage-${chainStageTone(item.billCheck)}`">账单 {{ item.billCheck }}</span>
                        <span :class="`stage-${chainStageTone(item.transferCheck)}`">打款 {{ item.transferCheck }}</span>
                      </div>
                      <small v-if="item.blocker !== '--'" class="cell-alert">{{ item.blocker }}</small>
                    </td>
                    <td><span class="status-pill" :class="`status-${statusTone(item.status)}`">{{ item.status }}</span></td>
                    <td class="align-right">
                      <button class="table-action" type="button" @click="toast(item.nextAction)">
                        {{ item.nextAction }}
                        <ChevronRight :size="15" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="content-section list-section">
            <div class="section-heading">
              <div><h2>结算待办</h2><p>优先展示需要确认、核对和打款的账单</p></div>
              <button class="button secondary" type="button" @click="toast('对账规则设置已打开')"><Settings :size="17" />对账规则</button>
            </div>
            <div class="table-wrap">
              <table class="data-table settlement-table">
                <thead>
                  <tr>
                    <th>结算单号</th>
                    <th>合作方</th>
                    <th>账期</th>
                    <th>业务金额</th>
                    <th>应收 / 应付</th>
                    <th>已结 / 差额</th>
                    <th>发票</th>
                    <th>状态</th>
                    <th class="align-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredSettlements" :key="item.id">
                    <td><button class="record-link" type="button" @click="openRecord('settlement', item)">{{ item.billNo }}</button></td>
                    <td>
                      {{ item.partner }}
                      <small class="cell-meta">关联订单 {{ item.relatedOrders }} 单</small>
                    </td>
                    <td>{{ item.period }}</td>
                    <td class="amount-cell">{{ displaySensitive(item.businessAmount, 'businessAmount') }}</td>
                    <td>
                      {{ displaySensitive(item.receivableAmount, 'settlementAmount') }}
                      <small class="cell-meta">
                        应付 {{ displaySensitive(item.payableAmount, 'settlementAmount') }}
                      </small>
                    </td>
                    <td :class="{ 'text-danger': item.diff !== '¥ 0' }">
                      {{ displaySensitive(item.paidAmount, 'settlementAmount') }}
                      <small class="cell-meta">差额 {{ displaySensitive(item.diff, 'settlementAmount') }}</small>
                    </td>
                    <td>
                      {{ item.invoiceStatus }}
                      <small class="cell-meta">{{ item.owner }}</small>
                    </td>
                    <td><span class="status-pill" :class="`status-${statusTone(item.status)}`">{{ item.status }}</span></td>
                    <td class="align-right"><button class="table-action" type="button" @click="openRecord('settlement', item)">核对<ChevronRight :size="15" /></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <section v-else-if="currentRegistryModule" class="view-content registry-view">
          <div class="module-subnav" role="tablist" :aria-label="`${currentRegistryModule.title}子模块`">
            <button
              v-for="submodule in currentRegistryModule.submodules"
              :key="submodule"
              type="button"
              :class="{ active: activeRegistrySubmodule === submodule }"
              @click="activeRegistrySubmodule = submodule"
            >
              {{ submodule }}
            </button>
          </div>

          <div class="registry-summary">
            <button
              v-for="item in currentRegistryModule.summary"
              :key="item.label"
              type="button"
              :class="`summary-${item.tone}`"
              @click="toast(`已查看${item.label}`)"
            >
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <small>{{ item.meta }}</small>
            </button>
          </div>

          <section class="content-section list-section registry-section">
            <div class="list-toolbar registry-toolbar">
              <div class="list-search registry-search">
                <Search :size="18" />
                <input
                  v-model="registrySearch"
                  type="search"
                  :disabled="!currentRegistryContract"
                  :placeholder="currentRegistryContract ? `搜索${activeRegistrySubmodule}` : '完成线上字段核验后开放搜索'"
                />
              </div>
              <button
                class="button secondary"
                type="button"
                :class="{ active: registryFiltersOpen }"
                :disabled="!currentRegistryContract"
                @click="registryFiltersOpen = !registryFiltersOpen"
              >
                <Filter :size="17" />
                筛选
              </button>
              <button
                v-for="action in currentRegistryPageActions"
                :key="action"
                class="button"
                :class="['新增', '录入订单'].includes(action) ? 'primary' : 'secondary'"
                type="button"
                @click="handleRegistryPageAction(action)"
              >
                <Download v-if="action === '导出'" :size="17" />
                {{ action }}
              </button>
              <div class="registry-column-picker">
                <button
                  class="button secondary icon-only"
                  type="button"
                  title="自定义字段"
                  :disabled="!currentRegistryContract"
                  @click="registryFieldPanelOpen = !registryFieldPanelOpen"
                >
                  <Columns3 :size="18" />
                </button>
                <div v-if="registryFieldPanelOpen" class="registry-field-panel">
                  <header>
                    <strong>显示字段</strong>
                    <small>{{ visibleRegistryColumns.length }}/{{ currentRegistryDataset.columns.length }}</small>
                  </header>
                  <label v-for="column in currentRegistryDataset.columns" :key="column.key">
                    <input
                      type="checkbox"
                      :checked="!hiddenRegistryColumns.includes(column.key)"
                      @change="toggleRegistryColumn(column.key)"
                    />
                    <span>{{ column.label }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div v-if="registryFiltersOpen" class="filter-panel registry-filter-panel">
              <label v-for="field in currentRegistryFilterFields" :key="field">
                <span>{{ field }}</span>
                <select
                  v-if="registryFilterOptions(field).length"
                  v-model="registryFilterValues[field]"
                >
                  <option value="">全部{{ field }}</option>
                  <option v-for="option in registryFilterOptions(field)" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <input
                  v-else
                  v-model="registryFilterValues[field]"
                  type="text"
                  :placeholder="`请输入${field}`"
                />
              </label>
              <div class="filter-actions">
                <button class="button ghost" type="button" @click="resetRegistryFilters"><RotateCcw :size="16" />重置</button>
                <button class="button primary" type="button" @click="registryFiltersOpen = false; toast('筛选已应用')">应用筛选</button>
              </div>
            </div>

            <div class="registry-context">
              <span>{{ activeRegistrySubmodule }}</span>
              <small v-if="currentRegistryContract">
                线上字段已核验 · 共 {{ currentRegistryDataset.total }} 条 · {{ currentRegistryDataset.columns.length }} 个业务字段
              </small>
              <small v-else>路由已核验 · 字段、动作和权限等待线上逐项核验</small>
            </div>

            <div v-if="currentRegistryContract" class="table-wrap">
              <table
                class="data-table registry-table"
                :style="{ minWidth: `${Math.max(visibleRegistryColumns.length * 142 + 280, 980)}px` }"
              >
                <thead>
                  <tr>
                    <th v-for="column in visibleRegistryColumns" :key="column.key" :style="{ width: `${column.width}px` }">
                      {{ column.label }}
                    </th>
                    <th class="align-right registry-action-column">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in filteredRegistryRows" :key="record.id">
                    <td
                      v-for="column in visibleRegistryColumns"
                      :key="column.key"
                      :data-label="column.label"
                      :title="String(displayRegistryValue(record, column))"
                    >
                      <span v-if="column.key === 'status'" class="status-pill" :class="`status-${statusTone(record[column.key])}`">
                        {{ record[column.key] || '--' }}
                      </span>
                      <strong
                        v-else-if="
                          ['name', 'orderNo', 'studentName', 'parentName', 'scheduleTitle', 'documentNo', 'billNo', 'student'].includes(
                            column.key
                          )
                        "
                      >
                        {{ displayRegistryValue(record, column) }}
                      </strong>
                      <span v-else>{{ displayRegistryValue(record, column) }}</span>
                    </td>
                    <td class="align-right registry-action-column" data-label="操作">
                      <div class="registry-row-actions">
                        <button
                          v-for="action in registryRowActions(record)"
                          :key="action"
                          class="table-action"
                          type="button"
                          @click="handleRegistryAction(action, record)"
                        >
                          {{ action }}
                          <ChevronRight v-if="action === '详情'" :size="15" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredRegistryRows.length === 0">
                    <td class="registry-empty" :colspan="visibleRegistryColumns.length + 1">没有匹配的数据</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="contract-pending">
              <ShieldCheck :size="24" />
              <div>
                <strong>该页面尚未进入接入清单</strong>
                <small>完成线上字段、筛选、状态、动作和数据范围核验后自动开放。</small>
              </div>
            </div>
            <TableFooter
              v-if="currentRegistryContract"
              :total="scopeAwareTotal(currentRegistryDataset.total, filteredRegistryRows)"
            />
          </section>
        </section>

        <section v-else-if="activeView === 'analytics'" class="view-content">
          <div class="analytics-tabs">
            <button type="button" :class="{ active: analyticsMode === 'delivery' }" @click="analyticsMode = 'delivery'">交付经营</button>
            <button type="button" :class="{ active: analyticsMode === 'market' }" @click="analyticsMode = 'market'">市场经营</button>
          </div>
          <div class="analytics-kpis">
            <div><span>总销售额</span><strong>¥ 1,306,400</strong><small class="positive">较上期 +12.4%</small></div>
            <div><span>交付中订单</span><strong>286</strong><small>异常 4 笔</small></div>
            <div><span>消课金额</span><strong>¥ 486,900</strong><small class="positive">完成率 92%</small></div>
            <div><span>退款金额</span><strong>¥ 27,400</strong><small class="negative">较上期 +3.1%</small></div>
            <div><span>预计利润</span><strong>¥ 318,600</strong><small class="positive">利润率 24.4%</small></div>
          </div>
          <div class="analytics-layout">
            <section class="content-section chart-section">
              <div class="section-heading">
                <div><h2>经营趋势</h2><p>销售额与交付收入</p></div>
                <div class="chart-legend"><span><i class="legend-sales"></i>销售额</span><span><i class="legend-profit"></i>交付收入</span></div>
              </div>
              <svg class="trend-chart" viewBox="0 0 900 330" role="img" aria-label="经营趋势图">
                <defs>
                  <linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#2f6fed" stop-opacity="0.18" />
                    <stop offset="100%" stop-color="#2f6fed" stop-opacity="0.02" />
                  </linearGradient>
                </defs>
                <g class="chart-grid">
                  <line v-for="y in [46, 100, 154, 208, 262]" :key="y" x1="64" x2="880" :y1="y" :y2="y" />
                </g>
                <g class="chart-y-labels">
                  <text x="50" y="52">200w</text><text x="50" y="106">150w</text><text x="50" y="160">100w</text><text x="50" y="214">50w</text><text x="50" y="268">0</text>
                </g>
                <path class="chart-area" d="M64 248 C132 226 170 212 220 220 C274 228 314 194 362 168 C410 142 452 88 510 104 C566 120 596 160 650 146 C706 132 758 90 814 72 C842 64 860 48 880 34 L880 274 L64 274 Z" />
                <path class="chart-line sales-line" d="M64 248 C132 226 170 212 220 220 C274 228 314 194 362 168 C410 142 452 88 510 104 C566 120 596 160 650 146 C706 132 758 90 814 72 C842 64 860 48 880 34" />
                <path class="chart-line profit-line" d="M64 262 C126 246 178 230 224 238 C280 248 318 222 366 202 C414 182 458 134 514 142 C572 150 608 186 654 176 C716 164 762 130 812 116 C844 108 862 94 880 78" />
                <g class="chart-x-labels">
                  <text v-for="(label, index) in chartLabels" :key="label" :x="64 + index * 136" y="310">{{ label }}</text>
                </g>
              </svg>
            </section>
            <section class="content-section ranking-section">
              <div class="section-heading"><div><h2>交付中心排行</h2><p>按本月销售额</p></div></div>
              <div class="ranking-list">
                <div v-for="item in analyticsRank" :key="item.rank">
                  <span class="rank-number" :class="{ top: item.rank <= 3 }">{{ item.rank }}</span>
                  <span><strong>{{ item.name }}</strong><small>{{ item.value }}</small></span>
                  <em :class="{ negative: item.trend.startsWith('-') }">{{ item.trend }}</em>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section v-else class="view-content">
          <section class="content-section system-section">
            <div class="system-hero">
              <span><ShieldCheck :size="28" /></span>
              <div><h2>权限接入基线</h2><p>正式权限以线上角色、菜单、按钮和数据范围配置为准</p></div>
            </div>
            <div class="system-notice">
              <AlertCircle :size="18" />
              <span>
                当前矩阵用于体验层和灰度验收对照，不写入正式授权。未在“线上角色管理”逐项核验前，代码里的权限判断仍默认拒绝。
              </span>
            </div>
            <div class="permission-baseline">
              <div v-for="item in permissionBaseline" :key="item.name">
                <span><component :is="item.icon" :size="18" /></span>
                <strong>{{ item.name }}</strong>
                <small>{{ item.requirement }}</small>
                <em>{{ item.status }}</em>
              </div>
            </div>

            <div class="system-block integration-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>正式接口接入门禁</h2>
                  <p>真实角色、数据范围、接口地址、请求字段和审计回执全部绑定后，才允许关闭演示模式</p>
                </div>
                <span class="contract-status">0/{{ totalWorkflowCommands }} 写接口已绑定</span>
              </div>
              <div class="integration-summary">
                <div>
                  <small>运行身份字段</small>
                  <strong>{{ runtimeIdentityContract.requiredFields.length }}</strong>
                  <span>缺少关键身份时默认拒绝</span>
                </div>
                <div>
                  <small>核心业务流程</small>
                  <strong>{{ workflowApiContracts.length }}</strong>
                  <span>订单、交付、采购、入驻、结算</span>
                </div>
                <div>
                  <small>状态写操作</small>
                  <strong>{{ totalWorkflowCommands }}</strong>
                  <span>均需权限码、版本号与请求 ID</span>
                </div>
                <div>
                  <small>已绑定接口</small>
                  <strong>{{ boundWorkflowCommands }}</strong>
                  <span>当前保持演示模式，不伪造成功</span>
                </div>
              </div>

              <div class="integration-layout">
                <section>
                  <header><strong>登录与权限上下文</strong><small>正式接口必填</small></header>
                  <div class="runtime-context-list">
                    <div v-for="field in runtimeContextFields" :key="field.key">
                      <span><strong>{{ field.label }}</strong><small>{{ field.source }}</small></span>
                      <code>{{ field.key }}</code>
                      <em>{{ field.status }}</em>
                    </div>
                  </div>
                </section>
                <section>
                  <header><strong>流程接口清单</strong><small>列表 + 详情 + 状态动作</small></header>
                  <div class="workflow-api-list">
                    <article v-for="workflow in workflowApiContracts" :key="workflow.key">
                      <div>
                        <strong>{{ workflow.name }}</strong>
                        <small>主键 {{ workflow.identityField }} · {{ workflow.commands.length }} 个写操作</small>
                      </div>
                      <span>{{ workflow.listEndpoint ? '列表已绑定' : '列表待绑定' }}</span>
                      <div class="workflow-command-tags">
                        <em v-for="command in workflow.commands" :key="command.key">
                          {{ command.label }} · {{ command.endpoint ? '已绑定' : '待绑定' }}
                        </em>
                      </div>
                    </article>
                  </div>
                </section>
              </div>

              <div class="integration-guardrails">
                <span v-for="rule in integrationGuardrails" :key="rule.key">
                  <ShieldCheck :size="14" />{{ rule.label }}
                </span>
              </div>
            </div>

            <div class="system-block role-preview-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>当前角色权限预览</h2>
                  <p>切换顶部角色后，菜单、数据范围、字段显示和业务动作同步变化</p>
                </div>
                <span class="contract-status">体验策略 · 待线上核验</span>
              </div>
              <div class="role-preview-summary">
                <div>
                  <small>当前角色</small>
                  <strong>{{ currentRoleAccess.roleName }}</strong>
                  <span>{{ currentRoleAccess.verification }}</span>
                </div>
                <div>
                  <small>默认数据范围</small>
                  <strong>{{ currentRoleAccess.defaultScope }}</strong>
                  <span>{{ currentRoleAccess.scopeDimensions.join('、') }}</span>
                </div>
                <div>
                  <small>可见页面</small>
                  <strong>{{ currentRoleAccess.menuViews.length }}</strong>
                  <span>未授权入口在角色预览中隐藏</span>
                </div>
                <div>
                  <small>允许动作</small>
                  <strong>{{ currentRoleAccess.permissions.length }}</strong>
                  <span>未授权动作保持禁用并阻断提交</span>
                </div>
              </div>
              <div class="permission-action-grid">
                <div
                  v-for="permission in currentRoleActions"
                  :key="permission.key"
                  :class="{ allowed: permission.allowed }"
                >
                  <span><Check v-if="permission.allowed" :size="15" /><X v-else :size="15" /></span>
                  <strong>{{ permission.label }}</strong>
                  <small>{{ permission.group }} · {{ permission.allowed ? '允许' : '拒绝' }}</small>
                </div>
              </div>
            </div>

            <div class="system-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>字段脱敏矩阵</h2>
                  <p>学员姓名对一线操作角色保持完整，支付、证照、金额和供应商按业务用途收敛</p>
                </div>
              </div>
              <div class="masking-current-strip">
                <span v-for="field in currentRoleMasking" :key="field.key">
                  <small>{{ field.label }}</small>
                  <strong :class="`mask-${field.mode}`">{{ maskingModeLabels[field.mode] }}</strong>
                </span>
              </div>
              <div class="table-wrap permission-table-wrap">
                <table class="permission-matrix-table">
                  <thead>
                    <tr>
                      <th>敏感字段</th>
                      <th v-for="role in roleAccessPreviewMatrix" :key="role.roleKey">{{ role.roleName }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="field in sensitiveFieldCatalog" :key="field.key">
                      <td><strong>{{ field.label }}</strong><small>{{ field.category }}</small></td>
                      <td v-for="role in roleAccessPreviewMatrix" :key="role.roleKey">
                        <span :class="`mask-badge mask-${field.policies[role.roleKey]}`">
                          {{ maskingModeLabels[field.policies[role.roleKey]] }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="system-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>数据范围执行矩阵</h2>
                  <p>范围不仅控制下拉选项，同时参与任务列表和台账样例过滤；正式接口无范围时必须返回空数据</p>
                </div>
              </div>
              <div class="scope-contract-grid">
                <article v-for="role in roleAccessPreviewMatrix" :key="role.roleKey">
                  <header>
                    <strong>{{ role.roleName }}</strong>
                    <span>{{ role.defaultScope }}</span>
                  </header>
                  <small>可选范围</small>
                  <p>{{ role.selectableScopes.join('、') }}</p>
                  <small>过滤维度</small>
                  <p>{{ role.scopeDimensions.join('、') }}</p>
                  <em>缺少角色或范围上下文：默认拒绝</em>
                </article>
              </div>
            </div>

            <div class="system-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>待核验角色矩阵</h2>
                  <p>按业务角色展示菜单、动作、数据范围和字段可见性，供研发接权限时逐项确认</p>
                </div>
              </div>
              <div class="access-matrix">
                <article v-for="role in pendingRoleAccessMatrix" :key="role.key">
                  <header>
                    <strong>{{ role.roleName }}</strong>
                    <em>{{ role.verification }}</em>
                  </header>
                  <p>{{ role.scenario }}</p>
                  <dl>
                    <div>
                      <dt>数据范围</dt>
                      <dd>{{ role.dataScope }}</dd>
                    </div>
                    <div>
                      <dt>可见模块</dt>
                      <dd>{{ role.menus.join('、') }}</dd>
                    </div>
                    <div>
                      <dt>高频动作</dt>
                      <dd>{{ role.actions.join('、') }}</dd>
                    </div>
                    <div>
                      <dt>必备字段</dt>
                      <dd>{{ role.requiredFields.join('、') }}</dd>
                    </div>
                    <div>
                      <dt>字段规则</dt>
                      <dd>{{ role.fieldPolicy }}</dd>
                    </div>
                  </dl>
                </article>
              </div>
            </div>

            <div class="system-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>流程状态守卫</h2>
                  <p>每条高频链路必须保留的状态、字段和动作，避免体验改造时删掉业务能力</p>
                </div>
              </div>
              <div class="guardrail-list">
                <article v-for="flow in workflowGuardrails" :key="flow.key">
                  <header>
                    <strong>{{ flow.name }}</strong>
                    <span>{{ flow.ownerRoles.join(' / ') }}</span>
                  </header>
                  <div>
                    <small>状态</small>
                    <p>{{ flow.statuses.join(' → ') }}</p>
                  </div>
                  <div>
                    <small>字段</small>
                    <p>{{ flow.requiredFields.join('、') }}</p>
                  </div>
                  <div>
                    <small>动作</small>
                    <p>{{ flow.criticalActions.join('、') }}</p>
                  </div>
                </article>
              </div>
            </div>

            <div class="system-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>核心业务对象</h2>
                  <p>后续接口接入时必须满足的身份字段、必填字段、允许状态和跨模块关联字段</p>
                </div>
              </div>
              <div class="contract-list">
                <article v-for="entity in businessEntityContracts" :key="entity.key">
                  <header>
                    <strong>{{ entity.name }}</strong>
                    <span>主键：{{ entity.identityField }}</span>
                  </header>
                  <div>
                    <small>必填字段</small>
                    <p>{{ entity.requiredFields.join('、') }}</p>
                  </div>
                  <div>
                    <small>允许状态</small>
                    <p>{{ entity.statuses.join('、') }}</p>
                  </div>
                  <div>
                    <small>关联校验</small>
                    <p>{{ entity.relationKeys.join('、') }}</p>
                  </div>
                </article>
              </div>
            </div>

            <div class="system-block">
              <div class="section-heading compact-heading">
                <div>
                  <h2>数据范围规则</h2>
                  <p>菜单看得见不等于数据都能看，必须同时按组织、交付、商家、教师等边界过滤</p>
                </div>
              </div>
              <div class="data-scope-list">
                <article v-for="rule in dataScopeRules" :key="rule.key">
                  <strong>{{ rule.label }}</strong>
                  <span>{{ rule.appliesTo.join('、') }}</span>
                  <p>{{ rule.boundary }}</p>
                </article>
              </div>
            </div>
          </section>
        </section>
      </main>
    </section>

    <nav class="mobile-bottom-nav" aria-label="移动端主导航">
      <button
        v-for="item in mobileNavItems"
        :key="item.key"
        type="button"
        :class="{ active: activeView === item.key }"
        @click="navigateTo(item.key)"
      >
        <component :is="item.icon" :size="21" />
        <span>{{ item.mobileLabel || item.label }}</span>
        <em v-if="item.badge">{{ item.badge }}</em>
      </button>
      <button type="button" :class="{ active: mobileMoreActive }" @click="mobileNavOpen = true">
        <Menu :size="21" />
        <span>全部</span>
      </button>
    </nav>

    <transition name="drawer">
      <div v-if="drawerRecord" class="drawer-layer">
        <button class="drawer-backdrop" type="button" aria-label="关闭详情" @click="closeDrawer"></button>
        <aside class="detail-drawer">
          <header>
            <div>
              <span class="drawer-eyebrow">{{ drawerMeta.eyebrow }}</span>
              <h2>{{ drawerMeta.title }}</h2>
              <p>{{ drawerMeta.subtitle }}</p>
            </div>
            <button class="icon-button quiet" type="button" title="关闭" @click="closeDrawer"><X :size="20" /></button>
          </header>
          <div class="drawer-body">
            <section class="drawer-status">
              <span class="status-pill" :class="`status-${statusTone(drawerMeta.status)}`">{{ drawerMeta.status }}</span>
              <small>{{ drawerMeta.hint }}</small>
            </section>
            <section class="drawer-section">
              <h3>关键信息</h3>
              <dl>
                <div v-for="item in drawerMeta.details" :key="item.label">
                  <dt>{{ item.label }}</dt><dd>{{ displayDrawerValue(item) }}</dd>
                </div>
              </dl>
            </section>
            <section class="drawer-section">
              <h3>{{ drawerKind === 'partner' ? '资料检查' : drawerKind === 'registry' ? '状态与关联' : '处理进度' }}</h3>
              <div class="drawer-timeline">
                <div v-for="(step, index) in drawerMeta.steps" :key="step.label" :class="{ complete: step.complete, current: step.current }">
                  <span><Check v-if="step.complete" :size="14" /><em v-else>{{ index + 1 }}</em></span>
                  <div><strong>{{ step.label }}</strong><small>{{ step.meta }}</small></div>
                </div>
              </div>
            </section>

            <section v-if="drawerKind === 'order'" class="drawer-section workflow-section">
              <h3>{{ drawerMeta.workflowTitle }}</h3>

              <div v-if="drawerRecord.riskStatus === '支付状态异常'" class="payment-reconcile">
                <div>
                  <span>订单应收</span>
                  <strong>{{ drawerRecord.amount }}</strong>
                  <small>订单状态：{{ drawerRecord.status }}</small>
                </div>
                <ArrowRight :size="18" />
                <div>
                  <span>支付流水</span>
                  <strong>{{ drawerRecord.payment?.amount || drawerRecord.amount }}</strong>
                  <small>{{ drawerRecord.payment?.channel }} · {{ drawerRecord.payment?.paidAt }}</small>
                </div>
              </div>

              <div v-if="drawerRecord.riskStatus === '支付状态异常'" class="choice-grid">
                <button
                  type="button"
                  :class="{ active: workflowForm.orderDecision === 'paid' }"
                  @click="workflowForm.orderDecision = 'paid'"
                >
                  <CheckCircle2 :size="17" />
                  确认已到账
                </button>
                <button
                  type="button"
                  :class="{ active: workflowForm.orderDecision === 'unpaid' }"
                  @click="workflowForm.orderDecision = 'unpaid'"
                >
                  <AlertCircle :size="17" />
                  标记未到账
                </button>
              </div>

              <div
                v-if="
                  (drawerRecord.status === '已支付' && drawerRecord.allocationStatus === '未分配') ||
                  (drawerRecord.riskStatus === '支付状态异常' && workflowForm.orderDecision === 'paid')
                "
                class="workflow-block"
              >
                <div class="workflow-label">选择交付中心</div>
                <div class="selection-list">
                  <button
                    v-for="center in deliveryCenterOptions"
                    :key="center.id"
                    type="button"
                    :class="{ active: workflowForm.centerId === center.id }"
                    @click="workflowForm.centerId = center.id"
                  >
                    <span>
                      <strong>{{ center.name }}</strong>
                      <small>{{ center.capacity }} · {{ center.response }}</small>
                    </span>
                    <em v-if="center.recommended">推荐</em>
                    <CheckCircle2 v-if="workflowForm.centerId === center.id" :size="18" />
                  </button>
                </div>
              </div>

              <div v-if="drawerRecord.status === '待支付' && drawerRecord.riskStatus === '--'" class="workflow-block">
                <div class="workflow-label">提醒方式</div>
                <div class="choice-grid">
                  <button type="button" :class="{ active: workflowForm.reminderChannel === 'sms' }" @click="workflowForm.reminderChannel = 'sms'">短信提醒</button>
                  <button type="button" :class="{ active: workflowForm.reminderChannel === 'merchant' }" @click="workflowForm.reminderChannel = 'merchant'">商家跟进</button>
                </div>
              </div>

              <div v-if="drawerRecord.afterSaleStatus === '退款中'" class="workflow-block">
                <div class="workflow-label">退款处理</div>
                <div class="choice-grid">
                  <button type="button" :class="{ active: workflowForm.refundDecision === 'approve' }" @click="workflowForm.refundDecision = 'approve'">同意退款</button>
                  <button type="button" :class="{ active: workflowForm.refundDecision === 'reject' }" @click="workflowForm.refundDecision = 'reject'">拒绝退款</button>
                </div>
              </div>
            </section>

            <section v-if="drawerKind === 'delivery'" class="drawer-section workflow-section">
              <h3>{{ drawerMeta.workflowTitle }}</h3>

              <div v-if="drawerRecord.status === '待分配'" class="selection-list teacher-list">
                <button
                  v-for="teacher in recommendedTeachers"
                  :key="teacher.id"
                  type="button"
                  :class="{ active: workflowForm.teacherId === teacher.id }"
                  @click="selectTeacher(teacher)"
                >
                  <span class="teacher-score">{{ teacher.match }}%</span>
                  <span>
                    <strong>{{ teacher.name }} · {{ teacher.center }}</strong>
                    <small>评分 {{ teacher.rating }} · {{ teacher.workload }} · 可约 {{ teacher.slots[0] }}</small>
                  </span>
                  <CheckCircle2 v-if="workflowForm.teacherId === teacher.id" :size="18" />
                </button>
              </div>

              <div v-if="['待排课', '时间冲突'].includes(drawerRecord.status)" class="workflow-block">
                <div v-if="drawerRecord.status === '时间冲突'" class="inline-alert">
                  <AlertCircle :size="17" />
                  原时段 {{ drawerRecord.preferredTime }} 已冲突，请选择新的可用时间
                </div>
                <div class="workflow-label">选择上课时间</div>
                <div class="slot-grid">
                  <button
                    v-for="slot in availableScheduleSlots"
                    :key="slot"
                    type="button"
                    :class="{ active: workflowForm.scheduleSlot === slot }"
                    @click="workflowForm.scheduleSlot = slot"
                  >
                    {{ slot }}
                  </button>
                </div>
                <div class="workflow-label">授课方式</div>
                <div class="choice-grid">
                  <button type="button" :class="{ active: workflowForm.classMode === 'online' }" @click="workflowForm.classMode = 'online'">线上授课</button>
                  <button type="button" :class="{ active: workflowForm.classMode === 'offline' }" @click="workflowForm.classMode = 'offline'">线下授课</button>
                </div>
              </div>
            </section>

            <section v-if="drawerKind === 'purchase'" class="drawer-section workflow-section">
              <h3>{{ drawerMeta.workflowTitle }}</h3>
              <div class="payment-reconcile">
                <div>
                  <span>采购金额</span>
                  <strong>{{ drawerRecord.amount }}</strong>
                  <small>已付：{{ drawerRecord.paidAmount }}</small>
                </div>
                <ArrowRight :size="18" />
                <div>
                  <span>付款 / 物流</span>
                  <strong>{{ drawerRecord.paymentStatus }}</strong>
                  <small>{{ drawerRecord.logisticsNo }} · 预计 {{ drawerRecord.expectedAt }}</small>
                </div>
              </div>
              <div class="workflow-block">
                <div class="workflow-label">本次处理</div>
                <div class="choice-grid">
                  <button type="button" class="active">
                    <CheckCircle2 :size="17" />
                    {{ drawerMeta.primaryAction }}
                  </button>
                </div>
              </div>
            </section>

            <section v-if="drawerKind === 'partner' && partnerEditMode" class="drawer-section partner-editor-section">
              <div v-for="section in partnerApplicationFields" :key="section.title" class="partner-form-section">
                <h3>{{ section.title }}</h3>
                <div class="registry-form-grid">
                  <label v-for="field in section.fields" :key="field.key" :class="{ wide: field.type === 'textarea' }">
                    <span>{{ field.label }}<em v-if="field.required">*</em></span>
                    <select
                      v-if="field.type === 'select'"
                      v-model="partnerForm[field.key]"
                      :class="{ invalid: partnerFormErrors[field.key] }"
                    >
                      <option value="">请选择{{ field.label }}</option>
                      <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                    </select>
                    <textarea
                      v-else-if="field.type === 'textarea'"
                      v-model="partnerForm[field.key]"
                      :class="{ invalid: partnerFormErrors[field.key] }"
                      :placeholder="field.placeholder"
                    ></textarea>
                    <input
                      v-else
                      v-model="partnerForm[field.key]"
                      type="text"
                      :class="{ invalid: partnerFormErrors[field.key] }"
                      :placeholder="field.placeholder"
                    />
                    <small v-if="partnerFormErrors[field.key]">{{ partnerFormErrors[field.key] }}</small>
                  </label>
                </div>
              </div>
            </section>

            <section v-if="drawerKind === 'partner' && !partnerEditMode" class="drawer-section workflow-section">
              <h3>审核核验</h3>
              <div class="document-checklist">
                <div v-for="document in workflowForm.documents" :key="document.key">
                  <span>
                    <strong>{{ document.label }}</strong>
                    <small>{{ document.meta }}</small>
                  </span>
                  <div>
                    <button type="button" :class="{ active: document.result === 'pass' }" @click="document.result = 'pass'">通过</button>
                    <button type="button" :class="{ warning: document.result === 'supplement' }" @click="document.result = 'supplement'">需补充</button>
                  </div>
                </div>
              </div>
              <label class="workflow-field">
                <span>风险等级</span>
                <select v-model="workflowForm.partnerRisk">
                  <option value="低">低风险</option>
                  <option value="中">中风险</option>
                  <option value="高">高风险</option>
                </select>
              </label>
            </section>

            <section v-if="drawerKind === 'registry' && registryEditMode" class="drawer-section registry-editor-section">
              <h3>{{ drawerRecord._isNew ? '新增数据' : '编辑数据' }}</h3>
              <div class="registry-form-grid">
                <label v-for="column in registryEditorColumns" :key="column.key">
                  <span>{{ column.label }}</span>
                  <select
                    v-if="registryEditorOptions(column).length"
                    v-model="registryForm[column.key]"
                    :class="{ invalid: registryFormErrors[column.key] }"
                  >
                    <option value="">请选择{{ column.label }}</option>
                    <option v-for="option in registryEditorOptions(column)" :key="option" :value="option">{{ option }}</option>
                  </select>
                  <input
                    v-else
                    v-model="registryForm[column.key]"
                    type="text"
                    :class="{ invalid: registryFormErrors[column.key] }"
                    :placeholder="`请输入${column.label}`"
                  />
                  <small v-if="registryFormErrors[column.key]">{{ registryFormErrors[column.key] }}</small>
                </label>
              </div>
            </section>

            <section v-if="drawerRecord.history?.length" class="drawer-section">
              <h3>操作记录</h3>
              <div class="activity-list">
                <div v-for="(activity, index) in drawerRecord.history" :key="`${activity.time}-${index}`">
                  <span></span>
                  <div>
                    <strong>{{ activity.title }}</strong>
                    <small>{{ activity.time }} · {{ activity.detail }}</small>
                  </div>
                </div>
              </div>
            </section>

            <section class="drawer-section note-section">
              <h3>处理备注</h3>
              <textarea v-model="drawerNote" :placeholder="drawerKind === 'partner' ? '退回补充时请填写具体原因' : '补充本次处理说明'"></textarea>
            </section>
          </div>
          <footer>
            <span v-if="currentWorkflowCommand" class="integration-mode-hint">
              <AlertCircle :size="14" />
              {{ runtimeMode.isPreview ? `演示写入 · ${currentWorkflowCommand.reason}` : '正式写入已锁定 · 接口适配未完成' }}
            </span>
            <button class="button secondary" type="button" @click="closeDrawer">关闭</button>
            <button
              v-if="drawerKind === 'partner'"
              class="button warning"
              type="button"
              v-show="!partnerEditMode"
              :disabled="!runtimeMode.isPreview || !canPreviewPermission('partner.review')"
              @click="returnPartner"
            >
              退回补充
            </button>
            <button
              class="button primary"
              type="button"
              :disabled="primaryActionDisabled || !currentDrawerActionAllowed"
              :title="currentDrawerActionTitle"
              @click="completeDrawerAction"
            >
              <CheckCircle2 :size="17" />
              {{ drawerMeta.primaryAction }}
            </button>
          </footer>
        </aside>
      </div>
    </transition>

    <transition name="toast">
      <div v-if="toastMessage" class="toast-message" role="status" aria-live="polite">
        <CheckCircle2 :size="18" />
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bookmark,
  Building2,
  CalendarDays,
  ChartLine,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Columns3,
  Download,
  Filter,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  UserRound,
  WalletCards,
  X
} from '@lucide/vue'
import { moduleByView, moduleCatalog, submoduleDatasets } from './module-registry'
import { businessEntityContracts, dataScopeRules } from './business-contract'
import { runtimeMode } from './runtime-config'
import {
  commandBindingStatus,
  integrationGuardrails,
  runtimeContextFields,
  runtimeIdentityContract,
  workflowApiContracts
} from './integration-contract'
import { verifiedPageContracts } from './online-system-baseline'
import {
  fieldMaskingDecision,
  maskingModeLabels,
  pendingRoleAccessMatrix,
  permissionActionCatalog,
  permissionAuditDimensions,
  previewPermissionDecision,
  roleAccessPreviewMatrix,
  sensitiveFieldCatalog,
  workflowGuardrails
} from './permission-baseline'
import {
  analyticsRank,
  deliveryCenterOptions,
  deliverySeed,
  exceptions,
  flowStages,
  ordersSeed,
  partnerSeed,
  purchaseSeed,
  roles,
  roleStats,
  settlementSeed,
  teacherOptions,
  transactionSplitSeed,
  workbenchTasks
} from './prototype-data'

const TableFooter = defineComponent({
  props: {
    total: { type: Number, required: true }
  },
  setup(props) {
    return () =>
      h('div', { class: 'table-footer' }, [
        h('span', `共 ${props.total} 条`),
        h('div', { class: 'pagination' }, [
          h('button', { type: 'button', disabled: true }, '‹'),
          h('button', { type: 'button', class: 'active' }, '1'),
          h('button', { type: 'button' }, '2'),
          h('button', { type: 'button' }, '3'),
          h('span', '…'),
          h('button', { type: 'button' }, '›')
        ]),
        h('select', [h('option', '50 条/页'), h('option', '20 条/页'), h('option', '100 条/页')])
      ])
  }
})

const moduleIconMap = {
  masterdata: Columns3,
  partnerCenter: Handshake,
  learning: GraduationCap,
  onlineOrders: ShoppingBag,
  offlineOrders: ShoppingBag,
  onlinePurchase: WalletCards,
  offlinePurchase: WalletCards,
  financeReports: WalletCards,
  investment: Building2,
  marketing: ChartLine,
  growth: Building2,
  wechat: Bell,
  systemAdmin: Settings
}

const registryContractPaths = {
  masterdata: {
    教材管理: '/masterdata/textbook',
    课程管理: '/masterdata/course',
    知识点管理: '/masterData/knowledge_point',
    学科商品: '/courseProduct',
    商品套餐: '/product',
    家长管理: '/parent',
    学员管理: '/masterdata/student',
    学情管理: '/masterdata/studentLearning'
  },
  partnerCenter: {
    交付中心: '/partnerCenter/deliveryCenter',
    线上加盟: '/partnerCenter/partner',
    合约管理: '/partnerCenter/contract',
    提成奖励: '/partnerCenter/reward',
    交付层级: '/deliveryCenterTree',
    运营层级: '/operationTree',
    入驻申请: '/partnerCenter/onboarding'
  },
  learning: {
    体验课管理: '/learningCenter/trialClass',
    体验课排课: '/learningCenter/trialTeacherSchedule',
    正式课管理: '/learningCenter/student',
    教师排课: '/learningCenter/teacherSchedule',
    排课记录: '/learningCenter/scheduleList',
    消课管理: '/learningCenter/consume',
    学生课程: '/studentCourse',
    部门管理: '/learningCenter/department',
    班级管理: '/learningCenter/deliveryClass',
    教师管理: '/learningCenter/teacher',
    我的学员: '/learningCenter/myStudent/'
  },
  onlineOrders: {
    订单查询: '/order/table',
    退货管理: '/order/return',
    特殊订单: '/order/special/table'
  },
  offlineOrders: {
    订单查询: '/offline/order/table',
    退货管理: '/offline/order/refund'
  },
  onlinePurchase: {
    销售单: '/purchase/supplier',
    采购单: '/purchase/order',
    销售退货: '/purchase/purchaseReturn',
    采购退供: '/purchase/purchaseReturnSupplier'
  },
  offlinePurchase: {
    采购管理: '/offline/purchase/table',
    销售单: '/offline/purchase/supplier',
    销售退货: '/offline/purchase/purchaseReturn',
    采购退供: '/offlinePurchase/purchaseReturnSupplier'
  },
  financeReports: {
    海南返点: '/settlement/offlineRebateFee',
    应收账单: '/settlement/receiverBill',
    应付账单: '/settlement/payeeBill',
    线上推荐费: '/settlement/recommendationFeeDetail',
    线上年度奖: '/settlement/recommendationCourseDetail',
    线下推荐费: '/settlement/offlineRecommendationFee',
    线下年度奖: '/settlement/offlineAccountUsageFee',
    采购收入明细: '/settlement/purchaseDetail'
  },
  investment: {
    招商公司管理: '/investmentCompany/company',
    合作方管理: '/investmentCompany/dealer'
  },
  marketing: {
    渠道管理: '/channel',
    二维码管理: '/qrcode',
    渠道统计: '/channelReport/summary',
    渠道明细: '/channelReport/detail'
  },
  growth: {
    成长中心加盟: '/growth',
    AI成长中心分布: '/growth/mapDashboard'
  },
  wechat: {
    自定义菜单: '/wechat/menu',
    关键字自动回复: '/wechat/reply',
    永久素材: '/wechat/material'
  },
  systemAdmin: {
    用户管理: '/system/user',
    菜单管理: '/system/menu',
    角色管理: '/system/role',
    应用管理: '/system/application'
  }
}

const moduleNavItems = moduleCatalog.map((module) => ({
  key: module.view,
  label: module.title,
  icon: moduleIconMap[module.key],
  badge: null
}))

const navGroups = [
  {
    label: '工作',
    items: [{ key: 'workbench', label: '工作台', icon: LayoutDashboard, badge: null }]
  },
  {
    label: '核心任务',
    items: [
      { key: 'orders', label: '订单任务', icon: ShoppingBag, badge: 12 },
      { key: 'delivery', label: '交付任务', icon: GraduationCap, badge: 28 },
      { key: 'purchase', label: '采购任务', icon: WalletCards, badge: 6 },
      { key: 'partners', label: '入驻审核', icon: Handshake, badge: 6 },
      { key: 'finance', label: '结算任务', icon: WalletCards, badge: 3 }
    ]
  },
  {
    label: '业务台账',
    items: moduleNavItems.filter((item) => ['基础管理', '合作中心', '学习中心'].includes(item.label))
  },
  {
    label: '交易台账',
    items: moduleNavItems.filter((item) => ['线上订单', '线下订单', '线上采购', '线下采购'].includes(item.label))
  },
  {
    label: '经营管理',
    items: moduleNavItems.filter((item) => ['财务报表', '招商管理', '营销中心', '成长中心', '微信服务号'].includes(item.label))
  },
  {
    label: '分析与系统',
    items: [
      { key: 'analytics', label: '经营分析', icon: ChartLine, badge: null },
      ...moduleNavItems.filter((item) => item.label === '系统管理'),
      { key: 'system', label: '系统设置', icon: Settings, badge: null }
    ]
  }
]

const pageMap = {
  workbench: { group: '工作', title: '工作台', description: '聚焦今天要完成的任务和需要人工介入的异常' },
  orders: { group: '核心业务', title: '订单处理', description: '按状态处理订单、支付、履约和售后事项' },
  delivery: { group: '核心业务', title: '交付履约', description: '统一管理学员分配、排课、上课和续课进度' },
  purchase: { group: '核心业务', title: '采购履约', description: '集中处理采购付款、发货、退供和到货确认事项' },
  partners: { group: '核心业务', title: '合作伙伴审核', description: '集中处理入驻资料、证照风险和审核进度' },
  finance: { group: '核心业务', title: '财务结算', description: '优先处理待确认、存在差额和待打款账单' },
  analytics: { group: '分析与管理', title: '经营分析', description: '从结果指标追踪订单、交付和利润变化' },
  system: { group: '分析与管理', title: '系统设置', description: '按角色配置菜单、数据范围和操作权限' }
}

const taskTabs = [
  { key: 'pending', label: '待我处理' },
  { key: 'urgent', label: '紧急' },
  { key: 'all', label: '全部' }
]

const permissionIcons = {
  menu: Columns3,
  action: ShieldCheck,
  dataScope: Building2,
  masking: UserRound
}

const permissionBaseline = permissionAuditDimensions.map((item) => ({
  ...item,
  status: '待线上核验',
  icon: permissionIcons[item.key]
}))

const orderTabs = [
  { key: 'pending', label: '待处理', value: 12, meta: '4 条异常' },
  { key: 'payment', label: '待支付', value: 5, meta: '合计 ¥ 18,400' },
  { key: 'delivery', label: '交付中', value: 286, meta: '今天新增 24' },
  { key: 'refund', label: '售后中', value: 7, meta: '2 条超时' },
  { key: 'all', label: '全部订单', value: 2335, meta: '近 30 天' }
]

const deliveryTabs = [
  { key: 'pending', label: '待分配', value: 18, meta: '3 人临近超时' },
  { key: 'schedule', label: '待排课', value: 10, meta: '今天需完成' },
  { key: 'active', label: '交付中', value: 286, meta: '异常 2 人' },
  { key: 'renewal', label: '待续课', value: 14, meta: '7 天内到期' }
]

const purchaseTabs = [
  { key: 'pending', label: '待处理', value: 6, meta: '2 条临近超时' },
  { key: 'payment', label: '待付款', value: 2, meta: '合计 ¥ 32,000' },
  { key: 'logistics', label: '物流履约', value: 3, meta: '1 条待发货' },
  { key: 'refund', label: '退供售后', value: 1, meta: '待确认退款' },
  { key: 'all', label: '全部采购', value: 642, meta: '线上+线下' }
]

const partnerTabs = [
  { key: 'pending', label: '待审核' },
  { key: 'risk', label: '有风险' },
  { key: 'all', label: '全部申请' }
]

const partnerApplicationFields = [
  {
    title: '基础信息',
    fields: [
      { key: 'mobile', label: '手机号', required: true, placeholder: '请输入手机号' },
      { key: 'contact', label: '姓名', required: true, placeholder: '请输入姓名' },
      { key: 'idCardNo', label: '身份证号', placeholder: '请输入身份证号' },
      { key: 'status', label: '状态', type: 'select', options: ['启用', '停用', '草稿', '待初审', '待补充', '复审中', '已通过'], required: true },
      { key: 'region', label: '所在地区', required: true, placeholder: '请选择省 / 市 / 区' },
      { key: 'dealerLevel', label: '经销商等级', type: 'select', options: ['推广达人', '经销商(13万)', '海南经销商(39万)', '城市合伙人'] },
      { key: 'accountBinding', label: '绑定登录账号', placeholder: '默认与手机号一致，可修改' },
      { key: 'address', label: '居住/通讯地址', placeholder: '请输入居住/通讯地址' }
    ]
  },
  {
    title: '业务配置',
    fields: [
      { key: 'hainanDealer', label: '是否海南经销商(39万)', type: 'select', options: ['否', '是'] },
      { key: 'contactMobile', label: '联系人电话', required: true, placeholder: '请输入联系人电话' },
      { key: 'plannerRequirement', label: '是否需要规划师', type: 'select', options: ['需要', '不需要', '手动选择'], required: true },
      { key: 'wechatNoticeMobiles', label: '微信通知手机号', placeholder: '多个手机号用逗号或空格分隔' },
      { key: 'deliveryCenter', label: '交付中心', placeholder: '请选择交付中心' },
      { key: 'forcedDeliveryCenter', label: '强制交付中心', type: 'select', options: ['否', '是'] }
    ]
  },
  {
    title: '合作关系',
    fields: [
      { key: 'investmentCompany', label: '招商公司', placeholder: '请选择招商公司' },
      { key: 'referrerCompany', label: '推荐人公司', placeholder: '请选择推荐人公司' },
      { key: 'parentInfo', label: '上级信息', placeholder: '请输入上级信息' },
      { key: 'contractStart', label: '合约开始日期', required: true, placeholder: '开始日期' },
      { key: 'contractEnd', label: '合约结束日期', required: true, placeholder: '结束日期' },
      { key: 'unionpayAccount', label: '银联B2B资管账号', placeholder: '请输入银联B2B资管账号' }
    ]
  },
  {
    title: '资料附件',
    fields: [
      { key: 'licenseNo', label: '营业执照号', required: true, placeholder: '请输入营业执照号' },
      { key: 'licenseExpiresAt', label: '证照有效期', required: true, placeholder: 'YYYY-MM-DD' },
      { key: 'businessLicenseFile', label: '营业执照', required: true, placeholder: '上传文件名称或编号' },
      { key: 'contractAttachment', label: '合同附件', placeholder: '上传文件名称或编号' },
      { key: 'remark', label: '备注', type: 'textarea', placeholder: '请输入备注' }
    ]
  }
]

const chartLabels = ['6.21', '6.22', '6.23', '6.24', '6.25', '6.26', '6.27']

const activeView = ref('workbench')
const activeRole = ref('operations')
const activeScope = ref('总部运营层级')
const activeTaskTab = ref('pending')
const activeOrderTab = ref('pending')
const activeDeliveryTab = ref('pending')
const activePurchaseTab = ref('pending')
const activePartnerTab = ref('pending')
const analyticsMode = ref('delivery')
const sidebarCollapsed = ref(false)
const mobileNavOpen = ref(false)
const appContentRef = ref(null)
const globalSearchInput = ref(null)
const scopeOpen = ref(false)
const searchFocused = ref(false)
const globalSearch = ref('')
const listSearch = ref('')
const filtersOpen = ref(false)
const orderFilterState = ref(createDefaultOrderFilters())
const selectedRows = ref([])
const activeRegistrySubmodule = ref('')
const registrySearch = ref('')
const registryFiltersOpen = ref(false)
const registryStatus = ref('全部状态')
const registryFilterValues = ref({})
const registryFieldPanelOpen = ref(false)
const hiddenRegistryColumns = ref([])
const registryDatasets = ref(createRegistryDatasets())
const registryEditMode = ref(false)
const registryForm = ref({})
const registryFormErrors = ref({})
const partnerEditMode = ref(false)
const partnerForm = ref({})
const partnerFormErrors = ref({})
const drawerRecord = ref(null)
const drawerKind = ref('')
const drawerNote = ref('')
const workflowForm = ref(createEmptyWorkflowForm())
const toastMessage = ref('')
const orders = ref(ordersSeed.map((item) => ({ ...item })))
const deliveryItems = ref(deliverySeed.map((item) => ({ ...item })))
const partners = ref(partnerSeed.map((item) => ({ ...item })))
const purchases = ref(purchaseSeed.map((item) => ({ ...item })))
const settlements = ref(settlementSeed.map((item) => ({ ...item })))
const transactionSplits = ref(transactionSplitSeed.map((item) => ({ ...item })))
const tasks = ref(workbenchTasks.map((item) => ({ ...item })))

let toastTimer

function handleGlobalKeydown(event) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    globalSearchInput.value?.focus()
    searchFocused.value = true
    return
  }
  if (event.key !== 'Escape') return
  if (drawerRecord.value) closeDrawer()
  mobileNavOpen.value = false
  scopeOpen.value = false
  searchFocused.value = false
  registryFieldPanelOpen.value = false
}

onMounted(() => window.addEventListener('keydown', handleGlobalKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
  window.clearTimeout(toastTimer)
})

const currentRoleAccess = computed(
  () => roleAccessPreviewMatrix.find((role) => role.roleKey === activeRole.value) || roleAccessPreviewMatrix[0]
)
const currentRoleDefinition = computed(
  () => roles.find((role) => role.key === activeRole.value) || roles[0]
)
const currentRoleProfile = computed(
  () =>
    pendingRoleAccessMatrix.find(
      (role) => role.key === currentRoleAccess.value.contractKey || role.key === activeRole.value
    ) || pendingRoleAccessMatrix[0]
)
const availableScopes = computed(() => currentRoleAccess.value.selectableScopes)
const visibleNavGroups = computed(() =>
  navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => currentRoleAccess.value.menuViews.includes(item.key))
    }))
    .filter((group) => group.items.length)
)
const mobileNavItems = computed(() => {
  const visibleItems = visibleNavGroups.value.flatMap((group) => group.items)
  const preferredKeys = ['workbench', 'orders', 'delivery', 'purchase', 'partners', 'finance']
  return preferredKeys
    .map((key) => visibleItems.find((item) => item.key === key))
    .filter(Boolean)
    .slice(0, 4)
    .map((item) => ({
      ...item,
      mobileLabel:
        {
          workbench: '首页',
          orders: '订单',
          delivery: '交付',
          purchase: '采购',
          partners: '审核',
          finance: '结算'
        }[item.key] || item.label
    }))
})
const mobileMoreActive = computed(() => !mobileNavItems.value.some((item) => item.key === activeView.value))
const currentRoleActions = computed(() =>
  permissionActionCatalog.map((permission) => ({
    ...permission,
    allowed: previewPermissionDecision(activeRole.value, permission.key).allowed
  }))
)
const currentRoleMasking = computed(() =>
  sensitiveFieldCatalog.map((field) => ({
    ...field,
    mode: field.policies[activeRole.value]
  }))
)
const totalWorkflowCommands = computed(() =>
  workflowApiContracts.reduce((total, workflow) => total + workflow.commands.length, 0)
)
const boundWorkflowCommands = computed(() =>
  workflowApiContracts.reduce(
    (total, workflow) => total + workflow.commands.filter((command) => Boolean(command.endpoint)).length,
    0
  )
)

const currentRegistryModule = computed(() => moduleByView[activeView.value] || null)
const currentRegistryDataset = computed(() => {
  if (!currentRegistryModule.value) return { columns: [], rows: [], total: 0 }
  return (
    registryDatasets.value[currentRegistryModule.value.key]?.[activeRegistrySubmodule.value] || {
      columns: currentRegistryModule.value.columns,
      rows: currentRegistryModule.value.rows,
      total: currentRegistryModule.value.total
    }
  )
})
const currentRegistryContract = computed(() => {
  const moduleKey = currentRegistryModule.value?.key
  const path = registryContractPaths[moduleKey]?.[activeRegistrySubmodule.value]
  return path ? verifiedPageContracts[path] : null
})
const currentRegistryFilterFields = computed(() => currentRegistryContract.value?.filters || ['状态'])
const currentRegistryPageActions = computed(() =>
  (currentRegistryContract.value?.pageActions || []).filter(
    (action) =>
      !['列高设置', '列设置'].includes(action) &&
      canPreviewPermission(action === '导出' ? 'registry.export' : 'registry.edit')
  )
)
const currentPage = computed(() => {
  if (currentRegistryModule.value) {
    return {
      group: currentRegistryModule.value.group,
      title: currentRegistryModule.value.title,
      description: currentRegistryModule.value.description
    }
  }
  return pageMap[activeView.value]
})
const currentStats = computed(() =>
  roleStats[activeRole.value].filter((stat) => currentRoleAccess.value.menuViews.includes(stat.view))
)
const visibleTasks = computed(() => {
  const scopedTasks = tasks.value.filter(
    (task) =>
      currentRoleAccess.value.menuViews.includes(task.view) &&
      (!task.roleKeys || task.roleKeys.includes(activeRole.value))
  )
  if (activeTaskTab.value === 'urgent') {
    return scopedTasks.filter((task) => ['紧急', '高'].includes(task.priority) && task.status !== '已完成')
  }
  if (activeTaskTab.value === 'pending') return scopedTasks.filter((task) => task.status !== '已完成')
  return scopedTasks
})
const currentExceptions = computed(() =>
  exceptions.filter(
    (item) =>
      currentRoleAccess.value.menuViews.includes(item.view) &&
      (!item.roleKeys || item.roleKeys.includes(activeRole.value))
  )
)

const filteredOrders = computed(() => {
  const query = listSearch.value.trim().toLowerCase()
  return orders.value.filter((order) => {
    const matchesQuery =
      !query ||
      `${order.orderNo}${order.studentName}${order.parentName}${order.parentMobile}${order.courseName}`.toLowerCase().includes(query)
    if (!matchesQuery) return false
    if (!matchesActiveScope('order', order)) return false
    const filters = orderFilterState.value
    if (filters.deliveryScope && order.deliveryCenter !== filters.deliveryScope) return false
    if (filters.orderNo && !order.orderNo.toLowerCase().includes(filters.orderNo.trim().toLowerCase())) return false
    if (filters.status && order.status !== filters.status) return false
    if (filters.plannerRequirement && order.plannerRequirement !== filters.plannerRequirement) return false
    if (filters.source && order.source !== filters.source) return false
    if (filters.platform && order.platform !== filters.platform) return false
    if (filters.orderMethod && order.orderMethod !== filters.orderMethod) return false
    if (filters.parentName && !order.parentName.includes(filters.parentName.trim())) return false
    if (filters.courseType && order.courseType !== filters.courseType) return false
    if (filters.studentName && !order.studentName.includes(filters.studentName.trim())) return false
    if (filters.allocationStatus && order.allocationStatus !== filters.allocationStatus) return false
    if (filters.hasPad && order.hasPad !== filters.hasPad) return false
    if (activeOrderTab.value === 'payment') return order.status === '待支付'
    if (activeOrderTab.value === 'delivery') {
      return order.status === '已支付' && order.allocationStatus === '已分配' && order.afterSaleStatus === '--'
    }
    if (activeOrderTab.value === 'refund') return order.afterSaleStatus !== '--'
    if (activeOrderTab.value === 'pending') {
      return (
        order.riskStatus !== '--' ||
        order.status === '待支付' ||
        order.allocationStatus === '未分配' ||
        order.afterSaleStatus !== '--'
      )
    }
    return true
  })
})

const orderActiveFilterCount = computed(() =>
  Object.values(orderFilterState.value).filter((value) => String(value).trim()).length
)

const filteredDelivery = computed(() => {
  const query = listSearch.value.trim().toLowerCase()
  return deliveryItems.value.filter((item) => {
    const matchesQuery = !query || `${item.student}${item.mobile}${item.subject}${item.grade}`.toLowerCase().includes(query)
    if (!matchesQuery) return false
    if (!matchesActiveScope('delivery', item)) return false
    if (activeDeliveryTab.value === 'pending') return ['待分配', '时间冲突'].includes(item.status)
    if (activeDeliveryTab.value === 'schedule') return item.status === '待排课'
    if (activeDeliveryTab.value === 'active') return ['交付中', '待评价'].includes(item.status)
    if (activeDeliveryTab.value === 'renewal') return item.status === '待续课'
    return true
  })
})

const filteredPurchases = computed(() => {
  const query = listSearch.value.trim().toLowerCase()
  return purchases.value.filter((item) => {
    const matchesQuery =
      !query ||
      `${item.purchaseNo}${item.relatedOrder}${item.studentName}${item.parentName}${item.merchant}${item.supplier}${item.product}`
        .toLowerCase()
        .includes(query)
    if (!matchesQuery) return false
    if (!matchesActiveScope('purchase', item)) return false
    if (activePurchaseTab.value === 'payment') return item.status === '待付款' || item.paymentStatus.includes('待')
    if (activePurchaseTab.value === 'logistics') return ['待发货', '运输中'].includes(item.status)
    if (activePurchaseTab.value === 'refund') return item.purchaseType.includes('退供') || item.status.includes('退供')
    if (activePurchaseTab.value === 'pending') return !['已到货', '已退供'].includes(item.status)
    return true
  })
})

const filteredPartners = computed(() => {
  const query = listSearch.value.trim().toLowerCase()
  return partners.value.filter((item) => {
    const matchesQuery = !query || `${item.company}${item.contact}${item.region}`.toLowerCase().includes(query)
    if (!matchesQuery) return false
    if (!matchesActiveScope('partner', item)) return false
    if (activePartnerTab.value === 'pending') return !['已通过'].includes(item.status)
    if (activePartnerTab.value === 'risk') return item.risk !== '低'
    return true
  })
})

const allVisibleSelected = computed(
  () => filteredOrders.value.length > 0 && filteredOrders.value.every((item) => selectedRows.value.includes(item.id))
)

const filteredSettlements = computed(() =>
  settlements.value.filter((item) => matchesActiveScope('settlement', item))
)

const filteredTransactionSplits = computed(() =>
  transactionSplits.value.filter((item) => matchesActiveScope('settlementSplit', item))
)

const splitAuditSummary = computed(() => {
  const rows = filteredTransactionSplits.value
  return rows.reduce(
    (summary, item) => {
      summary.total += parseCurrency(item.paidAmount)
      summary.diff += Math.abs(parseCurrency(item.auditDiff))
      if (item.status === '已核对') summary.checked += 1
      else summary.pending += 1
      return summary
    },
    { checked: 0, pending: 0, total: 0, diff: 0 }
  )
})

const registryStatuses = computed(() => {
  return [...new Set(currentRegistryDataset.value.rows.map((row) => row.status).filter(Boolean))]
})

const visibleRegistryColumns = computed(() => {
  return currentRegistryDataset.value.columns.filter((column) => !hiddenRegistryColumns.value.includes(column.key))
})

const registryEditorColumns = computed(() => drawerRecord.value?._columns || currentRegistryDataset.value.columns)

const filteredRegistryRows = computed(() => {
  const query = registrySearch.value.trim().toLowerCase()
  return currentRegistryDataset.value.rows
    .map((row) => ({ ...row, businessType: activeRegistrySubmodule.value }))
    .filter((row) => {
      const matchesQuery = !query || Object.values(row).join('').toLowerCase().includes(query)
      const matchesScope = matchesActiveScope('registry', row)
      const matchesFilters = Object.entries(registryFilterValues.value).every(([field, selectedValue]) => {
        const value = String(selectedValue || '').trim()
        if (!value) return true
        return registryRecordFilterValue(row, field).toLowerCase().includes(value.toLowerCase())
      })
      return matchesQuery && matchesScope && matchesFilters
    })
})

const globalResults = computed(() => {
  const query = globalSearch.value.trim().toLowerCase()
  if (query.length < 2) return []
  const orderResults = orders.value.map((record) => ({
    kind: 'order',
    view: 'orders',
    record,
    icon: ShoppingBag,
    tone: 'blue',
    title: record.orderNo,
    meta: `${displaySensitive(record.studentName, 'studentName')} · 家长 ${displaySensitive(
      record.parentName,
      'parentName'
    )} · ${record.courseName}`
  }))
  const deliveryResults = deliveryItems.value.map((record) => ({
    kind: 'delivery',
    view: 'delivery',
    record,
    icon: GraduationCap,
    tone: 'cyan',
    title: `${displaySensitive(record.studentName || record.student, 'studentName')} · ${record.subject}`,
    meta: `${record.grade} · ${record.status}`
  }))
  const partnerResults = partners.value.map((record) => ({
    kind: 'partner',
    view: 'partners',
    record,
    icon: Handshake,
    tone: 'amber',
    title: record.company,
    meta: `${record.region} · ${record.status}`
  }))
  const purchaseResults = purchases.value.map((record) => ({
    kind: 'purchase',
    view: 'purchase',
    record,
    icon: WalletCards,
    tone: 'amber',
    title: record.purchaseNo,
    meta: `${record.product} · ${record.supplier} · ${record.status}`
  }))
  const registryResults = Object.entries(registryContractPaths).flatMap(([moduleKey, submodules]) => {
    const module = moduleCatalog.find((item) => item.key === moduleKey)
    if (!module) return []
    return Object.entries(submodules).flatMap(([submodule, path]) => {
      if (!verifiedPageContracts[path]) return []
      const dataset = registryDatasets.value[moduleKey]?.[submodule] || {
        columns: module.columns,
        rows: module.rows
      }
      return dataset.rows.map((record) => ({
        kind: 'registry',
        view: module.view,
        record: {
          ...record,
          businessType: submodule,
          _moduleTitle: module.title,
          _submodule: submodule,
          _columns: dataset.columns,
          history: []
        },
        icon: moduleIconMap[module.key],
        tone: 'blue',
        title:
          record.name ||
          record.orderNo ||
          record.studentName ||
          record.parentName ||
          record.scheduleTitle ||
          record.documentNo ||
          record.billNo ||
          record.student ||
          record.code ||
          record.account,
        meta: `${module.title} · ${record.status || '正常'}`
      }))
    })
  })
  return [...orderResults, ...deliveryResults, ...purchaseResults, ...partnerResults, ...registryResults]
    .filter((item) => currentRoleAccess.value.menuViews.includes(item.view))
    .filter((item) => `${item.title}${item.meta}`.toLowerCase().includes(query))
    .slice(0, 6)
})

const recommendedTeachers = computed(() => {
  const record = drawerRecord.value
  if (!record || drawerKind.value !== 'delivery') return []
  const subjectMatches = teacherOptions.filter((teacher) => teacher.subject === record.subject)
  return (subjectMatches.length ? subjectMatches : teacherOptions).slice(0, 3)
})

const availableScheduleSlots = computed(() => {
  const selectedTeacher = teacherOptions.find((teacher) => teacher.id === workflowForm.value.teacherId)
  if (selectedTeacher) return selectedTeacher.slots
  const subjectTeacher = teacherOptions.find((teacher) => teacher.subject === drawerRecord.value?.subject)
  if (subjectTeacher) return subjectTeacher.slots
  return ['今天 16:00', '明天 10:00', '明天 14:00']
})

const currentDrawerPermission = computed(() => {
  if (drawerKind.value === 'order') {
    return drawerRecord.value?.afterSaleStatus === '退款中' ? 'orders.refund' : 'orders.handle'
  }
  if (drawerKind.value === 'delivery') {
    if (['待分配'].includes(drawerRecord.value?.status)) return 'delivery.assign'
    if (['待排课', '时间冲突'].includes(drawerRecord.value?.status)) return 'delivery.schedule'
    return 'delivery.consume'
  }
  if (drawerKind.value === 'purchase') return 'purchase.handle'
  if (drawerKind.value === 'partner') return 'partner.review'
  if (drawerKind.value === 'registry') return 'registry.edit'
  return 'finance.handle'
})
const currentWorkflowCommand = computed(() => {
  const record = drawerRecord.value
  if (!record || drawerKind.value === 'registry') return null

  let flowKey = drawerKind.value
  let commandKey

  if (drawerKind.value === 'order') {
    if (record.afterSaleStatus === '退款中') commandKey = 'reviewRefund'
    else if (record.riskStatus === '支付状态异常') commandKey = 'confirmPayment'
    else if (record.status === '待支付') commandKey = 'sendPaymentReminder'
    else commandKey = 'allocateDeliveryCenter'
  } else if (drawerKind.value === 'delivery') {
    if (record.status === '待分配') commandKey = 'assignTeacher'
    else if (['待排课', '时间冲突'].includes(record.status)) commandKey = 'scheduleClass'
    else commandKey = 'consumeClass'
  } else if (drawerKind.value === 'purchase') {
    if (record.status === '待付款') commandKey = 'confirmPayment'
    else if (record.status === '待发货') commandKey = 'registerLogistics'
    else if (record.status === '运输中') commandKey = 'confirmArrival'
    else commandKey = 'confirmSupplierReturn'
  } else if (drawerKind.value === 'partner') {
    commandKey = record.status === '复审中' ? 'passFinalReview' : 'passInitialReview'
  } else {
    flowKey = 'settlement'
    if (record.status === '待打款') commandKey = 'confirmTransfer'
    else if (record.diff !== '¥ 0') commandKey = 'reconcileDifference'
    else commandKey = 'confirmBill'
  }

  return {
    flowKey,
    commandKey,
    ...commandBindingStatus(flowKey, commandKey)
  }
})
const currentDrawerActionAllowed = computed(
  () => runtimeMode.isPreview && canPreviewPermission(currentDrawerPermission.value)
)
const currentDrawerActionTitle = computed(() => {
  if (!runtimeMode.isPreview) return '正式环境写入已锁定：真实接口适配尚未完成'
  if (!canPreviewPermission(currentDrawerPermission.value)) return '当前角色无此业务动作权限'
  return drawerMeta.value.primaryAction
})

const primaryActionDisabled = computed(() => {
  const record = drawerRecord.value
  if (!record) return true
  if (drawerKind.value === 'order') {
    if (record.status === '已支付' && record.allocationStatus === '未分配') return !workflowForm.value.centerId
    if (record.riskStatus === '支付状态异常' && workflowForm.value.orderDecision === 'paid') {
      return !workflowForm.value.centerId
    }
  }
  if (drawerKind.value === 'delivery') {
    if (record.status === '待分配') return !workflowForm.value.teacherId
    if (['待排课', '时间冲突'].includes(record.status)) {
      return !workflowForm.value.scheduleSlot || !workflowForm.value.classMode
    }
  }
  if (drawerKind.value === 'partner' && partnerEditMode.value) return false
  if (drawerKind.value === 'partner') {
    return workflowForm.value.documents.some((document) => document.result !== 'pass')
  }
  return false
})

const drawerMeta = computed(() => {
  const record = drawerRecord.value
  if (!record) return { details: [], steps: [] }

  if (drawerKind.value === 'order') {
    let primaryAction = '查看详情'
    if (record.riskStatus === '支付状态异常') {
      primaryAction = workflowForm.value.orderDecision === 'paid' ? '确认到账并分单' : '标记未到账'
    } else if (record.afterSaleStatus === '退款中') {
      primaryAction = workflowForm.value.refundDecision === 'approve' ? '同意退款' : '拒绝退款'
    } else if (record.status === '待支付') {
      primaryAction = '发送付款提醒'
    } else if (record.status === '已支付' && record.allocationStatus === '未分配') {
      primaryAction = '确认分单'
    }
    return {
      eyebrow: '订单处理',
      title: record.orderNo,
      subtitle: `学员 ${displaySensitive(record.studentName, 'studentName')} · 家长 ${displaySensitive(
        record.parentName,
        'parentName'
      )} ${displaySensitive(record.parentMobile, 'parentMobile')}`,
      status: record.status,
      hint:
        record.riskStatus === '支付状态异常'
          ? '风险提示：支付渠道与订单状态不一致'
          : record.afterSaleStatus !== '--'
            ? `售后状态：${record.afterSaleStatus}`
            : `下一步：${record.nextAction}`,
      workflowTitle: record.riskStatus === '支付状态异常' ? '支付核验与分单' : '当前任务处理',
      primaryAction,
      details: [
        { label: '学员', value: record.studentName },
        { label: '家长', value: record.parentName },
        { label: '家长手机号', value: record.parentMobile },
        { label: '课程类型', value: record.courseType },
        { label: '课程', value: record.courseName },
        { label: '经销商', value: record.dealer },
        { label: '销售方', value: record.seller },
        { label: '代下单经销商', value: record.orderingDealer },
        { label: '是否需要规划师', value: record.plannerRequirement },
        { label: '来源', value: record.source },
        { label: '平台', value: record.platform },
        { label: '批次', value: record.batch },
        { label: '下单方式', value: record.orderMethod },
        { label: '经销商推荐人', value: record.dealerReferrer },
        { label: '渠道', value: record.channel },
        { label: '金额', value: record.amount },
        { label: '实付金额', value: record.paidAmount },
        { label: '支付交易号', value: record.paymentTransactionNo },
        { label: '物流单号', value: record.logisticsNo },
        { label: '是否已分配', value: record.allocationStatus },
        { label: '交付中心', value: record.deliveryCenter },
        { label: '含Pad', value: record.hasPad },
        { label: '是否首购', value: record.firstPurchase },
        { label: '下单时间', value: record.orderTime },
        { label: '订单备注', value: record.orderRemark }
      ],
      steps: [
        { label: '订单创建', meta: record.orderTime, complete: true },
        {
          label: '支付确认',
          meta: record.riskStatus === '支付状态异常' ? '等待人工核验' : record.status,
          complete: record.status === '已支付' && record.riskStatus === '--',
          current: record.riskStatus === '支付状态异常' || record.status === '待支付'
        },
        {
          label: '分配交付中心',
          meta: record.allocationStatus === '已分配' ? record.deliveryCenter : '未分配',
          complete: record.allocationStatus === '已分配',
          current: record.status === '已支付' && record.allocationStatus === '未分配'
        },
        {
          label: '售后状态',
          meta: record.afterSaleStatus,
          complete: record.afterSaleStatus === '--',
          current: record.afterSaleStatus !== '--'
        }
      ]
    }
  }

  if (drawerKind.value === 'delivery') {
    return {
      eyebrow: '交付履约',
      title: `${displaySensitive(record.studentName || record.student, 'studentName')} · ${record.subject}`,
      subtitle: `${record.grade} · ${displaySensitive(record.parentName || '家长', 'parentName')} ${displaySensitive(
        record.parentMobile || record.mobile,
        'parentMobile'
      )}`,
      status: record.status,
      hint: record.issue,
      primaryAction: deliveryAction(record.status),
      workflowTitle: record.status === '待分配' ? '推荐教师' : '排课确认',
      details: [
        { label: '关联订单', value: record.orderNo || '系统导入' },
        { label: '学员编号', value: record.studentNo || '--' },
        { label: '学员', value: record.studentName || record.student },
        { label: '家长', value: record.parentName || '--' },
        { label: '家长手机号', value: record.parentMobile || record.mobile },
        { label: '课程阶段', value: record.stage },
        { label: '课程', value: record.courseName || '--' },
        { label: '学科商品', value: record.subjectProduct || record.courseName || '--' },
        { label: '年级', value: record.grade },
        { label: '学科', value: record.subject },
        { label: '交付中心', value: record.deliveryCenter || '--' },
        { label: '教师', value: record.teacherName || record.owner },
        { label: '班级', value: record.className || '--' },
        { label: '教学方式', value: record.teachingMode || '--' },
        { label: '授课方式', value: record.deliveryMode || '--' },
        { label: '总课时', value: record.totalHours || '--' },
        { label: '已排课课时', value: record.scheduledHours || '--' },
        { label: '已消课时', value: record.consumedHours || '--' },
        { label: '剩余课时', value: record.remainingHours || '--' },
        { label: '预占课时', value: record.reservedHours || '--' },
        { label: '评价状态', value: record.evaluationStatus || '--' },
        { label: '规划师', value: record.planner || '--' },
        { label: '当前负责人', value: record.owner },
        { label: '处理时限', value: record.deadline }
      ],
      steps: [
        { label: '订单已支付', meta: '已完成', complete: true },
        { label: '分配交付中心', meta: '已完成', complete: true },
        { label: '匹配教师', meta: record.owner, complete: !['待分配'].includes(record.status), current: record.status === '待分配' },
        { label: '确认排课', meta: record.deadline, complete: ['交付中', '待续课', '待评价'].includes(record.status), current: ['待排课', '时间冲突'].includes(record.status) }
      ]
    }
  }

  if (drawerKind.value === 'purchase') {
    return {
      eyebrow: '采购履约',
      title: record.purchaseNo,
      subtitle: `${record.purchaseType} · ${displaySensitive(record.supplier, 'supplier')}`,
      status: record.status,
      hint: `下一步：${record.nextAction}`,
      workflowTitle: '采购处理',
      primaryAction: purchaseAction(record.status),
      details: [
        { label: '采购单号', value: record.purchaseNo },
        { label: '采购类型', value: record.purchaseType },
        { label: '关联订单', value: record.relatedOrder },
        { label: '学员', value: record.studentName },
        { label: '家长', value: record.parentName },
        { label: '家长手机号', value: record.parentMobile },
        { label: '采购方', value: record.merchant },
        { label: '供应商', value: record.supplier },
        { label: '商品', value: record.product },
        { label: '规格', value: record.specification },
        { label: '数量', value: record.quantity },
        { label: '采购金额', value: record.amount },
        { label: '已付金额', value: record.paidAmount },
        { label: '付款状态', value: record.paymentStatus },
        { label: '付款凭证', value: record.voucherNo },
        { label: '物流单号', value: record.logisticsNo },
        { label: '预计到货', value: record.expectedAt },
        { label: '负责人', value: record.owner },
        { label: '处理时限', value: record.deadline }
      ],
      steps: [
        { label: '采购单创建', meta: record.purchaseType, complete: true },
        {
          label: '付款确认',
          meta: record.paymentStatus,
          complete: ['已付款', '退款中'].includes(record.paymentStatus),
          current: record.status === '待付款'
        },
        {
          label: '物流履约',
          meta: record.logisticsNo,
          complete: ['运输中', '已到货'].includes(record.status),
          current: record.status === '待发货'
        },
        {
          label: '到货/退供',
          meta: record.status,
          complete: ['已到货', '已退供'].includes(record.status),
          current: ['运输中', '采购退供'].includes(record.status)
        }
      ]
    }
  }

  if (drawerKind.value === 'partner') {
    return {
      eyebrow: partnerEditMode.value ? '经销商编辑' : '合作伙伴审核',
      title: record._isNew ? '新增入驻申请' : record.company,
      subtitle: `${record.region} · ${displaySensitive(record.contact, 'contactName')}`,
      status: record.status,
      hint: `资料完整度 ${record.completeness}% · ${record.risk}风险`,
      primaryAction: partnerEditMode.value ? '保存申请' : record.status === '待初审' ? '初审通过' : record.status === '复审中' ? '审核通过' : '提交复审',
      details: [
        { label: '申请编号', value: record.applicationNo || '待生成' },
        { label: '主体类型', value: record.entityType || '--' },
        { label: '联系人', value: record.contact },
        { label: '身份证号', value: record.idCardNo || '--' },
        { label: '联系电话', value: record.mobile },
        { label: '经营地区', value: record.region },
        { label: '经销商等级', value: record.dealerLevel || '--' },
        { label: '是否需要规划师', value: record.plannerRequirement || '--' },
        { label: '交付中心', value: record.deliveryCenter || '--' },
        { label: '招商公司', value: record.investmentCompany || '--' },
        { label: '推荐人公司', value: record.referrerCompany || '--' },
        { label: '合约时间', value: `${record.contractStart || '--'} 至 ${record.contractEnd || '--'}` },
        { label: '详细地址', value: record.address || '--' },
        { label: '提交时间', value: record.submittedAt },
        { label: '营业执照号', value: record.licenseNo || '--' },
        { label: '证照有效期', value: record.licenseExpiresAt || '待核验' },
        { label: '银联B2B资管账号', value: record.unionpayAccount || '--' },
        { label: '账号状态', value: record.accountStatus || '--' },
        { label: '合约状态', value: record.contractStatus || '--' },
        { label: '审核人', value: record.reviewer || '--' },
        { label: '资料完整度', value: `${record.completeness}%` }
      ],
      steps: [
        { label: '主体信息', meta: '已核验', complete: true },
        { label: '营业执照', meta: record.risk === '高' ? '有效期需要确认' : '已核验', complete: record.risk !== '高', current: record.risk === '高' },
        { label: '联系人信息', meta: '已核验', complete: true },
        { label: '合作协议', meta: record.completeness < 100 ? '等待补充' : '已上传', complete: record.completeness === 100, current: record.completeness < 100 }
      ]
    }
  }

  if (drawerKind.value === 'registry') {
    const titleKeys = [
      'name',
      'orderNo',
      'studentName',
      'parentName',
      'scheduleTitle',
      'documentNo',
      'billNo',
      'student',
      'code',
      'account'
    ]
    const titleKey = titleKeys.find((key) => record[key])
    return {
      eyebrow: record._moduleTitle,
      title: record._isNew ? `新增${record._submodule}` : titleKey ? displaySensitive(record[titleKey], titleKey) : record.id,
      subtitle: `${record._submodule} · ${record.code || record.orderNo || record.documentNo || record.billNo || record.account || '业务记录'}`,
      status: record.status || '正常',
      hint: `当前记录包含 ${record._columns.length} 个业务字段`,
      primaryAction: registryEditMode.value ? '保存记录' : '编辑记录',
      details: record._columns.map((column) => ({
        label: column.label,
        value: record[column.key] ?? '--'
      })),
      steps: [
        { label: '数据创建', meta: record.createdAt || '历史数据', complete: true },
        { label: '业务校验', meta: '字段完整性已检查', complete: true },
        { label: '当前状态', meta: record.status || '正常', current: true },
        { label: '关联记录', meta: '可从业务编号继续追踪', complete: false }
      ]
    }
  }

  return {
    eyebrow: '财务结算',
    title: record.billNo,
    subtitle: record.partner,
    status: record.status,
    hint: record.diff === '¥ 0' ? '账单金额一致' : `存在差额 ${record.diff}`,
    primaryAction: record.status === '待打款' ? '确认打款' : record.diff === '¥ 0' ? '确认账单' : '发起差额核对',
    details: [
      { label: '合作方', value: record.partner },
      { label: '账期', value: record.period },
      { label: '关联订单数', value: record.relatedOrders || '--' },
      { label: '业务金额', value: record.businessAmount || record.amount },
      { label: '应收金额', value: record.receivableAmount || '--' },
      { label: '应付金额', value: record.payableAmount || '--' },
      { label: '已结金额', value: record.paidAmount || '--' },
      { label: '结算金额', value: record.amount },
      { label: '差额', value: record.diff },
      { label: '发票状态', value: record.invoiceStatus || '--' },
      { label: '结算状态', value: record.settlementStatus || record.status },
      { label: '负责人', value: record.owner || '--' },
      { label: '生成时间', value: record.createdAt || '--' }
    ],
    steps: [
      { label: '账单生成', meta: '系统自动生成', complete: true },
      { label: '金额核对', meta: record.diff === '¥ 0' ? '核对一致' : `差额 ${record.diff}`, complete: record.diff === '¥ 0', current: record.diff !== '¥ 0' },
      { label: '合作方确认', meta: '等待确认', complete: record.status === '已完成', current: record.status === '待确认' },
      { label: '打款完成', meta: record.status === '已完成' ? '已完成' : '等待后续处理', complete: record.status === '已完成', current: record.status === '待打款' }
    ]
  }
})

watch(activeView, () => {
  listSearch.value = ''
  filtersOpen.value = false
  orderFilterState.value = createDefaultOrderFilters()
  selectedRows.value = []
  globalSearch.value = ''
  searchFocused.value = false
  registrySearch.value = ''
  registryFiltersOpen.value = false
  registryStatus.value = '全部状态'
  registryFilterValues.value = {}
  registryFieldPanelOpen.value = false
  hiddenRegistryColumns.value = []
  if (currentRegistryModule.value) {
    if (!currentRegistryModule.value.submodules.includes(activeRegistrySubmodule.value)) {
      activeRegistrySubmodule.value = currentRegistryModule.value.submodules[0]
    }
  }
})

watch(activeRegistrySubmodule, () => {
  registrySearch.value = ''
  registryStatus.value = '全部状态'
  registryFilterValues.value = {}
  registryFieldPanelOpen.value = false
  hiddenRegistryColumns.value = []
})

function metricIconFor(metric) {
  const icons = {
    orders: ShoppingBag,
    delivery: GraduationCap,
    purchase: WalletCards,
    partners: Handshake,
    finance: WalletCards,
    analytics: ChartLine,
    system: ShieldCheck
  }
  return icons[metric.view] || LayoutDashboard
}

function taskIconFor(task) {
  const icons = {
    order: ShoppingBag,
    delivery: GraduationCap,
    purchase: WalletCards,
    partner: Handshake,
    settlement: WalletCards
  }
  return icons[task.kind] || CheckCircle2
}

function canPreviewPermission(permissionKey) {
  return previewPermissionDecision(activeRole.value, permissionKey).allowed
}

function ensurePreviewMutation() {
  if (runtimeMode.isPreview) return true
  toast('正式环境写入已锁定：真实接口适配尚未完成')
  return false
}

function parseCurrency(value) {
  return Number(String(value || '0').replace(/[^\d.-]/g, '')) || 0
}

function formatCurrency(value) {
  return `¥ ${Math.round(value).toLocaleString('zh-CN')}`
}

function displaySensitive(value, fieldKey) {
  const rawValue = value ?? '--'
  const { mode } = fieldMaskingDecision(activeRole.value, fieldKey)
  if (mode === 'full') return rawValue
  if (mode === 'hidden') return '--（无权限）'

  const text = String(rawValue)
  if (text === '--') return text
  if (/^1\d{10}$/.test(text)) return `${text.slice(0, 3)}****${text.slice(-4)}`
  if (/^[¥￥]/.test(text)) return text.replace(/[\d,.]+/, '***')
  if (/^[\dA-Za-z-]{8,}$/.test(text)) return `${text.slice(0, 4)}****${text.slice(-4)}`
  if (text.length <= 4) return `${text.slice(0, 1)}${'*'.repeat(Math.max(text.length - 1, 2))}`
  return `${text.slice(0, 2)}***${text.slice(-2)}`
}

function drawerFieldKey(label) {
  const labelMap = {
    学员: 'studentName',
    家长: 'parentName',
    家长手机号: 'parentMobile',
    联系人: 'contactName',
    联系电话: 'contactMobile',
    详细地址: 'address',
    营业执照号: 'licenseNo',
    支付交易号: 'paymentTransactionNo',
    付款凭证: 'paymentTransactionNo',
    供应商: 'supplier',
    金额: 'businessAmount',
    实付金额: 'businessAmount',
    采购金额: 'businessAmount',
    已付金额: 'businessAmount',
    业务金额: 'businessAmount',
    应收金额: 'settlementAmount',
    应付金额: 'settlementAmount',
    已结金额: 'settlementAmount',
    结算金额: 'settlementAmount',
    差额: 'settlementAmount'
  }
  return labelMap[label]
}

function displayDrawerValue(item) {
  const fieldKey = drawerFieldKey(item.label)
  return fieldKey ? displaySensitive(item.value, fieldKey) : item.value
}

function registrySensitiveField(column) {
  const label = column.label
  if (['学员', '学员姓名', '学生姓名'].includes(label)) return 'studentName'
  if (['家长', '家长姓名'].includes(label)) return 'parentName'
  if (['家长手机号', '手机号'].includes(label) && !['partnerCenter', 'investment'].includes(currentRegistryModule.value?.key)) {
    return 'parentMobile'
  }
  if (['联系人'].includes(label)) return 'contactName'
  if (['联系电话', '联系人手机号', '手机号'].includes(label)) return 'contactMobile'
  if (label.includes('支付交易号') || label.includes('付款凭证')) return 'paymentTransactionNo'
  if (label.includes('营业执照')) return 'licenseNo'
  if (label.includes('供应商')) return 'supplier'
  if (label.includes('地址')) return 'address'
  if (label.includes('金额') || label.includes('差额')) {
    return currentRegistryModule.value?.key === 'financeReports' ? 'settlementAmount' : 'businessAmount'
  }
  return column.key
}

function displayRegistryValue(record, column) {
  const value = record[column.key] ?? '--'
  return displaySensitive(value, registrySensitiveField(column))
}

function matchesActiveScope(kind, record) {
  const scope = activeScope.value
  const searchable = Object.values(record).join(' ')
  if (['全国业务', '总部运营层级', '全交付中心'].includes(scope)) return true
  if (scope === '总部交付中心') return searchable.includes('总部交付中心')
  if (scope === '本交付中心') return searchable.includes('总部交付中心')
  if (scope === '本中心及下级') {
    return ['总部交付中心', '华东交付中心'].some((center) => searchable.includes(center))
  }
  if (scope === '华东区域') {
    return ['华东', '浙江', '杭州', '安徽', '合肥', '江苏', '苏州'].some((region) => searchable.includes(region))
  }
  if (scope === '本商家') {
    if (searchable.includes('杭州青禾教育')) return true
    if (kind === 'delivery') {
      const order = orders.value.find((item) => item.orderNo === record.orderNo)
      return order?.dealer === '杭州青禾教育'
    }
    return false
  }
  if (scope === '本人学员') {
    if (kind === 'delivery') return record.teacherName === '周老师'
    return searchable.includes('周老师') || ['赵同学', '陈同学'].some((student) => searchable.includes(student))
  }
  return false
}

function scopeAwareTotal(fullTotal, records) {
  return ['全国业务', '总部运营层级', '全交付中心'].includes(activeScope.value) ? fullTotal : records.length
}

function navigateTo(view) {
  if (!currentRoleAccess.value.menuViews.includes(view)) {
    toast(`${currentRoleAccess.value.roleName}无此页面访问权限`)
    return
  }
  activeView.value = view
  mobileNavOpen.value = false
  appContentRef.value?.scrollTo({ top: 0, behavior: 'auto' })
  closeDrawer()
}

function switchRole(role) {
  activeRole.value = role
  const contract = roleAccessPreviewMatrix.find((item) => item.roleKey === role)
  activeScope.value = contract?.defaultScope || '全国业务'
  scopeOpen.value = false
  mobileNavOpen.value = false
  if (role === 'tutor') activeDeliveryTab.value = 'active'
  if (role === 'studentManager') activeDeliveryTab.value = 'schedule'
  if (role === 'planner') activeDeliveryTab.value = 'active'
  if (role === 'qualityControl') activeDeliveryTab.value = 'active'
  if (role === 'customerService') activeDeliveryTab.value = 'active'
  if (role === 'merchant') {
    activeOrderTab.value = 'pending'
    activeDeliveryTab.value = 'active'
  }
  if (role === 'finance') activePurchaseTab.value = 'payment'
  if (role === 'partnerAuditor') activePartnerTab.value = 'pending'
  if (!contract?.menuViews.includes(activeView.value)) {
    activeView.value = 'workbench'
    closeDrawer()
  }
  toast(`已切换为${contract?.roleName}视角，范围：${activeScope.value}`)
}

function setScope(scope) {
  if (!availableScopes.value.includes(scope)) {
    toast('当前角色无此数据范围')
    return
  }
  activeScope.value = scope
  scopeOpen.value = false
  toast(`数据范围：${scope}`)
}

function closeFloatingMenus(event) {
  if (!event.target.closest('.scope-picker')) scopeOpen.value = false
  if (!event.target.closest('.global-search')) searchFocused.value = false
  if (!event.target.closest('.registry-column-picker')) registryFieldPanelOpen.value = false
}

function refreshView() {
  toast(`${currentPage.value.title}已刷新`)
}

function openTask(task) {
  navigateTo(task.view)
  const record = findRecord(task.kind, task.targetId)
  if (record) openRecord(task.kind, record)
  toast(`正在处理：${task.title}`)
}

function openGlobalResult(result) {
  activeView.value = result.view
  if (result.kind === 'registry') {
    activeRegistrySubmodule.value = result.record._submodule
  }
  globalSearch.value = ''
  searchFocused.value = false
  openRecord(result.kind, result.record)
}

function openRecord(kind, record) {
  drawerKind.value = kind
  drawerRecord.value = { ...record, history: [...(record.history || [])] }
  drawerNote.value = ''
  registryEditMode.value = false
  registryForm.value = {}
  registryFormErrors.value = {}
  partnerEditMode.value = false
  partnerForm.value = {}
  partnerFormErrors.value = {}
  workflowForm.value = createWorkflowForm(kind, record)
}

function openPartnerEditor(record = null, isNew = false) {
  if (!ensurePreviewMutation()) return
  if (!canPreviewPermission('partner.review')) {
    toast(`${currentRoleAccess.value.roleName}无入驻申请编辑权限`)
    return
  }
  const preparedRecord = {
    ...(record || createPartnerDraft()),
    _isNew: isNew,
    history: [
      {
        time: '刚刚',
        title: isNew ? '新建入驻申请' : '编辑入驻申请',
        detail: '按照线上经销商编辑字段录入'
      },
      ...((record || {}).history || [])
    ]
  }
  drawerKind.value = 'partner'
  drawerRecord.value = preparedRecord
  drawerNote.value = ''
  partnerEditMode.value = true
  partnerForm.value = createPartnerForm(preparedRecord)
  partnerFormErrors.value = {}
  workflowForm.value = createWorkflowForm('partner', preparedRecord)
}

function openRegistryRecord(record) {
  if (!currentRegistryModule.value) return
  openRecord('registry', {
    ...record,
    _moduleTitle: currentRegistryModule.value.title,
    _submodule: activeRegistrySubmodule.value,
    _columns: currentRegistryDataset.value.columns,
    history: [
      {
        time: '刚刚',
        title: `查看${activeRegistrySubmodule.value}详情`,
        detail: `来自${currentRegistryModule.value.title}业务台账`
      }
    ]
  })
}

function openRegistryEditor(record = null, isNew = false) {
  if (!currentRegistryModule.value) return
  const columns = currentRegistryDataset.value.columns
  const preparedRecord = {
    ...(record || createRegistryDraft()),
    _isNew: isNew,
    _moduleKey: currentRegistryModule.value.key,
    _moduleTitle: currentRegistryModule.value.title,
    _submodule: activeRegistrySubmodule.value,
    _columns: columns,
    history: [
      {
        time: '刚刚',
        title: isNew ? `新建${activeRegistrySubmodule.value}` : `编辑${activeRegistrySubmodule.value}`,
        detail: `来自${currentRegistryModule.value.title}业务台账`
      },
      ...((record || {}).history || [])
    ]
  }
  drawerKind.value = 'registry'
  drawerRecord.value = preparedRecord
  drawerNote.value = ''
  registryEditMode.value = true
  registryForm.value = Object.fromEntries(columns.map((column) => [column.key, preparedRecord[column.key] ?? '']))
  registryFormErrors.value = {}
  workflowForm.value = createWorkflowForm('registry', preparedRecord)
}

function closeDrawer() {
  drawerRecord.value = null
  drawerKind.value = ''
  drawerNote.value = ''
  registryEditMode.value = false
  registryForm.value = {}
  registryFormErrors.value = {}
  partnerEditMode.value = false
  partnerForm.value = {}
  partnerFormErrors.value = {}
  workflowForm.value = createEmptyWorkflowForm()
}

function completeDrawerAction() {
  const record = drawerRecord.value
  if (!record) return
  if (!ensurePreviewMutation()) return
  if (!currentDrawerActionAllowed.value) {
    toast(`${currentRoleAccess.value.roleName}无此业务动作权限`)
    return
  }

  if (drawerKind.value === 'partner' && partnerEditMode.value) {
    savePartnerApplication()
  } else if (drawerKind.value === 'partner') {
    const nextStatus = record.status === '复审中' ? '已通过' : '复审中'
    updateRecordWithActivity(
      partners,
      record.id,
      {
        status: nextStatus,
        risk: workflowForm.value.partnerRisk,
        completeness: 100,
        accountStatus: nextStatus === '已通过' ? '已开通' : record.accountStatus,
        contractStatus: nextStatus === '已通过' ? '履约中' : '待生效'
      },
      nextStatus === '已通过' ? '入驻审核通过' : '初审通过并提交复审',
      drawerNote.value.trim() || '全部资料核验通过'
    )
    markLinkedTaskComplete('partner', record.id)
    toast(nextStatus === '已通过' ? `${record.company} 已审核通过` : `${record.company} 已提交复审`)
    closeDrawer()
  } else if (drawerKind.value === 'order') {
    completeOrderWorkflow(record)
  } else if (drawerKind.value === 'delivery') {
    completeDeliveryWorkflow(record)
  } else if (drawerKind.value === 'purchase') {
    completePurchaseWorkflow(record)
  } else if (drawerKind.value === 'registry') {
    if (registryEditMode.value) saveRegistryRecord()
    else {
      registryEditMode.value = true
      registryForm.value = Object.fromEntries(record._columns.map((column) => [column.key, record[column.key] ?? '']))
      registryFormErrors.value = {}
      toast(`${record._submodule}已进入编辑状态`)
    }
  } else {
    const nextStatus = record.status === '待打款' ? '已完成' : record.diff === '¥ 0' ? '待打款' : '核对中'
    updateRecordWithActivity(
      settlements,
      record.id,
      {
        status: nextStatus,
        settlementStatus: nextStatus,
        paidAmount: nextStatus === '已完成' ? record.amount : record.paidAmount
      },
      nextStatus === '已完成' ? '确认打款完成' : '完成账单核对',
      nextStatus === '已完成'
        ? `${record.amount} 已完成打款`
        : record.diff === '¥ 0'
          ? '账单金额核对一致'
          : `已发起差额核对：${record.diff}`
    )
    toast(`${record.billNo} 已完成当前核对`)
    closeDrawer()
  }
}

function returnPartner() {
  const record = drawerRecord.value
  if (!record) return
  if (!ensurePreviewMutation()) return
  if (!canPreviewPermission('partner.review')) {
    toast(`${currentRoleAccess.value.roleName}无审核退回权限`)
    return
  }
  const supplementDocuments = workflowForm.value.documents.filter((document) => document.result === 'supplement')
  if (!supplementDocuments.length) {
    toast('请先将需要补充的资料标记为“需补充”')
    return
  }
  if (drawerNote.value.trim().length < 4) {
    toast('请填写具体的退回补充原因')
    return
  }
  const completeness = Math.round(
    (workflowForm.value.documents.filter((document) => document.result === 'pass').length / workflowForm.value.documents.length) * 100
  )
  updateRecordWithActivity(
    partners,
    record.id,
    { status: '待补充', risk: workflowForm.value.partnerRisk, completeness, accountStatus: '未开通', contractStatus: '资料待补充' },
    '退回补充资料',
    `${supplementDocuments.map((document) => document.label).join('、')}：${drawerNote.value.trim()}`
  )
  markLinkedTaskComplete('partner', record.id)
  toast(`${record.company} 已退回补充资料`)
  closeDrawer()
}

function updateRecord(collection, id, changes) {
  collection.value = collection.value.map((item) => (item.id === id ? { ...item, ...changes } : item))
}

function updateRecordWithActivity(collection, id, changes, title, detail) {
  const activity = { time: '刚刚', title, detail }
  collection.value = collection.value.map((item) =>
    item.id === id ? { ...item, ...changes, history: [activity, ...(item.history || [])] } : item
  )
  const updated = collection.value.find((item) => item.id === id)
  if (updated && drawerRecord.value?.id === id) {
    drawerRecord.value = { ...updated, history: [...(updated.history || [])] }
  }
  return updated
}

function createPartnerDraft() {
  const now = new Date()
  const dateCode = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const index = partners.value.length + 1
  return {
    id: `partner-draft-${Date.now()}`,
    company: `新增经销商${index}`,
    entityType: '个人',
    contact: '',
    mobile: '',
    idCardNo: '',
    region: '',
    address: '',
    submittedAt: '刚刚',
    status: '草稿',
    risk: '低',
    completeness: 40,
    applicationNo: `SQ${dateCode}${String(index).padStart(4, '0')}`,
    licenseNo: '',
    licenseExpiresAt: '',
    accountStatus: '未开通',
    contractStatus: '草稿',
    reviewer: '合作中心',
    dealerLevel: '推广达人',
    accountBinding: '',
    hainanDealer: '否',
    contactMobile: '',
    plannerRequirement: '手动选择',
    wechatNoticeMobiles: '',
    remark: '',
    deliveryCenter: '',
    forcedDeliveryCenter: '否',
    investmentCompany: '',
    referrerCompany: '',
    parentInfo: '',
    contractStart: '2026-07-04',
    contractEnd: '2027-07-04',
    unionpayAccount: '',
    businessLicenseFile: '',
    contractAttachment: '',
    history: []
  }
}

function createPartnerForm(record) {
  const form = {}
  for (const section of partnerApplicationFields) {
    for (const field of section.fields) {
      form[field.key] = record[field.key] ?? ''
    }
  }
  form.company = record.company || `新增经销商${partners.value.length + 1}`
  form.entityType = record.entityType || '个人'
  return form
}

function partnerCompleteness(form) {
  const fields = partnerApplicationFields.flatMap((section) => section.fields)
  const filled = fields.filter((field) => String(form[field.key] || '').trim()).length
  return Math.round((filled / fields.length) * 100)
}

function savePartnerApplication() {
  const record = drawerRecord.value
  if (!record) return
  const errors = {}
  for (const section of partnerApplicationFields) {
    for (const field of section.fields) {
      if (field.required && !String(partnerForm.value[field.key] || '').trim()) {
        errors[field.key] = `请填写${field.label}`
      }
    }
  }
  partnerFormErrors.value = errors
  if (Object.keys(errors).length) {
    toast('请补齐入驻申请必填信息')
    return
  }

  const completeness = partnerCompleteness(partnerForm.value)
  const savedRecord = {
    ...record,
    ...partnerForm.value,
    company:
      partnerForm.value.company && !String(partnerForm.value.company).startsWith('新增经销商')
        ? partnerForm.value.company
        : `${partnerForm.value.contact || '新经销商'}合作主体`,
    entityType: partnerForm.value.entityType || record.entityType || '个人',
    contact: partnerForm.value.contact,
    mobile: partnerForm.value.mobile,
    status: partnerForm.value.status === '启用' ? '复审中' : partnerForm.value.status === '停用' ? '待补充' : partnerForm.value.status,
    risk: partnerForm.value.licenseExpiresAt && partnerForm.value.licenseExpiresAt <= '2026-07-31' ? '高' : record.risk || '低',
    completeness,
    accountStatus: partnerForm.value.accountBinding ? '待开通' : '未开通',
    contractStatus: partnerForm.value.contractAttachment ? '待生效' : '待签约',
    submittedAt: record.submittedAt || '刚刚',
    history: [
      {
        time: '刚刚',
        title: record._isNew ? '提交入驻申请' : '保存入驻资料',
        detail: drawerNote.value.trim() || `资料完整度 ${completeness}%`
      },
      ...(record.history || [])
    ]
  }
  delete savedRecord._isNew

  const exists = partners.value.some((item) => item.id === record.id)
  partners.value = exists
    ? partners.value.map((item) => (item.id === record.id ? savedRecord : item))
    : [savedRecord, ...partners.value]

  toast(`${savedRecord.company} 入驻资料已保存`)
  closeDrawer()
}

function createRegistryDatasets() {
  const datasets = {}
  for (const module of moduleCatalog) {
    datasets[module.key] = {}
    for (const submodule of module.submodules) {
      const source = submoduleDatasets[module.key]?.[submodule] || {
        columns: module.columns,
        rows: module.rows,
        total: module.total
      }
      datasets[module.key][submodule] = {
        columns: source.columns.map((column) => ({ ...column })),
        rows: source.rows.map((row) => ({ ...row })),
        total: source.total || source.rows.length
      }
    }
  }
  return datasets
}

function createRegistryDraft() {
  const now = new Date()
  const dateCode = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const index = currentRegistryDataset.value.rows.length + 1
  const draft = {
    id: `draft-${currentRegistryModule.value.key}-${activeRegistrySubmodule.value}-${Date.now()}`,
    status: '正常',
    businessType: activeRegistrySubmodule.value,
    updatedAt: '刚刚'
  }
  for (const column of currentRegistryDataset.value.columns) {
    if (Object.hasOwn(draft, column.key)) continue
    if (column.key === 'code') draft[column.key] = `NEW${dateCode}${String(index).padStart(3, '0')}`
    else if (column.key === 'orderNo') draft[column.key] = `ZL${Date.now()}`
    else if (column.key === 'documentNo') draft[column.key] = `DOC${dateCode}${String(index).padStart(3, '0')}`
    else if (column.key === 'billNo') draft[column.key] = `JS${dateCode}${String(index).padStart(3, '0')}`
    else if (column.key === 'name') draft[column.key] = `新增${activeRegistrySubmodule.value}${index}`
    else draft[column.key] = ''
  }
  return draft
}

function registryDatasetKey(record = drawerRecord.value) {
  return {
    moduleKey: record?._moduleKey || currentRegistryModule.value?.key,
    submodule: record?._submodule || activeRegistrySubmodule.value
  }
}

function updateRegistryDataset(moduleKey, submodule, updater) {
  const source = registryDatasets.value[moduleKey]?.[submodule]
  if (!source) return
  const nextDataset = updater(source)
  registryDatasets.value = {
    ...registryDatasets.value,
    [moduleKey]: {
      ...registryDatasets.value[moduleKey],
      [submodule]: {
        ...nextDataset,
        total: nextDataset.rows.length
      }
    }
  }
}

function registryEditorOptions(column) {
  if (!['status', 'gender', 'source', 'platform', 'courseType', 'allocationStatus', 'centerType', 'entityType'].includes(column.key)) {
    return []
  }
  return [...new Set(currentRegistryDataset.value.rows.map((row) => row[column.key]).filter(Boolean))]
}

function requiredRegistryColumns() {
  const preferredKeys = [
    'name',
    'orderNo',
    'studentName',
    'parentName',
    'student',
    'code',
    'mobile',
    'status',
    'courseName',
    'course',
    'deliveryCenter'
  ]
  return registryEditorColumns.value.filter((column) => preferredKeys.includes(column.key)).slice(0, 4)
}

function saveRegistryRecord() {
  const record = drawerRecord.value
  if (!record || drawerKind.value !== 'registry') return
  const errors = {}
  for (const column of requiredRegistryColumns()) {
    if (!String(registryForm.value[column.key] || '').trim()) errors[column.key] = `请填写${column.label}`
  }
  registryFormErrors.value = errors
  if (Object.keys(errors).length) {
    toast('请补齐必填信息')
    return
  }

  const { moduleKey, submodule } = registryDatasetKey(record)
  const savedRecord = {
    ...record,
    ...registryForm.value,
    _isNew: false,
    businessType: submodule,
    updatedAt: registryForm.value.updatedAt || '刚刚',
    history: [
      {
        time: '刚刚',
        title: record._isNew ? '新增记录' : '保存编辑',
        detail: drawerNote.value.trim() || `${submodule}数据已保存`
      },
      ...(record.history || [])
    ]
  }
  const cleanRecord = Object.fromEntries(Object.entries(savedRecord).filter(([key]) => !key.startsWith('_')))

  updateRegistryDataset(moduleKey, submodule, (dataset) => {
    const exists = dataset.rows.some((item) => item.id === record.id)
    const rows = exists
      ? dataset.rows.map((item) => (item.id === record.id ? cleanRecord : item))
      : [cleanRecord, ...dataset.rows]
    return { ...dataset, rows }
  })

  toast(`${submodule}${record._isNew ? '新增' : '编辑'}已保存`)
  closeDrawer()
}

function deleteRegistryRecord(record) {
  if (!ensurePreviewMutation()) return
  const { moduleKey, submodule } = registryDatasetKey(record)
  const subject =
    record.name || record.orderNo || record.studentName || record.parentName || record.student || record.code || record.id || '当前记录'
  if (!window.confirm(`确认删除“${subject}”？此操作仅影响当前体验环境。`)) return
  updateRegistryDataset(moduleKey, submodule, (dataset) => ({
    ...dataset,
    rows: dataset.rows.filter((item) => item.id !== record.id)
  }))
  toast(`${subject} 已删除`)
}

function completeOrderWorkflow(record) {
  if (record.riskStatus === '支付状态异常') {
    if (workflowForm.value.orderDecision === 'unpaid') {
      updateRecordWithActivity(
        orders,
        record.id,
        {
          status: '待支付',
          riskStatus: '--',
          paidAmount: '¥ 0',
          paymentTransactionNo: '--',
          allocationStatus: '未分配',
          nextAction: '提醒支付',
          deliveryCenter: '--'
        },
        '支付核验完成',
        drawerNote.value.trim() || '未查询到有效到账流水，订单转为待支付'
      )
      markLinkedTaskComplete('order', record.id)
      toast(`${record.orderNo} 已标记为待支付`)
      closeDrawer()
      return
    }
    const center = deliveryCenterOptions.find((item) => item.id === workflowForm.value.centerId)
    updateRecordWithActivity(
      orders,
      record.id,
      {
        status: '已支付',
        riskStatus: '--',
        allocationStatus: '已分配',
        nextAction: '分配教师',
        deliveryCenter: center.name
      },
      '确认到账并完成分单',
      `${record.payment?.transactionNo || '支付流水'} · ${center.name}${drawerNote.value.trim() ? ` · ${drawerNote.value.trim()}` : ''}`
    )
    deliveryItems.value = deliveryItems.value.map((item) =>
      item.orderNo === record.orderNo ? { ...item, issue: `已分配至${center.name}` } : item
    )
    markLinkedTaskComplete('order', record.id)
    toast(`${record.orderNo} 已确认到账并分配至${center.name}`)
    closeDrawer()
    return
  }

  if (record.status === '已支付' && record.allocationStatus === '未分配') {
    const center = deliveryCenterOptions.find((item) => item.id === workflowForm.value.centerId)
    updateRecordWithActivity(
      orders,
      record.id,
      { allocationStatus: '已分配', nextAction: '分配教师', deliveryCenter: center.name },
      '完成订单分单',
      `${center.name} · ${center.response}`
    )
    markLinkedTaskComplete('order', record.id)
    toast(`${record.orderNo} 已分配至${center.name}`)
    closeDrawer()
    return
  }

  if (record.status === '待支付') {
    const channel = workflowForm.value.reminderChannel === 'sms' ? '短信' : '商家跟进'
    updateRecordWithActivity(orders, record.id, {}, '发送付款提醒', `${channel}提醒已发送`)
    toast(`${record.orderNo} 已发送${channel}提醒`)
    closeDrawer()
    return
  }

  if (record.afterSaleStatus === '退款中') {
    const approved = workflowForm.value.refundDecision === 'approve'
    updateRecordWithActivity(
      orders,
      record.id,
      {
        afterSaleStatus: approved ? '已退款' : '退款驳回',
        nextAction: '查看详情'
      },
      approved ? '退款审核通过' : '退款申请驳回',
      drawerNote.value.trim() || (approved ? '退款将原路退回' : '不符合退款条件')
    )
    toast(`${record.orderNo} ${approved ? '已同意退款' : '已驳回退款'}`)
    closeDrawer()
    return
  }

  updateRecordWithActivity(orders, record.id, {}, '完成当前订单任务', drawerNote.value.trim() || record.nextAction)
  toast(`${record.orderNo} 已完成当前处理`)
  closeDrawer()
}

function completeDeliveryWorkflow(record) {
  if (record.status === '待分配') {
    const teacher = teacherOptions.find((item) => item.id === workflowForm.value.teacherId)
    const updated = updateRecordWithActivity(
      deliveryItems,
      record.id,
      { status: '待排课', owner: teacher.name, teacherName: teacher.name, planner: teacher.name, issue: `已匹配${teacher.name}` },
      '完成教师分配',
      `${teacher.name} · 匹配度 ${teacher.match}% · ${teacher.center}`
    )
    markLinkedTaskComplete('delivery', record.id)
    workflowForm.value = createWorkflowForm('delivery', updated)
    toast(`已分配${teacher.name}，请继续确认上课时间`)
    return
  }

  if (['待排课', '时间冲突'].includes(record.status)) {
    const mode = workflowForm.value.classMode === 'online' ? '线上授课' : '线下授课'
    updateRecordWithActivity(
      deliveryItems,
      record.id,
      {
        status: '交付中',
        deadline: workflowForm.value.scheduleSlot,
        preferredTime: workflowForm.value.scheduleSlot,
        deliveryMode: workflowForm.value.classMode === 'online' ? '线上' : '线下',
        scheduledHours: String(Number(record.scheduledHours || 0) + 1),
        reservedHours: '1',
        issue: `${mode} · 首次课已确认`
      },
      record.status === '时间冲突' ? '排课冲突已解决' : '首次排课已确认',
      `${workflowForm.value.scheduleSlot} · ${mode}${drawerNote.value.trim() ? ` · ${drawerNote.value.trim()}` : ''}`
    )
    markLinkedTaskComplete('delivery', record.id)
    toast(`${record.student} 的首次课程已安排`)
    closeDrawer()
    return
  }

  updateRecordWithActivity(deliveryItems, record.id, {}, '更新交付任务', drawerNote.value.trim() || record.issue)
  toast(`${record.student} 的交付任务已更新`)
  closeDrawer()
}

function completePurchaseWorkflow(record) {
  if (record.status === '待付款') {
    updateRecordWithActivity(
      purchases,
      record.id,
      {
        paymentStatus: '凭证已补充',
        voucherNo: 'FK2606****补录',
        status: '待确认付款',
        nextAction: '财务确认付款'
      },
      '补充付款凭证',
      drawerNote.value.trim() || '已补充首付款凭证，等待财务确认'
    )
    markLinkedTaskComplete('purchase', record.id)
    toast(`${record.purchaseNo} 已补充付款凭证`)
    closeDrawer()
    return
  }

  if (record.status === '待发货') {
    updateRecordWithActivity(
      purchases,
      record.id,
      {
        status: '运输中',
        logisticsNo: record.logisticsNo === '待发货' ? 'SF****2606' : record.logisticsNo,
        nextAction: '确认到货'
      },
      '登记物流信息',
      drawerNote.value.trim() || '供应商已发货，物流信息已登记'
    )
    markLinkedTaskComplete('purchase', record.id)
    toast(`${record.purchaseNo} 已登记物流`)
    closeDrawer()
    return
  }

  if (record.status === '运输中') {
    updateRecordWithActivity(
      purchases,
      record.id,
      {
        status: '已到货',
        nextAction: '查看详情'
      },
      '确认采购到货',
      drawerNote.value.trim() || `${record.product} 已到货并完成签收`
    )
    toast(`${record.purchaseNo} 已确认到货`)
    closeDrawer()
    return
  }

  if (record.status === '采购退供') {
    updateRecordWithActivity(
      purchases,
      record.id,
      {
        status: '已退供',
        paymentStatus: '退款中',
        nextAction: '跟进退款'
      },
      '确认采购退供',
      drawerNote.value.trim() || '已确认退供，等待供应商退款'
    )
    markLinkedTaskComplete('purchase', record.id)
    toast(`${record.purchaseNo} 已确认退供`)
    closeDrawer()
    return
  }

  updateRecordWithActivity(purchases, record.id, {}, '更新采购任务', drawerNote.value.trim() || record.nextAction)
  toast(`${record.purchaseNo} 的采购任务已更新`)
  closeDrawer()
}

function findRecord(kind, id) {
  const collections = {
    order: orders.value,
    delivery: deliveryItems.value,
    purchase: purchases.value,
    partner: partners.value,
    settlement: settlements.value
  }
  return collections[kind]?.find((item) => item.id === id)
}

function markLinkedTaskComplete(kind, targetId) {
  tasks.value = tasks.value.map((task) =>
    task.kind === kind && task.targetId === targetId ? { ...task, status: '已完成', due: '刚刚完成' } : task
  )
}

function selectTeacher(teacher) {
  workflowForm.value.teacherId = teacher.id
  workflowForm.value.scheduleSlot = teacher.slots[0]
}

function createDefaultOrderFilters() {
  return {
    deliveryScope: '',
    orderNo: '',
    status: '',
    plannerRequirement: '',
    source: '',
    platform: '',
    orderMethod: '',
    parentName: '',
    courseType: '',
    studentName: '',
    allocationStatus: '',
    hasPad: '',
    orderTime: ''
  }
}

function resetOrderFilters() {
  orderFilterState.value = createDefaultOrderFilters()
  toast('订单筛选条件已重置')
}

function createEmptyWorkflowForm() {
  return {
    orderDecision: 'paid',
    centerId: '',
    reminderChannel: 'sms',
    refundDecision: 'approve',
    teacherId: '',
    scheduleSlot: '',
    classMode: 'online',
    partnerRisk: '低',
    documents: []
  }
}

function createWorkflowForm(kind, record) {
  const form = createEmptyWorkflowForm()
  if (kind === 'order') {
    form.centerId = deliveryCenterOptions.find((center) => center.name === record.deliveryCenter)?.id || ''
  }
  if (kind === 'delivery') {
    const currentTeacher = teacherOptions.find((teacher) => teacher.name === record.owner)
    form.teacherId = currentTeacher?.id || ''
    form.scheduleSlot = ''
  }
  if (kind === 'partner') {
    form.partnerRisk = record.risk
    form.documents = [
      {
        key: 'subject',
        label: '主体信息',
        meta: '企业名称、统一信用代码',
        result: 'pass'
      },
      {
        key: 'license',
        label: '营业执照',
        meta: record.risk === '高' ? `有效期至 ${record.licenseExpiresAt}，需要更新` : `有效期至 ${record.licenseExpiresAt}`,
        result: record.risk === '高' ? 'supplement' : 'pass'
      },
      {
        key: 'contact',
        label: '联系人信息',
        meta: '实名与授权关系核验',
        result: 'pass'
      },
      {
        key: 'agreement',
        label: '合作协议',
        meta: record.completeness < 100 ? '签章页不完整' : '协议与签章齐全',
        result: record.completeness < 100 ? 'supplement' : 'pass'
      }
    ]
  }
  return form
}

function toggleRow(id) {
  selectedRows.value = selectedRows.value.includes(id)
    ? selectedRows.value.filter((item) => item !== id)
    : [...selectedRows.value, id]
}

function toggleAllRows(items) {
  if (items.every((item) => selectedRows.value.includes(item.id))) {
    const ids = new Set(items.map((item) => item.id))
    selectedRows.value = selectedRows.value.filter((id) => !ids.has(id))
  } else {
    selectedRows.value = [...new Set([...selectedRows.value, ...items.map((item) => item.id)])]
  }
}

function toggleRegistryColumn(key) {
  hiddenRegistryColumns.value = hiddenRegistryColumns.value.includes(key)
    ? hiddenRegistryColumns.value.filter((item) => item !== key)
    : [...hiddenRegistryColumns.value, key]
}

function registryFilterOptions(field) {
  const optionKeys = {
    性别: 'gender',
    状态: 'status',
    学员状态: 'status',
    订单状态: 'status',
    排课状态: 'status',
    消课状态: 'status',
    评价状态: 'evaluationStatus',
    与学生关系: 'studentRelation',
    交付中心类型: 'centerType',
    主体类型: 'entityType',
    是否需要规划师: 'plannerRequirement',
    来源: 'source',
    平台: 'platform',
    下单方式: 'orderMethod',
    课程类型: 'courseType',
    是否已分配: 'allocationStatus',
    含Pad: 'hasPad',
    'iPad 订阅': 'ipadSubscription',
    教学方式: 'teachingMode',
    授课方式: 'deliveryMode',
    排课类型: 'scheduleType'
  }
  const key = optionKeys[field]
  if (!key) return []
  return [...new Set(currentRegistryDataset.value.rows.map((row) => row[key]).filter((value) => value && value !== '--'))]
}

function registryRecordFilterValue(record, field) {
  const fieldKeys = {
    学号: 'studentNo',
    学员姓名: 'studentName',
    家长姓名: 'parentName',
    家长: 'parentName',
    手机号: 'mobile',
    性别: 'gender',
    与学生关系: 'studentRelation',
    学员状态: 'status',
    状态: 'status',
    交付中心名称: 'name',
    交付中心类型: 'centerType',
    主体类型: 'entityType',
    学科商品: 'subjectProduct',
    'iPad 订阅': 'ipadSubscription',
    教学方式: 'teachingMode',
    授课方式: 'deliveryMode',
    教师: 'teacherName',
    排课类型: 'scheduleType',
    课程类型: 'courseType',
    上课日期: 'classDate',
    排课状态: 'status',
    消课状态: 'status',
    评价状态: 'evaluationStatus',
    交付层级: 'deliveryCenter',
    订单号: 'orderNo',
    订单状态: 'status',
    是否需要规划师: 'plannerRequirement',
    来源: 'source',
    平台: 'platform',
    下单方式: 'orderMethod',
    是否已分配: 'allocationStatus',
    含Pad: 'hasPad',
    下单时间: 'orderTime'
  }

  if (field === '学员') return String(record.studentName ?? record.studentOrClass ?? record.student ?? '')
  if (field === '上课时间') return `${record.classDate ?? ''} ${record.classStart ?? ''}`.trim()
  return String(record[fieldKeys[field]] ?? '')
}

function registryRowActions(record) {
  const moduleKey = currentRegistryModule.value?.key
  const submodule = activeRegistrySubmodule.value
  let actions = ['详情']

  if (moduleKey === 'learning') {
    if (['体验课管理', '正式课管理'].includes(submodule)) actions = ['排课', '更多']
    if (submodule === '排课记录') actions = ['更多']
    if (submodule === '消课管理') {
      if (record.status === '已消课' && record.evaluationStatus === '是') actions = ['撤销', '评价信息', '更多']
      if (record.status === '已消课' && record.evaluationStatus !== '是') actions = ['撤销', '去评价', '更多']
      if (record.status === '已上课') actions = ['消课', '回退预占课时', '去评价', '更多']
      if (record.status === '未上课') actions = ['消课', '去评价', '更多']
    }
  } else if (moduleKey === 'masterdata') {
    if (submodule === '家长管理') actions = ['详情', '编辑', '删除']
    if (submodule === '学员管理') actions = ['详情', '更多']
  } else if (['onlineOrders', 'offlineOrders'].includes(moduleKey) && submodule === '订单查询') {
    actions = ['详情', '更多']
  } else if (moduleKey === 'partnerCenter' && submodule === '交付中心') {
    actions = ['详情', '更多']
  }

  actions = [...new Set([...actions, '编辑', '删除'])]
  return actions.filter((action) => {
    const permissionKey = registryActionPermission(action)
    return !permissionKey || canPreviewPermission(permissionKey)
  })
}

function registryActionPermission(action) {
  if (['详情', '评价信息'].includes(action)) return null
  if (['排课'].includes(action)) return 'delivery.schedule'
  if (['撤销', '去评价', '消课', '回退预占课时'].includes(action)) return 'delivery.consume'
  return 'registry.edit'
}

function handleRegistryAction(action, record) {
  const permissionKey = registryActionPermission(action)
  if (permissionKey && !canPreviewPermission(permissionKey)) {
    toast(`${currentRoleAccess.value.roleName}无“${action}”权限`)
    return
  }
  if (['详情', '评价信息'].includes(action)) {
    openRegistryRecord(record)
    return
  }
  if (!ensurePreviewMutation()) return
  if (action === '编辑') {
    openRegistryEditor(record, false)
    return
  }
  if (action === '删除') {
    deleteRegistryRecord(record)
    return
  }

  const subject =
    record.studentName ||
    record.parentName ||
    record.studentOrClass ||
    record.orderNo ||
    record.name ||
    record.scheduleTitle ||
    '当前记录'
  toast(`${subject}：${action}流程已打开`)
}

function handleRegistryPageAction(action) {
  const permissionKey = action === '导出' ? 'registry.export' : 'registry.edit'
  if (!canPreviewPermission(permissionKey)) {
    toast(`${currentRoleAccess.value.roleName}无“${action}”权限`)
    return
  }
  if (!ensurePreviewMutation()) return
  if (['新增', '录入订单'].includes(action)) {
    openRegistryEditor(null, true)
    return
  }
  const feedback = {
    导出: `${activeRegistrySubmodule.value}导出任务已创建`,
    批量导入: `${activeRegistrySubmodule.value}批量导入面板已打开`,
    录入订单: '订单录入表单已打开',
    新增: `${activeRegistrySubmodule.value}新增表单已打开`
  }
  toast(feedback[action] || `${action}流程已打开`)
}

function resetRegistryFilters() {
  registrySearch.value = ''
  registryStatus.value = '全部状态'
  registryFilterValues.value = {}
  toast('筛选条件已重置')
}

function bulkOrderAction() {
  if (!ensurePreviewMutation()) return
  if (!canPreviewPermission('orders.handle')) {
    toast(`${currentRoleAccess.value.roleName}无批量分配权限`)
    return
  }
  orders.value = orders.value.map((item) =>
    selectedRows.value.includes(item.id) && item.status === '已支付' && item.allocationStatus === '未分配'
      ? {
          ...item,
          allocationStatus: '已分配',
          nextAction: '分配教师',
          deliveryCenter: '总部交付中心'
        }
      : item
  )
  toast(`已处理 ${selectedRows.value.length} 个订单`)
  selectedRows.value = []
}

function deliveryAction(status) {
  const actions = {
    待分配: '分配教师',
    待排课: '安排课程',
    时间冲突: '解决冲突',
    交付中: '查看进度',
    待续课: '发起续课',
    待评价: '提醒评价'
  }
  return actions[status] || '处理'
}

function purchaseAction(status) {
  const actions = {
    待付款: '补凭证',
    待确认付款: '查看凭证',
    待发货: '登记物流',
    运输中: '确认到货',
    采购退供: '确认退供',
    已到货: '查看详情',
    已退供: '跟进退款'
  }
  return actions[status] || '处理'
}

function priorityTone(priority) {
  if (priority === '紧急') return 'danger'
  if (priority === '高') return 'warning'
  return 'normal'
}

function riskTone(risk) {
  if (risk === '高') return 'high'
  if (risk === '中') return 'medium'
  return 'low'
}

function statusTone(status) {
  if (['支付异常', '时间冲突', '有冲突', '有差额', '差额', '证照预警'].includes(status)) return 'danger'
  if (
    [
      '待支付',
      '待分单',
      '待分配',
      '待排课',
      '待初审',
      '待审核',
      '待核验',
      '待确认',
      '待补充',
      '待续课',
      '待付款',
      '待确认付款',
      '收款确认中',
      '未上课'
    ].includes(status)
  ) {
    return 'warning'
  }
  if (['交付中', '复审中', '待发货', '运输中', '待评价', '核对中', '待打款'].includes(status)) return 'info'
  if (['已完成', '已通过', '已退款', '已支付', '已消课', '已到货', '已退供', '已核对', '正常'].includes(status)) return 'success'
  if (['退款中', '退款驳回', '采购退供', '已取消', '冻结'].includes(status)) return 'neutral'
  return 'info'
}

function chainStageTone(status) {
  if (['已到账', '已分配', '已拆分', '已生成', '已完成'].includes(status)) return 'success'
  if (['待人工核验', '未分配', '未生成', '未触发', '预估', '核对中', '待打款', '冲销待定'].includes(status)) {
    return 'warning'
  }
  if (['冻结'].includes(status)) return 'neutral'
  return 'info'
}

function toast(message) {
  toastMessage.value = message
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastMessage.value = ''
  }, 1800)
}
</script>
