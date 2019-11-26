package org.ko.oauth.service.Impl;

import org.ko.oauth.dao.OauthClientDetailsDao;
import org.ko.oauth.domain.OauthClientDetailsEntity;
import org.ko.oauth.service.IClientDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientDetailsServiceImpl implements IClientDetailsService {
    @Autowired
    private OauthClientDetailsDao oauthClientDetailsDao;
    @Override
    public void save(OauthClientDetailsEntity client) {
        oauthClientDetailsDao.save(client);
    }
}
