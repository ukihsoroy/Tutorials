package org.ko.concurrency;

public class PowerTest {

    public static void main(String[] args) {
        int i = 1;
        int s = (++i)+(++i)+(++i);
        System.out.println(s);
        System.out.println(i);
    }
}
