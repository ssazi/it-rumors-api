## 简介

@itrumor/api
## 开发准备
- 安装 `PostgreSQL`
- 安装 `redis`
- 本地配置需`config.local.ts` 和 生产需配置 `config.prod.ts` 配置 `config.default.ts` 里面没有配置的

## 发布

### 初始化数据库

```bash
npx sequelize db:migrate --env production or yarn db-prod
```

### ts 编译成 js，不然会报错

```bash
yarn ci
```

### 启动

```bash
yarn start
```

### 关闭

```bash
yarn stop
```

### 密码 md5 加密规则

```bash
md5(md5(密码)+user_salt)
```
