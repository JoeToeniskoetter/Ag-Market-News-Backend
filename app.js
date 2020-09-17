const app = require('express')();
const fetch = require('node-fetch');

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
  const resp = await fetch('https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/', {
    rejectUnauthorized: false
  });
  const json = await resp.json()
  res.json(json);
});

app.get('/commodities/:id', async (req, res, next) => {
  const comId = req.params.id;
  const resp = await fetch(`https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/${comId}`, {
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

app.get('/offices/:id', async (req, res, next) => {
  const comId = req.params.id;
  const resp = await fetch(`https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/${comId}`, {
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

app.get('/market-types/:id', async (req, res, next) => {
  const comId = req.params.id;
  const resp = await fetch(`https://mymarketnews.ams.usda.gov/public_data/ajax-get-market-types/${comId}`, {
    rejectUnauthorized: false
  });
  const json = await resp.json()
  res.json(json);
});

app.listen(process.env.PORT || '3000', (err) => {
  if (err) console.log(err)
  console.log("running!")
});
