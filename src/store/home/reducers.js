import baseState from "../base-state";
import C from './constants';
import PokemonClass from "../../models/pokemon.model";
import LoadingStatus from '../../constants/loading-status.constants';
import Filters from '../../constants/filters.constants';

export const initialState = {
  pokemons: {
    result: [],
    ...baseState
  },
  pagination: {
    currentPage: 1,
    totalPages: 1
  },
  filters: {
    [Filters.TYPES]: []
  }
};

export const PokemonsReducer = (prevState = initialState.pokemons, action) => {
  switch (action.type) {
    case C.SET_POKEMONS:
      return {
        ...prevState,
        result: action.pokemons.map(pokemon => new PokemonClass(pokemon)),
        loadingStatus: LoadingStatus.LOADED
      };
    case C.SET_ERROR:
      return {
        ...prevState,
        loadingStatus: LoadingStatus.LOADING_FAILED,
        error: action.error
      };
    case C.IS_LOADING:
      return {
        ...prevState,
        loadingStatus: LoadingStatus.LOADING
      };
    case C.INIT_POKEMONS:
      return initialState.pokemons;
    default:
      return prevState;
  }
};

export const PaginationReducer = (prevState = initialState.pagination, action) => {
  switch (action.type) {
    case C.SET_PAGINATION:
      return {
        ...prevState,
        ...action.pagination
      };
    default:
      return prevState;
  }
};

export const FiltersReducer = (prevState = initialState.filters, action) => {
  switch (action.type) {
    case C.ADD_FILTER:
      if (prevState[action.attr].includes(action.id)) return prevState;
      return {
        ...prevState,
        [action.attr]: [...prevState[action.attr], action.id]
      };
    case C.REMOVE_FILTER:
      return {
        ...prevState,
        [action.attr]: prevState[action.attr].filter(item => item !== action.id)
      };
    case C.INIT_FILTERS:
      return initialState.filters;
    default:
      return prevState;
  }
};
