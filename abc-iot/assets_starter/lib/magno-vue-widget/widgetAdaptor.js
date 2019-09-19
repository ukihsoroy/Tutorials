import { action } from '@storybook/addon-actions'
const axios = require('axios')

const StringUtils = {
  String: function (string) {
    var thisObj = this
    if (!(this instanceof StringUtils.String)) {
      return new StringUtils.String(string)
    }
    thisObj.string = (string) || ''
    thisObj.startsWith = function (prefix) {
      return thisObj.string.slice(0, prefix.length) === prefix
    }
    thisObj.endsWith = function (suffix) {
      return thisObj.string.indexOf(suffix, thisObj.string.length - suffix.length) !== -1
    }
    thisObj.trimIfEndsWith = function (str) {
      if (thisObj.string && str && thisObj.endsWith(str)) {
        thisObj.string = thisObj.string.substr(0, thisObj.string.length - str.length)
      }
      return thisObj
    }
    thisObj.trimIfStartsWith = function (str) {
      if (thisObj.string && str && thisObj.startsWith(str)) {
        thisObj.string = thisObj.string.substr(str.length)
      }
      return thisObj
    }
    thisObj.includes = function (str, position) {
      return thisObj.string.indexOf(str, position) > -1
    }
    thisObj.toString = function () {
      return thisObj.string
    }
  }
}

const HttpUtils = {
  URL: function (urlString) {
    var thisObj = this
    if (!(this instanceof HttpUtils.URL)) {
      return new HttpUtils.URL(urlString)
    }
    thisObj.urlString = (urlString) || ''
    var appendWithDelimiter = function (delimiter, str) {
      var newUrlString = StringUtils.String(thisObj.urlString).trimIfEndsWith(delimiter).toString()
      var newStr = StringUtils.String(str).trimIfStartsWith(delimiter).toString()
      thisObj.urlString = newUrlString + delimiter + newStr
    }
    thisObj.appendPath = function () {
      for (var i = 0; i < arguments.length; i++) {
        var str = arguments[i]
        if (str) {
          var delimiter = '/'
          appendWithDelimiter(delimiter, str)
        }
      }
      return thisObj
    }
    thisObj.toString = function () {
      return thisObj.urlString
    }
    thisObj.append = function () {
      for (var i = 0; i < arguments.length; i++) {
        var str = arguments[i]
        if (str) {
          thisObj.urlString += str
        }
      }
      return thisObj
    }
    thisObj.appendParam = function () {
      if (!StringUtils.String(thisObj.urlString).includes('?')) {
        thisObj.urlString += '?'
      }
      for (var i = 0; i < arguments.length; i++) {
        var str = arguments[i]
        if (str) {
          if (new StringUtils.String(thisObj.urlString).endsWith('?')) {
            thisObj.urlString += str
          } else {
            var delimiter = '&'

            appendWithDelimiter(delimiter, str)
          }
        }
      }
      return thisObj
    }
  }
}

let hasTokenFlag = false
let token = ''

Promise.prototype.fail = Promise.prototype.catch
Promise.prototype.done = Promise.prototype.then

async function setToken () {
  if (hasTokenFlag) {
    return
  }
  const getToken = async () => {
    try {
      token = ''
      const response = await axios({
        method: 'post',
        withCredentials: true,
        url: '/baas/auth/v1.0/login',
        data: {
          'username': process.env.loginaccount,
          'password': process.env.password
        }
      })
      if (response && response.data) {
        if (response.data.resCode == '0') {
          ({
            token
          } = response.data.result)
        }
      }
    } catch (err) {

    }
  }
  await getToken()
  hasTokenFlag = true
  setInterval(getToken, 10 * 60 * 1000 /* 10分钟更新一次token */)
}

function constructDataUrl (apiname, params) {
  let isApi = params ? params.endpoint == 'api' : false
  let url = new HttpUtils.URL('/')
    .appendPath(isApi ? 'service' : '/u-route/baas/')
    .appendPath(isApi ? null : '/flow/v1.0/run/')
    .appendPath(isApi ? params.prefix : null) // mapping to version field of customer api.
    .appendPath(apiname)
    .toString()
  return url
}

class FlowConnector {
  constructor () {
    this.url = ''
    this.requestParams = null,
    this.inputParams = {
      service: '',
      async: false
    }
    this.connectorBasePath = ''
    this.connectorParams = {
      endpoint: 'api',
      requestMethod: 'post',
      prefix: ''
    }
    this.connectorPeriod = 0
  }
  setUrl (url) {
    this.url = url
  }
  getInputParams () {
    return this.inputParams
  }
  setInputParams (inputParams) {
    this.inputParams = inputParams
  }
  getConnectorParams () {
    return this.connectorParams
  }
  setConnectorParams (connectorParams) {
    this.connectorParams = connectorParams
  }
  async process (successCbk, errorCbk, params) {
    this.constructDataUrl()
    if (this.url) {
      await setToken()
      const requestMethod = this.getConnectorParams() && this.getConnectorParams().requestMethod
      axios({
        method: requestMethod || 'post',
        url: this.url,
        data: this.requestParams || {},
        headers: {
          'access-token': token
        }
      }).then(function (resp) {
        if (resp.status == 200) {
          const resultData = resp.data
          var modelObj = {}
          modelObj.resp = { code: resultData.resCode, message: resultData.resMsg }
          if (resultData.resCode == 0) {
            modelObj.data = resultData.result
          }
          successCbk && successCbk(modelObj)
        }
      }).catch(function (err) {
        errorCbk && errorCbk(err)
      })
    }
  }
  query (params) {
    let resolveOuter, rejectOuter
    let promise = new Promise(function (resolve, reject) {
      resolveOuter = resolve
      rejectOuter = reject
    })
    this.requestParams = params
    this.process(resolveOuter, rejectOuter, {
      operation: 'query'
    })
    return promise
  }
  mutate (params) {
    let resolveOuter, rejectOuter
    let promise = new Promise(function (resolve, reject) {
      resolveOuter = resolve
      rejectOuter = reject
    })
    this.requestParams = params
    this.process(resolveOuter, rejectOuter, {
      operation: 'mutate'
    })
    return promise
  }
  constructDataUrl (requestParams) {
    let url = constructDataUrl(this.getInputParams().service, this.getConnectorParams())
    this.setUrl(url)
  }
}

class Widget {
  constructor () {

  }
  getConnectorInstanceByName (name) {
    let connectorInstance = new FlowConnector()
    return connectorInstance
  }
  triggerEvent (name, params) {
    action(name)(params)
  }
}

var Studio = {
  registerEvents: function () {

  },
  registerAction: function () {

  }
}

export {
  Widget,
  Studio
}
