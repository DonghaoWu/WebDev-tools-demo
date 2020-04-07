# Web development tools (Part 2)

## `Section: Performance`(Performance-Part1.1)

### `Summary`: In this documentation, we improve website performance in some simple ways.

### `Check Dependencies:`

- None

### `本章背景：`
- 本章是第一部分第一小节，第一小节目的在于优化代码和文件的大小达到缩减传输文件总量大小从而提升速度，第二小节的目的在于根据 `Rendering path` 改善传输中的文件优先级和先后顺序达到提升用户浏览加载体验。

- 本小节包括的内容有：代码压缩工具，不同图片的使用法则，使用 `media query` 根据浏览器/平板电脑/手机的大小而分配对应大小和像素的图片

- 

### `Brief Contents & codes position`
- 1.1 Minimize text.
- 1.2 Minimize images.
- 1.3 Media queries.
- 1.4 Content-delivery api.

### `Step1: Minimize text`

A. Tool: [Minify.js](https://www.minifier.org/)

<p align="center">
<img src="../assets/w6.png" width=90%>
</p>

-------------------------------------------------------------

<p align="center">
<img src="../assets/w7.png" width=90%>
</p>

#### `Comment:`
1. 

### `Step2: Minimize images.`

<p align="center">
<img src="../assets/w8.png" width=90%>
</p>

-------------------------------------------------------------

__`Location: ./example1.1/index.html`__

<p align="center">
<img src="../assets/w9.png" width=90%>
</p>

-------------------------------------------------------------

<p align="center">
<img src="../assets/w10.png" width=90%>
</p>

-------------------------------------------------------------

#### `Comment:`
1.  JPG: photos,complex and useful colors
    SVG: logo, 但可放大缩小而不影响清晰度
    PNG: logo
    Gif: 小动图

- free tools: 1. JPEG-optimizer website
            2. TinyPNG

- Always lower jpeg quality 30-60%


### `Step3. Media queries.`

__`Location: ./example1.1/style.css`__

```css
body {
  background: yellow;
}

@media screen and (min-width: 900px) {
  body {
    background: url('./large-background.jpg') no-repeat center center fixed;
    background-size: cover;
  }
}

@media screen and (max-width: 500px) {
  body {
    background: url('./large-background.jpg') no-repeat center center fixed;
    background-size: cover;
  }
}

h1 {
  color: red;
}
```

#### `Comment:`
1. 


### `Step4. Less trips.`

__`Location: ./example1.1/index.html`__

```html
<!DOCTYPE html>
<html>
<head>
  <title>Network Performance</title>
  <!-- CSS -->
  <link rel="stylesheet" type="text/css" href="./style.css">

</head>
<body>
  <h1>Helloooo</h1>

  <!-- Large Image -->
  <img src="./puppy.jpg" width="131px" height="200px">

  <!-- javascript -->
  <script type="text/javascript" src="./script.js"></script>
</body>
</html>
```

#### `Comment:`
1. Previous code:

```html
<!-- #1 Minimize all text -->
<!-- #2 Minimize images -->
<!-- #3 Media Queries -->
<!-- #4 Minimize # of files -->


<!DOCTYPE html>
<html>
<head>
  <title>Network Performance</title>
  <!-- CSS -->
  <link rel="stylesheet" type="text/css" href="./style.css">
  <link rel="stylesheet" type="text/css" href="./style2.css">

</head>
<body>
  <h1>Helloooo</h1>

  <!-- Large Image -->
  <img src="./puppy.jpg" width="300px" height="200px">

  <!-- javascript -->
  <script type="text/javascript" src="./script.js"></script>
  <script type="text/javascript" src="./script2.js"></script>
  <script type="text/javascript" src="./script3.js"></script>
</body>
</html>
```

2. 取消了 style2.css, script2.js, script3.js 的连接，把 script2.js, script3.js 的内容合并到 script.js 中。

3. 效果对比：

<p align="center">
<img src="../assets/w11.png" width=90%>
</p>

-------------------------------------------------------------

<p align="center">
<img src="../assets/w12.png" width=90%>
</p>


### `Step4 Concept questions.`

#### `A. What is SSH?`

- The SSH protocol (also referred to as Secure Shell) is a method for secure remote login from one computer to another. It provides several alternative options for strong authentication, and it protects the communications security and integrity with strong encryption. It is a secure alternative to the non-protected login protocols (such as telnet, rlogin) and insecure file transfer methods (such as FTP).

- The protocol works in the client-server model, which means that the connection is established by the SSH client connecting to the SSH server. The SSH client drives the connection setup process and uses public key cryptography to verify the identity of the SSH server. After the setup phase the SSH protocol uses strong symmetric encryption and hashing algorithms to ensure the privacy and integrity of the data that is exchanged between the client and server.

#### `B. What does SSH use for?`
- providing secure access for users and automated processes

- interactive and automated file transfers

- issuing remote commands

- managing network infrastructure and other mission-critical system components.

- Strong authentication with SSH keys

- SSH provides strong encryption and integrity protection

#### `C. What are symmetrical encryption, asymmetrical encryption and hashing?`

- `symmetrical encryption` (secret key) need key change 双方都有同一把key.

- `asymmetrical encryption` 每人有两把 key（pubilc key & private key）
原理： 本地有两把钥匙，设定为红色，目标也有两把钥匙，设定为蓝色。当红色电脑需要传输文件到蓝色电脑时，会首先从蓝色电脑获得蓝色`public key`,
然后用蓝色`public key`加密需要加密的文件，然后传输到蓝色电脑，最后用蓝色`private key`解密。

- 通俗意思是：我不相信任何电脑，任何电脑向我发送文件必须使用我的箱子（public key）装着，然后发过来我才能接受并且解密。`实现了git account（远程） 对 实体电脑（本地）的信任，相当于把本地电脑列入远程电脑的信任白列表`。

- `hashing` 简单理解就是对信息内容进行乱码加密，也就是说就算你能够获得 public key 去伪装目标，信息回来的时候也可以使用 private key 打开，
但是这是打开后的内容是乱码的，而要恢复这些乱码信息需要 另外一个 secret key 去解开， 也就是说这个过程是需要两个 私密 key 才能
解密的，不排除有些算法把这两个 key 融合在一起使用。

#### `D. 把本地 public key 放在 remote server的动作，可以保证每当 remote 传送文件到本地的时候都能通过，那么时候也需要在 remote 生成一个 public key，保证本地可以传送文件到 remote?`

