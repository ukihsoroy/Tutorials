package org.ko.ribbon.conf;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * boot启动类
 */
@Configuration
public class RestConfig {


    @Bean
    @LoadBalanced //开启负载均衡
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
