package org.ko.oauth.dao;

import org.ko.oauth.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityDao extends JpaRepository<UserEntity, Integer> {
    /**
     * 匹配姓名得到用户
     * @param username
     * @return
     */
    UserEntity findByUsername(String username);
}
