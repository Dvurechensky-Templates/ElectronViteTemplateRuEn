interface DesktopMsgProps {
  /** Заголовок */
  title: string
  /** Тело */
  body: string
  /** Иконка */
  icon?: string
}

/**
 * @export
 * @Author: Sky
 * @Date: 2019-09-29 20:23:16
 * @Last Modified by: Dvurechensky
 * @Last Modified by: Sky
 * @Last Modified time: 2019-09-29 21:01:24
 * @param {DesktopMsgProps} option
 * @returns
 * @feature Для обычных уведомлений достаточно передать только заголовок и текст; для уведомлений, требующих значок, необходимо также передать значок. Также принимается ссылка на изображение. Когда пользователь нажимает на уведомление, возвращается значение true.
 * Поскольку это обещание, пожалуйста, используйте `then`, чтобы принять его.
 **/

export function DesktopMsg(option: DesktopMsgProps): Promise<boolean> {
  const msgfunc = new window.Notification(option.title, option)
  return new Promise((resolve) => {
    msgfunc.onclick = () => {
      resolve(true)
    }
  })
}
