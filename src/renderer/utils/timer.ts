/**
 * Таймер
 * Поддерживает цепочку вызовов
 * timeout()
 *  .then(()=>{
 *     return inTheEnd();
 *   })
 *  .then(()=>{
 *      return inTheEnd();
 *   });
 *
 * @date 2019-11-25
 */
class Timer {
  /**
   * Задержка операции
   * @returns {void}
   * @date 2019-11-25
   */
  timeout(interval: number, args?: any): Promise<Timer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(args)
      }, interval)
    })
  }

  /**
   * Выполнять только после завершения выполнения фрагмента кода.
   * @returns {void}
   * @date 2019-11-25
   */
  inTheEnd(): Promise<Timer> {
    return this.timeout(0)
  }

  /**
   * Цикл хронометрируется, и обратный вызов выполняется перед переходом к следующей итерации.
   * @param {Number} interval Интервал выполнения
   * @param {Function} [callback] Перезвонить
   * @returns {Object}
   * @date 2019-11-25
   */
  interval(interval: number, callback: Function) {
    this.timeout(interval).then(() => {
      typeof callback === 'function' &&
        callback() !== false &&
        this.interval(interval, callback)
    })
    return { then: (c) => (callback = c) }
  }

  /**
   * Время, в миллисекундах
   * @returns {void}
   * @date 2019-11-29
   */
  start() {
    const startDate = new Date()
    return {
      stop() {
        const stopDate = new Date()
        return stopDate.getTime() - startDate.getTime()
      },
    }
  }
}

export default new Timer()
