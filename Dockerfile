# 构建阶段
FROM node:24-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖
RUN npm ci

# 安装 Nest CLI（用于构建命令）
RUN npm install -g @nestjs/cli

# 复制源代码
COPY . .

# 构建项目
RUN npm run build

# 运行阶段
FROM node:24-alpine AS runner

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装生产依赖
RUN npm ci --only=production

# 从构建阶段复制构建产物
COPY --from=builder /app/dist ./dist

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 启动应用
CMD ["npm", "run", "start:prod"]
