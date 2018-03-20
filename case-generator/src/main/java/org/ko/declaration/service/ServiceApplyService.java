package com.panhai.business.device.declaration.service;

import com.github.pagehelper.PageHelper;
import com.panhai.business.device.declaration.bo.ServiceApplyBo;
import com.panhai.business.device.declaration.command.ServiceApplyListCommand;
import com.panhai.business.device.declaration.entity.ServiceApply;
import com.panhai.business.device.declaration.entity.ServiceApplyExample;
import com.panhai.business.device.declaration.repository.ServiceApplyRepository;
import com.panhai.common.model.Result;
import com.panhai.sys.utils.DomainUtils;
import com.panhai.sys.utils.SessionUtil;
import com.panhai.sys.utils.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional(rollbackFor = Throwable.class)
public class ServiceApplyService {

    @Autowired private ServiceApplyRepository serviceApplyRepository;

    public Result<List<ServiceApply>> list (ServiceApplyListCommand command, int page, int limit) {
        Result<List<ServiceApply>> result = new Result<>();
        ServiceApplyExample example = new ServiceApplyExample();
        PageHelper.startPage(page, limit);
        List<ServiceApply> serviceApplies = serviceApplyRepository.selectByExample(example);
        result.setSuccess(true);
        result.setData(serviceApplies);
        return result;
    }

    public Result<ServiceApply> detail (String id) {
        Result<ServiceApply> result = new Result<>();
        ServiceApply serviceApply = serviceApplyRepository.selectByPrimaryKey(id);
        result.setSuccess(true);
        result.setData(serviceApply);
        return result;
    }

    public Result save (ServiceApplyBo serviceApplyBo) {
        Result result = new Result();
        serviceApplyBo.setId(UUIDUtil.getUUID());
        serviceApplyBo.setApplyC(DomainUtils.getApplyCode(serviceApplyBo.getApplyDeviceCodeC()));
        serviceApplyBo.setCreateUserId(SessionUtil.getUser().getUserId());
        serviceApplyBo.setCreateDt(new Date());
        serviceApplyRepository.insert(serviceApplyBo);
        result.setSuccess(true);
        return result;
    }

    public Result update (ServiceApplyBo serviceApplyBo) {
        Result result = new Result();
        serviceApplyRepository.updateByPrimaryKey(serviceApplyBo);
        result.setSuccess(true);
        return result;
    }

    public Result remove (String id) {
        Result result = new Result();
        serviceApplyRepository.deleteByPrimaryKey(id);
        result.setSuccess(true);
        return result;
    }
}