'use strict';

const express = require('express'),
      path    = require('path')
;

const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port ' + server.address().port);
});

app.use('/events', express.static('dist'));

app.use('/events/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});
