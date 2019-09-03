var renamer = require('metalsmith-renamer')
module.exports = {
  'metalsmith': function (metalsmith, opts, helpers) {
    metalsmith.use(renamer({
      vuename: {
        pattern: 'src/**/component-template.vue',
        rename: function (fileName) {
          return metalsmith.metadata().name + '.vue'
        }
      },
      storyname: {
        pattern: 'src/**/component-template.stories.js',
        rename: function (fileName) {
          return metalsmith.metadata().name + '.stories.js'
        }
      },
      jsonname: {
        pattern: 'src/**/component-template.json',
        rename: function (fileName) {
          return metalsmith.metadata().name + '.json'
        }
      }
    }))
  }
}
