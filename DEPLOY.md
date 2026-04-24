# 🚀 Cloudflare Pages 部署指南

## ❌ 问题说明

你遇到的错误：
```
✘ [ERROR] Could not detect a directory containing static files (e.g. html, css and js) for the project
```

这是因为 `npx wrangler deploy` 命令是用于部署 **Cloudflare Workers**（服务器less 函数）的，而你的项目是**静态网站**（HTML + JavaScript）。

## ✅ 正确的部署方法

### 方法一：Cloudflare Pages（推荐）⭐

**不要使用 `wrangler deploy` 命令！** 应该使用 Cloudflare Pages 的网页界面：

#### 步骤：

1. **访问 Cloudflare Dashboard**
   ```
   https://dash.cloudflare.com/sign-up/pages
   ```

2. **创建新项目**
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **选择仓库**
   - 选择你的 GitHub 账号
   - 选择仓库：`chengshican/c`

4. **配置构建设置**（关键！）
   ```
   Project name: c-game（或自定义）
   Production branch: main
   Build command: 留空（不要填！）
   Build output directory: . （一个点，表示当前目录）
   Root directory: 留空
   ```

5. **保存并部署**
   - 点击 "Save and Deploy"
   - 等待部署完成（约 1-2 分钟）

6. **访问游戏**
   - 部署成功后，你会获得域名：`https://c-game.pages.dev`
   - 游戏 URL: `https://c-game.pages.dev/index_v8.html`

### 方法二：使用 Wrangler Pages CLI

如果你想用命令行部署，使用 `wrangler pages deploy` 而不是 `wrangler deploy`：

```bash
# 安装 Wrangler（如果未安装）
npm install -g wrangler

# 登录 Cloudflare
npx wrangler login

# 使用 pages deploy 命令（注意多了 pages 这个词）
npx wrangler pages deploy . --project-name=c-game
```

**关键区别：**
- ❌ `wrangler deploy` - 用于 Workers（会报错）
- ✅ `wrangler pages deploy` - 用于 Pages（正确）

### 方法三：GitHub Pages（最简单）

1. **启用 GitHub Pages**
   - 进入：https://github.com/chengshican/c/settings/pages
   - Build and deployment:
     - Source: Deploy from a branch
     - Branch: main / / (root)
   - 点击 Save

2. **访问地址**
   - `https://chengshican.github.io/c/index_v8.html`

## 📝 已添加的配置文件

- `wrangler.toml` - Cloudflare 配置（仅供参考，实际部署不需要）
- `pages.toml` - Pages 配置说明
- `README.md` - 完整项目文档

## 🔧 为什么 wrangler deploy 会失败？

`wrangler deploy` 默认寻找：
- `main.js` / `index.js` - Workers 入口文件
- 或者 `wrangler.toml` 中指定的脚本

但你的项目是：
- `index_v8.html` - HTML 文件
- `game_v8_complete.js` - 浏览器端 JavaScript

这是**完全不同的部署模式**！

## 🎯 快速解决

**最简单的方法：**

1. 打开 https://dash.cloudflare.com/sign-up/pages
2. 连接 GitHub 仓库 `chengshican/c`
3. Build command 留空
4. Output directory 填 `.`
5. 点击部署

就这么简单！不需要任何命令行操作。

## 📊 部署对比

| 平台 | 难度 | 速度 | 免费额度 | 推荐度 |
|------|------|------|----------|--------|
| Cloudflare Pages | ⭐⭐ | 快 | 100k 请求/天 | ⭐⭐⭐⭐⭐ |
| GitHub Pages | ⭐ | 中 | 无限 | ⭐⭐⭐⭐ |
| Vercel | ⭐⭐ | 很快 | 100GB/月 | ⭐⭐⭐⭐ |
| Netlify | ⭐⭐ | 快 | 100GB/月 | ⭐⭐⭐⭐ |

## 🎮 游戏链接

部署成功后，你可以：
- 分享链接给朋友
- 在手机/平板上玩
- 添加到浏览器书签

祝你部署成功！🚀
