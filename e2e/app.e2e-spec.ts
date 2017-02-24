import { FrontSdk2Page } from './app.po';

describe('front-sdk2 App', () => {
  let page: FrontSdk2Page;

  beforeEach(() => {
    page = new FrontSdk2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
