import React, { useEffect } from 'react'
import UserLayout from '../../components/layout/UserLayout'
import Wishlist from './Wishlist';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductWishlistItem, deleteWishlistItem, fetchAllWishListData, getWishlistData, clearWishListProductData } from '../../slice/wishlistSlice';
import toast from 'react-hot-toast';

const WishListWrapper = () => {
    const dispatch = useDispatch()
    const { data, wishlistProductData } = useSelector((state) => state.wishlist)
    const { user } = useSelector((state) => state.auth)
    const productIds = data?.map((item) => item.product_id)

    const handleDeleteItem = (id) => {
        const isExistingProduct = data.find((item) => item.product_id == id)
        if (isExistingProduct) {
            dispatch(deleteWishlistItem(isExistingProduct.id))
            deleteProductWishlistItem(id)
            toast.success('Product Deleted')
        }
    }

    useEffect(() => {
        if (user?.id) {
            dispatch(getWishlistData(user.id))
        }
    }, [dispatch, user?.id])


    useEffect(() => {
        if (productIds?.length > 0) {
            dispatch(fetchAllWishListData(productIds))
        } else {
            dispatch(clearWishListProductData())
        }
    }, [dispatch, data])


    return (
        <UserLayout>
            <div className='container-custom'>
                <h1 className='text-2xl font-bold mb-4 text-gray-800'>My Wishlist</h1>
                <Wishlist wishListData={wishlistProductData} handleDeleteItem={handleDeleteItem} />
            </div>
        </UserLayout>
    )
}

export default WishListWrapper