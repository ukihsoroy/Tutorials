package org.ko.dashboard.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.ko.dashboard.domain.DayVideoAccessTopnStat;
import org.ko.dashboard.domain.DayVideoCityAccessTopnStat;
import org.ko.dashboard.domain.DayVideoTrafficsTopnStat;
import org.ko.dashboard.service.DayVideoStatService;
import org.ko.dashboard.support.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Validated
@Api(description = "按天统计")
@RequestMapping("video")
public class DayVideoStatController {


    @Autowired
    private DayVideoStatService dayVideoStatService;

    @GetMapping
    @ApiOperation("视频访问Top N排名")
    public Response<List<DayVideoAccessTopnStat>> findDayVideoAccessStat() {
        return new Response<>(dayVideoStatService.findDayVideoAccessStat());
    }

    @GetMapping("city")
    @ApiOperation("城市课程点击次数统计")
    public Response<List<DayVideoCityAccessTopnStat>> findDayVideoCityStat() {
        return new Response<>(dayVideoStatService.findDayVideoCityStat());
    }

    @GetMapping("traffics")
    @ApiOperation("按流量统计视频访问量")
    public Response<List<DayVideoTrafficsTopnStat>> findDayVideoTrafficsStat() {
        return new Response<>(dayVideoStatService.findDayVideoTrafficsStat());
    }
}
