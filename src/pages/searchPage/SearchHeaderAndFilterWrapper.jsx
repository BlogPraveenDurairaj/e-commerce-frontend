import React, { useEffect, useState } from 'react';
import SearchHeader from './SearchHeader';
import { throttle } from '../../helper/throttle';
import { useLocation } from 'react-router-dom';

const SearchHeaderAndFilterWrapper = ({isNotSearchPage}) => {
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(true);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);
  const location = useLocation()

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop === 0) {
      setIsPrimaryOpen(true);
      setIsManuallyOpened(false);
      return;
    }

    if (!isManuallyOpened) {
      setIsPrimaryOpen(false);
    }

  };

  useEffect(() => {
    const handleThrottle = throttle(handleScroll, 1000)
    window.addEventListener('scroll', handleThrottle);

    return () => {
      window.removeEventListener('scroll', handleThrottle);
    };
  }, [isManuallyOpened]);

  const handleMiniFilterClick = () => {
    setIsPrimaryOpen(true);
    setIsManuallyOpened(true);
  };

  return (
    <div className="product_header">
      <SearchHeader
        isPrimaryOpen={isPrimaryOpen}
        handleMiniFilterClick={handleMiniFilterClick}
        isNotSearchPage={isNotSearchPage}
      />
    </div>
  );
};

export default SearchHeaderAndFilterWrapper;