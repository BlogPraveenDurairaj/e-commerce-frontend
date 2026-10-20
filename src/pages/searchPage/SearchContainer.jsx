import React, { useEffect, useRef, useState } from 'react';
import ProductList from './ProductList';
import ProductCardListSkeleton from '../../styles/searchPage/Skeleton/ProductCardListSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsData } from '../../slice/productSlice';
import NoProduct from './NoProduct';
import UserLayout from '../../components/layout/UserLayout';
import SearchFilter from './SearchFilter';
import { useLocation } from 'react-router-dom';
import Skeleton from '../../components/UI/Skeleton';

const SearchContainer = () => {
  const { data, error, loading, hasMore, filter, cart } = useSelector((state) => state.products)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const loaderRef = useRef(null)
  const location = useLocation();

  useEffect(() => {
    dispatch(getProductsData({ page, category: filter.categoryFilter == 'All' ? '' : filter.categoryFilter, sort: filter.priceFilter, search: filter.productNameFilter }))
  }, [dispatch, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading.dataLoading && hasMore) {
          setPage((pre) => pre + 1)
        }
      }, {
      threshold: 0
    }
    )
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }
    return () => observer.disconnect()
  }, [loading.dataLoading, hasMore])



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.cartData))
  }, [cart.cartData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isInitialLoading = loading.dataLoading && page === 1;
  const isLoadingMore = loading.dataLoading && page > 1;

  if (error) {
    return <div className='p-5 text-red-600 font-semibold'>{error}</div>
  }

  return (
    <UserLayout isNotSearchPage={false}>
      <div className='block xl:hidden px-5 my-4'>
        <SearchFilter
          isPrimaryOpen={true}
          filter={filter}
        />
      </div>
      <div className='container-custom my-5'>
        {isInitialLoading ? <> <Skeleton
          width="200px"
          height="32px"
          borderRadius="8px"
          className={'mb-4'}
        /><ProductCardListSkeleton length={10} /></> : <ProductList productList={data} />}
        <div className='h-[5px]' ref={loaderRef} >
          {isLoadingMore && <ProductCardListSkeleton />}
          {!loading.dataLoading && data?.length == 0 && <NoProduct />}
        </div>
      </div>
    </UserLayout>
  )
}

export default SearchContainer