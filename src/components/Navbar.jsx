import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getPayload } from '../lib/auth'

const Navbar = () => {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token'))
  }, [location])

  function logout() {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  // Determine the salutation based on login status
  const salutation = isLoggedIn ? `Welcome, ${getPayload().name}` : ''

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          {salutation}
        </div>
      </div>
      
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/" className="button is-light">Countries</Link>
              {isLoggedIn && <Link to="/summary" className="button is-light">Summary</Link>}
              {!isLoggedIn && <Link to="/signup" className="button">Register</Link>}
              {!isLoggedIn && <Link to="/login" className="button">Login</Link>}
              {isLoggedIn && <button className="button" onClick={logout}>Logout</button>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
