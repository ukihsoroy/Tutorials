(function () {
  var constructSchemaUrl = function (flowName) {
    var url = new HttpUtils.URL('/')
      .appendPath(ConnectorToolkit.getBasePath())
      .appendPath('/metadata/v1.0/Flow')
      .appendParam('name=' + flowName)
      .appendParam('flag=Describe').toString()
    return url
  }
  /*
     var constructSchemaUrl = function (flowName) {
     var flowId;
     var url = new HttpUtils.URL('/')
     .appendPath(ConnectorToolkit.getBasePath())
     .appendPath("/u-route/baas/metadata/v1.0/Flow")
     .appendParam("like=false", "name=" + flowName)
     .toString();
     $.ajax(url, ConnectorToolkit.getAjaxOptions({
     data: JSON.stringify({}),
     dataType: 'json',
     type: 'get',
     async: false
     })).done(function (resp) {
     if (resp.result && resp.result.length) {
     flowId = resp.result[0].id;
     } else {
     throw new Error(`The flow "${flowName}" does not exist.`);
     }
     });
     var url = new HttpUtils.URL('/')
     .appendPath(ConnectorToolkit.getBasePath())
     .appendPath("/u-route/baas/metadata/v1.0/Flow")
     .appendParam('name=' + flowName)
     .appendParam('flag=Describe').toString();
     return url;
     } */

  var constructDataUrl = function (flowName, params) {
    var isApi = params ? params.endpoint == 'api' : false
    var url = new HttpUtils.URL('/')
      .appendPath(isApi ? 'service' : ConnectorToolkit.getBasePath())
      .appendPath(isApi ? null : '/flow/v1.0/run/')
      .appendPath(isApi ? params.prefix : null) // mapping to version field of customer api.
      .appendPath(flowName)
      .toString()
    return url
  }

  this.FlowConnector = ConnectorWrapper.extend(
    {
      init: function () {
        this.setInputParams([
          {
            'type': 'select',
            'name': 'requestMethod',
            'label': 'Request Method',
            'options': [
              {
                'label': 'post',
                'value': 'post',
                'selected': 'true'
              },
              {
                'label': 'get',
                'value': 'get'
              }],
            'validation': {
              'rules': {}
            }
          },
          {
            'type': 'select',
            'name': 'endpoint',
            'label': 'Endpoint',
            'options': [
              {
                'label': 'Flow',
                'value': 'flow',
                'selected': 'true'
              },
              {
                'label': 'Api',
                'value': 'api'
              }],
            'validation': {
              'rules': {}
            }
          },
          {
            'type': 'text',
            'name': 'prefix',
            'label': 'Suffix', // 先临时按后缀的方式处理，等万宝改好后，再改回成前缀。
            'value': '',
            'validation': {
              'rules': {}
            }
          }])
      },
      transform: function (resultData, renderCbk) {
        var thisObj = this
        var modelObj = {}
        modelObj.resp = { code: resultData.resCode, message: resultData.resMsg }
        if (resultData.resCode == 0) {
          var needSchema = thisObj.getInputParams().needSchema || 'data'
          if (needSchema == 'schema') {
            var schema = resultData
            modelObj.schema = ConnectorToolkit.convertSchema(schema)
          } else if (needSchema == 'data') {
            modelObj.data = resultData.result
          } else if (needSchema == 'both') {
            var url = constructSchemaUrl(thisObj.getInputParams().service)
            $.ajax(url, ConnectorToolkit.getAjaxOptions({
              data: JSON.stringify(thisObj.getRequestParams()),
              dataType: 'json',
              type: 'get',
              async: thisObj.getInputParams().async
            })).done(function (schemaResp) {
              modelObj.data = resultData.result
              modelObj.schema = ConnectorToolkit.toJsonSchema(schemaResp)
              renderCbk(modelObj)
            })
            return
          }
        }
        renderCbk(modelObj)
      },

      constructUrl: function (requestParams) {
        var needSchema = this.getInputParams().needSchema
        var requestMethod = this.getConnectorParams().requestMethod || 'post'
        var url
        if (needSchema == 'schema') {
          url = constructSchemaUrl(this.getInputParams().service)
          this.setLoadMethod('get', 'json', '', '',
            ConnectorToolkit.getAjaxOptions({ data: JSON.stringify(requestParams) }))
        } else if (needSchema == 'data' || needSchema == 'both') {
          url = constructDataUrl(this.getInputParams().service, this.getConnectorParams())
          this.setLoadMethod(requestMethod, 'json', '', '',
            ConnectorToolkit.getAjaxOptions({ data: requestMethod == 'get' ? requestParams : JSON.stringify(requestParams) }))
        }
        this.setUrl(url)
      }
    })

  StudioWidgetWrapper.prototype.getConnectorInstanceByName = function (connectorName) {
    let thisObj = this
    var connectorInstance = null
    $.ajax({
      url: './mock/' + connectorName + '.json',
      async: false,
      success: function () {
        connectorInstance = {
          connectorParams: {},
          process: function (successCbk, errorCbk) {
            $.ajax({
              url: './mock/' + connectorName + '.json',
              dataType: 'json',
              success: function (data) {
                successCbk && successCbk(data)
              },
              error: function () {
                console.log('error')
                errorCbk && errorCbk()
              }
            })
          }
        }
      },
      error: function () {
        connectorInstance = new FlowConnector()
        connectorInstance.setConnectorParams({
          requestMethod: 'post',
          endpoint: 'api',
          prefix: ''
        })
      }
    })
    return connectorInstance
  }
})()
