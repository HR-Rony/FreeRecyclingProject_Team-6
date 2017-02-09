import { FreeRecyclingPage } from './app.po';
describe('recycle-bin-client App', function() {
  let page: FreeRecyclingPage;
  beforeEach(() => {
    page = new FreeRecyclingPage();
  });
  it('Hi, app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
