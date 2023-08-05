import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

const App = () => {
  const [searchField, setSearchField] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getAll().then((fetchedCountries) => {
      setCountries(fetchedCountries)
    })
  }, [])

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value)
    if (countries.length === 0 || !event.target.value) {
      setCountriesToShow([])
    } else {
      const filteredCountries = countries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
      if (filteredCountries.length === 1) {
        getWeather(filteredCountries[0].capital)
      }
      setCountriesToShow(filteredCountries)
    }
  }

  const handleShowClick = (countryName) => {
    const country = countries.filter((c) => c.name.common === countryName)
    getWeather(country[0].capital)
    setCountriesToShow(country)
  }

  const getWeather = (capital) => {
    countryService.getWeather(capital).then((fetchedWeather) => {
      setWeather(fetchedWeather)
    })
  }

  return (
    <div>
      <label>find countries </label>
      <input onChange={handleSearchFieldChange} value={searchField} />
      <Countries
        countries={countriesToShow}
        handleShowClick={handleShowClick}
        weather={weather}
      />
    </div>
  )
}

export default App
