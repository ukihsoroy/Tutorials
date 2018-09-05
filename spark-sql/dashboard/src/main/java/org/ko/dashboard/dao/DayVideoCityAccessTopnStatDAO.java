package org.ko.dashboard.dao;

import org.ko.dashboard.domain.DayVideoCityAccessTopnStat;
import org.ko.dashboard.domain.DayVideoCityAccessTopnStatExample;
import org.ko.dashboard.domain.DayVideoCityAccessTopnStatKey;
import org.springframework.stereotype.Repository;

/**
 * DayVideoCityAccessTopnStatDAO继承基类
 */
@Repository
public interface DayVideoCityAccessTopnStatDAO extends MyBatisBaseDao<DayVideoCityAccessTopnStat, DayVideoCityAccessTopnStatKey, DayVideoCityAccessTopnStatExample> {
}