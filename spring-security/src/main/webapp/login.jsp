<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<body>
<c:url value="/login" var="loginUrl"/>

<%--通往/loginURL 的POST 将尝试对用户进行身份验证--%>
<form action="${loginUrl}" method="post">

    <%--通往/loginURL 的POST 将尝试对用户进行身份验证--%>
    <c:if test="${param.error != null}">
        <p>
            Invalid username and password.
        </p>
    </c:if>

    <%--如果查询参数logout存在，用户已成功注销--%>
    <c:if test="${param.logout != null}">
        <p>
            You have been logged out.
        </p>
    </c:if>
    <p>
        <label for="username">Username</label>
        <%--用户名必须作为名为username的HTTP参数存在--%>
        <input type="text" id="username" name="username"/>
    </p>
    <p>
        <label for="password">Password</label>
        <%--密码必须作为名为password的HTTP参数存在--%>
        <input type="password" id="password" name="password"/>
    </p>

    <%--CSRF令牌--%>
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
    <button type="submit" class="btn">Log in</button>
</form>
</body>
</html>
