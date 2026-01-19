---
name: TypeScript技术栈规范
description: TypeScript项目强制性技术栈规范。在编写和初始化TypeScript项目时必须严格遵守此规范技能
---

# TypeScript技术栈规范

## 强制要求

### 语言规范
- 所有Node.js项目必须使用TypeScript开发
- 禁止使用JavaScript（除非在特定配置文件中）
- 严格类型检查：`"strict": true` 必须在tsconfig.json中启用

### 编码标准

#### 类型定义
```typescript
// 正确：明确的类型定义
interface User {
  id: string;
  name: string;
  email: string;
}

function createUser(user: User): void {
  console.log(user);
}

// 错误：使用any
function createUser(user: any): void {
  console.log(user);
}
```

#### 函数返回类型
```typescript
// 正确：明确返回类型
function calculateSum(a: number, b: number): number {
  return a + b;
}

// 推荐：使用类型推断（简单情况）
const calculateSum = (a: number, b: number) => a + b;
```

#### 禁止类型断言（除非必要）
```typescript
// 错误：滥用类型断言
const value = data as User;

// 正确：使用类型守卫
if (isUser(data)) {
  console.log(data.name);
}

function isUser(value: unknown): value is User {
  return typeof value === 'object' && 'id' in value;
}
```

## 命名规范

### 接口命名
```typescript
// 接口使用 PascalCase
interface IUserRepository {
  findById(id: string): Promise<User | null>;
}

// 或者使用 I 前缀（根据项目约定）
interface UserRepository {
  findById(id: string): Promise<User | null>;
}
```

### 类命名
```typescript
// 类使用 PascalCase
class UserRepository implements IUserRepository {
  // 实现
}
```

### 函数和变量命名
```typescript
// 函数使用 camelCase
function getUserById(id: string): Promise<User> {
  // 实现
}

// 变量使用 camelCase
const userId = '123';
const userName = 'John';
```

### 常量命名
```typescript
// 常量使用 UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;

// 或者使用 PascalCase（对于导出的常量）
export const MaxRetryCount = 3;
export const DefaultTimeout = 5000;
```

## 类型定义最佳实践

### 使用 readonly 保护不可变数据
```typescript
interface Config {
  readonly port: number;
  readonly host: string;
}

const config: Config = {
  port: 3000,
  host: 'localhost',
};

// config.port = 4000; // 错误：无法修改
```

### 使用泛型提高复用性
```typescript
// 基础响应类型
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// 使用泛型
const userResponse: ApiResponse<User> = {
  success: true,
  data: user,
};
```

### 使用枚举（谨慎使用）
```typescript
// 简单场景使用常量对象
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];

// 复杂场景使用枚举
enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}
```

## 项目配置

### tsconfig.json 基础配置
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "lib": ["ES2021"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 代码组织

### 导入顺序
```typescript
// 1. Node.js 核心模块
import { join } from 'path';
import { readFileSync } from 'fs';

// 2. 第三方库
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// 3. 内部模块
import { User } from '../entities/user.entity';
import { IUserRepository } from '../repositories/user.repository.interface';
```

### 模块导出
```typescript
// 使用命名导出
export { UserRepository };
export { IUserRepository };
export type { User };

// 除非有特殊需求，避免使用默认导出
export default UserRepository; // 不推荐
```

## 类型安全检查清单

在提交代码前，确保：
- [ ] 所有函数都有明确的返回类型（或可以正确推断）
- [ ] 没有使用 `any` 类型（除非有充分理由）
- [ ] 所有对象都有接口或类型定义
- [ ] 严格模式已启用
- [ ] 没有类型错误和警告
- [ ] 使用了正确的命名规范