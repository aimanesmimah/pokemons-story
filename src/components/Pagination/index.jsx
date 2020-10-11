import React from 'react';
import Paginate from 'react-paginate' ;
import { connect } from 'react-redux';
import './styles.scss';

class Pagination extends React.PureComponent {

    isMobile= () =>{
       return window.innerWidth < 450 
    }

    render(){
        const {total, handlePageChange}= this.props
        return (
            <Paginate 
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={total} 
                    onPageChange={handlePageChange}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={this.isMobile() ? 1 : 4}
                    containerClassName={'pagination'}
                    subContainerClassName={'pagination--sub'}
                    pageClassName={'pagination--page'}
                    activeClassName={'pagination--active'}
                    previousClassName={'pagination--forward'}
                    nextClassName={'pagination--forward'}
                    breakLabel={'...'}
                    breakClassName={'pagination--break-me'} />
        )
    }
}

export default connect(
    state => ({
        total: state.pagination.totalPages
    })
)(Pagination)