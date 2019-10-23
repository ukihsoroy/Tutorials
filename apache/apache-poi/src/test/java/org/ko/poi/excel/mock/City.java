package org.ko.poi.excel.mock;

import org.ko.poi.excel.annotation.ExcelColumn;

import java.util.Date;

public class City {

    /**
     * 主键
     */
    @ExcelColumn(index = "1", name = "主键")
    private Long id;

    /**
     * 城市名称
     */
    @ExcelColumn(index = "3", name = "城市名称")
    private String city;

    /**
     * 城市全路径
     */
    @ExcelColumn(index = "2", name = "城市路径")
    private String cityPath;

    /**
     * 缩写
     */
    @ExcelColumn(index = "4", name = "缩写")
    private String shorten;

    /**
     * 创建时间
     */
    @ExcelColumn(index = "5", name = "创建时间")
    private Date createDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCityPath() {
        return cityPath;
    }

    public void setCityPath(String cityPath) {
        this.cityPath = cityPath;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getShorten() {
        return shorten;
    }

    public void setShorten(String shorten) {
        this.shorten = shorten;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
