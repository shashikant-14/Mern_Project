import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGODBURL } from './config.js';
// import { Book } from './models/bookModel.js';
import bookRoutes from "./routes/bookRoutes.js"

const app = express();

app.use(express.json());

app.use('/books', bookRoutes)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to the MERN stack tutorial');
});


mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log('Successfully connected to DB');
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Server connection failed', error);
    });
