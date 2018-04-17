package org.ko.security.core.social;

import org.ko.security.core.properties.SecurityProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurerAdapter;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.jdbc.JdbcUsersConnectionRepository;
import org.springframework.social.security.SpringSocialConfigurer;

import javax.sql.DataSource;

import static org.springframework.security.crypto.encrypt.Encryptors.noOpText;

@Configuration
@EnableSocial
public class SocialConfig extends SocialConfigurerAdapter {

    @Qualifier("dataSource")
    @Autowired private DataSource dataSource;

    @Autowired private SecurityProperties securityProperties;

    @Override
    public UsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {
        //配置JDBCRepository
        JdbcUsersConnectionRepository repository = new JdbcUsersConnectionRepository(dataSource, connectionFactoryLocator, noOpText());
        //设置修改表明
//        repository.setTablePrefix("ko_");
        return repository;
    }

    @Bean
    public SpringSocialConfigurer springSocialConfigurer () {
        String filterProcessesUrl = securityProperties.getSocial().getFilterProcessesUrl();
        SpringSocialConfigurerImpl configurer = new SpringSocialConfigurerImpl(filterProcessesUrl);
        return configurer;
    }


}
