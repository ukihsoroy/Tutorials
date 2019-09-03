import Vue from 'vue'
import VueI18n from 'vue-i18n'
import 'theme-chalk'
import {
  Widget,
  Studio,
  storiesOf,
  withKnobs
} from 'magno'
import WidgetComponent from './{{widgetname}}.vue'

const stories = storiesOf('Widgets/{{widgetname}}', module)
stories.addDecorator(withKnobs)

Vue.use(VueI18n)

stories
  .add('default', () => ({
    components: {
      WidgetComponent
    },
    template: '<widget-component></widget-component>',
    props: {

    },
    widget: new Widget(),
    Studio: Studio
  }))
