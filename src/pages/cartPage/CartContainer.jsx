import React, { useEffect } from 'react';
import CartList from './CartList';
import { useSelector } from 'react-redux';
import CartBill from './CartBill';
import UserLayout from '../../components/layout/UserLayout';
import NoCard from './NoCard';
import { useNavigate } from 'react-router-dom';

const CartContainer = () => {
    const { cart } = useSelector((state) => state.products);
    return (
        <UserLayout>
            <div className='container-custom'>
                {cart?.cartData?.length > 0 ? <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start'>
                    <CartList cartData={cart?.cartData} />
                    <CartBill cartData={cart?.cartData} />
                </div> : <NoCard />
                }
            </div>
        </UserLayout>
    )
}

export default CartContainer