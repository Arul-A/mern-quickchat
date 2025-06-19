import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';

// create express app and http server
const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
app.use(express.json({ limit: '4mb' })); // increase the limit for large JSON payloads
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.use('/api/auth', userRouter);

//connect to mongoDB
await connectDB();

// start the server
const PORT = process.env.PORT || 5000;      
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});