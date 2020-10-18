export default class TypeClass {
    id=0

    name= ''

    moveDamageClass= ''

    damageRelations= {}

    constructor(opts) {
      if (opts) Object.assign(this, opts);
    }
}
