import React from 'react';
import { connect } from 'react-redux';
import App from '../App';
import { Helmet } from 'react-helmet-async';
import { AppService } from '../../services/app.service';
import {
  setPagination, setPokemons, setPokemonsError, setPokemonsLoading
} from '../../store/home/actions';
import SearchBar from './components/Searchbar';
import Pagination from '../../components/Pagination';
import Card from './components/Card';
import LoadingStatus from '../../constants/loading-status.constants';
import Filters from '../../constants/filters.constants';
import './styles.scss';

const PAGE_SIZE = 20;

class HomePage extends React.PureComponent {
    state ={
      filteredPokemons: []
    }

    async componentDidMount() {
      const { getPokemons } = this.props;
      await getPokemons(this.props.pagination.currentPage);
      this.setState({ filteredPokemons: this.props.pokemons.result });
    }

    handlePageChange= async data => {
      const { getPokemons } = this.props;
      await getPokemons(data.selected + 1);
      this.handleFilterChange();
      window.scrollTo(0,0)
    }

    handleFilterChange= () => {
      const { filters } = this.props;
      if (!filters.length) this.setState({ filteredPokemons: this.props.pokemons.result });
      else this.setState({ filteredPokemons: this.getFilteredPokemons(filters) });
    }

    getFilteredPokemons(filters) {
      return this.props.pokemons.result.filter(pokemon => {
        const types = pokemon.types.map(typeItem => typeItem.type && typeItem.type.name).filter(item => !!item);
        for (const type of types) if (filters.includes(type)) return true;
        return false;
      });
    }

    render() {
      const { pokemons } = this.props;
      const { filteredPokemons } = this.state;
      return (
          <App>
              <Helmet>
                  <title>Home</title>
              </Helmet>
              <div className="pokemons--container" >
                  <SearchBar handleFilterChange={this.handleFilterChange} />
                  <div className="pokemons--listing" >
                      {
                            pokemons.loadingStatus === LoadingStatus.LOADING
                              ? 'loading...' : 
                                pokemons.loadingStatus === LoadingStatus.LOADING_FAILED ? 
                                'error loading item' : filteredPokemons.map((pokemonItem, index) => <Card key={index} {...pokemonItem} />) }
                  </div>
              </div>
              <Pagination handlePageChange={this.handlePageChange} />
          </App>
      );
    }
}

export default connect(
  state => ({
    pokemons: state.pokemons,
    pagination: state.pagination,
    filters: state.filters[Filters.TYPES]
  }),
  dispatch => ({
    getPokemons(page) {
      dispatch(setPokemonsLoading());
      return AppService.getPokemons({ limit: PAGE_SIZE, offset: (page - 1) * 20 })
        .then(response => {
          dispatch(setPagination({ currentPage: page, totalPages: parseInt(response.count / 20) + 1 }));
          const pokemonsRequests = response.results.filter(pokemonItem => !!pokemonItem.url)
            .map(pokemonItem=> AppService.getByUrl(pokemonItem.url));
          return Promise.all(pokemonsRequests)
            .then(responses=> {
              dispatch(
                setPokemons(
                  responses.filter(response => !!response)
                    .map(response => ({
                      id: response.id,
                      name: response.name,
                      height: response.height,
                      weight: response.weight,
                      base_experience: response.base_experience,
                      picture: response.sprites.front_default,
                      types: response.types
                    }))
                )
              );
            })
            .catch(err=> dispatch(setPokemonsError(err)))
            .finally(()=> Promise.resolve());
        })
        .catch(err => {
          dispatch(setPokemonsError(err));
        })
        .finally(() => Promise.resolve());
    },
    getPokemonsByTypes(filterList) {
      dispatch(setPokemonsLoading());
      return AppService.getPokemonsByTypes(filterList)
        .then(pokemons => {
          console.log('filter pokemons', pokemons);
        })
        .catch(err => dispatch(setPokemonsError(err)))
        .finally(() => Promise.resolve());
    }
  })
)(HomePage);
