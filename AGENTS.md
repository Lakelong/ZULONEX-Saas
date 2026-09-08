# Engineering Contract

开始任务前读取 `README.md`、`PROJECT_CONTEXT.md`、`PROJECT_STATUS.md`、`TASKS.md` 和接入基线。保留现有未提交改动。

- GitHub 私有仓库 `Lakelong/ZULONEX-Saas` 是本项目唯一可交接真源。
- 讨论中形成的业务对象、权限、字段、状态或发布决定必须回写仓库文档或契约。
- 不得用模拟数据宣称真实接口已完成；不得绕过 `build:production` 门禁。
- 密钥、真实客户数据、缓存、依赖和构建输出不得提交。
- 完成行为修改后运行 `npm test`，更新状态并提交、推送；不能推送时明确记录本地未同步。

