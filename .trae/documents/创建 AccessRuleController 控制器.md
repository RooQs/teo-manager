1. 创建 `src/presentation/controllers/access-rule.controller.ts` 文件，实现 TEO 访问规则相关的 HTTP 端点
2. 更新 `src/presentation/controllers/index.ts`，导出 AccessRuleController
3. 确保控制器在 AppModule 中正确注册
4. 实现基本的 CRUD 端点，包括获取、创建、更新和删除访问规则
5. 集成 TEO SDK 进行实际的访问规则操作

AccessRuleController 将提供以下端点：
- GET /access-rules - 获取访问规则列表
- GET /access-rules/:id - 获取单个访问规则
- POST /access-rules - 创建访问规则
- PUT /access-rules/:id - 更新访问规则
- DELETE /access-rules/:id - 删除访问规则