/**
 * 计划列表页
 */
var _planVue = new Vue({
    el: '#_plan',
    data: {
        params: {},
        rows: [{
            planCode: 'plan001',
            planName: '王小虎',
            submitUser: '王小虎',
            submitDt: '2018-03-04',
            planStatus: '1',
            deleteI: 'N',
            versionN: 1,
            createUserId: '001',
            createDt: '2018-03-03',
            modifyUserId: '002',
            modifyDt: '2018-03-04'
        }, {
            planCode: 'plan001',
            planName: '王小虎',
            submitUser: '王小虎',
            submitDt: '2018-03-04',
            planStatus: '1',
            deleteI: 'N',
            versionN: 1,
            createUserId: '001',
            createDt: '2018-03-03',
            modifyUserId: '002',
            modifyDt: '2018-03-04'
        }, {
            planCode: 'plan001',
            planName: '王小虎',
            submitUser: '王小虎',
            submitDt: '2018-03-04',
            planStatus: '1',
            deleteI: 'N',
            versionN: 1,
            createUserId: '001',
            createDt: '2018-03-03',
            modifyUserId: '002',
            modifyDt: '2018-03-04'
        }, {
            planCode: 'plan001',
            planName: '王小虎',
            submitUser: '王小虎',
            submitDt: '2018-03-04',
            planStatus: '1',
            deleteI: 'N',
            versionN: 1,
            createUserId: '001',
            createDt: '2018-03-03',
            modifyUserId: '002',
            modifyDt: '2018-03-04'
        }],
        page: 1,
        count: 100,
    },
    methods: {
        query: function () {
            debugger;
        },
        add: function () {
            debugger;
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