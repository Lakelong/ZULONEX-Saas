const appMode = import.meta.env.VITE_APP_MODE || 'preview'

export const runtimeMode = Object.freeze({
  key: appMode,
  isPreview: appMode !== 'production',
  label: appMode === 'production' ? '正式环境' : '体验环境',
  description:
    appMode === 'production'
      ? '真实身份、权限、数据范围与接口必须全部绑定'
      : '当前使用脱敏模拟数据，写操作仅更新本地页面状态'
})

