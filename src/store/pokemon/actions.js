import C from './constants';

export const setPokemon = (data) => ({
  type: C.SET_POKEMON,
  data
});

export const setPokemonId = id => ({
  type: C.SET_POKEMON_ID,
  id
});

export const setPokemonError = error => ({
  type: C.SET_POKEMON_ERROR,
  error
});

export const setPokemonLoading = () => ({
  type: C.IS_LOADING
});

export const initPokemonLoading = () => ({
  type: C.INIT_LOADING
});

export const initPokemon = () => ({
  type: C.INIT_POKEMON
});
