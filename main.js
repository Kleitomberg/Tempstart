import './style.css'

const input_city = document.querySelector('#city-input')
const city_name = document.querySelector('.city-name')

const now_temp = document.querySelector('.now .temperatura')
const max_temp = document.querySelector('.max .temperatura')
const min_temp = document.querySelector('.min .temperatura')

input_city.addEventListener('change', (e) => {
  e.preventDefault()
  getTemperatura(input_city.value)
})

function getTemperatura(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},br&lang=pt_br&appid=96120036ea8d15f72dad65c4064684bd`

  fetch(url)
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data)
        if (data.cod == '404') {
          alert(`Error: Nenhuma Cidade encontrada como ${city}!`)
        } else {
          city_name.innerText = data.name
          const temperatura = data.main.temp - 273.15
          const temperatura_max = data.main.temp_max - 273.15
          const temperatura_min = data.main.temp_min - 273.15
          now_temp.innerText = Math.round(temperatura)
          max_temp.innerText = Math.round(temperatura_max)
          min_temp.innerText = Math.round(temperatura_min)
        }
      })
    })
    .catch(function (err) {
      console.error('Failed retrieving information', err)
    })
}
