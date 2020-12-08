package io.ukihsoroy.gatling.strategy;

/**
 * 策略基础类
 * @author K.O
 */
public interface IGatlingStrategy {

    /**
     * 执行测试
     * @throws Exception
     */
    void executor() throws Exception;

    /**
     * 导出测试报告
     * @throws Exception
     */
    void exportReport() throws Exception;

}
