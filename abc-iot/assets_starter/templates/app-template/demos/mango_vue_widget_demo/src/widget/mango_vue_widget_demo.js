var mango_vue_widget_demo = StudioWidgetWrapper.extend({
  /*
     * Triggered when initializing a widget and will have the code that invokes rendering of the widget
     */
  init: function () {
    var thisObj = this
    thisObj._super.apply(thisObj, arguments)
    thisObj.initLib()
    thisObj.initComponent()
    thisObj.render()
    if ((typeof (Studio) !== 'undefined') && Studio) {
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

      $(elem).append(containerDiv)

      var i18n = HttpUtils.getI18n({
        locale: HttpUtils.getLocale(),
        messages: thisObj.getMessages()
      })

      var vm = new Vue({
        el: $('#mango_vue_widget_demo', elem)[0],
        template: '<mango_vue_widget_demo_component ref="component" v-bind="widgetProperties"></mango_vue_widget_demo_component>',
        i18n: i18n,
        widget: thisObj,
        studio: Studio,
        data: {
          widgetProperties: Object.assign({}, widgetProperties)
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

  initLib: function () {
    var WidgetPlugin = {
      install: function (Vue, options) {
        Vue.mixin({
          beforeCreate: widgetPluginInit
        })

        function widgetPluginInit () {
          const options = this.$options

          if (options.widget) {
            this.$widget = options.widget
          } else if (options.parent && options.parent.$widget) {
            this.$widget = options.parent.$widget
            const props = options.props || {}
            let propsData = Object.assign({}, options.propsData)
            Object.keys(props).forEach(propName => {
              const propValue = props[propName]
              let propsDataValue = propsData[propName]
              const type = Array.isArray(propValue.type) ? (propValue.type.length > 0 ? propValue.type[0] : String) : propValue.type
              if (propsDataValue) {
                if (!type || type === String) {
                  propsData[propName] = String(propsDataValue)
                } else if (type === Boolean) {
                  propsData[propName] = !!((propsDataValue === 'true' || propsDataValue === true))
                } else if (type === Number) {
                  propsData[propName] = Number.isNaN(Number(propsDataValue)) ? 0 : Number(propsDataValue)
                } else if (type === Array) {
                  propsData[propName] = Array.isArray(propsDataValue) ? propsDataValue : String(propsDataValue).split(';')
                }
              }
            })
            options.propsData = propsData
          }

          if (options.studio) {
            this.$studio = options.studio
          } else if (options.parent && options.parent.$studio) {
            this.$studio = options.parent.$studio
          }
        }

        Vue.prototype.$getConnectorInstanceByName = function (name) {
          if (this.$widget && name) {
            return this.$widget.getConnectorInstanceByName(name)
          }
        }

        Vue.prototype.$registerEvents = function (name, label, params) {
          if (this.$widget && this.$studio) {
            this.$studio.registerEvents(this.$widget, name, label, params || [])
          }
        }
        Vue.prototype.$registerAction = function (name, label, cbk) {
          if (this.$widget && this.$studio) {
            this.$studio.registerAction(this.$widget, name, label, [], $.proxy(cbk, this.$widget), [])
          }
        }
        Vue.prototype.$triggerEvent = function (name, params) {
          if (this.$widget) {
            this.$widget.triggerEvent(name, params)
          }
        }
      }
    }

    Vue.use(WidgetPlugin)
  },

  initComponent: function () {
    !(function (e, t) {}())
  }
})
