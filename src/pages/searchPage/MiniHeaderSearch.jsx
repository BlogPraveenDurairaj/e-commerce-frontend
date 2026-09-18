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
      className="p-1 pl-3 border border-gray-300 rounded-full flex gap-3.5 text-sm items-center font-semibold w-full bg-white cursor-pointer shadow-sm animate-expand-search"
      onClick={handleMiniFilterClick}
    >
      <div className="grid w-full grid-cols-3 text-center text-xs sm:text-sm text-gray-700">

        <div className="border-r border-gray-300 pr-2.5 mr-2.5 truncate">
          {productNameFilter === ''
            ? 'Search by name'
            : productNameFilter}
        </div>

        <div className="border-r border-gray-300 pr-2.5 mr-2.5 truncate">
          {categoryFilter}
        </div>

        <div className="truncate">
          {priceFilter === 'asc'
            ? 'Low to High'
            : 'High to Low'}
        </div>

      </div>

      <button className="w-8 h-8 bg-theme-primary border-0 rounded-full flex items-center justify-center text-white p-1.5 shrink-0 hover:opacity-90 transition-opacity">
        <SearchSvgIcon />
      </button>
    </div>
  );
};

export default MiniHeaderSearch;