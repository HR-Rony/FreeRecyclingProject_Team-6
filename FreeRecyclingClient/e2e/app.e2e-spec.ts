import { RecycleBinClientPage } from './app.po';

describe('recycle-bin-client App', function() {
  let page: RecycleBinClientPage;

  beforeEach(() => {
    page = new RecycleBinClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
