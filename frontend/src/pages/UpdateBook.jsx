import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateBook = () => {
  const [updatedData, setUpdatedData] = useState({});
  let navigate = useNavigate();

  let {id} = useParams();

  const handleChange = (e) => {
    setUpdatedData({...updatedData, [e.target.name]:e.target.value});
  }
  console.log(updatedData);
  const handleUpdate = (e)=>{
    e.preventDefault();
    axios.put(`http://localhost:5555/books/${id}`,updatedData);
    navigate('/');
  }

  return (
    <form className='flex flex-col' onSubmit={handleUpdate}>
      <div className='mb-5'>
        <label>ID</label>
        <input disabled value={id}/>
      </div>
      <div className='mb-5'>
        <label>Title</label>
        <input name='title' onChange={handleChange} type='text' placeholder='Enter new Title' />
      </div>
      <div className='mb-5'>
        <label>Author</label>
        <input name='author' onChange={handleChange}  type='text' placeholder='Enter New Author'/>
      </div>
      <div className='mb-5'>
        <label>publishYear</label>
        <input name='publishYear' onChange={handleChange}  type='text' placeholder='Enter New publishYear'/>
      </div>
      <div className='mb-5'>
      <button type='submit'>Update</button>
      </div>

    </form>
  )
}

export default UpdateBook
