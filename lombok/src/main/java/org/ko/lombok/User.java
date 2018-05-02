package org.ko.lombok;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//1. 动态生成GetSet
@Getter
@Setter
//2. 动态生成toString();
@ToString
public class User {

    private String username;

    private String password;
}
