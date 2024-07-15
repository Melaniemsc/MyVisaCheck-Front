import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import './App.css'
import Summary from './components/Summary'
import AddCountry from './components/AddCountry'
import ShowCountry from './components/ShowCountry'


function App() {
  return <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/newCountry" element={<AddCountry />} />
      <Route path="/:countryName"element={<ShowCountry />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element="Page doesn't exist"/>
    </Routes>
  </Router>
}

export default App