const app = require('express')();
const fetch = require('node-fetch');
const request = require('request')
require('dotenv').config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/report/:id', async (req, res) => {
  const repId = req.params.id;
  const pdfuri = `https://www.ams.usda.gov/mnreports/${repId}.pdf`;
  const txturi = `https://www.ams.usda.gov/mnreports/${repId}.txt`;
  try {
    const resp = await fetch(pdfuri);
    console.log(resp.status)
    if (resp.status != 200) {
      return res.send(txturi)
    }
    return res.send(pdfuri);
  } catch (e) {
    console.log(e)
    res.send(txturi)
  }

});

app.get('/commodities', async (req, res, next) => {
  const url = 'https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/';
  req.pipe(request(url)).pipe(res);
});

app.get('/commodities/:id', async (req, res, next) => {
  const comId = req.params.id;
  const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/${comId}`;
  req.pipe(request(url)).pipe(res);
});

app.get('/offices', async (req, res, next) => {
  const url = 'https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/';
  req.pipe(request(url)).pipe(res);
});

app.get('/offices/:id', async (req, res, next) => {
  const comId = req.params.id;
  const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/${comId}`;
  req.pipe(request(url)).pipe(res);
});

app.get('/market-types', async (req, res, next) => {
  const url = 'https://mymarketnews.ams.usda.gov/public_data/ajax-get-market-types/';
  req.pipe(request(url)).pipe(res);
});

app.get('/market-types/:id', async (req, res, next) => {
  const comId = req.params.id;
  const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-market-types/${comId}`;
  req.pipe(request(url)).pipe(res);
});

app.get('/reports', async (req, res) => {

  try {
    const resp = await fetch('https://marsapi.ams.usda.gov/services/v1.1/reports', {
      headers: {
        Authorization: `Basic ${process.env.API_KEY}`
      }
    })
    const json = await resp.json();
    const reduced = json.map(x => ({
      slug_name: x.slug_name,
      report_title: x.report_title
    }));
    res.json(reduced);
  } catch (e) {
    res.send(e.message)
  }
})

app.listen(process.env.PORT || '3000', (err) => {
  if (err) console.log(err)
  console.log("running!")
});
