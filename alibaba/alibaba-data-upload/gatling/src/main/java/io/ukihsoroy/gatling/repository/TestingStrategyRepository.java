package io.ukihsoroy.gatling.repository;

import io.ukihsoroy.gatling.entity.TestingStrategy;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 测试策略
 * @author K.O
 */
public interface TestingStrategyRepository extends PagingAndSortingRepository<TestingStrategy, Integer> {



}
