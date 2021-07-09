import { AppActionsType, AppActionTypes } from "./constants/citiesActions.interface";
import { v4 as uuidv4 } from 'uuid';

export type WeatherStatus = 'ACTIVE' | 'DELETED';

export interface CityWeather {
  id: string;
  name: string;
  temp: number;
  status: WeatherStatus;
}

export interface AppState {
  error: boolean;
  errorMessage: string;
  loading: boolean;
  list: CityWeather[]
}

const initialAppReducer: AppState = {
  error: false,
  errorMessage: '',
  loading: false,
  list: []
}

export const appReducer = (
  state: AppState = initialAppReducer,
  action: AppActionTypes
) => {
  switch (action.type) {
    case AppActionsType.FETCH_CITY:
      return {
        ...state,
        loading: true,
      };
    case AppActionsType.FETCH_CITY_SUCCESS: {
      const newCity: CityWeather = {
        ...action.payload,
        id: uuidv4(),
        status: 'ACTIVE',
      }
      const isCityExistInList = state.list.find((city) => city.name === newCity.name);

      if (isCityExistInList) {
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: `Город ${newCity.name} уже есть в списке`
        }
      } else {
        return {
          error: false,
          errorMessage: '',
          loading: false,
          list: [...state.list, newCity]
        }
      }
    }
    case AppActionsType.FETCH_CITY_FAILURE:
      const { errorMessage } = action.payload;
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage
      }
    case AppActionsType.DELETE_ROW: {
      const { id } = action.payload;
      const newList = [...state.list];
      const rowIndex = newList.findIndex((city) => city.id === id);
      newList[rowIndex] = { ...newList[rowIndex], status: 'DELETED' };

      return {
        ...state,
        list: newList
      }
    }
    case AppActionsType.RECOVER_ROW: {
      const { id } = action.payload;
      const newList = [...state.list];
      const rowIndex = newList.findIndex((city) => city.id === id);
      newList[rowIndex] = { ...newList[rowIndex], status: 'ACTIVE' };

      return {
        ...state,
        list: newList
      }
    }
    case AppActionsType.CHANGE_ROW_INDEX: {
      const { id, index } = action.payload;
      const rowIndex = state.list.findIndex((city) => city.id === id);
      const newIndex = rowIndex + index;

      if (newIndex <= -1 || newIndex > state.list.length) return state;

      const rowToMove = state.list[rowIndex];
      const newList = [...state.list];
      newList.splice(rowIndex, 1);
      newList.splice(newIndex, 0, rowToMove);

      return {
        ...state,
        list: newList
      }
    }
    case AppActionsType.MODIFY_ROW: {
      const { id, name, temp } = action.payload;
      const newList = [...state.list];
      const rowIndex = newList.findIndex((city) => city.id === id);
      newList[rowIndex] = { ...newList[rowIndex], name, temp };

      return {
        ...state,
        list: newList
      }
    }
    default:
      return state;
  }
}