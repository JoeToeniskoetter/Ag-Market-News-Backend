
const request = require('supertest')
const app = require('../app')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

let allReponse;
let singleReponse;

beforeAll(async (done) => {
  const all = await request(app)
    .get('/market-types');
  allReponse = await all;
  const single = await request(app)
    .get('/market-types/1000')

  singleReponse = await single;

  done();
})

describe('GET /market-types/', () => {

  it('show return a 200 status', async done => {
    expect(allReponse.status).toBe(200);
    done()
  });

  it('show return a list of market types with at least one', async done => {
    expect(allReponse.body.length).toBeGreaterThan(0);
    done()
  });

  it('should have a number of objects with a market_type and market_type_id property', async done => {
    expect(allReponse.body[0]).toHaveProperty('market_type')
    expect(allReponse.body[0]).toHaveProperty('market_type_id');
    done()
  });

});

describe('GET /market-types/1000', () => {

  it('Should return a status 200', async done => {
    expect(singleReponse.status).toBe(200);
    done()
  });

  it('Should return a results object with at least one market-type', async done => {
    expect(singleReponse.body).toHaveProperty('results');
    expect(singleReponse.body.results.length).toBeGreaterThan(0);
    done()
  });


  it(`Should return a market-type object with the follwoing attributes: slug_id, slug_name, report_title`, async done => {
    expect(singleReponse.body.results[0]).toHaveProperty('slug_id');
    expect(singleReponse.body.results[0]).toHaveProperty('slug_name');
    expect(singleReponse.body.results[0]).toHaveProperty('report_title');
    done()
  })

})


afterAll((done) => {
  done();
})