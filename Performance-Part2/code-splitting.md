# Web development tools (Part 10)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Performance`(Performance-Part2.1)

### `Summary`: In this documentation, we improve website performance by code-splitting.

### `Check Dependencies:`

- None

------------------------------------------------------------

#### `本章背景：`
- code splitting 的概念是使 JS file 读取需要读取的优先。
- 当加载一个网站时如果一次过加载 bundle.js，相当于加载很多 js file，而 js file 里面的 fetch 或者其他代码会拖慢整个进程，如果有些网站，主要浏览区域和时长都是主页，那么其他副业的加载可以先不加载。
- 这个概念就是从整合返回到分散，从以前的分散 html 整合到 webpack 的 bundle.js，然后从 bundle.js 发展到按需分散加载(比如按需分配 component 所在的 js file)。

------------------------------------------------------------

### <span id="10.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [10.1 Optimize html file.](#10.1)
- [10.2 Optimize css file.](#10.2)
- [10.3 Optimize js file.](#10.3)
- [10.4 Tools to check website performance.](#10.4)

------------------------------------------------------------

### <span id="10.1">`Step1: Optimize html file`</span>

- #### Click here: [BACK TO CONTENT](#10.0)

1. 

__`Location: ./example1.2/index.html`__



#### `Comment:`
1. Load style tag in the `<head>`.
2. Load script right before `</body>`.

### <span id="3.2">`Step2: Optimize css file.`</span>

- #### Click here: [BACK TO CONTENT](#3.0)

1. Above the fold loading. (把次要的 css 文件放在后台下载执行)。

__`Location: ./example1.2/index.html`__

```html
<body>
  <!-- ... -->

  <script type="text/javascript">
    const loadStyleSheet = src => {
      if (document.createStyleSheet) {
        document.createStyleSheet(src);
      } else {
        const stylesheet = document.createElement('link');
        stylesheet.href = src;
        stylesheet.type = 'text/css';
        stylesheet.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
      }
    }
    window.onload = function () {
      console.log('window done');
      loadStyleSheet('./css/styleTest.css');
    }
  </script>
  
</body>
```

2. Media Attributes. ( css 文件根据浏览器类型大小进行针对下载)。

```html
<head>
  <link rel="stylesheet" href="./css/styleTest2.css" media="only screen and (min-width:500px)">
<head>
```

#### `Comment:`
1. Only load whatever is needed, check each css file. (减少加载无用的语句和文件)
2. Above the fold loading.（重要的首要页面先加载，次要的指定后台加载。）
3. Media Attributes. ( css 文件根据浏览器类型大小进行针对下载)
4. Less Specificity. （尽量缩减 css 选择器的层级，同时如果 css 内容不多可以考虑使用 `html internal css 或者 inline css`）。

----------------------------------------------------------------------------

<p align="center">
<img src="../assets/w19.png" width=90%>
</p>

----------------------------------------------------------------------------


### <span id="3.3">`Step3: Optimize js file.`</span>

- #### Click here: [BACK TO CONTENT](#3.0)

```html
<script></script>

<script async></script>

<script defer></script>
```

#### `Comment:`
1. Load Scripts asynchronously. 具体使用规则参考 `Step6`。
2. Defer Loading of Scripts.
3. Minimize DOM manipulation.
4. Avoid long running JavaScript. (举例，有些 JS 按钮功能会阻止整个加载过程。)

### <span id="3.4">`Step4: Tools to check website performance.`</span>

- #### Click here: [BACK TO CONTENT](#3.0)

- PageSpeed Insights
  [https://developers.google.com/speed/pagespeed/insights/](https://developers.google.com/speed/pagespeed/insights/)

- WebPagetest
  [https://www.webpagetest.org/](https://www.webpagetest.org/)

#### `Comment:`
1.


### <span id="3.5">`Step5 Concept questions.`</span>

- #### Click here: [BACK TO CONTENT](#3.0)

#### `A. What is critical render path?`

- Check this post. [Understanding the critical rendering path, rendering pages in 1 second](https://medium.com/@luisvieira_gmr/understanding-the-critical-rendering-path-rendering-pages-in-1-second-735c6e45b47a)

- Build DOM tree from html file
  - When this process is finished the browser will have the full content of the page, but to be able to render the browser has to wait for the CSS Object Model, also known as CSSOM event, which will tell the browser how the elements should look like when rendered.

- Build CSSOM from css file
  - CSS is one of the most important elements of the critical rendering path, because the browser blocks page rendering until it receives and processes all the css files in your page, CSS is render blocking.

- The Render Tree
  - This stage is where the browser `combines the DOM and CSSOM`, this process outputs a final render tree, which contains both the content and the style information of all the visible content on the screen.

- Layout
  - This stage is where the browser calculates the size and position of each visible element on the page, every time an update to the render tree is made, or the size of the viewport changes, the browser has to run layout again.

- Paint
  - When we get to the paint stage, the browser has to pick up the layout result, and paint the pixels to the screen, beware in this stage that not all styles have the same paint times, also combinations of styles can have a greater paint time than the sum of their parts. For an instance mixing a border-radius with a box-shadow, can triple the paint time of an element instead of using just one of the latter.

------------------------------------------------------------

#### `B. How does the browser rendering engine work?`

In order to render content the browser has to go through a series of steps:
1. Document Object Model(DOM)
2. CSS object model(CSSOM)
3. Render Tree
4. Layout
5. Paint.

------------------------------------------------------------

#### `C. Dealing with Javascript.`

- Javascript is a powerful tool that can manipulate both the DOM and CSSOM, so to execute Javascript, the browser has to wait for the DOM, then it has to download and parse all the CSS files, get to the CSSOM event and only then finally execute Javascript.

- When the parser finds a script tag it blocks DOM construction, then waits for the browser to get the file and for the javascript engine to parse the script, this is why Javascript is parser blocking.

------------------------------------------------------------

#### `D. 个人理解`
  1. 浏览器的运作是这样的，收到 html 文件之后，就从上往下读取代码，这个过程叫做 parsing ，目的是为了建立 DOM。
  2. 在 parsing 过程中，如果遇到了 css 文件，parsing 会被打断，DOM 的建立也会停止。这时会进行下载和读取对应 css 文件的代码，目的是为了建立 CSSOM。
  3. 由上可见，html parsing 跟 css 的读取是共用一个线程的，所以也会有人把它们放在一起讨论。
  4. 关于 js 文件的下载，就相对不一样。首先相同的是 js 文件跟 css 文件一样，会打断所有关于 DOM 和 CSSOM 的过程，而且 js 因为是动态互动属性，所以现在会把它的下载和执行过程分多种情况讨论，下面讨论一些常见情况：

    - 如果网页是静态为主，那么应该把 js 文件放在最后，等对应的 DOM 和 CSSOM 建立完成后再下载并执行 js 文件。

    - 对于上一种情况，也可以考虑使用`defer`型，`defer`型可以开出一条或多条新进程同步下载 js 文件而不打断整体进程，当下载完毕时不马上执行，在其他同步脚本执行后，DOMContentLoaded 事件前依次执行。`具有顺序性。`

    - 如果相关的 js 文件是需要马上对已建立的 DOM 进行改动的，可以使用普通型或者 `async`型，`async`型可以开出一条或多条新进程同步下载 js 文件而不打断整体进程，当下载完毕时马上执行，这时会打断原有的整体进程。但需要注意的是如果有多个`async`连续进行的话，执行时的顺序是无法分先后的，甚至是随机的。`不具有顺序性。`

    - 如果相关的 js 文件是不需要马上对已建立的 DOM 进行改动的，可以考虑使用`defer`型。

  5. 综上所述，js 文件里面的3种类型，主要是看当前页面加载的需要，有些是偏向先加载头部的就先执行 js 文件，如果页面不复杂的话可以最后加载 js 文件，而`async`和`defer`型都可以实现异步并行下载，但最大的区别是`async`马上执行且多个无确定顺序，`defer`最后执行且多个可确定顺序。3种类型都是根据实际需要无分好坏，在实际情况中 js 文件对 DOM 的操作可以是多次且有可能是马上的，还有先后的，所以根据实际情况结合3种类型一同出现也不奇怪。

  6. 为了帮助理解可以看下面的流程图对比：

  - 普通型：马上打断主进程进行下载并执行 js 文件
  - async 型：不打断主进行下载 js 文件，完成下载后打断主进程，执行 js 文件，如果是多个文件执行则是异步执行，不保证顺序。
  - defer 型：不打断主进程进行下载 js 文件，完成下载后执行，主进程完成后按顺序执行。

<p align="center">
<img src="../assets/w15.png" width=90%>
</p>

- #### Click here: [BACK TO CONTENT](#3.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)



