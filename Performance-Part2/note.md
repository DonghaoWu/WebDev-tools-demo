light house

- https
    - secure and encryption
    - github support https
    - let's encrypt website
    - cloudflare CDN server
    - 

- App manifest
    - app icon
    - include a viewport tag in .public/index.html
    - ./public/manifest.json, set up the icon,so a user can add an icon in a phone.(比如说一个移动端用户可以在收藏一个 web app 之后在桌面看到一个新的 icon。)
    - 在加载时，在移动端可以看到加载背景和 icon 。

- Service Worker
    - background worker, offline experierce.
    - ./src/registerServiceWorker.js
    - ./build/service-worker.js
    - another worker
    - application tag -> service worker ->
    - Web API: Cache API, in browser
    - Cache API: Application tag -> Cache -> Cache Storage
    - 

- deploy
    - npm install gh-pages

    package.json:
    - "predeploy":"npm run build",
    - "deploy": "gh-pages -d build",

    - "homepage":"https://...github.io/<repoName>"

    - npm run deploy

    - github repo setting:
        Github Pages: select gh-pages branch

    - test website in lighthouse


- update
    - 旧版 registerServiceWorker.js , 新版 serviceWorker.js
    - 对旧版的更新：删除旧版的 registerServiceWorker.js，用serviceWorker.js取代， 然后在 ./src/index.js 中更新 import 的文件名字。
    - 最后在 ./src/index.js 末段使用新版的调用语句：
    ```js
    serviceWorker.unregister();
    ```

    - 更新 react version 到至少 16.10.2
    - 在deploy的之前需要把上面的语句改成：
    ```js
    serviceWorker.register();
    ```

- Solution part1:
    - swap: ./src/App.css
    @font-face{
        font-display: swap;
    }

    - Accessibilities
        - <input aria-label='Search Robots'>

    - SEO
        - <meta name="Description" content="Where robots make friends">

    - set up the images size:
        - <img alt='robots' src={`https://robohash.org/${id}?size=200X200`} />

    - npm run deploy

-    Solution part2:
    - Manifext does not have icons at least 512px.

        - Favicon generator
            upload an image
        - download images
        - move images to public folder
        - copy the code in the website and  paste them into ./public/index.html <header>
    
    - change the icon size
        - ./public/manifest.json

        - "icons":[
            {
                "src":"/android-chrome-192x192.png",
                "sizes":"192x192",
                "type":"image/png",
            },
            {
                "src":"/android-chrome-384x384.png",
                "sizes":"512x512",
                "type":"image/png",
            },
        ]

        - npm run deploy

