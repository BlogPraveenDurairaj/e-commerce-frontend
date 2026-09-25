import React from 'react';
import ShowMore from '../../components/UI/ShowMore';
const ProductCart = ({ product }) => {
    const { product_image, product_name, price, quantity } = product
    return (
        <div className='bg-white flex gap-3 p-2.5 rounded-md'>
            <img src={product_image} alt={product_name} className='w-15 h-15 bg-gray-50 rounded-md shadow' />
            <div className='grow'>
                <p>{product_name}</p>
                <div className='grid grid-cols-2 mt-2' >
                    <div className='text-gray-500 text-sm '>{quantity} Items X ${price} </div>
                    <div className='text-end text-md font-semibold'>${quantity * price}</div>
                </div>
            </div>
        </div>
    )
}

const OrderItems = ({orderItems}) => {

  return (
    <div className='grid gap-2 mt-5'>
             {orderItems?.length > 2 ?
                <ShowMore
                    containerClass={'grid gap-2 sm:grid-cols-2'}
                    data={orderItems}
                    limit={2}
                    Component={ProductCart}
                />
                :<div className='grid gap-2 sm:grid-cols-2'>{orderItems?.map((item)=> <ProductCart product={item} key={item.id}/>)}</div>}
    </div>
  )
}

export default OrderItems