import React from 'react';
import './styles.scss';
import { AppService } from '../../../../services/app.service';
import { connect } from 'react-redux';
import { addFilter, removeFilter, initFilters } from '../../../../store/home/actions';
import Filters from '../../../../constants/filters.constants';
import loupe from '../../../../assets/loupe.png';

class SearchBar extends React.PureComponent {
    _inputRef;

    _filterOptions;

    state= {
      options: [],
      showOptions: false,
      dropDownClicked: false
    }

    handleChange= e => {
      this.setState({ showOptions: true, options: this._filterOptions.filter(option => option.includes(this._inputRef.value)) });
    }

    handleSelectOption= async option => {
      const { addFilter, handleFilterChange } = this.props;
      addFilter(Filters.TYPES, option);
      process.nextTick(()=> handleFilterChange());
      this._inputRef.value = '';
      this.setState({ options: this._filterOptions });
    }

    handleRemoveFilter= (id) => {
      const { removeFilter, handleFilterChange } = this.props;
      removeFilter(Filters.TYPES, id);
      process.nextTick(()=> handleFilterChange());
    }

    handleFocus= e => {
      this.setState({ showOptions: true });
    }

    handleBlur= e => {
      setTimeout(()=> {
        this.setState({ showOptions: false });
      }, 100);
    }

    async componentDidMount() {
      const filters = await this.getFilterList();
      this._filterOptions = filters.map(filter => filter.name);
      this.setState({ options: this._filterOptions });
    }

    componentWillUnmount() {
      this.props.initFilters();
    }

    getFilterList() {
      return AppService.getTypes()
        .then(response => Promise.resolve(response.results));
    }

    render() {
      const { showOptions, options } = this.state;
      const { filters } = this.props;
      return (
          <div className="searchbar--wrapper" >
              <img alt="" className="searchbar--wrapper__icon" src={loupe}/>
              { Boolean(filters.length)
                    && <div className="searchbar--wrapper__filters" >
                        { filters.map((filter, index)=> <p key={index} >{filter} | <span onClick={ e => this.handleRemoveFilter(filter) } >x</span></p>) }
                       </div> }
              <input className="searchbar--wrapper__input" onBlur={this.handleBlur} onChange={this.handleChange}
                        onFocus={this.handleFocus} ref={ ref => this._inputRef = ref } type="text" />
              { showOptions
                        && <section className="searchbar--wrapper__dropdown" >
                            <ul className="dropdown--options" >
                                {
                                    options.map((option, index) => <li className="dropdown--options__item" key={index} >
                                        <div className="dropdown--options__item--button"
                                                    onClick={e => this.handleSelectOption(option)} >{option}
                                        </div>
                                    </li>)
                                }
                            </ul>
                           </section> }
          </div>
      );
    }
}

export default connect(
  state => ({
    filters: state.filters[Filters.TYPES]
  }),
  dispatch => ({
    addFilter(attr, selected) {
      dispatch(addFilter(attr, selected));
    },
    removeFilter(attr, selected) {
      dispatch(removeFilter(attr, selected));
    },
    initFilters() {
      dispatch(initFilters());
    }
  })
)(SearchBar);
