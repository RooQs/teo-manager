---
name: NestJS项目规范
description: NestJS项目开发强制性规范。开发和初始化NestJS项目时需要严格遵守
---

## 强制要求

### 目录规范
- 必须严格遵守架构设计不能出现不在架构设计内的目录

### 语言规范
- 需要严格遵守TypeScript技术栈规范
- 禁止使用JavaScript（除非在特定配置文件中）

### 代码规范
- 必须严格参考NestJS官网文档开发手册规范
- 优先使用NestJs官方推荐语法和语法糖
- 优先使用NestJS官方推荐配置

## 架构概述

四层架构是一种分层架构模式，通过将应用程序分为四个独立的层次，实现关注点分离、依赖倒置和可替换性。

```
┌─────────────────────────────────────────┐
│   Presentation Layer (展示层)           │  ← 处理用户交互
├─────────────────────────────────────────┤
│   Application Layer (应用层)            │  ← 业务流程编排
├─────────────────────────────────────────┤
│   Domain Layer (领域层)                │  ← 核心业务逻辑
├─────────────────────────────────────────┤
│   Infrastructure Layer (基础设施层)     │  ← 外部依赖实现
└─────────────────────────────────────────┘
```

## 各层职责

### Presentation Layer (展示层)

**职责：**
- 处理用户交互（HTTP请求、WebSocket连接）
- 接收和验证输入参数
- 格式化响应数据
- 路由请求到正确的处理程序

**不包含：**
- 业务逻辑
- 数据访问
- 外部服务调用

### Application Layer (应用层)

**职责：**
- 编排业务流程
- 协调领域对象
- 调用领域服务
- 管理事务
- 发布领域事件

**不包含：**
- 业务规则（应该在领域层）
- 数据访问（应该通过仓储接口）
- 技术实现细节

### Domain Layer (领域层)

**职责：**
- 定义核心业务实体
- 实现业务规则和约束
- 定义值对象
- 定义领域服务
- 定义仓储接口（抽象）
- 定义领域事件

**不包含：**
- 数据库实现
- 外部服务调用
- 技术框架依赖

### Infrastructure Layer (基础设施层)

**职责：**
- 实现仓储接口
- 数据库操作
- 外部服务集成
- 缓存、队列、文件存储
- 日志、监控

**不包含：**
- 业务逻辑
- 业务规则
- 领域概念定义

## 依赖关系

### 允许的依赖方向

```
Presentation Layer → Application Layer (通过DTO)
Application Layer → Domain Layer (通过接口)
Domain Layer → Infrastructure Layer (通过仓储接口)
```

### 严禁的依赖方向

```
Infrastructure Layer → Domain Layer (直接调用) ❌
Infrastructure Layer → Application Layer (直接调用) ❌
Domain Layer → Infrastructure Layer (直接调用) ❌
Application Layer → Infrastructure Layer (直接调用) ❌
```

## 目录示例

```
src/
├── main.ts                              # 应用入口
├── app.module.ts                        # 根模块
├── presentation/                        # 展示层
│   ├── controllers/                     # HTTP控制器
│   │   └── index.ts
│   ├── gateways/                        # WebSocket网关
│   │   └── index.ts
│   ├── guards/                          # 路由守卫
│   │   └── index.ts
│   ├── interceptors/                    # 拦截器
│   │   └── index.ts
│   └── index.ts
├── application/                         # 应用层
│   └── index.ts
├── domain/                              # 领域层
│   ├── entities/                        # 实体
│   │   └── index.ts
│   ├── value-objects/                   # 值对象
│   │   └── index.ts
│   └── index.ts
└── infrastructure/                      # 基础设施层
    ├── database/                        # 数据库
    │   ├── providers/
    │   │   └── index.ts
    │   └── repositories/
    │       └── index.ts
    ├── cache/                           # 缓存
    │   └── index.ts
    ├── config/                          # 配置
    │   └── index.ts
    └── index.ts
```

###目录说明
** 各级目录下的index.ts文件为统一导出文件

## infrastructure 目录说明
此目录对应 Infrastructure Layer (基础设施层) 

## domain 目录说明
此目录对应 Domain Layer (领域层) 

## application 目录说明
此目录对应 Application Layer (应用层)

## presentation 目录说明
此目录对应 Presentation Layer (展示层)