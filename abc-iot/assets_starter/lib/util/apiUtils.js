const axios = require('axios')
const tunnel = require('tunnel')
const AdmZip = require('adm-zip')
const https = require('https')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
const CONFIG = require(path.resolve(process.env.CURR_DIR, 'config'))
const {
  ROOTPATH
} = require('./consts')

const {
  info,
  warning,
  error
} = require('./logUtils')

let agent = new https.Agent({
  rejectUnauthorized: false
})

if (CONFIG.url.includes('com')) {
  agent = tunnel.httpsOverHttp({
    proxy: {
      host: 'proxy.huawei.com',
      port: 8080
    }
  })
}

axios.defaults.baseURL = CONFIG.url

const commonConfig = {
  method: 'post',
  httpsAgent: agent
}

const getConfig = (config) => {
  return Object.assign({}, commonConfig, config)
}

let token = ''
let csrfToken = ''
let currentUser = {}

async function setToken () {
  const getToken = async () => {
    try {
      const response = await axios(getConfig({
        url: '/baas/auth/v1.0/login',
        data: {
          'username': CONFIG.username,
          'password': CONFIG.password
        }
      }))
      if (response && response.data) {
        if (response.data.resCode === '0') {
          token = response.data.result.token

          const csrfResponse = await axios(getConfig({
            url: '/u-route/baas/sys/v1.0/csrf/get',
            headers: {
              'access-token': token
            }
          }))
          if (csrfResponse && csrfResponse.data && csrfResponse.data.resCode === '0') {
            csrfToken = csrfResponse.data.result
          }
        } else {
          warning(response.data.resMsg)
        }
      } else {
        error('Error getting token')
      }
    } catch (err) {
      error('Error getting token' + err)
    }
  }
  await getToken()
  setInterval(getToken, 10 * 60 * 1000 /* 10分钟更新一次token */)
}

async function getCurrentuser () {
  if (!currentUser.tenantName) {
    try {
      const response = await axios(getConfig({
        url: '/u-route/baas/sys/v1.0/currentuser',
        method: 'get',
        headers: {
          'access-token': token
        }
      }))
      if (response && response.data && response.data.resCode === '0') {
        currentUser = response.data.result
      }
    } catch (err) {
      error('Error getting currentuser')
    }
  }
  return currentUser
}

async function getWidgetNameList () {
  let widgetsReturn = {
    widgetLibraryArray: [],
    widgetLibraryMap: {}
  }
  try {
    debugger
    const response = await axios(getConfig({
      url: '/magno/gallery/asset/plugin/widget?light=true&groupByTenant=true',
      method: 'get',
      headers: {
        'access-token': token
      }
    }))
    if (response && response.data) {
      if (response.data.responseCode === 0) {
        const content = response.data.content
        const partnername = Object.keys(content).find(item => item !== 'globalpartner')
        const widgetList = content[partnername];
        (widgetList || []).reduce((widgets, current) => {
          widgets.widgetLibraryArray.push({
            name: current.libraryId,
            value: current.libraryId,
            short: `${current.pluginDescription} v${current.pluginVersion}`
          })
          widgets.widgetLibraryMap[current.libraryId] = current
          return widgets
        }, widgetsReturn)
        widgetsReturn.widgetLibraryArray.sort((first, second) => {
          var firstname = first.name.toUpperCase()
          var secondname = second.name.toUpperCase()
          if (firstname < secondname) {
            return -1
          }
          if (firstname > secondname) {
            return 1
          }
          return 0
        })
      } else {
        error('Error getting widgetNameList')
      }
    } else {
      error('Error getting widgetNameList')
    }
  } catch (err) {
    error('Error getting widgetNameList' + err)
  }
  return widgetsReturn
}

async function downloadWidget (url) {
  if (!url.toLowerCase().startsWith('https')) {
    url = 'https:' + url
  }
  const response = await axios({
    url: url,
    responseType: 'stream',
    httpsAgent: agent,
    method: 'get'
  })
  const zipTempName = `${ROOTPATH}/temp.zip`
  return new Promise(function (resolve, reject) {
    const writer = fs.createWriteStream(zipTempName)
    response.data.pipe(writer).on('finish', () => {
      var widgetZip = new AdmZip(zipTempName)
      var zipEntries = widgetZip.getEntries()
      zipEntries.forEach(function (zipEntry) {
        if (zipEntry.entryName === 'packageinfo.json') {
          const packageinfo = JSON.parse(zipEntry.getData().toString('utf8'))
          const widgetName = packageinfo.widgetApi[0].name
          const isVuecomponent = (zipEntries.findIndex(function (entry) {
            return entry.name === `${widgetName}.vue`
          }) !== -1)
          resolve({
            zipTempName,
            widgetZip,
            widgetName,
            isVuecomponent
          })
        }
      })
    })
  })
}

async function publishWidget ({
  zip,
  zipName,
  name,
  libraryId,
  pluginId
}) {
  let response
  try {
    let form = new FormData()

    form.append('file', fs.createReadStream(zip), {
      filename: zipName
    })
    form.append('name', name)
    form.append('description', '')
    form.append('links', '')
    form.append('documentation', '')
    form.append('identifier', libraryId)
    if (pluginId) {
      form.append('id', pluginId)
    }
    let headers = form.getHeaders()
    headers['access-token'] = token
    headers['csrf-token'] = csrfToken

    response = await axios(getConfig({
      url: '/magno/gallery/asset/widget',
      headers: headers,
      data: form
    }))
    if (response && response.data && response.data.responseCode === 0) {
      info('Publish widget succesfully')
    } else {
      error('Error publishing widget')
    }
  } catch (err) {
    error('Error publishing widget', err)
  }
  return response
}

module.exports = {
  setToken,
  getCurrentuser,
  getWidgetNameList,
  downloadWidget,
  publishWidget
}
