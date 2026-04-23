# 🎮 三国英雄传 - 部署说明

## 部署到 Cloudflare Pages

### 方法一：通过 GitHub 自动部署（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问：https://dash.cloudflare.com/sign-up/pages
   - 登录你的 Cloudflare 账号

2. **连接 GitHub 仓库**
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 选择仓库：`chengshican/c`

3. **配置构建设置**
   - **Project name**: `c-game`（或自定义）
   - **Production branch**: `main`
   - **Build command**: 留空（不需要构建）
   - **Build output directory**: `.`（当前目录）
   - **Root directory**: 留空

4. **保存并部署**
   - 点击 "Save and Deploy"
   - Cloudflare Pages 会自动构建并部署

### 方法二：通过 Wrangler CLI 部署

```bash
# 安装 Wrangler（如果未安装）
npm install -g wrangler

# 登录 Cloudflare
npx wrangler login

# 部署项目
npx wrangler pages deploy . --project-name=c-game
```

## 部署到 GitHub Pages

1. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 部分
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main`，文件夹选择 `/ (root)`
   - 点击 Save

2. **访问地址**
   - `https://chengshican.github.io/c/`

## 本地测试

```bash
# 使用 Python 启动本地服务器
python3 -m http.server 9000

# 访问 http://localhost:9000/index_v8.html
```

## 项目结构

```
c/
├── index_v8.html          # 主游戏页面
├── game_v8_complete.js    # 游戏逻辑
├── README.md              # 项目说明
└── wrangler.toml          # Cloudflare 配置（可选）
```

## 功能特性

- ✅ 60 位可招募武将
- ✅ FC 吞食天地经典计谋系统（22 种计谋）
- ✅ 装备强化和批量出售
- ✅ 挂机自动战斗
- ✅ 自定义弹窗系统
- ✅ 敌人 AI 使用计谋

## 游戏说明

这是一款基于 FC《吞食天地》的网页版策略 RPG 游戏，完美复刻了经典计谋系统。
