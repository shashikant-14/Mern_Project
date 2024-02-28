import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BackButton from '../components/BackButton';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchdata = async () => {
      try{
        let response = await axios.get('http://localhost:5555/books?count=true')
          setBooks(response.data.data)
          setLoading(false);
          // console.log(response.data)
        }catch(error){
          setError(error?.message);
          setLoading(false);
    
        }
    }
    fetchdata();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/books/${id}`);
      // Assuming the deletion was successful, you can now navigate to the desired location
      // Here, it's navigating to the '/home' route
      navigate('/');
    } catch (error) {
      // Handle error if the deletion fails
      console.error('Error deleting book:', error);
    }
  };
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center m-5'>
        <h1 className='text-3xl'>Books List</h1>
        <BackButton/>
        <Link to={'/books/create'}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? <Spinner />
        :
        <table className='w-full border-separate text-center'>
          <thead>
            <tr>
              <th className='border border-slate-400 rounded-md'>NO</th>
              <th className='border border-slate-500 rounded-md'>Title</th>
              <th className='border border-slate-500 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-500 rounded-md max-md:hidden'>Publish Year</th>
              <th className='border border-slate-500 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? books.map((book, index) => {
              return (
                <tr key={book._id}>
                  <td className='border border-slate-400 rounded-md'>{book._id}</td>
                  <td className='border border-slate-400 rounded-md'>{book.title}</td>
                  <td className='border border-slate-500 rounded-md max-md:hidden'>{book.author}</td>
                  <td className='border border-slate-500 rounded-md max-md:hidden'>{book.publishYear}</td>
                  <td className='border border-slate-500 rounded-md flex justify-around'>
                    <Link to={`/books/details/${book._id}`}><BsInfoCircle className='text-2xl text-blue-400' /></Link>
                    <Link to={`/books/update/${book._id}`}><AiOutlineEdit className='text-2xl text-green-400'/></Link>
                    <MdOutlineDelete onClick={()=>handleDelete(book._id)} className='text-2xl text-red-400'/></td>
                </tr>
              )
            }) : <tr><td colSpan={5} className='border border-slate-400 rounded-md h-[80dvh]'>No Data Available</td></tr>}
          </tbody>
        </table>}

    </div>
  )
}

export default Home
