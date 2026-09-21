import React, { useState } from 'react'
import UserLayout from '../../components/layout/UserLayout'
import CheckoutForm from './CheckoutForm'
import CheckoutPaymentMethod from './CheckoutPaymentMethod'
import CheckoutProductList from './CheckoutProductList'
import { useSelector } from 'react-redux'
import CheckoutBill from './CheckoutBill'


const CheckoutContainer = () => {
 const { cart } = useSelector((state) => state.products);
    return (
        <UserLayout>
            <div className='container-custom'>
                <h1 className='text-2xl font-bold text-gray-800 mb-4'>Checkout</h1>
                <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6'>
                    <div className='flex flex-col gap-6'>
                        <CheckoutForm />
                        <CheckoutPaymentMethod />
                    </div>
                    <div className='bg-gray-50 p-5 rounded-2xl'>
                        <CheckoutProductList productData ={cart?.cartData} />
                        <CheckoutBill cartData={cart?.cartData}/>
                    </div>

                </div>

            </div>
        </UserLayout>

    )
}

export default CheckoutContainer