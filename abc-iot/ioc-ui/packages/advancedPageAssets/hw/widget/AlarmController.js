var AlarmController = StudioWidgetWrapper.extend(
    {
        /*
         * Triggered when initializing a widget and will have the code that invokes rendering of the widget
         * setParentContainer(JQueryParentContainerDOM) - binds event to this container
         * setItemContainer(JQueryItemContainerDOM) - binds studio item events for respective item containers
         * bindEvents() - binds the studio event to this widget
         */
        init: function()
        {
            var thisObj = this;
            thisObj._super.apply(thisObj, arguments);
            thisObj.render();
            if ((typeof(Studio) != "undefined") && Studio)
            { 
               //在地图上标注元素,设备
                Studio.registerEvents(thisObj, "locateMarker", "locateMarker", []);
    
                //在地图上添加元素,设备
                Studio.registerEvents(thisObj, "addMarker", "addMarker", []);
    
                //点击地图上的点传过来的信息
                Studio.registerAction(thisObj, "clickDevice", "clickDevice", [], $.proxy(thisObj.vm.clickDevice, thisObj), []);
            }
        },
    
        /*
         * Triggered from init method and is used to render the widget
         */
        render: function()
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
            if (elem)
            {
                var containerDiv = $(".scfClientRenderedContainer", elem);
                if (containerDiv.length)
                {
                    $(containerDiv).empty();
                }
                else
                {
                    containerDiv = document.createElement('div');
                    containerDiv.className = "scfClientRenderedContainer";
                    $(elem).append(containerDiv);
                }
                thisObj.initVM(elem);
            }
    
            /*
             * API to bind global events to the item DOM :
             *  thisObj.sksBindItemEvent();
             * 
             * API to bind item events to the item DOM :
             *  thisObj.sksBindItemEvent(JQueryItemContainerSelector, ItemIdx);
             * JQueryItemContainerSelector - A JQuery selector that returns an array of DOMs that represents the individual item inside the item container, to which the hotspot needs to be bound.
             * ItemIdx (Optional) - To bind the item events to a specific item.
             */
            thisObj.sksBindItemEvent();
    
            /*
             * API to refresh the previously bound events when a resize or orientation change occurs.
             *  thisObj.sksRefreshEvents(ItemIdx);
             * ItemIdx (Optional) - To refresh events for a specific item. Default value is 0.
             */
            $(window).resize(function()
            {
                thisObj.sksRefreshEvents();
            });
        },
        initVM(elem) {
            var thisObj = this;
            var widgetBasePath = thisObj.getWidgetBasePath();
    
            thisObj.vm = new Vue({
                el: $("#AlarmController",elem)[0],
                data:{
                    loading: false,
                    // Toolbar
                    breadcrumb: [
                        "首页",
                        "安全事件"
                    ],
                    menu: [
                        // "地图告警",
                        // "实时告警",
                        // "历史告警",
                        "手动告警"
                    ],
                    selectedMenu: "",
    
                    device: {},
    
                    // 手动告警弹出框
                    showCustomAlarm: false,
    
                    model: {
                        alarmLevel: "",
                        alarmDefCategory: "",
                        alarmDef: "",
                        description: ""
                    },
                    rules: {
                        alarmLevel: [{
                            required: true,
                            message: "请选择告警级别"
                        }],
                        alarmDefCategory: [{
                            required: true,
                            message: "请选择告警规格类别"
                        }],
                        alarmDef: [{
                            required: true,
                            message: "请选择告警规格"
                        }]
                    },
    
                    alarmLevels: [{
                        label: "提示",
                        value: "INFO"
                    }, {
                        label: "一般",
                        value: "NORMAL"
                    }, {
                        label: "重要",
                        value: "MAJOR"
                    }, {
                        label: "严重",
                        value: "CRITICAL"
                    }],
                    alarmDefCategorys: [],
                    alarmDefs: [],
    
                },
                watch: {
                    selectedMenu() {
                        if (this.selectedMenu == "手动告警") {
                            this.showAddAlarm();
                        } else {
                            this.showCustomAlarm = false;
                        }
                    }
                },
                async mounted() {
                    if (!Studio.inReader) {
                        return;
                    }
                    this.loading = true;
                    try {
                        await this.initData();
                    } catch (err) {
    
                    } finally {
                        this.loading = false;
                    }
                },
                methods: {
                    async initData() {
                        try {
                            await this.queryDevice();
                            await this.queryAlarmDefCategory();
                        } catch (err) {
    
                        }
                    },
                    async queryAlarmDefCategory() {
                        try {
                            const data = await this.callFlow(
                                "/Alarm/0.1.0/AlarmDefCategory/query",
                                { start: 0, limit: 5000, condition: {} }
                            );
                            this.alarmDefCategorys = data.categories.map(cata => {
                                return {
                                    label: cata.code,
                                    value: cata.id
                                }
                            });
                        } catch (err) {
    
                        }
                    },
                    async queryAlarmDef() {
                        if (this.model.alarmDefCategory) {
                            try {
                                const data = await this.callFlow(
                                    "/Alarm/0.1.0/AlarmDef/query",
                                    {
                                        start: 0,
                                        limit: 5000,
                                        condition: {
                                            alarmDefCategory: {
                                                operator: "=",
                                                value: this.model.alarmDefCategory
                                            }
                                        }
                                    }
                                );
                                this.alarmDefs = data.alarmDefs.map(def => {
                                    return {
                                        label: def.defName,
                                        value: def.id
                                    }
                                });
                            } catch (err) {
    
                            }
                        }
                    },
                    async queryDevice() {
                        var _this = this;
                        var params = {
                            start: 0,
                            limit: 50,
                            condition: {
                                status: {
                                    value: "ACTIVE",
                                    operator: '='
                                }
                            }
                        };
                        let devices = await this.callFlow("/Device/0.1.0/Device/query", params);
                        _this.deviceList = {
                            total: devices.count,
                            dataList: devices.devices
                        };
    
                        //准备打点数据
                        var mapParams = {
                            append: false,
                            markerInfo: {
                                layerId: "layer_123456",
                                layerIndex: 1234,
                                markers: []
                            }
                        }
                        _this.deviceObj = {};
                        let promises = [];
                        //处理位置信息
                        _this.deviceList.dataList.forEach(e => {
                            promises.push(
                                new Promise(async resolve => {
                                    e.address = null;
                                    let addressArray = [];
                                    if (e.deviceLocation && e.deviceLocation.spaceInPath && Array.isArray(e.deviceLocation.spaceInPath) && e.deviceLocation.spaceInPath.length > 0) {
                                        e.deviceLocation.spaceInPath.forEach(function (m, index) {
                                            addressArray.push(m.spaceName);
                                        });
                                        addressArray.reverse();
                                        e.address = addressArray.join('/');
                                    }
    
    
                                    let alarms = [];
                                    try {
                                        alarms = await this.queryAlarm(e.id);
                                    } catch (err) {
                                    }
                                    let alarmLevel = "";
                                    let alarmOccurTime;
                                    alarms.forEach(alarm => {
                                        let crtOccurTime = new Date(alarm.occuringTime).getTime();
                                        if (!alarmOccurTime || alarmOccurTime < crtOccurTime) {
                                            alarmOccurTime = crtOccurTime;
                                            alarmLevel = alarm.alarmLevel;
                                        }
                                    });
    
                                    let alarmImg = "green";
                                    if (alarmLevel == "INFO" || alarmLevel == "NORMAL") {
                                        alarmImg = "yellow";
                                    } else if (alarmLevel == "MAJOR" || alarmLevel == "CRITICAL") {
                                        alarmImg = "orange";
                                    }
                                    e.alarmLevel = alarmLevel;
    
                                    var marker = {
                                        title: e.deviceName,
                                        image: widgetBasePath + `images/point-${alarmImg}.png`,
                                        width: 80,
                                        height: 80,
                                        imageSelected: widgetBasePath + 'images/point-blue.png',
                                        widthSelected: 80,
                                        heightSelected: 80,
                                        tag: {},
    
                                        //以下入参超图无
                                        label: {
                                            text: e.deviceName,
                                            offset: [5, -25]
                                        },
                                        id: e.id,
                                        clickZoom: 17,
                                        infoWindow: {
                                            content:
                                                "<div style='width: 200px'>" +
                                                    "<span style='display:block'>名称: " + e.deviceName + "</span>" +
                                                    "<span style='display:block'>编号: " + e.code + "</span>" +
                                                    (e.address ? ("<span style='display:block'>位置: " + e.address + "</span>") : "") +
                                                    (alarmLevel ? ("<span style='display:block'>告警级别: " + alarmLevel + "</span>") : "") +
                                                "</div>",
                                            offset: [0, 0],
                                            width: 300,
                                            height: 0,
                                            boxTheme: "dark",
                                        }
                                    };
    
                                    if (e.deviceLocation) {
                                        if (e.deviceLocation.coordinate && (e.deviceLocation.coordinate.indexOf(',') != -1 || e.deviceLocation.coordinate.indexOf(' ') != -1)) {
                                            let coordinates = [];
                                            if (e.deviceLocation.coordinate.indexOf(',') != -1) {
                                                coordinates = e.deviceLocation.coordinate.split(',');
                                                if (coordinates.length < 3) {
                                                    console.log('位置信息：' + coordinates + '格式不符合要求');
                                                } else {
                                                    marker.position = [coordinates[0], coordinates[1]];
                                                    if (coordinates.length == 5) {
                                                        marker.buildingId = coordinates[3];
                                                        marker.floorId = coordinates[4];
                                                    }
                                                }
                                            }
                                        }
                                    }
    
                                    if (marker.position) {
                                        mapParams.markerInfo.markers.push(marker);
                                    }
    
                                    _this.deviceObj[e.id] = e;
                                    resolve();
                                })
                            );
                        });
    
                        await Promise.all(promises);
                        if (mapParams.markerInfo.markers.length > 0) {
                            thisObj.triggerEvent("addMarker", mapParams);
                        }
    
                    },
                    async queryDeviceChannel() {
                        var _this = this;
                        const data = await this.callFlow("/Device/0.1.0/Channel/query", { start: 0, limit: 5000, condition: {} });
                        _this.deviceChannels = data.categories.map(e => {
                            return {
                                name: e.channelName,
                                code: e.code,
                                id: e.id
                            }
                        });
                    },
                    async queryAlarm(deviceId) {
                        try {
                            let alarm = await this.callFlow(
                                "/Alarm/0.1.0/Alarm/query",
                                {
                                    start: 0,
                                    limit: 100,
                                    condition: {
                                        fromDevice: {
                                            operator: "=",
                                            value: deviceId
                                        }
                                    }
                                }
                            );
                            return alarm.alarms;
                        } catch (err) {
                            return [];
                        }
                    },
                    selAlarmDefCategory() {
                        if (this.model.alarmDefCategory) {
                            this.queryAlarmDef();
                        }
                    },
                    showAddAlarm() {
                        this.initCustomAlarm();
                        this.showCustomAlarm = true;
                    },
                    initCustomAlarm() {
                        this.$refs["addAlarmForm"].clearValidate();
                        this.model = {
                            alarmLevel: "",
                            alarmDefCategory: "",
                            alarmDef: ""
                        };
                    },
                    async queryAlarmCatalog() {
                        try {
                            this.alarmCatalogs = await this.callFlow(
                                "/Alarm/0.1.0/AlarmDefCategory/query",
                                {
                                    start: 0,
                                    limit: 5000,
                                    condition: {}
                                }
                            );
                        } catch (err) {
    
                        }
                    },
                    selMenu(menu) {
                        if (this.selectedMenu == menu) {
                            this.selectedMenu = "";
                            return;
                        }
                        if (this.device.id && $(".leaflet-pane.leaflet-popup-pane").children().length > 0) {
                            this.selectedMenu = menu;
                        } else {
                            this.$message.warning("请先选择设备");
                        }
                    },
                    clickDevice(data) {
                        data = data.eventParam.element;
                        this.device = this.deviceObj[data.id];
                    },
                    confirmAddAlarm() {
                        this.$refs["addAlarmForm"].validate((valid) => {
                            if (valid) {
                                this.addAlarm();
                            } else {
                              console.log('error submit!!');
                              return false;
                            }
                        });
                    },
                    async addAlarm() {
                        this.loading = true;
                        try {
                            let coor = this.device.deviceLocation.coordinate.split(",");
                            await this.callFlow(
                                "/Alarm/0.1.0/Alarm/create",
                                {
                                    alarmDef: this.model.alarmDef,
                                    alarmLevel: this.model.alarmLevel,
                                    fromDevice: this.device.id,
                                    longitude: coor[0],
                                    latitude: coor[1],
                                    altitude: coor[2]
                                }
                            );
                            await this.queryDevice();
                            this.cancelAddAlarm();
                            this.device = {};
                            this.$message.success("告警新增成功");
                        } catch (err) {
                        } finally {
                            this.loading = false;
                        }
                    },
                    cancelAddAlarm() {
                        this.selectedMenu = "";
                        this.showCustomAlarm = false;
                    },
                    callFlow(url, data) {
                        return new Promise((resolve, reject) => {
                            $.ajax({
                                type: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                url: "/service" + url,
                                dataType: "json",
                                data: JSON.stringify(data),
                                success: (resp) => {
                                    if (resp.resCode == 0) {
                                        resolve(resp.result[0]);
                                    } else {
                                        reject(resp);
                                    }
                                },
                                error: (resp) => {
                                    reject(resp);
                                }
                            });
                        });
                    }
                }
            });
        }
    });