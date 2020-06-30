require('../data-helper/data-helper');
const request = require('supertest');
const app = require('../lib/app');

const Meme = require('../lib/models/Meme');
const { prepare } = require('../data-helper/data-helper');

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

  it('gets all memes via GET', async() => {
    const memes = prepare(await Meme.find());
    
    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        expect(res.body).toEqual(memes);
      });
  });

  it('gets a meme by ID via GET', async() => {
    const meme = prepare(await Meme.findOne());
    
    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual(meme);
      });
  });

  it('updates a meme by ID via PATCH', async() => {
    const meme = prepare(await Meme.findOne());
    
    return request(app)
      .patch(`/api/v1/memes/${meme._id}`)
      .send({ top: 'whatever' })
      .then(res => {
        expect(res.body).toEqual({
          ...meme,
          top: 'whatever' 
        });
      });
  });


});
