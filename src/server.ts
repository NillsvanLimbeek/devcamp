import express from 'express';

// import routes
import bootcamps from './routes/bootcamps';

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/bootcamps', bootcamps);

export default app;
