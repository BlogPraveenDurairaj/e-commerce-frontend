import React, { useEffect } from 'react'
import OrderList from './OrderList'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersData } from '../../slice/orderSlice'
import UserLayout from '../../components/layout/UserLayout'

const OrdersContainer = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)

    useEffect(() => {
        dispatch(getOrdersData())
    }, [dispatch])

    console.log(orders, "orders")
    return (
        <UserLayout>
            <div className='container-custom'>
                <OrderList ordersData={orders} />
            </div>
        </UserLayout>
    )
}

export default OrdersContainer