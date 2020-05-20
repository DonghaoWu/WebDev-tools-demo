# Web development tools (Part 12)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Performance`(Performance-Part2.3)

### `Summary`: In this documentation, we improve website performance by making a progressive web application.

### `Check Dependencies & Tools:`

- [web.dev](https://web.dev/)

------------------------------------------------------------

#### `本章背景：`
- Progress web application 的概念是想把 web application 具备 mobile application 的特征。

- 将一个 web app 转化成 PWA 需要注意的3个方面。

<p align="center">
<img src="../assets/p12-1.png" width=90%>
</p>

------------------------------------------------------------

### <span id="12.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [12.1 HTTPS.](#12.1)
- [12.2 App manifest.](#12.2)
- [12.3 Service worker.](#12.3)
- [12.4 Deploy & update](#12.4)
- [12.5 PWA part 1](#12.5)
- [12.6 PWA part 2](#12.6)

------------------------------------------------------------



### <span id="12.1">`Step1: HTTPS.`</span>

- #### Click here: [BACK TO CONTENT](#12.0)

- Why `Https`:
    - secure and encryption

- What support https?
    - github support https
    - [let's encrypt](https://letsencrypt.org/)
    - [cloudflare](https://www.cloudflare.com/)

----------------------------------------------------------------------------

#### `Comment:`
1. 


### <span id="12.2">`Step2: App manifest.`</span>

- #### Click here: [BACK TO CONTENT](#12.0)

- Why `App manifest`:
    - web app icon
    - include a viewport tag in .public/index.html
    - ./public/manifest.json, set up the icon,so a user can add an icon in a phone.(比如说一个移动端用户可以在收藏一个 web app 之后在桌面看到一个新的 icon。)
    - 在加载时，在移动端可以看到加载背景和 icon 。

----------------------------------------------------------------------------

#### `Comment:`
1. 


### <span id="12.3">`Step3: Service Worker.`</span>

- #### Click here: [BACK TO CONTENT](#12.0)

- Why `Service Worker`:
    - background worker, offline experierce.
    - ./src/registerServiceWorker.js
    - ./build/service-worker.js
    - another worker
    - application tag -> service worker ->
    - Web API: Cache API, in browser
    - Cache API: Application tag -> Cache -> Cache Storage

- __`Result`__:

<p align="center">
<img src="../assets/p12-2.png" width=90%>
</p>

----------------------------------------------------------------------------

#### `Comment:`
1. 


### <span id="12.4">`Step4: Deploy & update.`</span>

- #### Click here: [BACK TO CONTENT](#12.0)



----------------------------------------------------------------------------


#### `Comment:`
1. 

- #### Click here: [BACK TO CONTENT](#12.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)



