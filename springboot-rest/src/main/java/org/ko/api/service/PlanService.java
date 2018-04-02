package org.ko.api.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.ko.api.bo.PlanBo;
import org.ko.api.command.PlanCommand;
import org.ko.api.entity.Plan;
import org.ko.api.entity.PlanExample;
import org.ko.api.repository.PlanRepository;
import com.panhai.common.model.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Throwable.class)
public class PlanService {

    private static final Logger _LOGGER = LoggerFactory.getLogger(PlanService.class);

    @Autowired private PlanRepository planRepository;

    public Result<List<PlanBo>> list (PlanCommand command, int page, int limit) {
        Result<List<PlanBo>> result = new Result<>();
        PageHelper.startPage(page, limit);
        List<PlanBo> serviceApplies = planRepository.queryList(command);
        result.setSuccess(true);
        result.setData(serviceApplies);
        result.setCount(new PageInfo(serviceApplies).getTotal());
        return result;
    }

    /**
     * <p>获取详细信息</p>
     * @param id 计划主键
     */
    public Result<PlanBo> detail (String id) {
        PlanBo plan = planRepository.queryDetail(id);

        Result<PlanBo> result = new Result<>();
        result.setSuccess(true);
        result.setData(plan);
        return result;
    }

    /**
     * <p>新增计划</p>
     * @param planBo 计划详细
     */
    public Result save (PlanBo planBo) {
        Plan plan = new Plan();
        BeanUtils.copyProperties(planBo, plan);

        int ret = planRepository.insert(plan);
        if (ret == 0) {
            throw new RuntimeException("Happen error.");
        }

        Result result = new Result();
        result.setSuccess(true);
        return result;
    }

    /**
     * <p>更新计划</p>
     * @param planBo 计划详细
     */
    public Result update (PlanBo planBo) {
        PlanExample pe = new PlanExample();
        pe.createCriteria()
                .andIdEqualTo(planBo.getId())
                .andVersionNEqualTo(planBo.getVersionN())
                .andDeleteIEqualTo("N");

        Plan plan = new Plan();
        BeanUtils.copyProperties(planBo, plan);
        plan.setVersionN(plan.getVersionN() + 1);

        int ret = planRepository.updateByExampleSelective(plan, pe);
        if (ret == 0) {
            throw new RuntimeException("Happen error.");
        }

        Result result = new Result();
        result.setSuccess(true);
        return result;
    }

    /**
     * <p>逻辑删除计划</p>
     * @param id 计划主键
     * @param versionN 版本号
     */
    public Result remove (String id, Long versionN) {
        PlanExample pe = new PlanExample();
        pe.createCriteria()
                .andIdEqualTo(id)
                .andVersionNEqualTo(versionN)
                .andDeleteIEqualTo("N");

        Plan plan = new Plan();
        plan.setDeleteI("Y");
        plan.setVersionN(plan.getVersionN() + 1);

        int ret = planRepository.updateByExampleSelective(plan, pe);
        if (ret == 0) {
            throw new RuntimeException("Happen error.");
        }

        Result result = new Result();
        result.setSuccess(true);
        return result;
    }

    public void export(PlanCommand command) {
        //TODO
    }
}