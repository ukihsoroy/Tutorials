package io.ukihsoroy.gatling.repository;


import io.ukihsoroy.gatling.entity.UploadTable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 上云表清单
 * @author K.O
 */
public interface UploadTableRepository extends PagingAndSortingRepository<UploadTable, Integer> {

}
