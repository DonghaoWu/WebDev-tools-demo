what is ssh? potocol

comunicate computers between internet

secure shell protocol

ssh commands

digitalocean.com: get full access to the remote server and run commands on it 
ipv4: ip address
```bash
$ ssh root@167.99.146.57
$ ls
$ mkdir test
$ ls
```

ssh {user}@{host}

ssh key to connect to github

```bash
$ ssh root@167.99.146.57
$ git
$ sudo apt-get install git
$ git clone url   --- fail(因为对应的 remote server 没有取得对应的 github 权限。) （这里的 url 是从 SSH 选项中使用） permission denied

$ git clone url   --- success （这里的 url 是从 HTTPS 选项中使用）
```

```bash

$ cd superawesome.com 
$ rsync -av . root@167.99.146.57:~/superawesome.com (在本地复制文件夹 superawesome 到远程server)
$ ssh root@167.99.146.57
$ ls (在这里就可以看到 新文件夹 superawesome)
```

symmetrical encryption (secret key) need key change 双方都有同一把key

asymmetrical encryption 每人有两把 key（pubilc key & private key）
原理： 本地有两把钥匙，设定为红色，目标也有两把钥匙，设定为蓝色。当红色电脑需要传输文件到蓝色电脑时，会首先从蓝色电脑获得蓝色`public key`,
然后用蓝色`public key`加密需要加密的文件，然后传输到蓝色电脑，最后用蓝色`private key`解密。

通俗意思是：我不相信任何电脑，任何电脑向我发送文件必须使用我的箱子（public key）装着，然后发过来我才能接受并且解密。

hashing

简单理解就是对信息内容进行乱码加密，也就是说就算你能够获得 public key 去伪装目标，信息回来的时候也可以使用 private key 打开，
但是这是打开后的内容是乱码的，而要恢复这些乱码信息需要 另外一个 secret key 去解开， 也就是说这个过程是需要两个 私密 key 才能
解密的，不排除有些算法把这两个 key 融合在一起使用。

passowrd or SSH：

password 是不安全的，使用 SSH 相当于安全地授权。

如何使用 SSH 连接 remote server，相当于把本地电脑列入远程电脑的信任白列表：




`在本地创建 key pairs`


```bash
$ cd ～/.ssh
$ open .
$ ls

## generate key pairs
$ ssh-keygen -C "test@gmail.com" (接下来需要你选择对应的储存位置)，在这里举例为`id_rsa`
$ ls (这时就有两个新的文件： id_rsa 和 id_rsa.pub）
$ pbcopy < ~/ .ssh/id_rsa.pub ## 本地复制一份 public key
```

`把 public key 给 remote server`

```bash
$ ssh root@167.99.146.57
$ mkdir .ssh
$ cd /.ssh
$ nano authorized_keys 
## 输入这个命令之后，进入编辑文件界面， 在编辑文件界面， 先 command + c 
## 把 public key放到文件里面，然后 command + x 退出编辑界面。
$ exit ## 退出远程命令 terminal， logout

```

`退出账号之后，关闭本地 terminal， 这样储存在terminal 的 password session就会自动消失。`
```bash
$ ssh root@167.99.146.57 ## 重新登录，如果你有多个本地 private key，就会连接失败
$ ssh-add ~/ .ssh/id_rsa ## 设定本地目前生效的唯一 private key。
$ ssh root@167.99.146.57
```

提问：把本地 public key 放在 remote server的动作，可以保证每当 remote 传送文件到本地的时候都能通过，
那么时候也需要在 remote 生成一个 public key，保证本地可以传送文件到 remote？

Recommended ssh-keygen  command:

```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Set up ssh with github

github -> setting -> SSH and GPG keys -> This is a list of SSH keys associated with your account.

```bash
$ cd /.ssh
$ ls
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
$ pbcopy < ~/ .ssh/id_rsa.pub
$ ssh-add ~/ .ssh/id_rsa
```

```bash
$ ssh-add -l
$ ssh-add -D
$ ssh-add ~/ .ssh/id_rsa  ## 本地操作 private key 命令
```

github -> setting -> SSH and GPG keys -> This is a list of SSH keys associated with your account. -> add new ssh key

clone a repo with ssh-key way

```bash
$ cd ..
$ git clone url  ## 成功下载之后 github 界面上面的 key 图标从灰转到 绿色。
```
























