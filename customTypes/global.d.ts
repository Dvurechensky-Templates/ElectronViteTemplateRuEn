import { ipcRenderer, shell } from "electron";
import type { IIpcRendererInvoke, IIpcRendererOn } from "../src/ipc/index";

/**
 * Процесс рендеринга отправляет сообщения основному процессу
 */
type IpcRendererInvoke = {
  [key in keyof IIpcRendererInvoke]: {
    /**
     * Процесс рендеринга отправляет сообщения основному процессу
     * @param args параметр
     * @returns
     */
    invoke: IIpcRendererInvoke[key];
  };
};

/**
 * События прослушивателя процесса рендеринга
 */
type IpcRendererOn = {
  [key in keyof IIpcRendererOn]: {
    /**
     * События прослушивателя процесса рендеринга
     * @param listener Слушайте события
     * @returns
     */
    on: (listener: IIpcRendererOn[key]) => void;
    /**
     * Процесс рендеринга прослушивает событие один раз.
     * @param listener
     * @returns
     */
    once: (listener: IIpcRendererOn[key]) => void;
    /**
     * Удалить всех слушателей из процесса рендеринга
     * @returns
     */
    removeAllListeners: () => void;
  };
};

interface AnyObject {
  [key: string]: any;
}

interface memoryInfo {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

declare global {
  interface Window {
    performance: {
      memory: memoryInfo;
    };
    /**
     * IPC-канал процесса рендеринга
     * Однако он может только отправлять сообщения основному процессу (вызывать) и прослушивать сообщения от основного процесса (однократно).
     */
    ipcRendererChannel: IpcRendererInvoke & IpcRendererOn;
    systemInfo: {
      platform: string;
      release: string;
      arch: string;
      nodeVersion: string;
      electronVersion: string;
    };
    shell: typeof shell;
    crash: {
      start: () => void;
    };
  }
}
