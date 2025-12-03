'use strict'

import { app, session } from 'electron'
import InitWindow from './services/window-manager'
import { useDisableButton } from './hooks/disable-button-hook'
import { useProcessException } from '@main/hooks/exception-hook'
import { useMenu } from '@main/hooks/menu-hook'
import { useMainDefaultIpc } from './services/ipc-main'

function onAppReady() {
  const { disableF12 } = useDisableButton()
  const { renderProcessGone } = useProcessException()
  const { defaultIpc } = useMainDefaultIpc()
  const { creactMenu } = useMenu()
  disableF12()
  renderProcessGone()
  defaultIpc()
  creactMenu()
  new InitWindow().initWindow()
  if (process.env.NODE_ENV === 'development') {
    const { VUEJS_DEVTOOLS } = require('electron-devtools-vendor')
    session.defaultSession.extensions.loadExtension(VUEJS_DEVTOOLS, {
      allowFileAccess: true,
    })
    console.log('Установлено: vue-devtools')
  }
}

app.whenReady().then(onAppReady)
// Из-за проблем в версии 9.x необходимо добавить эту конфигурацию для отключения проблем с кросс-источниками.
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

app.on('window-all-closed', () => {
  // Все платформы закроют программное обеспечение после закрытия всех окон.
  app.quit()
})
app.on('browser-window-created', () => {
  console.log('Окно создано')
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.removeAsDefaultProtocolClient('electron-vue-template')
    console.log(
      'Ввиду особой природы фреймворка его невозможно использовать в среде разработки.',
    )
  }
} else {
  app.setAsDefaultProtocolClient('electron-vue-template')
}
