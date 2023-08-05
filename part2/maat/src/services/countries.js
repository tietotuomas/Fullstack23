import axios from 'axios'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const getAll = async () => {
  const response = await axios.get(
    'https://studies.cs.helsinki.fi/restcountries/api/all'
  )
  return response.data
}

const getWeather = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fi&appid=${apiKey}`
  )
  return response.data
}

export default { getAll, getWeather }
