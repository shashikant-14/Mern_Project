import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const CreateBook = () => {
  const newBook = useRef({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Using Axios to make a POST request to create a new book
      const response = await axios.post('http://localhost:5555/books', newBook.current.value);
      navigate('/');  // Redirect to the home page after successfully creating the book
    } catch (error) {
      // Display an alert with the error message if there's an error
      alert(error.response?.data.message || error.message);
    }
  };

  const handleChange = (e) => {
    // Update the data in the 'newBook' ref object when input fields change
    const data = { ...newBook.current.value, [e.target.name]: e.target.value };
    newBook.current.value = { ...data };
    console.log(newBook.current.value);
  };

  return (
    <div className='m-5'>
    <BackButton/>
    <div className='flex flex-col items-center mx-auto mt-20 bg-blue-200 p-6 rounded-lg shadow-lg lg:w-1/2 md:w-3/4 sm:w-full'>
      <h1 className='text-2xl mb-6'>Create New Book</h1>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='mb-4 flex flex-col lg:flex-row'>
          <label htmlFor='title' className='mb-2 lg:mb-0 lg:w-1/4'>Title </label>
          <input
            id='title'
            name='title'
            onChange={handleChange}
            className='w-full lg:w-3/4 p-2 border border-gray-300 rounded'
            placeholder='Enter Book title'
          />
        </div>
        <div className='mb-4 flex flex-col lg:flex-row'>
          <label htmlFor='author' className='mb-2 lg:mb-0 lg:w-1/4'>Author </label>
          <input
            id='author'
            name='author'
            onChange={handleChange}
            className='w-full lg:w-3/4 p-2 border border-gray-300 rounded'
            placeholder='Enter Author Name'
          />
        </div>
        <div className='mb-4 flex flex-col lg:flex-row'>
          <label htmlFor='publishYear' className='mb-2 lg:mb-0 lg:w-1/4'>Publish Year </label>
          <input
            id='publishYear'
            name='publishYear'
            onChange={handleChange}
            className='w-full lg:w-3/4 p-2 border border-gray-300 rounded'
            placeholder='Enter Publish Year'
          />
        </div>
        <button
          className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-green-400'
          type='submit'
        >
          Create
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateBook;
