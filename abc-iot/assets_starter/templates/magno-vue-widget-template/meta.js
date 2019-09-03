var renamer = require('metalsmith-renamer')
module.exports = {
  'prompts': {
    name: {
		  type: 'string',
		  required: true,
		  message: 'Widget project name'
    },
    widgetname: {
		  type: 'string',
		  required: false,
		  message: 'Widget name',
		  default: function (answers) {
        return answers.name
		  }
    },
    description: {
		  type: 'string',
		  required: false,
		  message: 'Widget description'
    },
    author: {
		  type: 'string',
		  message: 'Widget Author'
    }
  },
  'skipInterpolation': 'src/widget.vue',
  'metalsmith': function (metalsmith, opts, helpers) {
    metalsmith.use(renamer({
      jsname: {
        pattern: '**/widget.js',
        rename: function (fileName) {
          return metalsmith.metadata().widgetname + '.js'
        }
      },
      editorjsname: {
        pattern: '**/widget.editor.js',
        rename: function (fileName) {
          return metalsmith.metadata().widgetname + '.editor.js'
        }
      },
      ftlname: {
        pattern: '**/widget.ftl',
        rename: function (fileName) {
          return metalsmith.metadata().widgetname + '.ftl'
        }
      },
      cssname: {
        pattern: '**/widget.css',
        rename: function (fileName) {
          return metalsmith.metadata().widgetname + '.css'
        }
      },
      componentname: {
        pattern: '**/widget.vue',
        rename: function (fileName) {
          return metalsmith.metadata().widgetname + '.vue'
        }
      },
      storyname: {
        pattern: '**/widget.stories.js',
        rename: function (fileName) {
          return metalsmith.metadata().widgetname + '.stories.js'
        }
      },
      jsonname: {
        pattern: '**/widget.json',
        rename: function (fileName) {
          return metalsmith.metadata().widgetname + '.json'
        }
      }
    }))
  }
}
