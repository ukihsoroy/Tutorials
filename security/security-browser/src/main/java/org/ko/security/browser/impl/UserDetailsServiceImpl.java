package org.ko.security.browser.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * org.springframework.security.core.userdetails.User
 */
@Component
public class UserDetailsServiceImpl implements UserDetailsService {


    private static final Logger _LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

//    @AutoWired private UserRepository userRepository;


    @Autowired private PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        _LOGGER.info("登录用户名: {}", username);
        //根据用户名查找用户信息


        //假定数据库密码
        String password = passwordEncoder.encode("123456");

        _LOGGER.info("数据库密码是: {}", password);

        //根据查找到的用户信息, 判断用户是否被冻结
        return new User(
                username,
                password,
                true, true, true, true,
                AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
    }
}
