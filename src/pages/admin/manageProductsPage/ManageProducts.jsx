import React, { useEffect, useState } from 'react'
import CustomTable from '../../../components/UI/CustomTable'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsData } from '../../../slice/productSlice'
import AdminLayout from '../../../components/layout/AdminLayout'
import { EditIcon } from '../../../assets/svgComponent/SvgIcon2'
import Button from '../../../components/UI/Button'

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
      key: 'availability',
      name: 'Availability',
      render:(row)=>{
        return row.availability ? <span className='w-fit px-4 py-1 rounded-full text-sm bg-green-50 text-green-600'>Available</span> :
        <span className='w-fit px-4 py-1 rounded-full text-sm  bg-red-50 text-red-600'>Not Available</span> 
      }
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
    },
    {
      key: 'action',
      name: 'Action',
      render: (row) => {
        return (
          <div className='flex gap-2'>
            <Button style='gray' Icon={EditIcon} type='link' to={`/manage-products/edit/${row.id}`} containerClass={'hover:!text-blue-800 hover:!bg-blue-200'} />
          </div>
        )
      }
    },

  ]


  useEffect(() => {
    dispatch(getProductsData({ page, isPagination: true }))
  }, [dispatch, page])


  return (
    <AdminLayout title={'Manage Products'}>
      <div className='flex justify-end mb-4'>
        <Button
        label={"Add Product"}
        type='link'
        to='/manage-products/add/'
        style='black'
        />
      </div>

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