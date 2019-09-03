
var mango_widget_demo = mango_widget_demo.extend({
  /*
     * Config to define Widget Properties
     */
  propertiesConfig: [{
    'config': [{
      'type': 'text',
      'name': 'textProperty',
      'label': 'Text Property',
      'value': 'text'
    },
    {
      'type': 'checkbox',
      'name': 'checkProperty',
      'label': 'Check Property',
      'value': 'true'
    },
    {
      'type': 'select',
      'name': 'selectProperty',
      'label': 'Select Property',
      'options': [{
        'label': 'option1',
        'value': 'option1',
        'selected': 'true'
      },
      {
        'label': 'option2',
        'value': 'option2'
      }
      ]
    },
    {
      'type': 'text',
      'name': 'pageMacroProperty',
      'label': 'Page Macro Property',
      'value': '${pm.pageMacro}'
    },
    {
      'type': 'connectorV2',
      'name': 'bridgeProperty',
      'model': 'ViewModel',
      'label': 'Widget Bridge',
      'value': ''
    }
    ]
  }],

  /*
     * Triggered when the user Creates a new widget and used to initialize the widget properties
     */
  create: function (cbk) {
    if (cbk) {
      this._super()
      cbk()
    }
  }
})

var params = {}
Studio.registerWidget('mango_widget_demo', 'mango_widget_demo', params)
