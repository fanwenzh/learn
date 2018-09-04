# source 执行配置文件 # .

# 用户配置
/etc/passwd # 用户信息文件
/etc/shadow # 影子文件
/etc/group # 组文件
/etc/gshadow # 组密码
/etc/defaults/useradd 用户默认指文件
/etc/login.defs

# 环境变量: set
# PATH,   # "$PATH"

# 配置文件
# 所有用户
1# /etc/profile
  # USER, LOGNSME, PATH, 
# /etc/profile.d/*.sh
4# /etc/bashrc
# 当前用户配置
2# ~/.bash_profile
3# ~/.bashrc

# ~/.bash_logout # 注销时配置命令
# ~/.bash_history # 历史命令记录文件

# /etc/issue # 本地登录前的欢迎信息,
# /etc/ssh/sshd_config # Banner /etc/issue.net # 远程登录配置文件 
# /etc/issue.net # 远程登录前的欢迎信息
# service sshd restart # 重启ssh服务
# /etc/motd # 登录后的信息