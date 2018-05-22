import xhr from '../../xhr/xhr';

const repoSearch = async () => {
  const { data } = await xhr._get('/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-C/standard-unit-rates/');
  return data;
};

export default {
  repoSearch,
};
