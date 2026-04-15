# Electron & Vite Template

<div align="center">

<strong>语言: </strong>
<span style="color: #F5F752; margin: 0 10px;">✅ CN 中文（当前）</span> |
<a href="./README.ru.md">RU Russian</a> |
<a href="./README.md">US English</a>

</div>

---

![GitHub Repo stars](https://shields.dvurechensky.pro/github/stars/umbrella22/electron-vite-template)
[![vue](https://shields.dvurechensky.pro/badge/vue-3.5.22-brightgreen.svg)](https://github.com/vuejs/vue-next)
[![vite](https://shields.dvurechensky.pro/badge/vite-7.1.11-brightgreen.svg)](https://github.com/vitejs/vite)
[![electron](https://shields.dvurechensky.pro/badge/electron-38.3.0-brightgreen.svg)](https://github.com/electron/electron)
[![license](https://shields.dvurechensky.pro/github/license/mashape/apistatus.svg)](https://github.com/Dvurechensky-Templates/electron-vite-template-ru/blob/master/LICENSE)

- [Electron \& Vite Template](#electron--vite-template)
  - [安装](#安装)
  - [构建配置](#构建配置)
    - [Linux](#linux)
    - [Windows](#windows)
    - [主要步骤](#主要步骤)
    - [Windows 构建](#windows-构建)
      - [**NSIS 选项说明：**](#nsis-选项说明)
  - [功能列表](#功能列表)
  - [内置](#内置)

## 安装

你可以克隆项目、fork 仓库，或者直接下载 ZIP 文件。推荐使用克隆方式，以便获取最新更新。

运行项目需要 **Node.js 22 或更高版本**，并使用 **npm 作为依赖管理工具**。

[文档（仅中文）](https://umbrella22.github.io/electron-vue-template-doc/)

## 构建配置

### Linux

- 安装包管理器

```sh 
apt install npm
````

* 更新 Node.js 到最新 LTS（推荐 >=18）：

> 使用 NodeSource（适用于 Debian/Ubuntu/Kali）

```sh 
# 删除旧版本 Node.js
sudo apt remove -y nodejs npm libnode-dev
sudo apt autoremove -y

# 安装新版本 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 检查版本（>=22）
node -v

# 清理旧构建文件
rm -rf node_modules package-lock.json
npm cache clean --force

# 安装 snap 包（未完全测试）
sudo snap install build/electron-vite-template-ru_1.0.0_amd64.snap --dangerous

# 删除 snap 包
sudo snap remove electron-vite-template-ru

# 构建 Debian 包
npm run build:linux

# 安装 Debian 包
sudo dpkg -i build/electron-vite-template-ru_1.0.0_amd64.deb

# 删除 Debian 包
sudo dpkg -r electron-vite-template-ru

# 查看日志
journalctl -xe | grep electron-vite-template-ru
```

### Windows

* 安装最新版本 Node.js

### 主要步骤

> 克隆仓库

```sh 
git clone https://github.com/Dvurechensky-Templates/electron-vite-template-ru.git
```

> 进入目录

```sh 
cd electron-vite-template-ru
```

> 安装依赖

```sh 
npm i
```

> 启动开发服务器（自动刷新），地址 [http://localhost:9080](http://localhost:9080)

```sh 
npm run dev
```

> 构建生产版本

```sh 
npm run build
```

### Windows 构建

1. `build.json` 参数说明

#### **NSIS 选项说明：**

* `oneClick: false` → 用户可以看到安装步骤
* `perMachine: false` → 仅当前用户安装（设置为 `true` 可为所有用户安装）
* `allowElevation: true` → 需要时请求管理员权限
* `allowToChangeInstallationDirectory: true` → 用户可以选择安装路径
* `createDesktopShortcut` / `createStartMenuShortcut` → 创建快捷方式

---

## 功能列表

* [x] 自动更新
* [x] 增量更新
* [x] 启动前加载动画
* [x] 本地化 — `i18n`

## 内置

* [vue-router](https://next.router.vuejs.org/index.html)
  Vue 的路由模块，用于页面导航和 URL 状态管理（SPA）。

* [pinia](https://pinia.esm.dev/)
  现代 Vue 状态管理库，轻量、类型安全且易于扩展。

* [electron](http://www.electronjs.org/docs)
  基于 Web 技术（HTML、CSS、JS）构建跨平台桌面应用的框架。

* electron-updater
  Electron 自动更新工具：检查更新、下载并安装新版本。

* typescript
  JavaScript 的超集，提供静态类型系统，使代码更可靠、易维护。

