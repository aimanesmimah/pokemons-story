import C from './constants';

export const setTypes = (data) => ({
  type: C.SET_TYPES,
  data
});

export const setTypesLoading = () => ({
  type: C.IS_LOADING
});

export const setTypesError = (error) => ({
  type: C.SET_ERROR,
  error
});
