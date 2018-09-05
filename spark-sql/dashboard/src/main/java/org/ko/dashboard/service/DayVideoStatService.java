package org.ko.dashboard.service;

import org.ko.dashboard.domain.DayVideoAccessTopnStat;
import org.ko.dashboard.domain.DayVideoCityAccessTopnStat;
import org.ko.dashboard.domain.DayVideoTrafficsTopnStat;

import java.util.List;

public interface DayVideoStatService {

    List<DayVideoAccessTopnStat> findDayVideoAccessStat();

    List<DayVideoCityAccessTopnStat> findDayVideoCityStat();

    List<DayVideoTrafficsTopnStat> findDayVideoTrafficsStat();
}
