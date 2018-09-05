const BASE_URL = "/rest/"

$(function(){
    //访问
    findDayAccessTopNStat()
    findDayCityTopNStat()
    findDayTrafficsTopNStat()

})

/**
 * 获取课程TopN统计
 */
function findDayAccessTopNStat () {
    $.ajax({
        url: BASE_URL + 'video',
        success: function (r) {
            console.log(r);
        },
        error: function(e) {
            console.log(e)
        }
    })
}

/**
 * 获取每天课程城市topN访问量统计
 */
function findDayCityTopNStat () {
    $.ajax({
        url: BASE_URL + 'video/city',
        success: function (r) {
            console.log(r);
        },
        error: function(e) {
            console.log(e)
        }
    })
}

/**
 * 获取课程每天流量topN统计
 */
function findDayTrafficsTopNStat () {
    $.ajax({
        url: BASE_URL + 'video/traffics',
        success: function (r) {
            console.log(r);
        },
        error: function(e) {
            console.log(e)
        }
    })
}