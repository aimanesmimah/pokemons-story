import React from 'react';
import Paginate from 'react-paginate';
import { connect } from 'react-redux';
import './styles.scss';
import { ResponsivenessConsumer } from '../../contexts/responsiveness';

class Pagination extends React.PureComponent {
  render() {
    const {currentPage, total, handlePageChange } = this.props;
    return (
        <ResponsivenessConsumer>
            {
                    ({ isMobile }) => (
                        <Paginate
                                activeClassName={'pagination--active'}
                                breakClassName={'pagination--break-me'}
                                breakLabel={'...'}
                                containerClassName={'pagination'}
                                marginPagesDisplayed={2}
                                nextClassName={'pagination--forward'}
                                nextLabel={'Next'}
                                onPageChange={handlePageChange}
                                pageClassName={'pagination--page'}
                                pageCount={total}
                                initialPage={currentPage - 1}
                                pageRangeDisplayed={isMobile ? 1 : 4}
                                previousClassName={'pagination--forward'}
                                previousLabel={'Previous'}
                                subContainerClassName={'pagination--sub'} />
                    )
                }
        </ResponsivenessConsumer>
    );
  }
}

export default connect(
  state => ({
    total: state.pagination.totalPages,
    currentPage: state.pagination.currentPage
  })
)(Pagination);
