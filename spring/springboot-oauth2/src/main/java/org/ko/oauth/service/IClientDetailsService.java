package org.ko.oauth.service;


import org.ko.oauth.domain.OauthClientDetailsEntity;

/**
 * Created by wangxiangyun on 2017/2/14.
 */
public interface IClientDetailsService {
    void save(OauthClientDetailsEntity client);
}
