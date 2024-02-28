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

    // Define a route to fetch collection names
app.get('/api/collections', async (req, res) => {
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      const collectionNames = collections.map(collection => collection.name);
  
      res.status(200).json(collectionNames);
    } catch (error) {
      console.error('Error retrieving collections:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Define a route to add a new collection
app.post('/api/addCollection', async (req, res) => {
    try {
      const { collectionName } = req.body;
  
      // Check if the collection already exists
      const collections = await mongoose.connection.db.listCollections().toArray();
      const existingCollections = collections.map(collection => collection.name);
      if (existingCollections.includes(collectionName)) {
        return res.status(400).json({ error: 'Collection already exists' });
      }
  
      // Create the new collection
      console.log(collectionName);
      await mongoose.connection.db.createCollection(collectionName);
  
      res.status(201).json({ message: `Collection '${collectionName}' created successfully` });
    } catch (error) {
      console.error('Error creating collection:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
