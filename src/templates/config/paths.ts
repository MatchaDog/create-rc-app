/**
 * @Author: Hans
 * @Date: 2021-01-12 15:32:25
 * @LastEditTime: 2021-01-12 15:32:52
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/config/paths.ts
 * @Description:
 */
const getPath = (): string => `const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appRoot: resolveApp('./'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appIndex: resolveApp('src/index.tsx'),
  appHtml: resolveApp('public/index.html'),
  appPackage: resolveApp('package.json'),
}`;

export default getPath;
