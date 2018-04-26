package org.ko.problems;

/**
 * Implement regular expression matching with support for '.' and '*'.
 */
public class Problem10_RegularExpressionMatching {

    /**
     * '.' Matches any single character.
     '*' Matches zero or more of the preceding element.

     The matching should cover the entire input string (not partial).

     The function prototype should be:
     bool isMatch(const char *s, const char *p)

     '' 匹配任何单个字符。
     '*'匹配零个或多个前面的元素。

     匹配应覆盖整个输入字符串（不是部分）。

     函数原型应该是：
     bool isMatch（const char * s，const char * p）

     Some examples:
     isMatch("aa","a") → false
     isMatch("aa","aa") → true
     isMatch("aaa","aa") → false
     isMatch("aa", "a*") → true
     isMatch("aa", ".*") → true
     isMatch("ab", ".*") → true
     isMatch("aab", "c*a*b") → true
     */

    public boolean isMatch(String s, String p) {
        return true;
    }
}
