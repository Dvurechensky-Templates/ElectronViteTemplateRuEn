# Electron & Vite Template

![GitHub Repo stars](https://shields.dvurechensky.pro/github/stars/umbrella22/electron-vite-template)
[![vue](https://shields.dvurechensky.pro/badge/vue-3.5.22-brightgreen.svg)](https://github.com/vuejs/vue-next)
[![vite](https://shields.dvurechensky.pro/badge/vite-7.1.11-brightgreen.svg)](https://github.com/vitejs/vite)
[![electron](https://shields.dvurechensky.pro/badge/electron-38.3.0-brightgreen.svg)](https://github.com/electron/electron)
[![license](https://shields.dvurechensky.pro/github/license/mashape/apistatus.svg)](https://github.com/Dvurechensky-Templates/electron-vite-template-ru/blob/master/LICENSE)

- [Electron \& Vite Template](#electron--vite-template)
  - [Установка](#установка)
    - [Версии инструкции](#версии-инструкции)
  - [Настройка сборки](#настройка-сборки)
    - [Linux](#linux)
    - [Windows](#windows)
    - [Основная часть](#основная-часть)
    - [Сборка под Windows](#сборка-под-windows)
      - [**Объяснение опций NSIS:**](#объяснение-опций-nsis)
  - [Список функций](#список-функций)
  - [Встроено](#встроено)

## Установка

Вы можете клонировать проект или форк-репозиторий, либо загрузить ZIP-файл напрямую. Рекомендуется клонировать репозиторий, чтобы иметь возможность получать последние обновления.

Для запуска проекта вам понадобится **версия Node 22** или выше и **использовать npm в качестве инструмента управления зависимостями**

[Документ (только на китайском языке)](https://umbrella22.github.io/electron-vue-template-doc/)

### Версии инструкции

- [x] [Для китайских разработчиков](/docs/README_ZH.md)
- [x] [Для английских разработчиков](/docs/README_EN.md)

## Настройка сборки

### Linux

- Установить пакетный менеджер

```sh
apt install npm
```

- Обновить Node.js до последней LTS (рекомендуется >=18):

> Через NodeSource (для Debian/Ubuntu/Kali)

```sh
sudo apt remove -y nodejs npm libnode-dev
sudo apt autoremove -y

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

node -v

rm -rf node_modules package-lock.json
npm cache clean --force

sudo snap install build/electron-vite-template-ru_1.0.0_amd64.snap --dangerous

# диагностика
journalctl -xe | grep electron-vite-template-ru
```

### Windows

- Установить Node.js последней версии

### Основная часть

> Клонировать этот репозиторий

```sh
git clone https://github.com/Dvurechensky-Templates/electron-vite-template-ru.git
```

> Зайти в репозиторий

```sh
cd electron-vite-template-ru
```

> Установить зависимости

```sh
npm i
```

> Запустить сервер с автообновлением изменений на адресе http://localhost:9080

```sh
npm run dev
```

> Построить приложение electron для релиза

```sh
npm run build
```

### Сборка под Windows

1. Пояснения параметров `build.json`

#### **Объяснение опций NSIS:**

- `oneClick: false` → пользователь видит шаги установки.
- `perMachine: false` → устанавливается только для текущего пользователя (можно `true` для всех пользователей).
- `allowElevation: true` → если нужны админские права.
- `allowToChangeInstallationDirectory: true` → пользователь может выбрать путь.
- `createDesktopShortcut` / `createStartMenuShortcut` → создаются ярлыки.

---

## Список функций

- [x] Автоматическое обновление
- [x] Инкрементное обновление
- [x] Загрузка анимации перед запуском
- [x] Локализация - `i18n`

## Встроено

- [vue-router](https://next.router.vuejs.org/index.html)
  - Модуль маршрутизации для Vue, который позволяет создавать навигацию между страницами и управлять состоянием URL в SPA.
- [pinia](https://pinia.esm.dev/)
  - Современное хранилище состояний для Vue — лёгкое, типобезопасное и удобное в масштабировании.
- [electron](http://www.electronjs.org/docs)
  - Фреймворк для создания кроссплатформенных desktop-приложений на базе веб-технологий (HTML, CSS, JS).
- electron-updater
  - Инструмент автоматического обновления Electron-приложений: проверяет новые версии, скачивает и устанавливает их.
- typescript
  - Надстройка над JavaScript с системой статической типизации, делающая код более надёжным и удобным в поддержке.
