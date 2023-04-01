import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connect from './database';
import { router as v1AuthRouter } from './v1/routes/auth.routes';
import { router as v1UserRouter } from './v1/routes/user.routes';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/v1', v1AuthRouter);
app.use('/api/v1', v1UserRouter);

app.listen(PORT, async () => {
  await connect();
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
