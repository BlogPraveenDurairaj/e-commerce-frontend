import React, { useEffect, useState } from 'react'
import CustomTable from '../../../components/UI/CustomTable'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsData } from '../../../slice/productSlice'
import AdminLayout from '../../../components/layout/AdminLayout'

const ManageProducts = () => {
  const { data, error, loading, total } = useSelector((state) => state.products);
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  const pagination = {
    page,
    setPage,
    total
  }

  const columns = [
    {
      key: 'id',
      name: 'ID'
    },
    {
      key: 'title',
      name: 'Product name'
    },
    {
      key: 'price',
      name: 'Price'
    },
    {
      key: 'category',
      name: 'Category'
    },
    {
      key: 'image',
      name: 'Image',
      render: (row) => {
        return (
          <img src={row.image} alt={row?.title} className='w-10 h-10 bg-gray-50 rounded-md shadow' />
        )
      }
    },
    {
      key: 'rating_rate',
      name: 'Rating'
    }
  ]
  useEffect(() => {
    dispatch(getProductsData({ page, isPagination: true }))
  }, [dispatch, page])
  return (
    <AdminLayout title={'Manage Products'}>
      <CustomTable
        columns={columns}
        data={data}
        loading={loading.dataLoading}
        pagination={pagination}
      />
    </AdminLayout>
  )
}

export default ManageProducts