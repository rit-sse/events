import express from 'express';
import path from 'path';

const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port ' + server.address().port);
});

app.use('/events', express.static('dist'));

app.use('/events/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
