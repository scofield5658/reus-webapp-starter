import { getWeatherByCity } from "../services/weather";

export default {
  GET_WEATHER_BY_CODE: ({ commit }, { city }) => (
    getWeatherByCity(city).then((weather) => commit("SET_WEATHER_BY_CITY", { city, weather }))),
};
