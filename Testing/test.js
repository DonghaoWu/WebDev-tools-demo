const {assert} = require('chai');

describe('User visits root', () => {

  describe('demo poetry web app', () => { 
    it('saves the user poem and title', () => {
      // Setup
      const title = 'Words Birth Worlds';
      const poem = 'Our words are marvelous weapons with which we could behead the sun'
     // Exercise
      browser.url('/');
      browser.setValue('input[id=title]', title);
      browser.setValue('textarea[id=poem]', poem);
      browser.click('input[type=submit]');
      // Verify
      assert.include(browser.getText('#poems'), title);
      assert.include(browser.getText('#poems'), poem);
    });
  });
});