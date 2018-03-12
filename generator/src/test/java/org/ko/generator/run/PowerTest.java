package org.ko.generator.run;

import org.junit.Test;

public class PowerTest {

    @Test
    public void test1 () {
        String packages = "org.ko.data";
        String r = converterPackage(packages);
        System.out.println(r);
    }


    protected String converterPackage (String packages) {
        return packages.replace(".", "/");
    }
}
