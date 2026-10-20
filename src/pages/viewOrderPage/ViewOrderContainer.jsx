import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import UserLayout from '../../components/layout/UserLayout';
import { getOrderDataById, getOrderItemDataById } from '../../slice/orderSlice';
import ViewOrderHeader from './ViewOrderHeader';
import ViewOrderPaymentAndShippingInfo from './ViewOrderPaymentAndShippingInfo';
import ViewOrderProductListAndBill from './ViewOrderProductListAndBill';
import OrderDetailsSkeleton from '../../components/skeleton/OrderDetailsSkeleton';
import Button from '../../components/UI/Button';

const ViewOrderContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { viewOrder } = useSelector((state) => state.orders)
    useEffect(() => {
        dispatch(getOrderDataById(id))
        dispatch(getOrderItemDataById(id))
    }, [dispatch])

    return (
        <UserLayout>
            <div className='container-custom'>
                {viewOrder?.viewOrderLoading ? <OrderDetailsSkeleton /> :
                    <>
                        <div className='flex justify-start mb-2'> <Button label={"Go back"} type='link' to={'/orders'} style={'black'} /></div>
                        <div className='grid grid-cols-1 md:grid-cols-[2fr_380px] gap-5 items-start'>
                            <div className='grid gap-5'>
                                <ViewOrderHeader orderData={viewOrder.viewOrderData} />
                                <ViewOrderProductListAndBill orderItemData={viewOrder.viewOrderItemData} />
                            </div>
                            <ViewOrderPaymentAndShippingInfo orderData={viewOrder.viewOrderData} />
                        </div>
                    </>
                }
            </div>
        </UserLayout>
    )
}

export default ViewOrderContainer