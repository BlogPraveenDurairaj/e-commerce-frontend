import React from 'react';
import ShowMore from '../../components/UI/ShowMore';

const ProductCart = ({ product }) => {
    const { image, title, price, quantity } = product
    return (
        <div className='bg-white flex gap-3 p-2.5 rounded-md'>
            <img src={image} alt={title} className='w-15 h-15 bg-gray-50 rounded-md shadow' />
            <div className='grow'>
                <p>{title}</p>
                <div className='grid grid-cols-2 mt-2' >
                    <div className='text-gray-500 text-sm '>{quantity} Items X ${price} </div>
                    <div className='text-end text-md font-semibold'>${quantity * price}</div>
                </div>
            </div>
        </div>
    )
}

const CheckoutProductList = ({ productData }) => {
    return (
        <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>Order summary</h2>
            {productData?.length > 2 ?
                <ShowMore
                    containerClass={'grid gap-2'}
                    data={productData}
                    limit={2}
                    Component={ProductCart}
                />
                :<div className='grid gap-2'>{productData?.map((item)=> <ProductCart product={item}/>)}</div>
            }
        </div>
    )
}

export default CheckoutProductList