
const request = require('supertest')
const app = require('../app')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

let allReponse;
let singleReponse;

beforeAll(async (done) => {
  const all = await request(app)
    .get('/offices');
  allReponse = await all;
  const single = await request(app)
    .get('/offices/Abilene,%20TX')

  singleReponse = await single;

  done();
})

describe('GET /offices/', () => {

  it('show return a 200 status', async done => {
    expect(allReponse.status).toBe(200);
    done()
  });

  it('show return a list of offices with at least one office', async done => {
    expect(allReponse.body.length).toBeGreaterThan(0);
    done()
  });

  it('should have a number of objects with a office_name and office_code property', async done => {
    expect(allReponse.body[0]).toHaveProperty('office_name')
    expect(allReponse.body[0]).toHaveProperty('office_code');
    done()
  });

});

describe('GET /offices/Abilene,%20TX', () => {

  it('Should return a status 200', async done => {
    expect(singleReponse.status).toBe(200);
    done()
  });

  it('Should return a results object with one office', async done => {
    expect(singleReponse.body).toHaveProperty('results');
    expect(singleReponse.body.results.length).toEqual(1);
    done()
  });


  it(`Should return an office object with the follwoing attributes: slug_id, slug_name, report_title`, async done => {
    expect(singleReponse.body.results[0]).toHaveProperty('slug_id');
    expect(singleReponse.body.results[0]).toHaveProperty('slug_name');
    expect(singleReponse.body.results[0]).toHaveProperty('report_title');
    done()
  })

})


afterAll((done) => {
  done();
})