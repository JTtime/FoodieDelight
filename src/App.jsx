import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Listing from './components/restaurantListing/RestautantList'
import './App.css'
import AddEdit from './components/addEdit/AddEdit';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/edit/:id" element={<AddEdit />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
