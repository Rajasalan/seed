const config = require('../config');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client(config.elasticsearch);

class ESClient {

  constructor(indexName, type) {
    this.indexName = indexName;
    this.type = type || indexName;
  }

  onResults(cb) {
    this.parseResults = cb;
    return this;
  }

  async search(body) {
    const query = { body, index: this.indexName, type: this.type };
    try {
      const resp = await client.search(query);
      if (this.parseResults) {
        return this.parseResults(resp);
      } else {
        return resp;
      }
    } catch (e) {
      console.log(e)
      throw e;
    }
    return this;
  }

  async queryAndScroll(body) {
    const query = { body, index: this.indexName, type: this.type, scroll: '30s' };
    let { hits, _scroll_id: scroll_id } = await client.search(query);
    var allRecords = hits && hits.hits.length ? hits.hits : [];

    while (scroll_id) {
      const resp = await client.scroll({
        scroll_id,
        scroll: '30s'
      });
      hits = resp.hits;
      scroll_id = resp._scroll_id;

      if (!(hits && hits.hits.length))
        return allRecords.map(r => r._source);

      allRecords.push(...hits.hits);
    }
    return allRecords.map(r => r._source);
  }

  index(doc) {
    return client.index({ type: this.type, index: this.indexName, ...doc });
  }

  update(part, id) {
    return client.update({ type: this.type, index: this.indexName, id, body: { doc: part }, _source: true });
  }

  bulk(data) {
    return client.bulk(data);
  }

  delete(id) {
    return client.delete({
      index: this.indexName,
      type: this.type,
      id,
    });
  }

  async get(id) {
    const resp = await client.get({
      index: this.indexName,
      type: this.type,
      id
    });
    return resp._source;
  }

  client() {
    return client;
  }
}

module.exports = ESClient;