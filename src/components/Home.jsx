import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { isAdmin } from '../lib/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {baseUrl} from '../config'

const Countries = () => {

  const [countries, setcountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [order, setOrder] = useState('asc')

  async function fetchCountries() {
    const resp = await fetch(`${baseUrl}/api/countries/`)
    const data = await resp.json()
    setcountries(data)
  }


  useEffect(() => {

    fetchCountries()
  }, [])

  function handleInput(e) {
    setCountryFilter(e.target.value);
  }

  function filterCountries() {
    const filteredCountries = countries.filter(countries => {
      const name = countries.name.toLowerCase()
      const filterText = countryFilter.toLowerCase()
      return name.includes(filterText)
    })
    console.log(filteredCountries);
    return filteredCountries
  }

  function sortCountries(){
    const sortedCountries = structuredClone(filterCountries())
    sortedCountries.sort((a, b) => {
      if (orderBy === 'name') {
        if (order === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      }
      return 0
    })
    return sortedCountries
  }

  function handleOrder(orderByField) {
    if (orderBy === orderByField) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(orderByField)
      setOrder('asc')
    }
  }
  function getSortIndicator(field) {
    if (orderBy === field) {
      return order === 'asc' ? '▲' : '▼'
    }
    return ''
  }

  function resetHandler() {
    
    setCountryFilter('')
    setOrderBy('name')
    setOrder('asc')
  }

  return <div className="section">
    <div className="container">
      <h1 className="title">
        Countries
      </h1>

      <div className='buttons'>
        <button className='button' onClick={() => handleOrder('name')}>Sort by Name {getSortIndicator('name')}</button>
        <button onClick={resetHandler} className='button'>Reset</button>
        {isAdmin() && <Link to="/newCountry" className="button is-light">New Country</Link>}
      </div>

      <div className="field">
        <input className='input' placeholder='Search your country here' onChange={handleInput} value={countryFilter}/>
      </div>

      <div className="container">
        <div className="columns is-multiline is-mobile">
          {sortCountries().map((country) => {
            return <div
              className="column is-one-fifth-desktop is-half-tablet is-half-mobile"
              key={country.name}>
              <Link to={`/${country.name}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <h2 className="title is-4">
                          {country.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={country.flag} alt={country.name} />
                    </figure>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </div>
  </div>
}

export default Countries