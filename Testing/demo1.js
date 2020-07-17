// 

//part1
const {assert} = require('chai');


describe('User visits root',()=>{
  describe('posting a quote',()=>{
    it('saves quote and metadata submitted by user',()=>{
        const quote = 'Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure.';
        const attributed = 'Marianne Williamson';
        const source = 'A Return to Love: Reflections on the Principles of A Course in Miracles.';

        browser.url('/');

        browser.setValue('textarea[id=quote]', quote);
        browser.setValue('textarea[id=attributed]',attributed);
        browser.setValue('textarea[id=source]',source);
        browser.click('input[type=submit]');

        console.log(browser,'============>')

        assert.include(browser.getText('#quote'),'');
        assert.equal(browser.getText('#attributed'),attributed);
        assert.include(browser.getText('#source'),'');
    })
  })
})


// part 2
const {assert} = require('chai');

describe('User visits root', () => {

  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#messages'),'');
    });
  });

  describe('posting a message', () => {
    it('saves the message with the author information', () => {
      
      const message ='feature tests often hit every level of the TDD Testing Pyramid';
      const author = 'username';

      browser.url('/');
      browser.setValue('input[id=author]', author);
      browser.setValue('textarea[id=message]', message);
      browser.click('input[type=submit]');

      assert.include(browser.getText('#messages'), message);
      assert.include(browser.getText('#messages'), author);
 
    });
  });
});

// package.json
{
    "name": "calculator-js",
    "version": "0.0.0",
    "private": true,
    "scripts": {
      "start": "node ./bin/www",
      "test": "PORT=8001 bin/wdio-test"
    },
    "dependencies": {
      "express": "~4.15.2",
      "morgan": "~1.8.1",
      "wdio-spec-reporter": "^0.1.2"
    },
    "devDependencies": {
      "chai": "3.5.0",
      "eslint-config-google": "^0.9.1",
      "mocha": "^3.0.0",
      "wdio-mocha-framework": "^0.4.0",
      "wdio-selenium-standalone-service": "0.0.9",
      "webdriverio": "^4.2.3"
    }
  }

  
//wdio.conf.js

const app = require('./app');
const port = process.env.PORT || 4001;

let expressServer;

exports.config = {
  specs: [
    'test/features/*.js',
  ],
  coloredLogs: true,
  baseUrl: `http://localhost:${port}/`,
  framework: 'mocha',
  reporters: ['spec'],
  waitforTimeout: 10 * 1000,
  capabilities: [{
    browserName: 'phantomjs',
   
  }],
  services: ['phantomjs'],

  async onPrepare() {
    expressServer = app.listen(port);
  },
  async onComplete() {
    await expressServer.close();
  },
};


//app.js

const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;


//style.css

body{
    padding: 50px;
    background-color:#0064af;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 300;
    margin: 5vh;
    color: #ffffff;
  }
  
  #container{
    width: 75%;
    margin: auto;
  }
  h1{
    font-size: 120%;
    font-weight: bold;
    letter-spacing: 1.6px;
    text-align: left;
  }
  
  input{
    display: block;
    margin: 1.5em;
    height: 5vh;
    width: 35vh;
    font-size: 100%;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.1);
    border: solid 1px #ffffff;
    color: #C3D9ED;
  
  }
  
  
  textarea{
    display: block;
    margin: 1.5em;
    height: 15vh;
    width: 35vh;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.2);
    border: solid 1px #ffffff;
    color: #C3D9ED;
    font-size: 100%;
  
  }
  
  
  label{
    color: #C3D9ED;
    font-size: 120%;
  }
  
  input[type="submit"]{
    font-size: 120%;
    font-weight: 300;
    letter-spacing: 1.2px;
    text-align: center;
    color: #ffffff;
      border-radius: 3px;
    background-color: #002d4e;
  
  }

// index.html
  <html>
  <head>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <link rel= "stylesheet" href= "stylesheets/style.css">
  </head>
  <body>
  
  <div id="container">
  <h1> Leave A Message </h1>
  
  <section id="messages"></section>
  
  <label for="author">Your name:</label>
  <input id="author">
  
  <label for="message">Your message:</label>
  <textarea id="message"></textarea>
  
  <input type="submit">
  </div>
  </body>
  </html>
