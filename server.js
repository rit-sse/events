import express from 'express';
import path from 'path';

const app = express();

app.use('/events', express.static('dist'));

app.use('/events/*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

export default app;
