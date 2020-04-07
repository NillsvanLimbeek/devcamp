import app from './src/server';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

// load env
dotenv.config({ path: './config/config.env' });

// connect db
mongoose.connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log(`DB Connected`);
});

db.on('error', (err) => console.error(err.message));

// start the app
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () =>
    console.log(`Server started on port ${app.get('port')}`),
);
