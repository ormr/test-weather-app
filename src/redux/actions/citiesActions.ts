import { Dispatch } from 'redux';
import { OpenWeatherApiService } from '../../services/openweatherapi-service';
import { AppActionsType, AppActionTypes, FetchCityActionTypes } from "../constants/citiesActions.interface";

const openWeatherApiService = new OpenWeatherApiService();



export const fetchCityWeather = (payload: { cityName: string }) => async (dispatch: Dispatch<FetchCityActionTypes>) => {
  dispatch({
    type: AppActionsType.FETCH_CITY,
  });

  try {
    const data = await openWeatherApiService.getBaseInfo(payload.cityName);

    dispatch({
      type: AppActionsType.FETCH_CITY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: AppActionsType.FETCH_CITY_FAILURE,
      payload: {
        name: payload.cityName,
        errorMessage: error.message
      }
    });
  }
}

export const changeRowIndex = (id: string, index: number) => async (dispatch: Dispatch<AppActionTypes>) => {
  dispatch({
    type: AppActionsType.CHANGE_ROW_INDEX,
    payload: {
      id, index
    }
  });
}

export const deleteRow = (id: string) => async (dispatch: Dispatch<AppActionTypes>) => {
  dispatch({
    type: AppActionsType.DELETE_ROW,
    payload: {
      id
    }
  })
}


export const recoverRow = (id: string) => async (dispatch: Dispatch<AppActionTypes>) => {
  dispatch({
    type: AppActionsType.RECOVER_ROW,
    payload: {
      id
    }
  })
}


export const modifyRow = (id: string, name: string, temp: number) => async (dispatch: Dispatch<AppActionTypes>) => {
  dispatch({
    type: AppActionsType.MODIFY_ROW,
    payload: {
      id,
      name,
      temp
    }
  })
}