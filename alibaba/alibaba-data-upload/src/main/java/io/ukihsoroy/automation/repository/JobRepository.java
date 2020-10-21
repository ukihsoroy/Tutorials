package io.ukihsoroy.automation.repository;

import io.ukihsoroy.automation.entity.Job;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface JobRepository extends PagingAndSortingRepository<Job, Long> {


    List<Job> findJobByBatchNoAndStatus(String batchNo, Short status);

}
