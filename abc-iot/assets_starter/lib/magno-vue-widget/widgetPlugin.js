import Vue from 'vue'

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
