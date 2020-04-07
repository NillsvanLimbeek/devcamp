import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// load env
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// routes
app.get('/', (req: Request, res: Response) => {
    res.json({ succes: true });
});

// start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
