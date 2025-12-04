import config from '@config/index'
import { BrowserWindow, dialog } from 'electron'
import { winURL, loadingURL, getPreloadFile } from '../config/static-path'
import { useProcessException } from '@main/hooks/exception-hook'

class MainInit {
  public winURL: string = ''
  public shartURL: string = ''
  public loadWindow: BrowserWindow = null
  public mainWindow: BrowserWindow = null
  private childProcessGone = null
  private mainWindowGone = null

  constructor() {
    const { childProcessGone, mainWindowGone } = useProcessException()
    this.winURL = winURL
    this.shartURL = loadingURL
    this.childProcessGone = childProcessGone
    this.mainWindowGone = mainWindowGone
  }
  // Функция главного окна
  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      titleBarOverlay: {
        color: '#fff',
      },
      titleBarStyle: config.IsUseSysTitle ? 'default' : 'hidden',
      height: 800,
      useContentSize: true,
      width: 1700,
      minWidth: 1366,
      show: false,
      frame: config.IsUseSysTitle,
      webPreferences: {
        sandbox: false,
        webSecurity: false,
        // Если вы находитесь в режиме разработки, вы можете использовать devTools.
        devTools: process.env.NODE_ENV === 'development',
        // Включение анимации ластика в macOS
        scrollBounce: process.platform === 'darwin',
        preload: getPreloadFile('preload'),
      },
    })

    // Загрузить главное окно
    this.mainWindow.loadURL(this.winURL)
    // Интерфейс отображается после готовности DOM.
    this.mainWindow.webContents.once('did-finish-load', () => {
      this.mainWindow.show()
      if (config.UseStartupChart) this.loadWindow.destroy()
    })
    // Автоматически включать devtools в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.webContents.openDevTools({
        mode: 'undocked',
        activate: true,
      })
    }
    // По какой-то причине страница в этом окне запустила выполнение во время кажущегося зависания.
    this.mainWindowGone(this.mainWindow)
    /**
     * Новая функция обнаружения сбоев графического процессора, подробные параметры можно найти по адресу: http://www.electronjs.org/docs/api/app
     * @returns {void}
     * @author zmr (umbrella22)
     * @date 2020-11-27
     */
    this.childProcessGone(this.mainWindow)
    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }
  // Функция окна загрузки
  loadingWindow(loadingURL: string) {
    this.loadWindow = new BrowserWindow({
      width: 400,
      height: 600,
      frame: false,
      skipTaskbar: true,
      transparent: true,
      resizable: false,
      webPreferences: {
        experimentalFeatures: true,
        preload: getPreloadFile('preload'),
      },
    })

    this.loadWindow.loadURL(loadingURL)
    this.loadWindow.show()
    this.loadWindow.setAlwaysOnTop(true)
    // Двухсекундную задержку можно настроить на более поздний срок в зависимости от ситуации. Это как функция сна, что-то вроде того. 。 = =。。。
    setTimeout(() => {
      this.createMainWindow()
    }, 1500)
  }
  // Инициализировать оконную функцию
  initWindow() {
    if (config.UseStartupChart) {
      return this.loadingWindow(this.shartURL)
    } else {
      return this.createMainWindow()
    }
  }
}
export default MainInit
