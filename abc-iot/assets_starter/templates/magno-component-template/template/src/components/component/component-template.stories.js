import Vue from 'vue'
import VueI18n from 'vue-i18n'
import 'theme-chalk'
import { storiesOf } from 'magno'
import StandardComponent from './{{name}}.vue'

Vue.use(VueI18n)

storiesOf('Components/{{name}}', module)
  .add('default', () => ({
    components: { StandardComponent },
    template: '<standard-component></standard-component>',
    i18n: new VueI18n()
  }))
