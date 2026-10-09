import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import AdminLayout from '../../../../components/layout/AdminLayout';
import ProductForm from '../ProductForm';
import { getProductByIdData } from '../../../../slice/productSlice';

const UpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { previewData } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(getProductByIdData(id))
    }, [dispatch])
    return (
        <AdminLayout backNavigation={'/manage-products'} title={'Update Product'}>
            <ProductForm
                data={previewData}
                type='EDIT'
                id={id}
            />
        </AdminLayout>
    )
}

export default UpdateProduct