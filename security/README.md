# security

1. 过滤器链
    1. 检查请求是否有请求信息-主要校验规则
        - `UsernamePasswordAuthenticationFilter`: 处理表单登录, 请求是否带用户名密码
        - `BasicAuthenticationFilter`: 是否有Basic码信息, 有会进行解码认证
        
    2. `FilterSecurityInterceptor`: 最后一部, 决定当前请求能不能继续, 根据不过的原因会抛出异常.
    3. `ExceptionTranslationFilter`: 在前`FilterSecurityInterceptor`有一个`ExceptionTranslationFilter`会处理`FilterSecurityInterceptor`抛出的异常, 引到用户根据前面过滤器的信息处理异常.
    4. security通过过滤器链判断用户是否授权, 读取HttpSecurity配置, 判断请求中是否携带信息, 选择需要执行的过滤器, 最后由`ExceptionTranslationFilter`统一进行权限认证, 如果未通过, 则会抛出异常, 由`ExceptionTranslationFilter`统一进行异常处理, 最后将异常信息返回给前台.