const app = require('express')();
const fetch = require('node-fetch');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/commodities', async (req, res, next) => {
  const resp = await fetch('https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/', {
    rejectUnauthorized: false
  });
  const json = await resp.json()
  res.json(json);
});

app.get('/offices', async (req, res, next) => {
  const resp = await fetch('https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/', {
    rejectUnauthorized: false
  });
  const json = await resp.json()
  res.json(json);
});

app.get('/market-types', async (req, res, next) => {
  const resp = await fetch('https://mymarketnews.ams.usda.gov/public_data/ajax-get-market-types/', {
    rejectUnauthorized: false
  });
  const json = await resp.json()
  res.json(json);
});

app.listen(process.env.PORT || '3000', (err) => {
  if (err) console.log(err)
  console.log("running!")
});
