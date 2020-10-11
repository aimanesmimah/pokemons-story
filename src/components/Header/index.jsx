import React from 'react' ;
import { Link } from 'react-router-dom';
import AppRoutes from '../../constants/app-routes.constants' ;
import './styles.scss'
import pokemon from '../../assets/pokemon_80x80.png';
import { connect } from 'react-redux';

function Header({pokemonId}){
    return (
        <React.Fragment>
            <div className="header--wrapper" >
                <div className="header--title" >
                   <p>P<img src={pokemon} alt="" />kemon</p>
                   <p>store</p>
                </div>
                <ul className="navbar" >
                    <li className="navbar--item" >
                        <Link to={AppRoutes.HOME} className="navbar--item__link" >Home</Link>
                    </li>
                    <li className="navbar--item" >
                        <Link to={AppRoutes.VIEW_POKEMON_ID.replace(':id',pokemonId)} className="navbar--item__link" >View Pokemon</Link>
                    </li>
                    <li className="navbar--item" >
                        <Link to={AppRoutes.POKEMON_TYPES} className="navbar--item__link" >Types</Link>
                    </li>
                </ul>
            </div>
            <div className="custom-shape-divider-top-1600437539">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path className="shape-fill" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </React.Fragment>
    )
}

export default connect(state => ({
        pokemonId: state.pokemon.result.id
    })
)(Header)