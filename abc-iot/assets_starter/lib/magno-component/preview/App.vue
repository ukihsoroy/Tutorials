<template>
  <div
    class="dark"
    style=""
  >
    <statistical-configuration />
  </div>
</template>

<script>

import { path, mapValues, omitBy, flow } from 'lodash/fp'

import statisticalConfiguration from '@/components/component'
import statisticalConfigurationDesign from '@/components/component/design-time'

const cssprefix = 'statisticalConfiguration'

const getDefaultValuesFromDefinition = flow(
  path('definition.props.properties'),
  mapValues('default'),
  omitBy(val => val === undefined)
)

export default {
  components: {
    statisticalConfiguration
  },
  data () {
    return {
      currentNode: {
        props: getDefaultValuesFromDefinition(statisticalConfigurationDesign)
      },
      isMaskLayerShow: true
    }
  },
  computed: {
    classes () {
      return cssprefix
    }
  }
}
</script>

<style>

</style>
