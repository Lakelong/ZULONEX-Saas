# Engineering Contract

开始任务前读取 `README.md`、`PROJECT_CONTEXT.md`、`PROJECT_STATUS.md`、`TASKS.md` 和接入基线。保留现有未提交改动。

- GitHub 私有仓库 `Lakelong/ZULONEX-Saas` 是本项目唯一可交接真源。
- 讨论中形成的业务对象、权限、字段、状态或发布决定必须回写仓库文档或契约。
- 不得用模拟数据宣称真实接口已完成；不得绕过 `build:production` 门禁。
- 密钥、真实客户数据、缓存、依赖和构建输出不得提交。
- 完成行为修改后运行 `npm test`，更新状态并提交、推送；不能推送时明确记录本地未同步。

<!-- AIOS-INDUSTRIAL-CONTRACT:BEGIN -->
# AI Business OS｜工业级开发默认契约

适用于所有现有及新建 AI Native 项目的编程与修复，遵守系统/平台权限和项目有效授权。

- 长任务先读取/维护项目根 `PROGRESS.md`，记录尝试、证据、失败次数与已知死胡同；不把聊天当唯一记忆。
- 最小权限：只改授权任务必要内容，不擅动无关核心配置、migrations 或生产敏感代码。
- 改实现前取得稳定复现且实际失败的 RED 测试；新行为先用可执行验收用例证明缺口。不得以环境/依赖故障冒充目标 Bug。
- 修改后运行确定性测试，只有实际 `exit 0` 才能报告该测试阶段 GREEN；不推测通过，不以局部 GREEN 替代真实使用流程、Review 和 Owner 验收。纯文档使用对应检查，不虚构 RED。
- 失败先比较预期与实际代码报错/日志，再基于证据调整。
- 相同/高度相似方案连续失败两次立即熔断；记录两次证据与盲点，向 Owner 报告并等待人工纠偏，禁止第三次等价重试。仅继续不依赖此路线的已授权独立工作。

详细规范唯一维护于设备登记的 AI Business OS 仓库 `docs/design/architecture/agent-operating-model.md`。开工先读取该规范和本项目最近的 AGENTS.md；不要复制另一套详细规则。
<!-- AIOS-INDUSTRIAL-CONTRACT:END -->
