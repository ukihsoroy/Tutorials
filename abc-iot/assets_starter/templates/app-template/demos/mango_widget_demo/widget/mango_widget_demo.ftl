<div id="mango_widget_demo">
   <div>
      <p>Widget properties:</p>
      <div style="margin:20px">
        <p>textProperty: {{textProperty}}</p>
        <p>checkProperty: {{checkProperty}}</p>
        <p>selectProperty: {{selectProperty}}</p>
		<p>pageMacroProperty: {{pageMacroProperty}}</p>
      </div>
    </div>
    <div>
      <p>Bridge:</p>
      <div style="margin:20px">
        <button @click="callApi">call api</button>
        <p>{{apiResult}}</p>
      </div>
    </div>
    <div>
      <p>Event & Action:</p>
      <div style="margin:20px">
        <input v-model="sendData" >
        <button @click="send">trigger event</button>
        <input v-model="receiveData" >
      </div>
    </div>
    <div>
      <p>Internationalization:</p>
      <div style="margin:20px">{{$t('hello')}}</div>
    </div>
</div>