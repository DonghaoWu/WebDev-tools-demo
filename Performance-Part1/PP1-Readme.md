keiko corp

make website faster

best practice

do not want to wait

what happen when you browse the website?

client - server

3 seconds

frontend backend think like a senior developer

transfer part

send a request

Honey I shrunk the files

The traveling deliveryman

download all related files

minimize text

library:

`uglifyjs`

minimize images

JPG: photos,complex and useful colors
SVG: logo, 但可放大缩小而不影响清晰度
PNG: logo
Gif: 小动图

free tools: 1. JPEG-optimizer website
            2. TinyPNG

always lower jpeg quality 30-60%
media query 根据浏览器/平板电脑/手机的大小而分配图片

```css
body{
    background:yellow;
}

@media screen and (min-width: 900px){
    body{
        background:url('./assets/w2.jpg') no-repeat center center fixed;
        background-size: cover;
    }
}

@media screen and (max-width: 500px){
    body{
        background:url('./assets/w2.jpg') no-repeat center center fixed;
        background-size: cover;
    }
}
```

free tools: 1. `imgix`    content-delivery api
            upload the image and get minimize image url
            2. remove metadata (exif data)


The travleling deliverryman

less trips.

do you have to download all files?

newwork optimizations

1. minimize all text: website Minify
2. minimize images: open the image -> tools -> adjust size(改变实际图片的大小让它跟 css 里面定义的一样。)
3. media queries：参考上面
4. minimize all of files：把所有 js 文件放一起，所有 css 文件放一起。

developing tools -> network tag -> refresh -> slow 3G -> disable cache -> hard reload


`critical render path `

html -> dom 
css -> css dom
js -> interaction

1. optimize html file : css as soon as possible, js as late as possible

2. for css: only load whatever is needed. Above the fold loading, media attributes, less specificity

above the fold loading: 即打开网页的时候，优先加载先开到的 css 文件，然后在后台加载其他部分的 css。

media attributes：即限定指定的 css 文件在多长的文件框内才出现和下载。

less specificity：即少层级的定位。或使用直接放进 html 的 style tag，或者 inline style tag。

3. `重点难点：`load scripts asynchronously, defer loading of scripts, minimize DOM manipulation, Avoid long running JavaScript

load scripts asynchronously: 使用 async 就是要开一条新的 thread 去同时下载 js file，但读取完之后马上执行 js file，这样就会对主流程（html parsing）进行截断。（互动优先）

defer loading：就是等 js file下载完， 主流程也同时运行，直到两个流程都完成，最后才执行 js file。（浏览优先）

minimize DOM manipulation：

reading js file -> loading DOM content -> finish all work, 主要理解举例的工作原理。`可以模拟一个流程图`

Avoid long running JavaScript：一些弹窗的 js 功能 会使整个网页的功能都打断。









