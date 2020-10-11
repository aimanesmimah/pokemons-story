import baseState from "../base-state";
import C from './constants' ;
import TypeClass from '../../models/type.model';
import LoadingStatus from '../../constants/loading-status.constants' ;

export const initialState= {
    types: {
        result: [],
        ...baseState
    }
}

export const TypesReducer= (prevState= initialState.types, action) => {
    switch (action.type) {
        case C.SET_TYPES:
            return {
                ...prevState,
                result:  action.data.map(type => new TypeClass(type)),
                loadingStatus: LoadingStatus.LOADED
            }
        case C.IS_LOADING:
            return {
                ...prevState,
                loadingStatus: LoadingStatus.LOADING
            }
        case C.SET_ERROR:
            return {
                ...prevState,
                error: action.error,
                loadingStatus: LoadingStatus.LOADING_FAILED
            }
        default:
            return prevState
    }
}