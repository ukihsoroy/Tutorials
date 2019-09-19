var {{widgetname}} = StudioWidgetWrapper.extend({
    /*
     * Triggered when initializing a widget and will have the code that invokes rendering of the widget
     */
    init : function()
    {
        var thisObj = this;
        thisObj._super.apply(thisObj, arguments);
        thisObj.render();
        if((typeof(Studio) != "undefined") && Studio)
        {
            /*
             * Register custom event or action here, and trigger the event afterwards.
             * Studio.registerEvents(thisObj, "{{EVENT_NAME}}", "{{EVENT_DESC}}", {{EVENT_NAME}}EventConfig), 
             * Studio.registerAction(thisObj, "{{ACTION_NAME}}", "{{ACTION_DESC}}", {{ACTION_NAME}}ActionConfig, $.proxy(this.{{ACTION_NAME}}Cbk, this), {{{EVENT_FILTER}}});
             * thisObj.triggerEvent("{{EVENT_NAME}}", {{{TRIGGER_PARAMS}}})
             */
        }
    },
    
    /*
     * Triggered from init method and is used to render the widget
     */
    render : function()
    {
        var thisObj = this;
        var widgetProperties = thisObj.getProperties();
        var elem = thisObj.getContainer();
        var items = thisObj.getItems();
        var connectorProperties = thisObj.getConnectorProperties();
        
        /*
         * API to get base path of your uploaded widget API file
         */
        var widgetBasePath = thisObj.getWidgetBasePath();
        if(elem)
        {
            var containerDiv = $(".scfClientRenderedContainer", elem);
            if(containerDiv.length)
            {
                $(containerDiv).empty();
            }
            else
            {
                containerDiv = document.createElement('div');
                containerDiv.className = "scfClientRenderedContainer";
                $(elem).append(containerDiv);
            }
            
            var i18n = HttpUtils.getI18n({
				locale: HttpUtils.getLocale(),
				messages: thisObj.getMessages()
			});
				
            thisObj.vm = new Vue({
                el: $("#{{name}}", elem)[0],
				i18n: i18n,
                data:{

                },
				methods:{
					
				}
            })
        }
        
        /*
         * API to bind global events to the item DOM, it should not be deleted if there will some events to trigger in this widget.
         */
        thisObj.sksBindItemEvent();
        
        /*
         * API to refresh the previously bound events when a resize or orientation change occurs.
         */
        $(window).resize(function() {
            thisObj.sksRefreshEvents();
        });
    },
});