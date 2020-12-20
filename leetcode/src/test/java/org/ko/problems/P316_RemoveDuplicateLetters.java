package org.ko.problems;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

public class P316_RemoveDuplicateLetters {

    public String removeDuplicateLetters(String s) {
        int[] contains = new int[128];
        Arrays.fill(contains, 0);

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            contains[c] ++;
        }

        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < contains.length; i++) {
            if (contains[i] == 1) {
                builder.append((char) i);
            }
        }

        return builder.toString();
    }

    @Test
    public void test1() {
        String bcabc = removeDuplicateLetters("bcabc");
        System.out.println(bcabc);
    }



}
