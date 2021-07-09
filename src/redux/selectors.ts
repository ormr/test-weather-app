import { RootState } from "./types";

export const selectCities = (state: RootState) => state.weather.list;
export const selectCityById = (id: string) => (state: RootState) => state.weather.list.find(city => city.id === id);