import React, { useEffect, useMemo } from 'react'
import OrderList from './OrderList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderItemsData, getOrdersData } from '../../slice/orderSlice'
import UserLayout from '../../components/layout/UserLayout'

const OrdersContainer = () => {
    const dispatch = useDispatch()
    const { orders, orderItems, loading } = useSelector((state) => state.orders)

    const combinedOrders = useMemo(() => {
        return orders.map((item) => {
            return {
                ...item,
                orderItems: orderItems?.filter((el) => item.id === el.order_id)
            }
        })

    }, [orders, orderItems])

    useEffect(() => {
        dispatch(getOrdersData())
        dispatch(getAllOrderItemsData())
    }, [dispatch])

    return (
        <UserLayout>
            <div className='container-custom'>
                <h1 className='text-2xl font-bold text-gray-800 mb-4'>My orders</h1>
                <OrderList ordersData={combinedOrders} loading={loading} />
            </div>
        </UserLayout>
    )
}

export default OrdersContainer