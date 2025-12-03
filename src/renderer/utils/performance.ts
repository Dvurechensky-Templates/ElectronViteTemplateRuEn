/**
 * Инструменты производительности
 * 1. Время выполнения метода расчета
 * @returns {void}
 * @date 2019-11-29
 */

import { memoryInfo } from 'customTypes/global'
import Timer from './timer'

class Performance {
  /**
   * Расчетная ситуация
   * @returns {Function}  Возвращаемое значение выполнения для получения информации о времени
   * @date 2019-11-29
   */
  startExecute(name = ''): Function {
    const timer = Timer.start()
    const usedJSHeapSize = this.getMemoryInfo().usedJSHeapSize
    return (name2 = '') => {
      const executeTime = timer.stop()
      const endMemoryInfo = this.getMemoryInfo()
      console.log(
        '%cПроизводительность%c \n1. Путь маршрутизации：%c%s%c\n2. Время выполнения： %c%sms%c \n3. Колебания памяти：%sB \n4. Выделенная память： %sMB \n5. Используемая память：%sMB \n6. Оставшаяся память： %sMB',
        'padding: 2px 4px 2px 4px; background-color: #4caf50; color: #fff; border-radius: 4px;',
        '',
        'color: #ff6f00',
        `${name} ${name2}`,
        '',
        'color: #ff6f00',
        executeTime,
        '',
        endMemoryInfo.usedJSHeapSize - usedJSHeapSize,
        this.toMBSize(endMemoryInfo.jsHeapSizeLimit),
        this.toMBSize(endMemoryInfo.usedJSHeapSize),
        this.toMBSize(endMemoryInfo.totalJSHeapSize),
      )
    }
  }

  /**
   * Получить информацию о памяти
   * @returns {memoryInfo}
   * @date 2019-11-29
   */

  getMemoryInfo(): memoryInfo {
    let memoryinfo = <memoryInfo>{}
    if (window.performance && window.performance.memory) {
      memoryinfo = window.performance.memory
    }
    return memoryinfo
  }

  /**
   * Конвертировать в МБ
   * @returns {string}
   * @date 2019-11-29
   */
  toMBSize(byteSize: number): string {
    return (byteSize / (1024 * 1024)).toFixed(1)
  }
}

export default new Performance()
