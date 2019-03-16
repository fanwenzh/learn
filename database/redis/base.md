redis
        字符串string
        哈希hash
        列表list
        集合set
        有序集合zset

        字符串string
            设置键值
                set key value
            设置键值,过期时间
                setex aa 3 aa
            设置多个键值
                mset key1 value1 key2 value2 ..
            追加值
                append key value
            获取值
                get key
            获取多个值
                mget key1 key2...
        键命令
            查找键，参数支持正则表达式
                如：keys * ， keys 'a*'
            判断键是否存在
                exists.key  存在返回1， 不存在返回0
            查看键的值的类型
                type(key)
            删除键及其值
                del key1, key2...
            设置过期时间
                expire key time
            查看键有效时间
                ttl key
        哈希hash
            设置单个属性
                hset key field value
            设置多个属性
                hmset key field1 value1 field2 value2 ...
            获得key的所有属性
                hkeys key
            获得key的某一属性
                hget key field
            获得key的多个属性
                hmget key field1 field2..
            获取所有属性的值
                hvals key
            删除属性，属性对应的值会被⼀起删除
                hdel key field1 field2 ...
        list
            在左侧插入数据
                lpush key value1 value2 ...
            在右侧插入数据
                rpush key value1 value2 ...
            在指定元素的前或后插入新元素
                linsert key before或after 现有元素 新元素
            获取元素
                lrange key start stop          //start、stop为元素的下标索引
            修改值
                lset key index value
            删除值
                lrem key count value             //count >0 从头到尾删 ， < 0 相反， =0 全删
                    如： 从'a2'列表右侧开始删除2个'b'
                         lrem a2 -2 b
        set    
            无序集合,元素为string类型， 唯一性，不重复， 对于集合没有修改操作
            添加元素
                sadd key member1 member2 ...
            返回所有的元素
                smembers key
            删除指定元素
                srem key member
        zset
            有序集合， 元素为string类型， 唯一性，不重复， 对于集合没有修改操作
            每个元素都会关联一个double类型的score，表示权重，通过权重将元素从小到大排序
            添加
                zadd key score1 member1 score2 member2 ...
            获取按照下标
                zrange key start stop，  获取结果按照权重排序了
            返回score值在min和max之间的成员
                zrangebyscore key min max    //按照权重查找
            删除指定元素
                zrem key member1 member2 ...
            删除权重在指定范围的元素
                zremrangebyscore key min max