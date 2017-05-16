import { MbrPrivateAppPage } from './app.po';

describe('mbr-private-app App', function() {
  let page: MbrPrivateAppPage;

  beforeEach(() => {
    page = new MbrPrivateAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
