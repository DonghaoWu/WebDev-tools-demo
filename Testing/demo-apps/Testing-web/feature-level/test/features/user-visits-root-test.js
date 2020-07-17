const {assert} = require('chai');

describe('User visits root', () => {

  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');
      const elem = $('#messages');
      assert.equal(elem.getText(),'');
    });
  });

  describe('posting a message', () => {
    it('saves the message with the author information', () => {
      
      const message ='feature tests often hit every level of the TDD Testing Pyramid';
      const author = 'username';

      browser.url('/');
      const elem1 = $('#author');
      const elem2 = $('#message');
      const elem3 = $('#submit-input');

      elem1.setValue(author);
      elem2.setValue(message);
      elem3.click();

      const elem4 = $('#author');
      const elem5 = $('#message');

      // assert.equal(elem4.getText('#author'), author);
      assert.equal(elem5.getText('#message'), message);
 
    });
  });
});