import React, { useEffect } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout'
import DashboardStates from './DashboardStates'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsData } from '../../../slice/productSlice'
import { getAllOrderItemsData, getAllOrdersByAdminData } from '../../../slice/orderSlice'
import DashboardRecentOrders from './DashboardRecentOrders'
import DashboardOrderOverview from './DashboardOrderOverview'
import DashboardWelcomeCard from './DashboardWelcomeCard'

const Dashboard = () => {
  const { allProductsData,loading:{dataLoading} } = useSelector((state) => state.products)
  const { totalOrders, loading,orderItems} = useSelector((state) => state.orders)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProductsData())
    dispatch(getAllOrdersByAdminData(1))
    dispatch(getAllOrderItemsData())
  }, [dispatch])

  const statesData = {
    totalProducts: allProductsData,
    totalOrders: totalOrders,
  }
  return (
    <AdminLayout>
     <DashboardWelcomeCard orderItemData={orderItems} loading={loading}/>
      <DashboardStates ordersProductsData={statesData} loading={dataLoading || loading }/>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
        <DashboardRecentOrders totalOrders={totalOrders.slice(0, 5)} loading={loading} />
        <DashboardOrderOverview orderData={totalOrders}/>
      </div>
    </AdminLayout>
  )
}

export default Dashboard