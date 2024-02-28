import React, { useEffect, useState } from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import CreateBook from './pages/CreateBook'
import Home from './pages/Home'
import UpdateBook from './pages/UpdateBook'
import DeleteBook from './pages/DeleteBook'
import ShowBooks from './pages/ShowBook'
import Collection from './components/collection/Collection'

const App = () => {
  return(
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/update/:id" element={<UpdateBook />} />
        {/* <Route path="/books/delete" element={<DeleteBook />} /> */}
        <Route path="/books/details/:id" element={<ShowBooks />} />
      </Routes>
      </BrowserRouter>
    // <Collection/>
    
  )
}

export default App
