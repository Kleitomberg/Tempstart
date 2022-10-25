import './style.css'

const input_city = document.querySelector('#city-input')
const city_name = document.querySelector('.city-name')

const now_temp = document.querySelector('.now .temperatura')
const max_temp = document.querySelector('.max .temperatura')
const min_temp = document.querySelector('.min .temperatura')

const iconNowTemp = document.querySelector('.now img')

const img = document.querySelector('.loading')

input_city.addEventListener('change', (e) => {
  e.preventDefault()
  getTemperatura(input_city.value)
})

function setIcon(descricao) {
  const desc = String(descricao).replace(' ', '_')
  const icons = {
    nublado: 'cloud',
    chuva_moderada: 'rain',
    chuva_leve: 'rain',
    algumas_nuvens: 'cloud',
    nuvens_dispersas: 'cloud',
    céu_limpo: 'sun',
    default: 'sun',
  }
  console.log(desc)
  console.log(iconNowTemp)

  iconNowTemp.setAttribute('src', `${icons[desc]}.svg`)
}

async function getTemperatura(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},br&lang=pt_br&appid=96120036ea8d15f72dad65c4064684bd`

  await fetch(url)
    .then(function (response) {
      response.json().then((data) => {
        if (data.cod == '404') {
          alert(`Error: Nenhuma Cidade encontrada como ${city}!`)
        } else {
          city_name.innerText = data.name
          //convertendo em celsius
          const temperatura = data.main.temp - 273.15
          const temperatura_max = data.main.temp_max - 273.15
          const temperatura_min = data.main.temp_min - 273.15
          //inserindo na tela
          now_temp.innerText = Math.round(temperatura)
          max_temp.innerText = Math.round(temperatura_max)
          min_temp.innerText = Math.round(temperatura_min)
          console.log(data.weather[0].description)
          setIcon(data.weather[0].description)
        }
      })
    })
    .catch((err) => {
      console.error('Failed retrieving information', err)
    })
}
