import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { isAdmin } from '../lib/auth';


export default function ShowCountry() {

  const navigate = useNavigate()

  const { countryName } = useParams()
  const [country, setCountry] = useState([])
  const [countryVisas, setCountryVisas] = useState([])
  const [editOpen, setEditOpen] = useState(false)

  const [countriesFilter, setCountriesFilter] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [order, setOrder] = useState('asc')


  async function fetchCountry() {
    try {
      const resp = (await axios.get(`api/countries/${countryName}/`))
      setCountry(resp.data)
    } catch (error) {
      toast.error(error.response.data.detail || error.response.data || 'An error occurred');
      console.error(error);
    }
  }


  async function fetchVisaRelation() {
    const resp = await axios.get(`api/visa/?country_from=${countryName}`)
    console.log(resp.data);
    setCountryVisas(resp.data)
  }


  useEffect(() => {
    fetchCountry()
    fetchVisaRelation()
  }, [countryName])


  function handleChange(e) {
    const newFormData = structuredClone(country)
    newFormData[e.target.name] = e.target.value
    setCountry(newFormData)
  }


  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const response = await axios.put(`api/countries/${countryName}/`, country, {
      headers: { Authorization: `Bearer ${token}` }
    })
    navigate(`/${country.name}`)
    setEditOpen(false)
  }


  function handleInput(e) {
    setCountriesFilter(e.target.value);
  }


  function filterCountries() {
    const filteredCountries = countryVisas.filter(countries => {
      const name = countries.country_to.name.toLowerCase()
      const filterText = countriesFilter.toLowerCase()
      return name.includes(filterText)
    })
    return filteredCountries
  }

  function sortCountries() {
    const sortedCountries = structuredClone(filterCountries())
    sortedCountries.sort((a, b) => {
      if (orderBy === 'name') {
        if (order === 'asc') {
          return a.country_to.name.localeCompare(b.country_to.name)
        } else {
          return b.country_to.name.localeCompare(a.country_to.name)
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

    setCountriesFilter('')
    setOrderBy('name')
    setOrder('asc')
  }


  function editCountry() {

    return <div className='box'>

      <form>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input is-hovered"
              type="text"
              name={'name'}
              onChange={handleChange}
              value={country.name}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Nationality</label>
          <div className="control">
            <input
              className="input is-hovered"
              type="text"
              name={'nationality'}
              onChange={handleChange}
              value={country.nationality}
            />
          </div>

          <div className="field">
            <label className="label">Flag</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={'flag'}
                onChange={handleChange}
                value={country.flag}
              />
            </div>
          </div>
        </div>
        <div className='buttons'>
          <button className="button" onClick={handleSubmit}>Submit</button>
          <button onClick={() => setEditOpen(false)}>❌</button>
        </div>
      </form>
    </div>
  }


  if (!country.name) {
    return <div className="section">
      <ToastContainer />
      <div className="container">
        <div className="title">
          Loading ...
        </div>
      </div>
    </div>
  }


  return (
    <div className="section">
      <div className="container">
        <ToastContainer />
        <h1 className='title is-1'>{countryName}</h1>
        <h2 className='subtitle is-3'>{country.nationality}</h2>



        <div className='buttons'>
          <button className='button' onClick={() => handleOrder('name')}>Sort by Name {getSortIndicator('name')}</button>
          <button onClick={resetHandler} className='button'>Reset</button>
          {isAdmin() && !editOpen && <p className='button' onClick={() => setEditOpen(true)}>Edit</p>}

        </div>
        {editOpen && editCountry()}

        <div className="field">
          <input className='input' placeholder='Search your country here' onChange={handleInput} value={countriesFilter} />
        </div>
        <div className="columns is-multiline is-mobile">

          {sortCountries().map((country, index) => {
            return <div className='block box column is-half-desktop is-full-tablet is-full-mobile"
              key={country.name}>' key={index}>
              <div className='columns'>
                <div className='column is-one-quarter is-half-tablet is-half-mobile'>
                  <h3 className='subtitle is-5'>{country.country_to.name}</h3>
                  <figure class="image">
                    <img src={country.country_to.flag} />
                  </figure>
                </div>
                <div className='column'>
                  {country.visa_type.map((visa, index) => {
                    return <div key={index}>
                      <h3> Visa type : {visa.type}</h3>
                    </div>
                  })}
                  {country.notes != "nan" && <h3>Allowed Stay {country.allowed_stay}</h3>}
                  {country.notes != "nan" && <h3>Extra notes: {country.notes}</h3>}
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}