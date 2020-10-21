package io.ukihsoroy.automation.repository;

import io.ukihsoroy.automation.entity.Job;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface JobRepository extends PagingAndSortingRepository<Job, Long> {


}
