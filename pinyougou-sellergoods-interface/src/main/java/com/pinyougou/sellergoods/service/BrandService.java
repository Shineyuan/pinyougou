package com.pinyougou.sellergoods.service;

import entity.PageResult;
import pojo.TbBrand;

import java.util.List;
import java.util.Map;

public interface BrandService {
    /*
    *初始化加载,查询所有品牌
    */
    public List<TbBrand>findAll();
    //分页显示
    public PageResult findPage(int pageNum, int pageSize);
    //    增
    public void add(TbBrand brand);
    //改
    public void update(TbBrand brand);
    //查
    public TbBrand findOne(Long id);
    //批量删
    public void delete(Long[] ids);
    //条件查询品牌,并且分页显示
    public PageResult findPage(TbBrand brand, int pageNum,int pageSize);
    /**
     * 品牌下拉框数据
     */
    List<Map> selectBrandOptionList();
}
