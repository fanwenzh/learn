package com.fwz.utils;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * @author fwz
 * @date 2019/1/11 上午10:21
 * @desc 利用tk.mybatis生成通用代码
 * @desc https://github.com/abel533/Mapper/wiki/4.1.mappergenerator
 */
public interface MyMapper<T> extends Mapper<T>, MySqlMapper<T> {
}
