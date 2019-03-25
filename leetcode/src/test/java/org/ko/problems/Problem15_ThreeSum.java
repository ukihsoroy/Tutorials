package org.ko.problems;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Problem15_ThreeSum {

    public static void main(String[] args) {

    }

    public List<List<Integer>> threeSum (int[] nums) {
        //
        Set<String> set = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j ++) {
                for (int k = j + 1; k < nums.length; k ++) {
                    String node = nums[i] + "," + nums[j] + "," + nums[k];
                    if (nums[i] + nums[j] + nums[k] == 0 && !set.contains(node)) {
                        set.add(node);
                    }
                }
            }
        }
        List<List<Integer>> result = new ArrayList<>();
        int s = 0;
        for (String node : set) {
            List<Integer> r = new ArrayList<>();
            for (String n : node.split(",")) {
                r.add(Integer.parseInt(n));
            }
            result.add(r);
            s ++;
        }
        return result;
    }
}
