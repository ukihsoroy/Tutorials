package org.ko.security.browser;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class BrowserSecurityConfig extends WebSecurityConfigurerAdapter{

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//          http.httpBasic() //默认认证方式
        http.formLogin() //表单登录
            .and()
                .authorizeRequests()//下面的请求
                .anyRequest()   //所有的请求
                .authenticated(); //都需要认证
    }
}
