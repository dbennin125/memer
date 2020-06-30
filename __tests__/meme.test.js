require('../data-helper/data-helper');
const request = require('supertest');
const app = require('../lib/app');

const Meme = require('../lib/models/Meme');

describe('memer routes', () => {

  it('creates a meme via POST', async() => {
    return request(app)
      .post('/api/v1/memes')
      .send({
        top: 'string',
        image: 'www.whatever.com',
        bottom: 'bottom string'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          top: 'string',
          image: 'www.whatever.com',
          bottom: 'bottom string'
        });
      });

  });
});
