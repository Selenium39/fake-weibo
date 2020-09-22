# fake-weibo

### 一.安装依赖

```bash
    npm i
```

### 二. 创建数据模型

>前提是要创建数据库fake_weibo
>数据库配置文件 src/conf/db.js

```bash
    node src/db/sync.js
```

### 三. 运行项目
```bash
    npm run dev
```
>访问localhost:3000