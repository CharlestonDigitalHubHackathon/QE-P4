const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const dist = path.join(__dirname, 'skyux-spa-d-and-d/dist');
const index = path.join(dist, 'index.html');

express()
  .get('/', (req, res) => res.redirect('/d-and-d'))
  .use('/d-and-d', express.static(dist))
  .use((req, res) => res.sendFile(index)) // Used to support html5 push state
  .listen(port, () => {
    console.log(`Listening on ${ port }`);
  });
