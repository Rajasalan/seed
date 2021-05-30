const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.sample;
const TYPE = 'sample';
const client = new ESClient(INDEX, TYPE);

const index = async (sample, id) => {
  const resp = await client.index({ body: sample, id });
  return { ...sample, id: resp._id };
};

const list = () => {
  return client
    .onResults(resp => resp.hits.hits.map(h => ({ ...h._source, id: h._id })))
    .search({ size: 1000 });
};

module.exports = {
  index,
  list,
  del: client.delete.bind(client),
  get: client.get.bind(client)
};