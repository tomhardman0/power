import http from 'http';
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
server.listen(PORT, () => console.log(`POWR: ${PORT}`));
app.use('/', controllerRoutes());

export default app;
