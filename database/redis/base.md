# redis
```shell
# http://www.redis.cn/commands.html
# 数据类型
字符串string、哈希hash、列表list、集合set、有序集合zset
# 其他命令
dbsize # 数据总量
keys pattern # 获取符合类型的键
scan [cursor:0] [pattern] [count] # 从cursor获取cout数量的键(增量式)
# 持久化
save 900 1 # 15分钟（900秒钟）内至少1个键被更改则进行快照; 叠加为或关系

incr key (value)# 原子操作，自增+1
decr key (value)# 自减
# redis无状态发布队列
subscribe channel ... # 订阅channel频道
publish channel value # 频道channel发布消息# 

# 字符串string: get、set、del, getSet
set key value # 设置键值  getset key value
setex key seconds value # 设置键值,过期时间
mset key1 value1 key2 value2 # 设置多个键值
append key value # 追加值    
get key # 获取值
mget key1 key2 # 获取多个值
strlen key # string长度

# 键命令:
key *, keys a* # 查找键，参数支持正则表达式
exists key # 存在返回1, 不存在返回0
type key # 判断类型 string
del key1, key # 删除键及键值
expire key seconds # 设置过期时间秒
expireat key timestamp # 设置过期时间戳
ttl key # 查看键有效时间

# 哈希hash: hset, hget, hdel
hset key field value # 设置单个属性
hmset key field1 value1 field2 value2... # 设置多个属性
hkeys key # 获得key的所有属性
hget key field # 获取key的某一属性
hmget key field1 field2 # 获取key的多个属性
hvals key # 获取所有属性的值
hdel key field1 field2 # 删除属性
hexists key field # 是否存在

# list(如实现消息队列): lpush, rpush, lpop, rpop
llen key # 返回list长度
lpush key value1 value2 ... # 在左侧插入数据
lpop # 弹出队列消息
blpop key timestap # 等待x秒再返回
rpush key value1 value2 ... # 在右侧插入数据
linset key before后after 现有元素 新元素 # 在指定元素的前或后插入新元素
lrange key start stop # 获取元素, 其中start、stop为元素的下标索引
lindex key index # 获取元素值
lset key index value # 修改值
lrem key count value # 删除值, count >0 从头到尾删 ， < 0 相反， =0 全删

# set: 无序集合,元素为string类型，对于集合没有修改操作 sadd, smembers, srem
sadd key menber1 menber2 ... # 添加元素
smembers key # 返回所有元素
srem key member # 删除指定元素
sismember key menmber #是否在集合中
rpoplpush list newlist # 将元素从list转移到newlist

# zset：zadd, zrange, zrem
# 有序集合, 元素为string类型, 唯一性, 不重复, 对于集合没有修改操作
# 每个元素都会关联一个double类型的score，表示权重，通过权重将元素从小到大排序 
zadd key score1 member1 score2 member2 ... # 添加
zrange key start stop # 获取下表按权重排序
zrange key 0 -1 withscore # 连同权重（分数）
zrangebyscore key min max # 返回score值在min和max之间的成员
zrem key value member2 ... # 删除指定元素
zremrangebyscore key min max # 删除权重在指定范围的元素

# 事务
multi  # 命令序列
exec   # 执行
DISCARD # 清除先前放入队列的命令
watch key [key...] # 监控key, 添加乐观锁(key不变则队列命令执行成功)
unwatch # 清楚为事务监控的key
```