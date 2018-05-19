import xhr from '../../xhr/xhr';

const repoSearch = async () => {
  const { data } = await xhr._get('/agile-prices');
  return JSON.parse(data.body);
};

export default {
  repoSearch,
};
