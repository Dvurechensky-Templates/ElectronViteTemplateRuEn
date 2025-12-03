// Здесь вы определяете меню. Подробнее см. https://electronjs.org/docs/api/menu.
import { dialog, Menu } from 'electron'
import type { MenuItemConstructorOptions, MenuItem } from 'electron'
import { type, arch, release } from 'os'
import { version } from '../../../package.json'

const menu: Array<MenuItemConstructorOptions | MenuItem> = [
  {
    label: 'Настройка',
    submenu: [
      {
        label: 'Быстрый перезапуск',
        accelerator: 'F5',
        role: 'reload',
      },
      {
        label: 'Выход',
        accelerator: 'CmdOrCtrl+F4',
        role: 'close',
      },
    ],
  },
  {
    label: 'Помощь',
    submenu: [
      {
        label: 'О нас',
        click: function () {
          dialog.showMessageBox({
            title: 'О нас',
            type: 'info',
            message: 'фреймворк Electron-Vue',
            detail: `Информация о версии: ${version}\nВерсия движка：${
              process.versions.v8
            }\nТекущая система：${type()} ${arch()} ${release()}`,
            noLink: true,
            buttons: ['Посмотреть github', 'Ок'],
          })
        },
      },
    ],
  },
]

export const useMenu = () => {
  const creactMenu = () => {
    if (process.env.NODE_ENV === 'development') {
      menu.push({
        label: 'Настройки разработчика',
        submenu: [
          {
            label: 'Переключиться в режим разработчика',
            accelerator: 'CmdOrCtrl+I',
            role: 'toggleDevTools',
          },
        ],
      })
    }
    // Назначить шаблон
    const menuTemplate = Menu.buildFromTemplate(menu)
    // Загрузить шаблон
    Menu.setApplicationMenu(menuTemplate)
  }
  return {
    creactMenu,
  }
}
