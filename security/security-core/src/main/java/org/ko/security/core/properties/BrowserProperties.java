package org.ko.security.core.properties;

public class BrowserProperties {

    /**
     * login页面配置
     */
    private String loginPage = "/ko-login.html";

    /**
     * security success/failure handler 处理方式 默认使用json处理
     * redirect/json
     */
    private LoginType loginType = LoginType.JSON;

    public String getLoginPage() {
        return loginPage;
    }

    public void setLoginPage(String loginPage) {
        this.loginPage = loginPage;
    }

    public LoginType getLoginType() {
        return loginType;
    }

    public void setLoginType(LoginType loginType) {
        this.loginType = loginType;
    }
}
