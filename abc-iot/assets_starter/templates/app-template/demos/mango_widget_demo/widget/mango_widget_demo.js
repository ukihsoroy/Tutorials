var mango_widget_demo = StudioWidgetWrapper.extend({
  /*
     * Triggered when initializing a widget and will have the code that invokes rendering of the widget
     */
  init: function () {
    var thisObj = this
    thisObj._super.apply(thisObj, arguments)
    thisObj.render()
    if ((typeof (Studio) !== 'undefined') && Studio) {
      var sendEventConfig = [{
        'name': 'param',
        'displayName': 'Param'
      }]
      Studio.registerEvents(thisObj, 'sendEvent', 'Send Event', sendEventConfig)
      Studio.registerAction(thisObj, 'receiveAction', 'Receive Action', [], $.proxy(this.receiveActionCbk, this), [])
    }
  },

  /*
     * Triggered from init method and is used to render the widget
     */
  render: function () {
    var thisObj = this
    var widgetProperties = thisObj.getProperties()
    var elem = thisObj.getContainer()
    var items = thisObj.getItems()
    var connectorProperties = thisObj.getConnectorProperties()

    /*
         * API to get base path of your uploaded widget API file
         */
    var widgetBasePath = thisObj.getWidgetBasePath()
    if (elem) {
      var containerDiv = $('.scfClientRenderedContainer', elem)
      if (containerDiv.length) {
        $(containerDiv).empty()
      } else {
        containerDiv = document.createElement('div')
        containerDiv.className = 'scfClientRenderedContainer'
        $(elem).append(containerDiv)
      }

      var i18n = HttpUtils.getI18n({
        locale: HttpUtils.getLocale(),
        messages: thisObj.getMessages()
      })

      thisObj.vm = new Vue({
        el: $('#mango_widget_demo', elem)[0],
        i18n: i18n,
        data: {
          textProperty: widgetProperties.textProperty,
          checkProperty: widgetProperties.checkProperty,
          selectProperty: widgetProperties.selectProperty,
          pageMacroProperty: widgetProperties.pageMacroProperty,
          sendData: '',
          receiveData: '',
          apiResult: ''
        },
        methods: {
				    send () {
            thisObj.triggerEvent('sendEvent', {
              param: this.sendData
            })
          },
          callApi () {
            thisObj.callFlowConn('bridgeProperty', { service: 'v1.0/test', needSchema: 'data' }, result => {
						  if (result.resp.code == '0') {
							 this.apiResult = result.data[0].name
						  }
            })
          }
        }
      })
    }

    /*
         * API to bind global events to the item DOM, it should not be deleted if there will some events to trigger in this widget.
         */
    thisObj.sksBindItemEvent()

    /*
         * API to refresh the previously bound events when a resize or orientation change occurs.
         */
    $(window).resize(function () {
      thisObj.sksRefreshEvents()
    })
  },

  callFlowConn: function (connectorName, inputParam, callbackFunc) {
    var thisObj = this
    var connector = thisObj.getConnectorInstanceByName(connectorName)
    if (connector) {
		  connector.setInputParams(inputParam)
		  connector.query()
        .done(result => {
			  callbackFunc.call(thisObj, result)
        }).fail(function (err) {
			  console.log(err)
        })
    }
  },

  receiveActionCbk: function (data) {
    var thisObj = this
    thisObj.vm.receiveData = data.eventParam.param
  }
})
