# Web development tools (Part 2)

### `Key Word: Minimize code and less trips, media queries`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Performance`(Performance-Part1.1)

### `Summary`: In this documentation, we improve website performance in some simple ways.

### `Check Dependencies & Tools:`

- None

------------------------------------------------------------

#### `本章背景：`

- 本章分两部分，主要针对文件传输的中间环节，分别是：
    1. 优化代码并减少传输文件数量和文件大小 :white_check_mark:
    2. 调整文件传输中的优先级提升用户体验：`The Critical Rendering path`

- 本小节包括的内容有：代码压缩工具，不同图片的使用法则，使用 `media query` 根据浏览器/平板电脑/手机的大小而分配对应大小和像素的图片，还有合并文件和删除重复无效代码。

<p align="center">
<img src="../assets/w18.png" width=90%>
</p>

------------------------------------------------------------

### <span id="2.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [2.1 Minimize text.](#2.1)
- [2.2 Minimize images.](#2.2)
- [2.3 Media queries.](#2.3)
- [2.4 Less trips.](#2.4)
- [2.5 Content-delivery api.](#2.5)

------------------------------------------------------------

### <span id="2.1">`Step1: Minimize text`</span>

- #### Click here: [BACK TO CONTENT](#2.0)

  1. Tool: Minify.js
  - [https://www.minifier.org/](https://www.minifier.org/)

  <p align="center">
  <img src="../assets/w6.png" width=90%>
  </p>

  -------------------------------------------------------------

  <p align="center">
  <img src="../assets/w7.png" width=90%>
  </p>

#### `Comment:`
1. 

### <span id="2.2">`Step2: Minimize images.`</span>

- #### Click here: [BACK TO CONTENT](#2.0)

  <p align="center">
  <img src="../assets/w8.png" width=90%>
  </p>

  -------------------------------------------------------------

  __`Location: ./demo-apps/transimission-performance1/index.html`__

  <p align="center">
  <img src="../assets/w9.png" width=90%>
  </p>

  -------------------------------------------------------------
  <p align="center">
  <img src="../assets/w14.png" width=90%>
  </p>

  -------------------------------------------------------------

  <p align="center">
  <img src="../assets/w10.png" width=90%>
  </p>

  -------------------------------------------------------------

#### `Comment:`
1. 分类：
    - JPG: photos,complex and useful colors
    - SVG: logo, 但可放大缩小而不影响清晰度
    - PNG: logo
    - Gif: 小动图

2. free tools: 1. JPEG-optimizer website
            2. TinyPNG

3. Always lower jpeg quality 30-60%


### <span id="2.3">`Step3. Media queries.`</span>

- #### Click here: [BACK TO CONTENT](#2.0)

  __`Location: ./demo-apps/transimission-performance1/style.css`__

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
1. 这样做的好处就是可以根据不同的客户端的大小：电脑/平板/手机，设定传输对应大小跟像素的图片，以达到提升速度却不影响体验的目的。

### <span id="2.4">`Step4. Less trips.`</span>

- #### Click here: [BACK TO CONTENT](#2.0)

  __`Location: ./demo-apps/transimission-performance1/index.html`__

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

  - Before.

  <p align="center">
  <img src="../assets/w11.png" width=90%>
  </p>

-------------------------------------------------------------

  - After.

    <p align="center">
    <img src="../assets/w12.png" width=90%>
    </p>

### <span id="2.5">`Step5. Content-delivery api.`</span>

- #### Click here: [BACK TO CONTENT](#2.0)

  1. Tool: imgix 
  - [https://www.imgix.com/](https://www.imgix.com/)

  <p align="center">
  <img src="../assets/w13.png" width=90%>
  </p>

  2. 这个工具的作用是把图片托管在网站，然后转化成 API 形式，提高图片传输效率和稳定。

### <span id="2.6">`Step6 Concept questions.`</span>

- #### Click here: [BACK TO CONTENT](#2.0)

  #### `A. `


- #### Click here: [BACK TO CONTENT](#2.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

