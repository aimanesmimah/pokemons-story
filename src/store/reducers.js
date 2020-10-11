import {combineReducers} from 'redux' ;
import { PokemonsReducer, PaginationReducer, FiltersReducer } from './home/reducers' ;
import { TypesReducer } from './types/reducers' ;
import { PokemonReducer } from './pokemon/reducers' ;

export default combineReducers({
    pokemons: PokemonsReducer ,
    types: TypesReducer ,
    pokemon: PokemonReducer,
    pagination: PaginationReducer,
    filters: FiltersReducer
})