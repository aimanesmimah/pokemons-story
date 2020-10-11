import PokemonClass from "../../models/pokemon.model";
import C from "./constants";
import baseState from "../base-state";
import LoadingStatus from '../../constants/loading-status.constants' ;

export const intialState = {
    pokemon:{
        result: new PokemonClass(),
        ...baseState
    }
}

export const PokemonReducer = (prevState= intialState.pokemon , action) => {
    switch (action.type) {
        case C.SET_POKEMON_ID:
            return {
                ...prevState,
                result: new PokemonClass({ id: action.id })
            }
        case C.SET_POKEMON:
            return {
                ...prevState,
                result: new PokemonClass(action.data),
                loadingStatus: LoadingStatus.LOADED
            }
        case C.IS_LOADING:
            return {
                ...prevState,
                loadingStatus: LoadingStatus.LOADING
            }
        case C.INIT_LOADING:
            return {
                ...prevState,
                loadingStatus: LoadingStatus.NO_ACTIVITY
            }
        case C.SET_POKEMON_ERROR:
            return {
                ...prevState,
                loadingStatus: LoadingStatus.LOADING_FAILED,
                error: action.error
            }
        case C.INIT_POKEMON: 
            return intialState
        default:
            return prevState
    }
}