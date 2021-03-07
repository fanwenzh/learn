redis配置
```shell
# 服务器启动
# 前台shell启动
./src/redis-server
./src/redis-server /etc/redis/my.conf # 以配置启动
redis-cli -p port
redis-cli shutdown # 关闭
# 后台启动
service redisd start
service redisd stop

# 权限设置
# 永久设置: 在redis.conf修改requirepass
redis-cli -h 127.0.0.1 -p myPort -a myPassword
# 已启动的redis设置临时密码
config set requirepass myPassword
# 查看密码
config get rquirepass

# 持久化：再次打开自动读取
# RDB: shutdown后自动调用save命令保存, 全量数据快照, 文件小, 恢复快: 默认方式
# redis.conf文件配置
bgsave # 开启后台进程进行备份
lastsave # 上次备份的时间
mv dump.rdb otherDump.rdb
# AOF(append only file), 日志记录的方式：可读性高, 适合增量保存, 数据不易丢失
# 记录所有数据库变更命令 
config set appendonly yes # 暂时开启
# 修改redis.conf配置文件
# appendonly yes自动开启
# appendfsync always # 每一次操作持久化一次
# appendfsync everysec # 每隔一秒持久化一次
# 默认为RDB-AOF混合持久化方式

# 主从同步
初始化全量同步, 随后为增量同步
# sentinel哨兵机制
# 数据分片(集群)：一次性哈希算法, 对2^32取模, 将哈希值空间组织成虚拟的圆环
# 数据倾斜问题
```