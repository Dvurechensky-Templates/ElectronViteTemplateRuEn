// Следует ли разделить код в файле ipc-main.ts на несколько файлов? Должен ли он быть реализован с использованием абстрактного наследования? Или следует зарегистрировать функции обратного вызова?
import { ipcMain } from 'electron'
import { IpcMainHandleClass } from './ipc-main-handle'

export const useMainDefaultIpc = () => {
  return {
    defaultIpc: () => {
      const ipcMainHandle = new IpcMainHandleClass()
      Object.entries(ipcMainHandle).forEach(
        ([ipcChannelName, ipcListener]: [string, () => void]) => {
          console.log('IPCChannelName уже смонтирован:', ipcChannelName)
          if (typeof ipcListener === 'function') {
            ipcMain.handle(ipcChannelName, ipcListener)
          }
        },
      )
    },
  }
}
