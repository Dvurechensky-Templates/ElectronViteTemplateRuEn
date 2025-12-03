/**
 * power by biuuu
 */

import chalk from 'chalk'
import { join } from 'path'
import {
  ensureDir,
  emptyDir,
  copy,
  outputJSON,
  remove,
  stat,
  readFile,
} from 'fs-extra'
import { BinaryLike, createHmac } from 'crypto'
import AdmZip from 'adm-zip'
import packageFile from '../package.json'
import buildConfig from '../build.json'
import config from '../config'
import { okayLog, errorLog, doneLog } from './log'

const buildPath = join('.', 'dist', 'electron')

const hash = (data: BinaryLike, type = 'sha256') => {
  const hmac = createHmac(type, 'Sky')
  hmac.update(data)
  return hmac.digest('hex')
}

const createZip = (filePath: string, dest: string) => {
  const zip = new AdmZip()
  zip.addLocalFolder(filePath, '')
  zip.toBuffer()
  zip.writeZip(dest)
}

const start = async () => {
  console.log(chalk.green.bold(`Start packing  \n`))

  if (buildConfig.asar) {
    errorLog(
      `${chalk.red(
        'Убедитесь, что параметр build.asar в файле Package.json имеет значение false.',
      )}\n`,
    )
    return
  }

  if (config.build.hotPublishConfigName === '') {
    errorLog(
      `${
        chalk.red(
          'HotPublishConfigName не задан, что приведет к сбою обновления. Задайте его в файле config/index.js. \n',
        ) + chalk.red.bold(`\n  Упаковка не удалась \n`)
      }`,
    )
    process.exit(1)
  }

  stat(join(buildPath, 'main'), async (err, stats) => {
    if (err) {
      errorLog(
        `${chalk.red(
          'Файлы ресурсов не найдены, выполните эту команду после команды сборки.',
        )}\n`,
      )
      return
    }

    try {
      console.log(chalk.green.bold(`Проверьте файлы ресурсов \n`))
      const packResourcesPath = join('.', 'build', 'resources', 'dist')
      const packPackagePath = join('.', 'build', 'resources')
      const resourcesPath = join('.', 'dist')
      const appPath = join('.', 'build', 'resources')
      const name = 'app.zip'
      const outputPath = join('.', 'build', 'update')
      const zipPath = join(outputPath, name)

      await ensureDir(packResourcesPath)
      await emptyDir(packResourcesPath)
      await copy(resourcesPath, packResourcesPath)
      okayLog(chalk.cyan.bold(`Копирование файла завершено \n`))
      await outputJSON(join(packPackagePath, 'package.json'), {
        name: packageFile.name,
        productName: buildConfig.productName,
        version: packageFile.version,
        description: packageFile.description,
        main: packageFile.main,
        author: packageFile.author,
        dependencies: packageFile.dependencies,
      })
      okayLog(chalk.cyan.bold(`Переписать файл пакета полностью \n`))
      await ensureDir(outputPath)
      await emptyDir(outputPath)
      createZip(appPath, zipPath)
      const buffer = await readFile(zipPath)
      const sha256 = hash(buffer)
      const hashName = sha256.slice(7, 12)
      await copy(zipPath, join(outputPath, `${hashName}.zip`))
      await outputJSON(
        join(outputPath, `${config.build.hotPublishConfigName}.json`),
        {
          version: packageFile.version,
          name: `${hashName}.zip`,
          hash: sha256,
        },
      )
      okayLog(
        chalk.cyan.bold(
          `Zip-файл готов, приступайте к очистке ненужных файлов. \n`,
        ),
      )
      await remove(zipPath)
      await remove(appPath)
      okayLog(chalk.cyan.bold(`Очистка ненужных файлов завершена. \n`))
      doneLog('Файл ресурсов упакован!\n')
      console.log('Местоположение файла: ' + chalk.green(outputPath) + '\n')
    } catch (error) {
      errorLog(`${chalk.red(error.message || error)}\n`)
      process.exit(1)
    }
  })
}

start()
