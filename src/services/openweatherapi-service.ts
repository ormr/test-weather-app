export interface WeatherApi {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  }
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  }
  timezone: number;
  visibility: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[]
  wind: {
    speed: number;
    deg: number;
  }
}

export class OpenWeatherApiService {

  _secretId = process.env.REACT_APP_API_KEY;
  _imgApiBase = 'http://openweathermap.org'
  _apiBase = 'http://api.openweathermap.org';
  _lang = 'ru'

  getResource = async (cityname: string) => {
    const res = await fetch(
      `${this._apiBase}/data/2.5/weather?q=${cityname}&lang=${this._lang}&appid=${this._secretId}`
    );

    if (!res.ok) {
      throw new Error(`Клиент не может принять запрос с ${this._apiBase}` +
        `, получена ошибка ${res.status}`)
    }

    return await res.json();
  };

  getBaseInfo = async (cityname: string) => {
    const res = await this.getResource(cityname);

    return this._transformToBaseInfo(res);
  }

  _transformToBaseInfo = (res: WeatherApi) => {
    return {
      name: res.name,
      temp: this._transformKelvinToCelcius(res.main.temp)
    }
  }

  _transformKelvinToCelcius = (temp: number) => {
    return Math.floor(temp - 273.15);
  }
}