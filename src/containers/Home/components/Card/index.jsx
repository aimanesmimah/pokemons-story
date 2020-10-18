import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../../../constants/app-routes.constants';
import './styles.scss';

function Card({  name, height, weight, base_experience, picture, id }) {

    return (
        <Link className="pokemon--card" to={AppRoutes.VIEW_POKEMON_ID.replace(':id', id)} >
            <img alt="" className="pokemon--card__logo" src={picture} />
            <div className="pokemon--card__content" >
                <div>{name.length > 19 ? `${name.slice(0,18)}...` : name }</div>
                <div className="pokemon--card__content--infos" >
                    <p>Height, <br/><span>{height}</span></p>
                    <p>Weight, <br/><span>{weight}</span></p>
                    <p>Exp, <br/><span>{base_experience}</span></p>
                </div>
            </div>
        </Link>);
}

export default Card
