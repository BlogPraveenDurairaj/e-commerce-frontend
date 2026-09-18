import React, { useEffect, useRef, useState } from 'react';
import ProductList from './ProductList';
import ProductCardListSkeleton from '../../styles/searchPage/Skeleton/ProductCardListSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsData } from '../../slice/productSlice';
import NoProduct from './NoProduct';
import UserLayout from '../../components/layout/UserLayout';
import SearchFilter from './SearchFilter';
import { useLocation } from 'react-router-dom';

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
        console.log(entries,'entries')
        console.log(entries[0].isIntersecting , !loading.dataLoading , hasMore)
        if (entries[0].isIntersecting && !loading.dataLoading && hasMore) {
          setPage((pre) => pre + 1)
          console.log('isRuning')
        }
      }, {
      threshold: 0
    }
    )
    if (loaderRef.current) {
      console.log(loaderRef.current,'loaderRef.current')
      observer.observe(loaderRef.current)
    }
    return () => observer.disconnect()
  }, [loading.dataLoading, hasMore])

  if (error) {
    return <div className='p-5 text-red-600 font-semibold'>{error}</div>
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.cartData))
  }, [cart.cartData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isInitialLoading = loading.dataLoading && page === 1;
  const isLoadingMore = loading.dataLoading && page > 1;

  return (
    <UserLayout isNotSearchPage={false}>
      <div className='block lg:hidden px-5 my-4'>
        <SearchFilter
          isPrimaryOpen={true}
          filter={filter}
        />
      </div>
      {isInitialLoading ? <ProductCardListSkeleton /> : <ProductList productList={data} />}
      <div className='h-[5px]' ref={loaderRef} >
        {isLoadingMore && <ProductCardListSkeleton />}
        { !loading.dataLoading && data?.length == 0 && <NoProduct />}
      </div>
    </UserLayout>
  )
}

export default SearchContainer