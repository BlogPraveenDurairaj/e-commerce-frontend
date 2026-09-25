import React, { useState } from 'react'
import Button from '../../components/UI/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderDetails, createOrderData, removeOrderDetails } from '../../slice/orderSlice'

import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabaseClient'
import { handleRemoveAllCart } from '../../slice/productSlice'
import { useNavigate } from 'react-router-dom'
import { createOrderItem } from '../../api/ordersApi'

const CheckoutBill = ({ cartData }) => {
    const subTotalPrice = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const { user, session } = useSelector((state) => state.auth)
    const { orderDetails, checkoutFormValid } = useSelector((state) => state.orders)
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const getAmountByTotal = (total) => {
        return (percentage) => {
            return Math.floor(total * percentage / 100)
        }
    }

    const getOtherFee = getAmountByTotal(subTotalPrice)
    const total = subTotalPrice + getOtherFee(10) + getOtherFee(20) + 20
    const bill = [
        {
            label: `Items subtotal ${cartData?.length} items`,
            amount: subTotalPrice
        },
        {
            label: `Tax (10%)`,
            amount: getOtherFee(10)
        },
        {
            label: `Platform fee (20%)`,
            amount: getOtherFee(20)
        },
        {
            label: `Shipping charges`,
            amount: 20
        }
    ]

    const handlePlaceOrder = async () => {
        if (!checkoutFormValid) {
            toast.error("Fill the shipping information")
            return
        };
        const { data: { user: supabaseUser } } =
            await supabase.auth.getUser(session.access_token);

        console.log("Supabase User ID:", supabaseUser?.id);
        console.log("Redux User ID:", user?.id);

        const data = {
            ...orderDetails,
            total_amount: total,
            user_id: supabaseUser.id
        };


        dispatch(addOrderDetails(data))
        const orderData = await dispatch(createOrderData({ data, accessToken: session.access_token })).unwrap()
        if (orderData) {
            const orderItems = cartData?.map((item) => ({
                order_id: orderData.id,
                product_id: item.id,
                product_name: item.title,
                product_image: item.image,
                price: item.price,
                quantity: item.quantity,
            }))
            const res = await createOrderItem(orderItems)
            if (res) {
                dispatch(handleRemoveAllCart())
                dispatch(removeOrderDetails())
                navigate('/orders', { replace: true })
                toast.success("order placed")
            }
        }

    }

    return (
        <div className='mt-6'>
            {bill?.map((item) => (
                <div key={item.label} className='grid grid-cols-2 gap-3 pb-3 border-b border-gray-300 mb-3 text-sm text-gray-700'>
                    <div>{item.label}</div>
                    <div className='text-right'>${item.amount}</div>
                </div>
            ))}
            <div className='p-3 px-5 bg-white rounded-lg grid grid-cols-2 items-center mb-3'>
                <div className='font-medium text-gray-800'>Total</div>
                <div className='text-2xl font-semibold text-right text-gray-900'>${total}</div>
            </div>
            <Button label={`Place order`} to={'/checkout'} containerClass={'w-full'} buttonAction={() => handlePlaceOrder()} />
        </div>
    )
}

export default CheckoutBill