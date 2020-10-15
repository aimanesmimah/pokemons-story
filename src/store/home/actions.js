import C from './constants' ;

export const setPagination = pagination => ({
    type: C.SET_PAGINATION,
    pagination
})

export const setPokemons= pokemons => ({
    type: C.SET_POKEMONS,
    pokemons
})

export const setPokemonsLoading= () => ({
    type: C.IS_LOADING
})

export const setPokemonsError= error => ({
    type: C.SET_ERROR,
    error
})

export const initPokemons= () => ({
    type: C.INIT_POKEMONS
})

export const addFilter= (attr,id) => ({
    type: C.ADD_FILTER,
    id,
    attr
})

export const removeFilter= (attr,id) => ({
    type: C.REMOVE_FILTER,
    attr,
    id
})

export const initFilters= () => ({
    type: C.INIT_FILTERS
})