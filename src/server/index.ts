import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { controllerRoutes } from './controllers';

const app = express();
const PORT = process.env.PORT || 3123;
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/status', (req, res) => {
  res.sendStatus(200);
});
const server = http.createServer(app);
console.log(path.join(__dirname, '..', '..', 'dist', 'static'));
app.use(express.static(path.join(__dirname, '..', '..', 'dist', 'static')));
app.use('/', controllerRoutes());

server.listen(PORT, () => console.log(`POWR: ${PORT}`));

export default app;
