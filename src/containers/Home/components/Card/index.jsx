import React from 'react';
import AppRoutes from '../../../../constants/app-routes.constants';
import './styles.scss';
import { connect } from 'react-redux';
import { setPokemonId } from '../../../../store/pokemon/actions';
import { Redirect, Link } from 'react-router-dom';

class Card extends React.PureComponent {
    state= {
      toViewPokemon: false
    }

    handleCardClick= e => {
      const { id, setPokemonId } = this.props;
      setPokemonId(id);
      this.setState({ toViewPokemon: true });
    }

    render() {
      const {
        name, height, weight, base_experience, picture, id
      } = this.props;
      const { toViewPokemon } = this.state;

      if (toViewPokemon) return <Redirect to={AppRoutes.VIEW_POKEMON_ID.replace(':id', id)} />;

      return (
          <Link className="pokemon--card" to={AppRoutes.VIEW_POKEMON_ID.replace(':id', id)} >
              <img alt="" className="pokemon--card__logo" src={picture}
                    /* onLoad={handleImageLoaded} onError={handleLoadError} */ />
              <div className="pokemon--card__content" >
                  <div>{name}</div>
                  <div className="pokemon--card__content--infos" >
                      <p>Height, <br/><span>{height}</span></p>
                      <p>Weight, <br/><span>{weight}</span></p>
                      <p>Exp, <br/><span>{base_experience}</span></p>
                  </div>
              </div>
          </Link>);
    }
}

export default connect(
  null,
  dispatch => ({
    setPokemonId(id) {
      dispatch(setPokemonId(id));
    }
  })
)(Card);
