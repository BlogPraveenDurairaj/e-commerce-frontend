import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByIdData } from '../../slice/productSlice'
import PreviewInfo from './PreviewInfo'
import UserLayout from '../../components/layout/UserLayout'
import ProductDetailsSkeleton from '../../components/skeleton/ProductDetailsSkeleton'

const Preview = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { previewData, loading, error, cart } = useSelector((state) => state.products)
    const checkIsCartItem = useMemo(() => cart?.cartData.some((item) => {
       return  item.id == id}
    ), [cart?.cartData])
    useEffect(() => {
        if (id) {
            dispatch(getProductByIdData(id))
        }
    }, [dispatch])

  
    if (error) {
        return <div>{error}</div>
    }

    return (
        <UserLayout>
            {loading.previewDataLoading && <ProductDetailsSkeleton/> }
            {previewData && !loading.previewDataLoading && <PreviewInfo data={previewData} isCardItem={checkIsCartItem} />}
        </UserLayout>
    )
}

export default Preview