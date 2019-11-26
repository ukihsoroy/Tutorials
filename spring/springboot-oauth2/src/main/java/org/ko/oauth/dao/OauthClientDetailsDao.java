package org.ko.oauth.dao;

import org.ko.oauth.domain.OauthClientDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OauthClientDetailsDao  extends JpaRepository<OauthClientDetailsEntity, String> {
}
