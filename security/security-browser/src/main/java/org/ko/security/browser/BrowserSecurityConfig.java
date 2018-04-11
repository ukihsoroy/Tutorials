package org.ko.security.browser;

import org.ko.security.browser.authentication.AuthenticationFailureHandlerImpl;
import org.ko.security.browser.authentication.AuthenticationSuccessHandlerImpl;
import org.ko.security.core.properties.SecurityProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BrowserSecurityConfig extends WebSecurityConfigurerAdapter{


    @Autowired private SecurityProperties securityProperties;

    /**
     * 成功处理器
     */
    @Autowired private AuthenticationSuccessHandlerImpl authenticationSuccessHandlerImpl;

    /**
     * 失败处理器
     */
    @Autowired private AuthenticationFailureHandlerImpl authenticationFailureHandlerImpl;


    @Bean
    public PasswordEncoder passwordEncoder() {
        //使用security默认的加密规则
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
//          http.httpBasic() //默认认证方式
        http.formLogin() //表单登录
//            .loginPage("/ko-login.html") //返回登录页
            .loginPage("/authentication/require")
                .loginProcessingUrl("/authentication/form")//用usernamePasswordFilter来处理请求
                .successHandler(authenticationSuccessHandlerImpl)
                .failureHandler(authenticationFailureHandlerImpl)
            .and()
                .authorizeRequests()//下面的请求
                .antMatchers("/authentication/require",
                        securityProperties.getBrowser().getLoginPage()).permitAll()//放过这个URL-直接放行
                .anyRequest()   //所有的请求
                .authenticated() //都需要认证
                .and()
                .csrf().disable();
    }
}
