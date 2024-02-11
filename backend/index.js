import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGODBURL } from './config.js';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to the MERN stack tutorial');
});

// Route for creating a new book
app.post('/books', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).json({ message: 'Send all required fields: title, author, publishYear' });
        }

        const newBook = {
            title,
            author,
            publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).json(book);
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: err.message });
    }
});

// Route for getting all books from the database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        if (!books || books.length < 1) {
            return response.status(404).json({ message: 'No Books Found' });
        }

        if (request.query.count) {
            return response.status(200).json({ totalCount: books.length, data: books });
        }

        return response.status(200).json(books);
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: err.message });
    }
});

// Route for searching book by id using route parameter :id
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).json({ error: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: 'Internal server error' });
    }
});

// Route for finding book and updating
app.put('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedBook) {
            return response.status(404).json({ error: 'Book not found' });
        }

        return response.status(200).json({ message: 'Book updated successfully', data: updatedBook });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for deleting book by id
app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
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