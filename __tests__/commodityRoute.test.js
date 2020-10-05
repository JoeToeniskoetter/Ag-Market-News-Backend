const request = require("supertest");
const app = require("../app");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let allResponse;
let filteredResponse;

beforeAll(async (done) => {
  const all = await request(app).get("/api/ag-market-news/commodities");
  allResponse = await all;

  const single = await request(app).get("/api/ag-market-news/commodities/1105");
  filteredResponse = await single;
  done();
});

describe("GET: /commodities", () => {
  it("show return a 200 status", async (done) => {
    expect(allResponse.status).toBe(200);
    done();
  });

  it("show return a list of commodities with at least one commodity", async (done) => {
    expect(allResponse.body.length).toBeGreaterThan(0);
    done();
  });

  it("should have a number of objects with a commodity_name and commodity_lov_id property", async (done) => {
    expect(allResponse.body[0]).toHaveProperty("commodity_name");
    expect(allResponse.body[0]).toHaveProperty("commodity_lov_id");
    done();
  });
});

describe("GET: /commodities/1105", () => {
  it("should return a 200 status", async (done) => {
    expect(filteredResponse.status).toBe(200);
    done();
  });

  it("should return a results object", async (done) => {
    expect(filteredResponse.body).toHaveProperty("results");
    done();
  });

  it("should return a list of objects within the results object", async (done) => {
    expect(filteredResponse.body.results.length).toBeGreaterThan(0);
    done();
  });

  it("should return a list of office objects with a slug_id, slug_name, and report_title property ", async (done) => {
    expect(filteredResponse.body.results[0]).toHaveProperty("slug_id");
    expect(filteredResponse.body.results[0]).toHaveProperty("slug_name");
    expect(filteredResponse.body.results[0]).toHaveProperty("report_title");
    done();
  });
});

afterAll((done) => {
  done();
});
