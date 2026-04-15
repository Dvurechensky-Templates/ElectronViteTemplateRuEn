# Electron & Vite Template

<div align="center" style="margin: 20px 0; padding: 10px; background: #1c1917; border-radius: 10px;">
  <strong>🌐 Language: </strong>
  
  <a href="./README.zh.md" style="color: #F5F752; margin: 0 10px;">
    🇨🇳 中文
  </a>
  
  <a href="./README.ru.md" style="color: #F5F752; margin: 0 10px;">
    🇷🇺 Russian
  </a>
  | 
  <span style="color: #0891b2; margin: 0 10px;">
    ✅ 🇺🇸 English (current)
  </span>
</div>

---

![GitHub Repo stars](https://shields.dvurechensky.pro/github/stars/umbrella22/electron-vite-template)
[![vue](https://shields.dvurechensky.pro/badge/vue-3.5.22-brightgreen.svg)](https://github.com/vuejs/vue-next)
[![vite](https://shields.dvurechensky.pro/badge/vite-7.1.11-brightgreen.svg)](https://github.com/vitejs/vite)
[![electron](https://shields.dvurechensky.pro/badge/electron-38.3.0-brightgreen.svg)](https://github.com/electron/electron)
[![license](https://shields.dvurechensky.pro/github/license/mashape/apistatus.svg)](https://github.com/Dvurechensky-Templates/electron-vite-template-ru/blob/master/LICENSE)

- [Electron \& Vite Template](#electron--vite-template)
  - [Installation](#installation)
  - [Build Configuration](#build-configuration)
    - [Linux](#linux)
    - [Windows](#windows)
    - [Main Steps](#main-steps)
    - [Build for Windows](#build-for-windows)
      - [**NSIS Options Explanation:**](#nsis-options-explanation)
  - [Feature List](#feature-list)
  - [Included](#included)

## Installation

You can clone the project or fork the repository, or download it as a ZIP archive. Cloning is recommended so you can receive updates.

To run the project you need **Node.js version 22+** and use **npm as the dependency manager**.

[Documentation (Chinese only)](https://umbrella22.github.io/electron-vue-template-doc/)

## Build Configuration

### Linux

- Install package manager

```sh 
apt install npm
````

* Update Node.js to latest LTS (recommended >=18):

> via NodeSource (Debian/Ubuntu/Kali)

```sh 
# remove old node
sudo apt remove -y nodejs npm libnode-dev
sudo apt autoremove -y

# install new Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# check version (>=22)
node -v

# cleanup before reinstall
rm -rf node_modules package-lock.json
npm cache clean --force

# install snap build (not fully tested)
sudo snap install build/electron-vite-template-ru_1.0.0_amd64.snap --dangerous

# remove snap build
sudo snap remove electron-vite-template-ru

# build Debian package
npm run build:linux

# install Debian package
sudo dpkg -i build/electron-vite-template-ru_1.0.0_amd64.deb

# remove Debian package
sudo dpkg -r electron-vite-template-ru

# diagnostics
journalctl -xe | grep electron-vite-template-ru
```

### Windows

* Install latest Node.js

### Main Steps

> Clone repository

```sh 
git clone https://github.com/Dvurechensky-Templates/electron-vite-template-ru.git
```

> Enter directory

```sh 
cd electron-vite-template-ru
```

> Install dependencies

```sh 
npm i
```

> Run dev server (auto reload) at [http://localhost:9080](http://localhost:9080)

```sh 
npm run dev
```

> Build production app

```sh 
npm run build
```

### Build for Windows

1. Explanation of `build.json` parameters

#### **NSIS Options Explanation:**

* `oneClick: false` → user sees installation steps
* `perMachine: false` → install for current user only (set `true` for all users)
* `allowElevation: true` → request admin rights if needed
* `allowToChangeInstallationDirectory: true` → user can choose install path
* `createDesktopShortcut` / `createStartMenuShortcut` → create shortcuts

---

## Feature List

* [x] Auto update
* [x] Incremental updates
* [x] Loading animation before startup
* [x] Localization — `i18n`

## Included

* [vue-router](https://next.router.vuejs.org/index.html)
  Routing module for Vue that allows navigation between pages and URL state management in SPA.

* [pinia](https://pinia.esm.dev/)
  Modern state management for Vue — lightweight, type-safe, and scalable.

* [electron](http://www.electronjs.org/docs)
  Framework for building cross-platform desktop applications using web technologies (HTML, CSS, JS).

* electron-updater
  Auto-update tool for Electron apps: checks for updates, downloads, and installs them.

* typescript
  Superset of JavaScript with static typing, making code more reliable and maintainable.

