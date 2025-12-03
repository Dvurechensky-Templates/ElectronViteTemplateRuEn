import type { ProgressInfo } from "electron-updater";

export interface IpcMainEventListener<Send = void, Receive = void> {
  ipcMainHandle: Send extends void
    ? (event: Electron.IpcMainInvokeEvent) => Receive | Promise<Receive>
    : (
        event: Electron.IpcMainInvokeEvent,
        args: Send
      ) => Receive | Promise<Receive>;
  ipcRendererInvoke: Send extends void
    ? () => Promise<Receive>
    : (args: Send) => Promise<Receive>;
}

export interface IpcRendererEventListener<Send = void> {
  ipcRendererOn: Send extends void
    ? (event: Electron.IpcRendererEvent) => void
    : (event: Electron.IpcRendererEvent, args: Send) => void;
  webContentSend: Send extends void
    ? (webContents: Electron.WebContents) => void
    : (webContents: Electron.WebContents, args: Send) => void;
}

export class IpcChannelMainClass {
  IsUseSysTitle: IpcMainEventListener<void, boolean> = null;
  /**
   * Выйти из приложения
   */
  AppClose: IpcMainEventListener = null;
  CheckUpdate: IpcMainEventListener = null;
  ConfirmUpdate: IpcMainEventListener = null;
  OpenMessagebox: IpcMainEventListener<
    Electron.MessageBoxOptions,
    Electron.MessageBoxReturnValue
  > = null;
  StartDownload: IpcMainEventListener<string> = null;
  OpenErrorbox: IpcMainEventListener<{ title: string; message: string }> = null;
  StartServer: IpcMainEventListener<void, string> = null;
  StopServer: IpcMainEventListener<void, string> = null;
  HotUpdate: IpcMainEventListener = null;
  /**
   * Окно готово
   */
  WinReady: IpcMainEventListener = null;
  /**
   *
   * Открытое окно
   */
  OpenWin: IpcMainEventListener<{
    /**
     * Адрес нового окна
     *
     * @type {string}
     */
    url: string;

    /**
     * Это страница оплаты?
     *
     * @type {boolean}
     */
    IsPay?: boolean;

    /**
     * Параметры платежа
     *
     * @type {string}
     */
    PayUrl?: string;

    /**
     * Отправить данные новой страницы
     *
     * @type {unknown}
     */
    sendData?: unknown;
  }> = null;
}
export class IpcChannelRendererClass {
  // ipcRenderer
  DownloadProgress: IpcRendererEventListener<number> = null;
  DownloadError: IpcRendererEventListener<Boolean> = null;
  DownloadPaused: IpcRendererEventListener<Boolean> = null;
  DownloadDone: IpcRendererEventListener<{
    /**
     * Путь к загруженному файлу
     *
     * @type {string}
     */
    filePath: string;
  }> = null;
  updateMsg: IpcRendererEventListener<{
    state: number;
    msg: string | ProgressInfo;
  }> = null;
  UpdateProcessStatus: IpcRendererEventListener<{
    status:
      | "init"
      | "downloading"
      | "moving"
      | "finished"
      | "failed"
      | "download";
    message: string;
  }> = null;

  SendDataTest: IpcRendererEventListener<unknown> = null;
  BrowserViewTabDataUpdate: IpcRendererEventListener<{
    bvWebContentsId: number;
    title: string;
    url: string;
    status: 1 | -1; // 1 Добавить/Обновить -1 Удалить
  }> = null;
  BrowserViewTabPositionXUpdate: IpcRendererEventListener<{
    dragTabOffsetX: number;
    positionX: number;
    bvWebContentsId: number;
  }> = null;
  BrowserTabMouseup: IpcRendererEventListener = null;
  HotUpdateStatus: IpcRendererEventListener<{
    status: string;
    message: string;
  }> = null;
}
