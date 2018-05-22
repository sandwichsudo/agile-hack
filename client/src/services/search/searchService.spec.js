import searchService from './searchService';
import xhr from '../../xhr/xhr';

jest.mock('../../xhr/xhr');

describe('search service', () => {
  describe('repoSearch', () => {
    it('should call api to search for repos', async () => {
      xhr.__setMockGetResponse(Promise.resolve({ data: { items: 'foo' } }));

      const { items } = await searchService.repoSearch();
      expect(xhr._get)
        .toHaveBeenCalledWith('/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-C/standard-unit-rates/');
      expect(items).toEqual('foo');
    });
  });
});
