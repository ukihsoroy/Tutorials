/**
 * 计划列表页
 */
var _planVue = new Vue({
    el: '#_plan',
    data: {
        params: {},
        rows: [],
        page: 1,
        count: 100
    },
    mounted: function () {
        this.query();
    },
    methods: {
        query: function () {
            const _ = this;
            _.$http.get('http://localhost:3342/rest/plan/', _.params)
                .then(function (r) {
                    if (r.ok && r.body.success) {
                        _.rows = r.body.data;
                        _.count = r.body.count;
                    }
                })
        },
        add: function () {
            window.location.href = 'edit.html';
        },
        findSuggest: function (a, b, c) {
        },
        querySearchAsync: function (a, b, c) {
            console.log(a)
        },
        edit: function (index, row) {
            window.location.href = 'edit.html?id=1';
        },
        remove: function (index, row) {
            
        },
        detail: function (index, row) {
            window.location.href = 'detail.html';
        },
        handleSizeChange: function(val) {
            console.log('每页 ${val} 条');
        },
        handleCurrentChange: function(val) {
            console.log('当前页: ${val}');
        }
    }
})