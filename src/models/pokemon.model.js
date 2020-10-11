export default class PokemonClass {
    id= Number()
    name= ''
    url= ''
    height= Number()
    weight= Number()
    base_experience= Number()
    picture= ''
    order= Number()
    forms= []

    constructor(opts){
        if(opts){
            Object.assign(this,opts)
        }
    }
}