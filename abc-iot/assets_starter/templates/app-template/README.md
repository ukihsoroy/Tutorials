ui-app
===

- [About](#about)
- [Getting Started](#getting-started)
- [Configure](#configure)
- [Commands](#commands)
- [Theme Development](#theme-development)
- [Widget Development](#widget-development)
- [Widget SFC Development](#widget-sfc-development)

## About

> 这个工程用于方便开发站点的样式library以及widget组件, 每个组件都是一个package工程, 使用yarn和lerna来管理多个package。

## Getting Started

使用工程之前需要全局安装如下插件

```
yarn global add @vue/cli
yarn global add @vue/cli-init
```

另外我们使用yarn自身的workspace能力管理多个package的依赖, 所以需执行如下配置：
```
yarn config set workspaces-experimental true
```

## configure

复制config.json.sample为 config.json 文件，并根据开发环境调整如下配置：
```
url: 'https://qa3-dev.besclouds.com',
username: '********',
password: '********'
```

## Commands

##### yarn run bootstrap
初始化工程。

##### yarn run add
增加新的package工程到pacakges目录, 目前支持三种类型的package: 
- widget
- widget(Vue single file component)
- component

widget和widget(Vue single file component)工程可打包成用于高级页面的组件资产, 其中widget是传统的widget资产开发模式, widget(Vue single file component)可通过开发vue单文件组件开发widget。

component工程可打包成用于标准页面的组件资产。

##### yarn run preview
实时预览widget(Vue single file component)和component类型的组件效果。

##### yarn run preview
在widget类型的package工程目录下执行该命令, 预览widget类型的组件效果。

##### yarn run build
打包所有package到dist目录。

也可在单个package工程目录下执行该命令，打包单个工程。

##### yarn run download
从资产库下载widget资产并初始化对应的package工程。

##### yarn run publish
更新widget资产到资产库。

## Theme Development

在packages/theme-chalk目录下进行css样式开发, 每个widget或者component都可在packages/theme-chalk/src目录下创建一个less或者scss文件, 同时在packages/theme-chalk/index.js中import该文件。

最后build该工程,将打包后的css,图片,字体文件等(不包含js)文件制作成library上传到资产库中使用。

通过yarn run add创建的每个package, 都自动添加了对theme-chalk的依赖, 在预览创建的widget或者component时, 修改theme-chalk, 也会实时看到css效果。

当开发widget(Vue single file component)时, 如果要使用第三方ui组件库, 比如element-ui, 则在theme-chalk工程下安装element-ui, 然后在packages/theme-chalk/index.js引入该组件库。
```
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

## Widget Development

执行yarn run add时选择widget类型将在packages/advancedPageAssets目录下创建一个该类型的package工程。

在生成的package工程目录下, 执行yarn run preview可进行本地开发预览, 执行yarn run build将在dist目录下生成widget的zip包。

### 1 示例

在demos目录下存在一个widget的demo示例: mango_widget_demo。

在该示例中示范了如何在editor.js中定义property属性, 如何在js中使用property、使用国际化、自定义事件、自定义action、触发自定义事件、通过桥接器调用接口等。

widget的介绍可参考[widget和高级页面开发文档](https://support.huawei.com/bescloud/BES%20Cloud%20Open%20Platform/1.2/topic/view.do?projectid=bes_cloud_platform_zh&lang=zh&pidid=pid_129668509270112493999&topicid=ZH-CN_TOPIC_0137069392)
### 2 预览
#### 2.1指定第三方libary库
执行yarn run preview启动本地预览后, 会在package工程目录下生成preview目录, 如果运行widget需要先加载第三方libarary库, 可在preview/library目录下添加对应的库文件, 然后在preview/addlibrary.js中加入对库文件的引入。目前默认引入了vue, vue-i18n, element-ui等类库。

需要注意在高级页面中运行widget时还是需要在widget的packageinfo.json文件中指定对library的require或者在App的page settings的页面手动引入需要加载的library。

#### 2.2指定国际化语言
在实际运行页面时, 平台会自动获取用户的语言。
```
https://localhost:3000/?locale=zh

通过在url中输入locale指定国际化语言
```

#### 2.3指定页面宏
在实际的运行页面, 页面宏平台会自动获取。
```
https://localhost:3000/?pageMacro=pageMacroValue

如果页面要使用名称为pageMacro的页面宏,通过在url中输入pageMacro指定页面宏的值
```

## Widget Vue SFC Development
执行yarn run add时选择widget(Vue single file component),将在packages/advancedPageAssets目录创建一个该类型的package工程。

在生成的package工程目录下, 执行yarn run build将在dist目录下生成转换后的widget的zip包。

### 示例

在demos目录下存在一个widget(Vue single file component)的示例: mango_vue_widget_demo。

### 编写src目录下的.vue文件

除了vue单文件组件的正常用法外, 支持如下方法及能力:
#### 2.1自定义事件 $registerEvents
```
this.$registerEvents(eventName, eventLableName, eventParams);

eventName -- event名称, 字符串类型
eventLableName -- event label名称, 字符串类型
eventName -- event参数, 数组类型, 格式如下, 如果不需要定义event参数, 则输入[]

var eventParams = [{
    "name": "param",
    "displayName": "Param"
}];
```
#### 2.2触发自定义事件 $triggerEvent
```
this.$triggerEvent(eventName, payload);

eventName -- event名称, 字符串类型, eventName为该单文件组件中registerEvents的event名称
payload   -- 事件传参, object类型, 如果不需要传参, 则输入{}
```
#### 2.3自定义action $registerAction
```
this.$registerAction(actionName, actionLableName, actionParams);

actionName -- action名称, 字符串类型
actionLableName -- action label名称, 字符串类型
actionParams -- action参数, 数组类型, 格式如下, 如果不需要定义action参数, 则输入[]

var actionParams = [{
    "name": "param",
    "displayName": "Param"
}];
```
#### 2.4通过桥接器调用接口
```
var connector = this.$getConnectorInstanceByName(bridgePropertyName);

bridgePropertyName -- 桥接器类型属性名称, 字符串类型, 对应于在.json文件中定义的connectorV2类型的属性名。

通过$getConnectorInstanceByName将返回一个桥接器实例。即可调用桥接器提供的方法

```
##### 2.5国际化资源文件

在i18n标签下按如下格式编写国际化资源文件
```
<i18n>
  en-US:
    hello: "hello world!"
  zh-CN:
    hello: "你好！"
</i18n>  
```

### 3 编写src目录下的.json文件

定义在开发高级页面时, 该widget对外开放的配置属性。可参考如下示例定义text, checkbox, select和connectorV2类型的属性配置。
```
{
    "config": [{
            "type": "text",
            "name": "textProperty",
            "label": "Text Property",
            "value": "text"
        },
        {
            "type": "checkbox",
            "name": "checkProperty",
            "label": "Check Property",
            "value": "true"
        },
        {
            "type": "text",
            "name": "numberProperty",
            "label": "Number Property",
            "value": "30"
        },
        {
            "type": "text",
            "name": "arrayProperty",
            "label": "Array Property",
            "value": "1;2;3"
        },
        {
            "type": "select",
            "name": "selectProperty",
            "label": "Select Property",
            "options": [{
                    "label": "option1",
                    "value": "option1",
                    "selected": "true"
                },
                {
                    "label": "option2",
                    "value": "option2"
                }
            ]
        },
        {
            "type": "connectorV2",
            "name": "bridgeProperty",
            "model": "ViewModel",
            "label": "Widget Bridge",
            "value": ""
        }
    ]
}
```

### 4 编写src/widget目录下的packageinfo.json文件

指定该widget require的library等信息




