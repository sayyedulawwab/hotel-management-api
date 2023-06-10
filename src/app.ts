import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { Database } from './v1/config';
import { authRouter, userRouter } from './v1/routes';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);

app.listen(PORT, async () => {
  await Database.connect();
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
