# Web development tools (Part 3)

## `Section: Performance`(Performance-Part1.2)

### `Summary`: In this documentation, we improve website performance by analycing the critical render path.

### `Check Dependencies:`

- None

------------------------------------------------------------

#### `本章背景：`
- 本章是第一部分第一小节，第一小节目的在于优化代码和文件的大小达到缩减传输文件总量大小从而提升速度，第二小节的目的在于根据 `Rendering path` 改善传输中的文件优先级和先后顺序达到提升用户浏览加载体验。

- 本小节包括的内容有：分析 `critical render path`，然后从 html file，css file，还有 js file 三大类文件的位置和代码进行优化。

------------------------------------------------------------

### `Brief Contents & codes position`
- 3.1 Optimize html file.
- 3.2 Optimize css file.
- 3.3 Optimize js file.
- 3.4 Tools to check website performance.

<p align="center">
<img src="../assets/w16.png" width=90%>
</p>

<p align="center">
<img src="../assets/w17.png" width=90%>
</p>

------------------------------------------------------------

### `Step1: Optimize html file`

A. 正常相对静态的网页的优化规则是使用`普通型`或者`defer型`，如果使用`普通型`则把 js 文件放在最后，css 文件放在前面；如果使用`defer型`，则 js 文件的位置不需要讲究。

B. 当然这种情况只对于相对静态的网页而言，相对动态一点的需要马上执行 js 文件的话就可以考虑`普通型`或者`async型`。


#### `Comment:`
1. 

### `Step2: Optimize css file.`

#### `Comment:`
1. 


### `Step3: Optimize js file.`

#### `Comment:`
1. 

### `Step4: Tools to check website performance.`

#### `Comment:`
1.

### `Step5. .`


### `Step6 Concept questions.`

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



