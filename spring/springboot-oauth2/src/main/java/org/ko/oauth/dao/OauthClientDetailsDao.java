package org.ko.oauth.dao;

import org.ko.oauth.domain.OauthClientDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by wangxiangyun on 2017/2/14.
 */
public interface OauthClientDetailsDao  extends JpaRepository<OauthClientDetailsEntity, String> {
}
