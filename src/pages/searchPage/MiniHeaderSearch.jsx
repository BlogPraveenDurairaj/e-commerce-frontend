import React from 'react';
import { SearchSvgIcon } from '../../assets/svgComponent/SvgIcon1';

const MiniHeaderSearch = ({
  handleMiniFilterClick,
  filter
}) => {

  const {
    productNameFilter,
    categoryFilter,
    priceFilter
  } = filter;

  return (
    <div
      className="mini_search_header active"
      onClick={handleMiniFilterClick}
    >
      <div className="mini_search_header_inner">

        <div className="mini_search_line">
          {productNameFilter === ''
            ? 'Search by name'
            : productNameFilter}
        </div>

        <div className="mini_search_line">
          {categoryFilter}
        </div>

        <div>
          {priceFilter === 'asc'
            ? 'Low to High'
            : 'High to Low'}
        </div>

      </div>

      <button className="search_button">
        <SearchSvgIcon />
      </button>
    </div>
  );
};

export default MiniHeaderSearch;