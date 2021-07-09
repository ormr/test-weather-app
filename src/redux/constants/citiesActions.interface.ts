import { Action } from 'redux';

export enum AppActionsType {
  FETCH_CITY = 'FETCH_CITY',
  FETCH_CITY_SUCCESS = 'FETCH_CITY_SUCCESS',
  FETCH_CITY_FAILURE = 'FETCH_CITY_FAILURE',
  CHANGE_ROW_INDEX = 'CHANGE_ROW_INDEX',
  DELETE_ROW = 'DELETE_ROW',
  RECOVER_ROW = 'RECOVER_ROW',
  MODIFY_ROW = 'MODIFY_ROW',
}

export interface FetchCityAction extends Action<AppActionsType> {
  type: AppActionsType.FETCH_CITY;
}

export interface FetchCitySuccessAction extends Action<AppActionsType> {
  type: AppActionsType.FETCH_CITY_SUCCESS;
  payload: {
    name: string;
    temp: number;
  };
}

export interface FetchCityFailureAction extends Action<AppActionsType> {
  type: AppActionsType.FETCH_CITY_FAILURE;
  payload: {
    name: string;
    errorMessage: string;
  };
}

export interface DeleteRowAction extends Action<AppActionsType> {
  type: AppActionsType.DELETE_ROW,
  payload: {
    id: string;
  }
}

export interface ChangeRowIndexAction extends Action<AppActionsType> {
  type: AppActionsType.CHANGE_ROW_INDEX,
  payload: {
    id: string;
    index: number;
  }
}

export interface RecoverRowAction extends Action<AppActionsType> {
  type: AppActionsType.RECOVER_ROW,
  payload: {
    id: string;
  }
}

export interface ModifyRowAction extends Action<AppActionsType> {
  type: AppActionsType.MODIFY_ROW,
  payload: {
    id: string;
    name: string;
    temp: number;
  }
}

export type FetchCityActionTypes = FetchCityAction | FetchCityFailureAction | FetchCitySuccessAction;
export type AppActionTypes =
  | FetchCityAction
  | FetchCitySuccessAction
  | FetchCityFailureAction
  | DeleteRowAction
  | ChangeRowIndexAction
  | RecoverRowAction
  | ModifyRowAction;