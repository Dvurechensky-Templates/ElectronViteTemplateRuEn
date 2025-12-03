import { app, BrowserWindow, dialog } from 'electron'
import { join } from 'path'
import { arch, platform } from 'os'
import { stat, remove } from 'fs-extra'
import packageInfo from '../../../package.json'
import { webContentSend } from './web-content-send'

/**
 *
 * @description
 * @returns {void} Скачать категорию
 * @param {mainWindow} Главное меню
 * @param {downloadUrl} Адрес загрузки; если он не указан, для добавления имени будет использоваться предварительно заданный baseUrl.
 * @author Sky
 * @date 2020-08-12
 */

class Main {
  public mainWindow: BrowserWindow | null = null
  public downloadUrl: string = ''
  public version: string = packageInfo.version
  public baseUrl: string = ''
  public Sysarch: string = arch().includes('64') ? 'win64' : 'win32'
  public HistoryFilePath = join(
    app.getPath('downloads'),
    platform().includes('win32')
      ? `electron_${this.version}_${this.Sysarch}.exe`
      : `electron_${this.version}_mac.dmg`,
  )
  private isDownloadListenerRegistered = false // Добавить новый флаг

  constructor(mainWindow: BrowserWindow, downloadUrl?: string) {
    this.mainWindow = mainWindow
    this.downloadUrl =
      downloadUrl || platform().includes('win32')
        ? this.baseUrl +
          `electron_${this.version}_${this.Sysarch}.exe?${new Date().getTime()}`
        : this.baseUrl +
          `electron_${this.version}_mac.dmg?${new Date().getTime()}`

    // Регистрируйте событие will-download только один раз
    if (!this.isDownloadListenerRegistered && this.mainWindow) {
      this.mainWindow.webContents.session.on(
        'will-download',
        (event: any, item: any, webContents: any) => {
          const filePath = join(app.getPath('downloads'), item.getFilename())
          item.setSavePath(filePath)
          item.on('updated', (event: any, state: String) => {
            switch (state) {
              case 'progressing':
                webContentSend.DownloadProgress(
                  this.mainWindow!.webContents,
                  Number(
                    (
                      (item.getReceivedBytes() / item.getTotalBytes()) *
                      100
                    ).toFixed(0),
                  ),
                )
                break
              default:
                webContentSend.DownloadError(this.mainWindow!.webContents, true)
                dialog.showErrorBox(
                  'Ошибка загрузки',
                  'Ошибка загрузки, вызванная проблемами с сетью или другими неизвестными причинами.',
                )
                break
            }
          })
          item.once('done', (event: any, state: String) => {
            switch (state) {
              case 'completed':
                const data = {
                  filePath,
                }
                webContentSend.DownloadDone(this.mainWindow!.webContents, data)
                break
              case 'interrupted':
                webContentSend.DownloadError(this.mainWindow!.webContents, true)
                dialog.showErrorBox(
                  'Ошибка загрузки',
                  'Ошибка загрузки, вызванная проблемами с сетью или другими неизвестными причинами..',
                )
                break
              default:
                break
            }
          })
        },
      )
      this.isDownloadListenerRegistered = true
    }
  }

  start() {
    // В процессе обновления проверьте наличие файлов с таким же именем. Если файл с таким именем существует, удалите его; в противном случае начните загрузку.
    stat(this.HistoryFilePath, async (err, stats) => {
      try {
        if (stats) {
          await remove(this.HistoryFilePath)
        }
        this.mainWindow!.webContents.downloadURL(this.downloadUrl)
      } catch (error) {
        console.log(error)
      }
    })
  }
}

export default Main
