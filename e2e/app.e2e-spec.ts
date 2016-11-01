import { browser, element, by } from 'protractor';

describe('QuickStart E2E Tests', function () {

  it('should get chart name from data service', function() {
    browser.get('');
    expect(element(by.css('h1')).getText()).toEqual('Diabetes Treatment Data');
  });

});
