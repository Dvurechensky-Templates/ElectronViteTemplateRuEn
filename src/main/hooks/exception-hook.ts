import { WebContents, app, dialog } from 'electron'
import type {
  Details,
  RenderProcessGoneDetails,
  Event,
  BrowserWindow,
} from 'electron'

export interface UseProcessExceptionRetrun {
  /**
   * Возникает при неожиданном исчезновении процесса рендеринга. Обычно это происходит из-за сбоя или завершения процесса.
   * Если прослушиватель не передан, он по умолчанию будет следовать подсказке о сбое.
   *
   * @see https://www.electronjs.org/docs/latest/api/app#event-render-process-gone
   */
  renderProcessGone: (
    listener?: (
      event: Event,
      webContents: WebContents,
      details: RenderProcessGoneDetails,
    ) => void,
  ) => void
  /**
   * Генерируется при неожиданном исчезновении дочернего процесса. Обычно это происходит из-за его сбоя или завершения. Это не относится к процессам рендеринга.
   * Если прослушиватель не передан, он по умолчанию будет следовать подсказке о сбое.
   *
   * @see https://www.electronjs.org/docs/latest/api/app#event-child-process-gone
   */
  childProcessGone: (
    window: BrowserWindow,
    listener?: (event: Event, details: Details) => void,
  ) => void

  mainWindowGone: (window: BrowserWindow, listener?: () => void) => void
}

export const useProcessException = (): UseProcessExceptionRetrun => {
  const renderProcessGone = (
    listener?: (
      event: Event,
      webContents: WebContents,
      details: RenderProcessGoneDetails,
    ) => void,
  ) => {
    app.on('render-process-gone', (event, webContents, details) => {
      if (listener) {
        listener(event, webContents, details)
        return
      }
      const message = {
        title: '',
        buttons: [],
        message: '',
      }
      switch (details.reason) {
        case 'crashed':
          message.title = 'Предупреждение'
          message.buttons = ['Ок', 'Отмена']
          message.message =
            'Графический процесс рухнул. Стоит ли выполнить мягкую перезагрузку?？'
          break
        case 'killed':
          message.title = 'Предупреждение'
          message.buttons = ['Ок', 'Отмена']
          message.message =
            'Графический процесс был прерван по неизвестным причинам. Хотите выполнить мягкую перезагрузку?？'
          break
        case 'oom':
          message.title = 'Предупреждение'
          message.buttons = ['Ок', 'Отмена']
          message.message =
            'Недостаточно памяти. Нужно ли выполнить мягкую перезагрузку, чтобы освободить память?？'
          break

        default:
          break
      }
      dialog
        .showMessageBox({
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true,
        })
        .then((res) => {
          if (res.response === 0) webContents.reload()
          else webContents.close()
        })
    })
  }
  const childProcessGone = (
    window: BrowserWindow,
    listener?: (event: Event, details: Details) => void,
  ) => {
    app.on('child-process-gone', (event, details) => {
      if (listener) {
        listener(event, details)
        return
      }
      const message = {
        title: '',
        buttons: [],
        message: '',
      }
      switch (details.type) {
        case 'GPU':
          switch (details.reason) {
            case 'crashed':
              message.title = 'Предупреждение'
              message.buttons = ['Ок', 'Отмена']
              message.message =
                'Произошёл сбой в процессе аппаратного ускорения. Хотите отключить аппаратное ускорение и перезапустить?？'
              break
            case 'killed':
              message.title = 'Предупреждение'
              message.buttons = ['Ок', 'Отмена']
              message.message =
                'Процесс аппаратного ускорения был неожиданно прерван. Хотите отключить аппаратное ускорение и перезапустить компьютер?？'
              break
            default:
              break
          }
          break

        default:
          break
      }
      dialog
        .showMessageBox(window, {
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true,
        })
        .then((res) => {
          // Используйте этот параметр для отключения режима ускорения видеокарты в случае сбоя видеокарты.
          if (res.response === 0) {
            if (details.type === 'GPU') app.disableHardwareAcceleration()
            window.reload()
          } else {
            window.close()
          }
        })
    })
  }

  const mainWindowGone = (window: BrowserWindow, listener?: () => void) => {
    window.on('unresponsive', () => {
      if (listener) {
        listener()
        return
      }
      dialog
        .showMessageBox(window, {
          type: 'warning',
          title: 'Предупреждение',
          buttons: ['Перегрузка', 'Отмена'],
          message:
            'Графический процесс перестал отвечать. Стоит ли ждать его возобновления?？',
          noLink: true,
        })
        .then((res) => {
          if (res.response === 0) window!.reload()
          else window!.close()
        })
    })
  }
  return {
    renderProcessGone,
    childProcessGone,
    mainWindowGone,
  }
}
