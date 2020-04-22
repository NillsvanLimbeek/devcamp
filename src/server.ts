import express from 'express';
import { errorHandler } from './middleware/errorHandler';

// import routes
import bootcamps from './routes/bootcamps';
import courses from './routes/courses';

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/bootcamps', bootcamps);
app.use('/courses', courses);

app.use(errorHandler);

export default app;
