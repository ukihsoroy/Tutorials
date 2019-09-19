<template>
  <div>
    {{ $t('hello') }}
  </div>
</template>

<script>
export default {
  data: function () {
    return {

    }
  },
  methods: {

  }
}
</script>

<i18n>
  en-US:
    hello: "hello world!"
  zh_CN:
    hello: "你好！"
</i18n>
