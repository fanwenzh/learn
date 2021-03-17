# 防火墙设置
```shell
iptables -A INPUT -p tcp --dport 4567 -j DROP   # 关闭入数据
iptables -A OUTPUT -p tcp --dport 4567 -j DROP  # 关闭出数据

```