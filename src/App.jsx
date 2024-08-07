import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listing from './components/restaurantListing/RestaurantList'
import './App.css'
import AddEdit from './components/addEdit/AddEdit';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/edit/:dataid" element={<AddEdit />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
