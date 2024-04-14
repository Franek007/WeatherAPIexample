const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=7740a4600ec018e85f34a1c11c6fe343'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios.get(URL).then(res => {
		console.log(res.data)
		const temp = res.data.main.temp
		const hum = res.data.main.humidity
		const status = Object.assign({}, ...res.data.weather)

		if (status.id >= 801 && status.id <= 804) {
			photo.setAttribute('src', './img/cloud.png')
			photo.setAttribute('alt', 'Cloudy weather (icon)')
		} else if (status.id === 800) {
			photo.setAttribute('src', './img/sun.png')
			photo.setAttribute('alt', 'Sunny weather (icon)')
		} else if (status.id >= 600 && status.id <= 622) {
			photo.setAttribute('src', './img/ice.png')
			photo.setAttribute('alt', 'Snowy weather (icon)')
		} else if (status.id >= 500 && status.id <= 531) {
			photo.setAttribute('src', './img/rain.png')
			photo.setAttribute('alt', 'Rainy weather (icon)')
		} else if (status.id >= 300 && status.id <= 321) {
			photo.setAttribute('src', './img/drizzle.png')
			photo.setAttribute('alt', ' Drizzle weather (icon)')
		} else if (status.id >= 200 && status.id <= 232) {
			photo.setAttribute('src', './img/tunderstorm.png')
			photo.setAttribute('alt', ' Tunder (icon)')
		} else {
			photo.setAttribute('src', './img/fog.png')
			photo.setAttribute('alt', ' Fog (icon)')
		}

		weather.textContent = status.main
		cityName.textContent = res.data.name

		temperature.textContent = Math.floor(temp) + '°C'
		humidity.textContent = hum + '%'

		input.value = ''
		warning.textContent=''

	}).catch(() => warning.textContent='Wpisz poprawna nazwe miasta')
}
button.focus()

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}

input.addEventListener('keyup', enterKeyCheck)
button.addEventListener('click', getWeather)

