const Countries = ({ countries, handleShowClick, weather }) => {
  if (countries.length === 0) {
    return null
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((c) => (
          <div key={c.name.common}>
            {c.name.common}
            <button onClick={() => handleShowClick(c.name.common)}>show</button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2>{countries[0].name.common}</h2>
      <div>capital {countries[0].capital}</div>
      <div>area {countries[0].area}</div>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(countries[0].languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img
        src={countries[0].flags.png}
        alt={`The flag of ${countries[0].name.common}}`}
      />
      <h3>weather:</h3>
      {weather !== null ? (
        <p>
          temperature: {weather.main.temp || 'N/A'} Celcius
          <br></br>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <br></br>
          wind {weather.wind.speed || 'N/A'}
        </p>
      ) : null}
    </div>
  )
}

export default Countries
