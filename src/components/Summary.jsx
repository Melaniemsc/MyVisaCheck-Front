import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getPayload } from "../lib/auth"
import axios from "axios"
import { Dropdown } from 'primereact/dropdown';
import { baseUrl } from '../config'

const Summary = () => {
  const [user, setUser] = useState({ first_name: '', nationality: [] });
  const [countries, setCountries] = useState([]);
  const [selectedAddCountry, setselectedAddCountry] = useState('');
  const [visaRequiremenstCountryFrom, setVisaRequiremenstCountryFrom] = useState([]);
  const [countryVisaRelations, setCountryVisaRelations] = useState([]);
  const [order, setOrder] = useState(true);
  const [typesOfVisa, setTypesOfVisa] = useState([]);
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [countryOrder, setCountryOrder] = useState('');


  async function fetchUser() {
    const token = localStorage.getItem('token');
    const resp = await axios.get(`${baseUrl}/api/auth/summary/`, { headers: { Authorization: `Bearer ${token}` } });
    setUser(resp.data);
    setVisaRequiremenstCountryFrom(resp.data.nationality);
  }

  async function fetchCountries() {
    const resp = await axios.get(`${baseUrl}/api/countries/`);
    setCountries(resp.data);
  }

  async function handleAddButton() {
    const token = localStorage.getItem('token');
    await axios.put(`${baseUrl}/api/auth/summary/`, { nationality: selectedAddCountry.name }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setselectedAddCountry(null);
    fetchUser();
  }

  async function handleDelete(nationality) {
    const token = localStorage.getItem('token');
    await axios.delete(`${baseUrl}/api/auth/summary/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { country: nationality.name }
    });
    fetchUser();
  }

  async function handleVisa() {
    const token = localStorage.getItem('token');
    const queryParameter = user.nationality.map(nationality => nationality.name).join(',');
    if (queryParameter) {
      try {
        const resp = await axios.get(`${baseUrl}/api/visa/?country_from=${queryParameter}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCountryVisaRelations(resp.data);

        const visaTypes = resp.data.reduce((types, item) => {
          item.visa_type.forEach(visa => {
            if (!types.includes(visa.type)) {
              types.push(visa.type);
            }
          });
          return types;
        }, []);
        setTypesOfVisa(visaTypes);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (user.nationality.length > 0) {
      handleVisa();
    }
  }, [user.nationality]);

  function handleOrder() {
    setOrder(!order);
  }

  function handleReset() {
    setCountryOrder('');
    setSelectedVisaType('');
    setOrder(true);
  }

  const handleCountryOrder = (country) => {
    setCountryOrder(country.name);
  };

  const filteredCountryVisaRelations = countryOrder
    ? countryVisaRelations.filter(relation => relation.country_from.name === countryOrder)
    : countryVisaRelations;

  function orderByCountry() {
    return (
      <div className="buttons">
        {visaRequiremenstCountryFrom.map(country => (
          <div key={country.name} className="button" onClick={() => handleCountryOrder(country)}>
            {country.name}
          </div>
        ))}
        <div>
          {filteredCountryVisaRelations.map((relation, index) => (
            <div className="box" key={index}>
              <div className="columns is-vcentered">
                <div className="column is-one-third .is-centered">
                  <figure class="image">
                    <img src={relation.country_from.flag} className="image is-96x96" />
                  </figure>
                  <p className="is-size-3 ">⬇️</p>
                  <figure class="image">
                    <img src={relation.country_to.flag} className="image is-96x96" />
                  </figure>

                </div>
                <div className="column">
                  <h3><strong>Country from:</strong> {relation.country_from.name}</h3>
                  <h3><strong>Country to:</strong> {relation.country_to.name}</h3>
                  {relation.visa_type.map((visa, index) => (
                    <div key={index}>
                      <h3><strong>Visa Type:</strong> {visa.type}</h3>
                    </div>
                  ))}
                  {relation.allowed_stay !== "nan" && <h3><strong>Allowed Stay:</strong> {relation.allowed_stay}</h3>}
                  {relation.notes !== "nan" && <h3><strong>Extra notes:</strong> {relation.notes}</h3>}
                </div>
              </div></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredByVisaType = selectedVisaType
    ? filteredCountryVisaRelations.filter(relation =>
      relation.visa_type.some(visa => visa.type === selectedVisaType))
    : filteredCountryVisaRelations;

  function orderByVisaType() {
    return (
      <div>
        <Dropdown
          value={selectedVisaType}
          onChange={(e) => setSelectedVisaType(e.value)}
          options={typesOfVisa.map(type => ({ label: type, value: type }))}
          placeholder="Select type of visa"
          filter
          className="w-full md:w-14rem"
        />
        <div>
          {filteredByVisaType.map((relation, index) => (
            <div className="box" key={index}>
              <div className="columns is-vcentered ">
                <div className="column is-one-third .is-centered">
                  <figure class="image">
                    <img src={relation.country_from.flag} className="image is-96x96" />
                  </figure>
                  <p className="is-size-3 ">⬇️</p>
                  <figure class="image">
                    <img src={relation.country_to.flag} className="image is-96x96" />
                  </figure>

                </div>
                <div className="column">
                  <h3><strong>Country from:</strong> {relation.country_from.name}</h3>
                  <h3><strong>Country to:</strong> {relation.country_to.name}</h3>
                  {relation.visa_type.map((visa, index) => (
                    <div key={index}>
                      <h3><strong>Visa Type:</strong> {visa.type}</h3>
                    </div>
                  ))}
                  {relation.allowed_stay !== "nan" && <h3><strong>Allowed Stay:</strong> {relation.allowed_stay}</h3>}
                  {relation.notes !== "nan" && <h3><strong>Extra notes:</strong> {relation.notes}</h3>}
                </div>
              </div></div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container columns">
          <div className="column is-4">

            <div className="columns">
              <div className="column">
                <h2>These are your nationalities</h2>
              </div>
              <div className="column">
                <Dropdown
                  value={selectedAddCountry}
                  onChange={(e) => setselectedAddCountry(e.value)}
                  options={countries}
                  optionLabel="name"
                  placeholder="Select a Country"
                  filter

                />
                <button onClick={handleAddButton}>➕</button>
              </div>
            </div>

            {user.nationality.map((nationality, index) => (
              <div key={index}>
                {nationality.name}
                <button className="block" onClick={() => handleDelete(nationality)}>❌</button>
              </div>
            ))}
          </div>
          <div className="column">
            <h2 className="title is-5">Visa Requirements</h2>
            <div className="buttons">
              <button className="button" onClick={handleOrder}>{order ? "Order by Country" : "Order by VisaType"}</button>
              <button className="button" onClick={handleReset}>Reset</button>
            </div>
            <div>
              {order && orderByCountry()}
              {!order && orderByVisaType()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;