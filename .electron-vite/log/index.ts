import chalk from 'chalk'

export const doneLog = (text: string) => {
  console.log('\n' + chalk.bgGreen.white(' ЗАВЕРШЕНО ') + ' ' + text)
}
export const errorLog = (text: string) => {
  console.log('\n ' + chalk.bgRed.white(' ОШИБКА ') + ' ' + text)
}
export const okayLog = (text: string) => {
  console.log('\n ' + chalk.bgBlue.white(' ОК ') + ' ' + text)
}
export const warningLog = (text: string) => {
  console.log('\n ' + chalk.bgYellow.white(' ПРЕДУПРЕЖДЕНИЕ ') + ' ' + text)
}
export const infoLog = (text: string) => {
  console.log('\n ' + chalk.bgCyan.white(' ИНФОРМАЦИЯ ') + ' ' + text)
}
