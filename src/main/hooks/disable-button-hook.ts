import { globalShortcut } from 'electron'

export const useDisableButton = () => {
  const disableF12 = () => {
    globalShortcut.register('f12', () => {
      console.log('Пользователь попытался запустить консоль')
    })
  }
  return {
    disableF12,
  }
}
