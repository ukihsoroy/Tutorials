import Vue from 'vue'
import VueI18n from 'vue-i18n'
import 'theme-chalk'
import {
  Widget,
  Studio,
  storiesOf,
  withKnobs,
  text,
  boolean,
  number,
  array,
  select
} from 'magno'
import WidgetComponent from './mango_vue_widget_demo.vue'

const stories = storiesOf('Demo/mango_vue_widget_demo', module)
stories.addDecorator(withKnobs)

Vue.use(VueI18n)

stories
  .add('default', () => ({
    components: {
      WidgetComponent
    },
    template: '<widget-component :checkProperty="checkProperty" :numberProperty="numberProperty" :arrayProperty="arrayProperty" :textProperty="textProperty" :selectProperty="selectProperty"></widget-component>',
    props: {
      textProperty: {
        default: text('textProperty', 'Hello IOC')
      },
      checkProperty: {
        default: boolean('checkProperty', true)
      },
      numberProperty: {
        default: number('numberProperty', 30)
      },
      arrayProperty: {
        default: array('arrayProperty', [1, 2, 3])
      },
      selectProperty: {
        default: select('selectProperty', {
          Option1: 'option1',
          Option2: 'option2'
        }, 'option1')
      }
    },
    widget: new Widget(),
    Studio: Studio
  }))
