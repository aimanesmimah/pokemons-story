import Uris from '../constants/uris.constants' ;

export class AppService {
    static get(uri,params){
        let requestUri= Uris.BASE_URL + uri
        if(params){
            requestUri += Object.keys(params).reduce((accumulator,current,index) => {
                                            if(index) accumulator += '&'
                                            return accumulator + current + '=' + params[current]  
                                      },'?')
        }
        return fetch(requestUri)
                    .then(res => res.json())
                    .then(data=> Promise.resolve(data))
                    .catch(err=> Promise.reject(err))
    }

    static getPokemons(params){
        return AppService.get(Uris.POKEMONS_PARAMS.replace(':limit',params.limit).replace(':offset',params.offset))
                       .then(response => Promise.resolve(response))
                       .catch(err => Promise.reject(err))
    }

    static getPokemonsByTypes(filterList){
        console.log('filter list',filterList)
        return Promise.all(filterList.map(filter => AppService.get(Uris.TYPES_ID.replace(':id',filter))))
                       .then(responses => Promise.resolve(responses.reduce( (accumulator,current) => [...accumulator,...current.pokemon] ,[])))
                       .catch(err => Promise.reject(err))
    }

    static getPokemonById(id){
        return AppService.get(Uris.POKEMONS_ID.replace(':id',id))
                       .then(response => Promise.resolve(response))
                       .catch(err=> Promise.reject(err))
    }

    static getByUrl(url){
        return AppService.get(url.replace(Uris.BASE_URL,''))
                       .then(response=> Promise.resolve(response))
                       .catch(err=> Promise.reject(err))
    }

    static getTypes(){
        return AppService.get(Uris.TYPES)
                      .then(response => Promise.resolve(response))
                      .catch(err => Promise.reject(err))
    }
}