import config from './common/config';
import app from  './app';
import { connectedDB } from './db';
import { uncaughtException, unhandledRejection } from './middlewares'

const { PORT } = config;

const server = async () => {
  await connectedDB();

  app.listen(PORT, () => process.stdout.write(`App is running on http://localhost:${PORT}`));

  process.on('uncaughtException', uncaughtException())
  process.on('unhandledRejection', unhandledRejection());
};

server();