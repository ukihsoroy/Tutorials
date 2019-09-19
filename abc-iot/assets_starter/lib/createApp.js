const fs = require('fs')
const chalk = require('chalk')
const Handlebars = require('handlebars')
const validateProjectName = require('validate-npm-package-name')
const logUtils = require('./util/logUtils')
const { APPTEMPLATEPATH } = require('./util/consts')

async function createApp (projectName) {
  const targetDir = `${process.env.CURR_DIR}/${projectName}`
  if (fs.existsSync(targetDir)) {
    logUtils.error(chalk.red(`Target directory ${chalk.cyan(targetDir)} has already exists, please input a new one`))
  }

  const result = validateProjectName(projectName)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${projectName}"`))
    result.errors && result.errors.forEach(err => {
      logUtils.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      logUtils.error(chalk.red.dim('Warning: ' + warn))
    })
  }

  fs.mkdirSync(targetDir)

  // copy apptemplate files
  createDirectoryContents(APPTEMPLATEPATH, targetDir)

  // replace package name
  var template = Handlebars.compile(fs.readFileSync(`${targetDir}/package.json`, 'utf8'))
  var data = {
    'name': projectName
  }
  var newPackageContent = template(data)
  fs.writeFileSync(`${targetDir}/package.json`, newPackageContent)

  console.log(chalk.green(projectName + ' has been created succesfully, execute the following command to initialize the project, and refer to README.md for more information:' + '\r\n\r\n  ' + 'cd ' + projectName + ' && yarn run bootstrap'))
}

function createDirectoryContents (templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`
    const stats = fs.statSync(origFilePath)
    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')

      const writePath = `${newProjectPath}/${file}`
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${newProjectPath}/${file}`)
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`)
    }
  })
}

module.exports = (...args) => {
  return createApp(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to build packages', err)
  })
}
