<template>
  <div>
    <div>
      <p>Widget properties:</p>
      <div style="margin:20px">
        <p>textProperty: {{ textProperty }}</p>
        <p>checkProperty: {{ checkProperty }}</p>
        <p>numberProperty: {{ numberProperty }}</p>
        <p>arrayProperty: {{ arrayProperty }}</p>
        <p>selectProperty: {{ selectProperty }}</p>
      </div>
    </div>
    <div>
      <p>Bridge:</p>
      <div style="margin:20px">
        <button @click="callApi">
          call api
        </button>
        <p>{{ apiResult }}</p>
      </div>
    </div>
    <div>
      <p>Event & Action:</p>
      <div style="margin:20px">
        <input v-model="sendData">
        <button @click="send">
          trigger event
        </button>
        <input v-model="receiveData">
      </div>
    </div>
    <div>
      <p>Internationalization:</p>
      <div style="margin:20px">
        {{ $t('hello') }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    textProperty: {
      type: String,
      default: 'text'
    },
    checkProperty: {
      type: Boolean,
      default: true
    },
    numberProperty: {
      type: Number,
      default: 10
    },
    arrayProperty: {
      type: Array,
      default: []
    },
    selectProperty: {
      type: String,
      default: 'option1'
    },
    bridgeProperty: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      sendData: '',
      receiveData: '',
      apiResult: ''
    }
  },
  mounted: function () {
    this.$registerEvents('sendEvent', 'Send Event', [])
    this.$registerAction('receiveAction', 'Receive Action', this.receiveAction)
  },
  methods: {
    send () {
      this.$triggerEvent('sendEvent', {
        param: this.sendData
      })
    },
    receiveAction (data) {
      this.receiveData = data.eventParam.param
    },
    callApi () {
      this.callFlowConn('bridgeProperty', { service: 'v1.0/test', needSchema: 'data' }, result => {
        if (result.resp.code == '0') {
          this.apiResult = result.data[0].name
        }
      })
    },
    callFlowConn: function (connectorName, inputParam, callbackFunc) {
      var connector = this.$getConnectorInstanceByName('bridgeProperty')
      if (connector) {
        connector.setInputParams(inputParam)
        connector.query()
          .done(result => {
            callbackFunc.call(this, result)
          }).fail(function (err) {
            console.log(err)
          })
      }
    }
  }
}
</script>

<i18n>
  en-US:
    hello: "hello world!"
  zh-CN:
    hello: "你好！"
</i18n>
