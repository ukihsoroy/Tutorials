package io.ukihsoroy.gatling.strategy;

/**
 * 策略基础类
 * @author K.O
 */
public abstract class AbstractGatlingStrategy implements IGatlingStrategy {

    /**
     * 执行测试
     * @throws Exception
     */
    @Override
    public abstract void executor() throws Exception;

    /**
     * 导出测试报告
     * @throws Exception
     */
    @Override
    public abstract void exportReport() throws Exception;

}
