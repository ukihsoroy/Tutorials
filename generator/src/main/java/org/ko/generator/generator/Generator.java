package org.ko.generator.generator;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class Generator {

    @Autowired private List<AbstractGenerator> generators;


    public void generator () {
        if (CollectionUtils.isNotEmpty(generators)) {
            generators.forEach(AbstractGenerator::generator);
        }
    }

}
