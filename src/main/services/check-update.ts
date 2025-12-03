import { autoUpdater } from 'electron-updater'
import { BrowserWindow } from 'electron'
import { webContentSend } from './web-content-send'
/**
 * -1. Проверка обновлений не удалась. 0. Проверка наличия обновлений. 1. Обнаружена новая версия, подготовка к загрузке. 2. Новая версия не обнаружена. 3. Загрузка. 4. Загрузка завершена.
 **/
class Update {
  public mainWindow: BrowserWindow
  constructor() {
    // установить URL
    autoUpdater.setFeedURL('http://127.0.0.1:25565/')
    // Срабатывает при возникновении ошибки обновления.
    autoUpdater.on('error', (err) => {
      console.log('Произошла ошибка при обновлении', err.message)
      if (err.message.includes('sha512 checksum mismatch')) {
        this.Message(this.mainWindow, -1, 'Проверка SHA512 не пройдена.')
      } else {
        this.Message(
          this.mainWindow,
          -1,
          'Сообщения об ошибках смотрите в главной консоли процесса.',
        )
      }
    })

    // Срабатывает при начале проверки обновлений
    autoUpdater.on('checking-for-update', () => {
      console.log('Начните проверять наличие обновлений')
      this.Message(this.mainWindow, 0)
    })

    // При обнаружении обновляемых данных
    autoUpdater.on('update-available', () => {
      console.log('Есть обновление')
      this.Message(this.mainWindow, 1)
    })

    // Когда нет данных для обновления
    autoUpdater.on('update-not-available', () => {
      console.log('Нет обновлений')
      this.Message(this.mainWindow, 2)
    })

    // Скачать мониторинг
    autoUpdater.on('download-progress', (progressObj) => {
      this.Message(this.mainWindow, 3, `${progressObj}`)
    })

    // Загрузка завершена
    autoUpdater.on('update-downloaded', () => {
      console.log('Загрузка завершена')
      this.Message(this.mainWindow, 4)
    })
  }
  // Отвечает за отправку информации в процесс рендеринга.
  Message(mainWindow: BrowserWindow, type: number, data?: string) {
    const senddata = {
      state: type,
      msg: data || '',
    }
    webContentSend.updateMsg(mainWindow.webContents, senddata)
  }

  // Выполнить автоматическую проверку обновлений
  checkUpdate(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
    autoUpdater.checkForUpdates().catch((err) => {
      console.log('Проблемы с сетевым подключением', err)
    })
  }

  // Выйти и установить
  quitAndInstall() {
    autoUpdater.quitAndInstall()
  }
}

export default Update
