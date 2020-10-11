import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';

function DetailedCard({forms,abilities,types,moves}) {
    return (
        <div className="detailed--card" >
            <section className="detailed--card__forms" >
                <div className="detailed--card__title" >Forms</div>
                <div className="detailed--card__items" >
                    { forms.map((form,index) => <div key={index} >{form.name}</div> ) }
                </div>
            </section>
            <section className="detailed--card__abilities" >
                <div className="detailed--card__title" >Abilities</div>
                <div className="detailed--card__items" >
                    { abilities.map((ability,index) => <div key={index} >{ability.ability.name}</div>) }
                </div>
            </section>
            <section className="detailed--card__types" >
                <div className="detailed--card__title" >Types</div>
                <div className="detailed--card__items" >
                    {types.map((typeItem,index)=> <div key={index} >{typeItem.type.name}</div> )}
                </div>
            </section>
            <section className="detailed--card__species" >
                <div className="detailed--card__title" >Moves</div>
                <div className="detailed--card__items" >
                    {moves.map((moveItem,index)=> <div key={index} >{moveItem.move.name}</div> )}
                </div>
            </section>
        </div>
    );
}

export default connect(
    state => ({
        pokemon: state.pokemon.result
    })
)(DetailedCard);