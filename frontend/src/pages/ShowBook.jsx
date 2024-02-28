import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';

const ShowBook = () => {
  const [book, setBook] = useState();
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id}`).then((response) => {
      setBook(response.data);
    });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <div className='flex flex-col md:w-2/3    lg:w-1/3 mx-auto border-2 border-blue-400 rounded-md p-4'>
        <div className='my-5'>
          <span className='text-xl mr-5 text-gray-500'>ID</span>
          <span>{book?._id}</span>
        </div>
        <div className='my-5'>
          <span className='text-xl mr-5 text-gray-500'>Title</span>
          <span>{book?.title}</span>
        </div>
        <div className='my-5'>
          <span className='text-xl mr-5 text-gray-500'>Author</span>
          <span>{book?.author}</span>
        </div>
        <div className='my-5'>
          <span className='text-xl mr-5 text-gray-500'>Create Time</span>
          <span>{new Date(book?.createdAt).toLocaleString().toString()}</span>
        </div>
        <div className='my-5'>
          <span className='text-xl mr-5 text-gray-500'>Update Time</span>
          <span>{new Date(book?.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
