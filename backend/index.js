import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGODBURL } from './config.js';
// import { Book } from './models/bookModel.js';
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors";

const app = express();

//middleware for parsingrequest body
app.use(express.json());

//middleware for handling cors policy
//option 1 : allow all origin with default of cors (*)
// app.use(cors());

//option 2 : custom origins
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));


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
