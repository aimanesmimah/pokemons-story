export default class TypeClass {
    id=0
    name= ''
    move_damage_class= ''
    damage_relations= {}

    constructor(opts){
        if(opts) Object.assign(this,opts)
    }
}