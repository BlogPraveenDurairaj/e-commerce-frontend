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
            <div className='container'>
                {cart?.cartData?.length > 0 ? <div className='cart_grid_wrapper'>
                    <CartList cartData={cart?.cartData} />
                    <CartBill cartData={cart?.cartData} />
                </div> : <NoCard />
                }
            </div>
        </UserLayout>
    )
}

export default CartContainer