
{{widgetname}} = {{widgetname}}.extend({
    /*
     * Config to define Widget Properties
     */
    propertiesConfig:[{
        config: [
            
        ]
    }],
    
    /*
     * Triggered when the user Creates a new widget and used to initialize the widget properties
     */
    create : function(cbk)
    {
        if(cbk)
        {
            this._super();
            cbk();
        }
    }
});

var params = {};
Studio.registerWidget("{{widgetname}}", "{{widgetname}}", params);