package org.ko.dashboard.service.impl;

import org.ko.dashboard.dao.DayVideoAccessTopnStatDAO;
import org.ko.dashboard.dao.DayVideoCityAccessTopnStatDAO;
import org.ko.dashboard.dao.DayVideoTrafficsTopnStatDAO;
import org.ko.dashboard.domain.*;
import org.ko.dashboard.service.DayVideoStatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Throwable.class)
public class DayVideoStatServiceImpl implements DayVideoStatService {

    @Autowired
    private DayVideoAccessTopnStatDAO dayVideoAccessTopnStatDAO;

    @Autowired
    private DayVideoCityAccessTopnStatDAO dayVideoCityAccessTopnStatDAO;

    @Autowired
    private DayVideoTrafficsTopnStatDAO dayVideoTrafficsTopnStatDAO;


    @Override
    public List<DayVideoAccessTopnStat> findDayVideoAccessStat() {
        return dayVideoAccessTopnStatDAO.selectByExample(new DayVideoAccessTopnStatExample());
    }

    @Override
    public List<DayVideoCityAccessTopnStat> findDayVideoCityStat() {
        return dayVideoCityAccessTopnStatDAO.selectByExample(new DayVideoCityAccessTopnStatExample());
    }

    @Override
    public List<DayVideoTrafficsTopnStat> findDayVideoTrafficsStat() {
        return dayVideoTrafficsTopnStatDAO.selectByExample(new DayVideoTrafficsTopnStatExample());
    }
}
