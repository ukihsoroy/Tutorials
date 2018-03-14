package org.ko.generator.run;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

public class PowerTest {

    @Test
    public void test1 () {
        String packages = "org.ko.data";
        String r = converterPackage(packages);
        System.out.println(r);
    }

    @Test
    public void test2 () {
        String name = "name.java.ftl";
        String[] ary = StringUtils.split(name, ".");
        assert ary.length == 3;
    }


    protected String converterPackage (String packages) {
        return packages.replace(".", "/");
    }


}
