import React from 'react'
import AdminLayout from '../../../../components/layout/AdminLayout'
import ProductForm from '../ProductForm'

const AddProduct = () => {
  return (
    <AdminLayout  backNavigation={'/manage-products'} title='Add Product'>
      <ProductForm/>
    </AdminLayout>
  )
}

export default AddProduct