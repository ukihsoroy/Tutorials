
Vue.use(window.ELEMENT);
var _plan = new Vue({
    el: '#_list',
    data: {
        params: {},
        rows: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        page: 1,
        count: 100,
    },
    methods: {
        query: function () {
            debugger;
        },
        findSuggest: function (a, b, c) {
        },
        querySearchAsync: function (a, b, c) {
            console.log(a)
        },
        edit: function (index, row) {
            
        },
        remove: function (index, row) {
            
        },
        detail: function (index, row) {
            
        },
        handleSizeChange: function(val) {
            console.log('每页 ${val} 条');
        },
        handleCurrentChange: function(val) {
            console.log('当前页: ${val}');
        }
    }
})