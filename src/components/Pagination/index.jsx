import React from 'react';
import Paginate from 'react-paginate' ;
import { connect } from 'react-redux';
import './styles.scss';
import { ResponsivenessConsumer } from '../../contexts/responsiveness';

class Pagination extends React.PureComponent {

    render(){
        const {total, handlePageChange}= this.props
        return (
            <ResponsivenessConsumer>
                {
                    ({ isMobile }) => (
                        <Paginate 
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                pageCount={total} 
                                onPageChange={handlePageChange}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={isMobile ? 1 : 4}
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
            </ResponsivenessConsumer>
        )
    }
}

export default connect(
    state => ({
        total: state.pagination.totalPages
    })
)(Pagination)