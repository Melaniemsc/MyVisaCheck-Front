import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getPayload } from "../lib/auth"
import axios from "axios"
import { Dropdown } from 'primereact/dropdown';

const Summary = () => {

  const [user, setUser] = useState({ first_name: '', nationality: [] })
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [countryVisaRelations, setCountryVisaRelations] = useState([])


  async function fetchUser() {
    const token = localStorage.getItem('token')
    const resp = await axios.get('/api/auth/summary/', { headers: { Authorization: `Bearer ${token}` } })
    setUser(resp.data)
    /* console.log(resp.data); */
  }

  async function fetchCountries() {
    const resp = await axios.get('/api/countries/')
/*     console.log(resp.data);
 */    setCountries(resp.data)
    return countries
  }

  async function handleAddButton() {
    const token = localStorage.getItem('token')
    console.log(selectedCountry);
    await axios.put('/api/auth/summary/', { nationality: selectedCountry.name }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setSelectedCountry("Select a Country")
  }

  async function handleDelete(nationality) {
    const token = localStorage.getItem('token')
    await axios.delete('/api/auth/summary/', {
      headers: { Authorization: `Bearer ${token}` },
      data: { nationality: nationality.nationality }
    })
    fetchUser()
  }

  async function handleVisa() {
    const token = localStorage.getItem('token')
    user.nationality.map(async (nationality) => {
      const resp = await axios.get(`api/visa/?country_from=${nationality.name}`, {
        Authorization: `Bearer ${token}`
      })
      setCountryVisaRelations(resp.data)
      console.log(resp.data);
    });

};



  useEffect(() => {
    fetchUser()
    fetchCountries()
    handleVisa()
  }, [selectedCountry])


  return <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container columns">
        <div className="column">
          <h1 className="subtitle mb-5">
            Hello {user.first_name}!
          </h1>
          <div>
            <div className="columns">
              <div className="column">
                <h2>These are your nationalities</h2>
              </div>
              <div className="column">
                <Dropdown
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.value)}
                  options={countries}
                  optionLabel="name"
                  placeholder="Select a Country"
                  filter
                  className="w-full md:w-14rem" />
                <button onClick={handleAddButton}>➕</button>
              </div>
            </div>
          </div>
          {user.nationality.map((nationality, index) => {
            return <div key={index}>
              {nationality.nationality}
              <button className="block" onClick={() => handleDelete(nationality)}>❌</button>
            </div>
          })}
          <div>
          </div>
        </div>
        <div className="column">
          <h2 className="title is-5">Visa Requirements</h2>
          {countryVisaRelations.map((relation, index) =>{
            return <div className="box" key={index}>
              <p>{relation.country_to.name} </p>

            </div>
          })}
        </div>
      </div>
    </div>
  </div>
}

export default Summary