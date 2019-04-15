# redis
```shell
# http://www.redis.cn/commands.html
# 数据类型
字符串string、哈希hash、列表list、集合set、有序集合zset
# 其他命令
dbsize # 数据总量
keys pattern # 获取符合类型的键
scan [cursor:0] [pattern] [count] # 从cursor获取cout数量的键(增量式)
# redis无状态发布队列
subscribe channel ... # 订阅channel频道
publish channel value # 频道channel发布消息
# 字符串string
set key value # 设置键值 
setex key seconds value # 设置键值,过期时间
mset key1 value1 key2 value2 # 设置多个键值
append key value # 追加值    
get key # 获取值
mget key1 key2 # 获取多个值
# 键命令
key *, keys a* # 查找键，参数支持正则表达式
exists key # 存在返回1, 不存在返回0
type key # 判断类型
del key1, key # 删除键及键值
expire key seconds # 设置过期时间秒
expireat key timestamp # 设置过期时间戳
ttl key # 查看键有效时间
# 哈希hash
hset key field value # 设置单个属性
hmset key field1 value1 field2 value2... # 设置多个属性
hkeys key # 获得key的所有属性
hget key field # 获取key的某一属性
hmget key field1 field2 # 获取key的多个属性
hvals key # 获取所有属性的值
hdel key field1 field2 # 删除属性
# list(如实现消息队列)
lpush key value1 value2 ... # 在左侧插入数据
lpop # 弹出队列消息
blpop key timestap # 等待x秒再返回
rpush key value1 value2 ... # 在右侧插入数据
linset key before后after 现有元素 新元素 # 在指定元素的前或后插入新元素
lrange key start stop # 获取元素, 其中start、stop为元素的下标索引
lset key index value # 修改值
lrem key count value # 删除值, count >0 从头到尾删 ， < 0 相反， =0 全删
# set: 无序集合,元素为string类型， 唯一性，不重复， 对于集合没有修改操作
sadd key menber1 menber2 ... # 添加元素
smembers key # 返回所有元素
srem key member # 删除指定元素
# zset：
# 有序集合, 元素为string类型, 唯一性, 不重复, 对于集合没有修改操作
# 每个元素都会关联一个double类型的score，表示权重，通过权重将元素从小到大排序 
zadd key score1 member1 score2 member2 ... # 添加
zrange key start stop # 获取下表按权重排序
zrangebyscore key min max # 返回score值在min和max之间的成员
zrem key member1 member2 ... # 删除指定元素
zremrangebyscore key min max # 删除权重在指定范围的元素
```