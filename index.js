require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const shortid = require('shortid')

// Basic Configuration
const port = process.env.PORT || 3000;



let data = []

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url
  const shorted = shortid.generate()
  RegEmail = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
  if (RegEmail.test(url)) {
    url_data = {
      url_original: url, url_shorted: shorted,
      id: data.length + 1
    }
    data.push(url_data)
    res.json({ original_url: url, short_url: shorted })
  } else {
    res.json({ error: 'invalid url' })
  }
})

app.get("/api/shorturl/:url", (req, res) => {
  const code = req.params.url;
  if (code) {
    data.forEach((d) => {
      if (d.url_shorted === code) {
        return res.redirect(d.url_original)
      }
    })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
