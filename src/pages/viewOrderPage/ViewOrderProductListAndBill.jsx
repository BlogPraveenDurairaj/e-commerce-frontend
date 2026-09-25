import React from 'react'
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

const ViewOrderProductListAndBill = ({ orderItemData }) => {
    const subTotalPrice = orderItemData?.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const getAmountByTotal = (total) => {
        return (percentage) => {
            return Math.floor(total * percentage / 100)
        }
    }
    const getOtherFee = getAmountByTotal(subTotalPrice)
    const total = subTotalPrice + getOtherFee(10) + getOtherFee(20) + 20
    const bill = [
        {
            label: `Items subtotal ${orderItemData?.length} items`,
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
    return (
        <div className="bg-[#f9fafb] border border-gray-100 rounded-2xl p-4 md:p-6">
            <h2 className='text-lg font-semibold text-gray-900 mb-5'>Item in this order ({orderItemData?.length})</h2>
            <div className='grid gap-3'>
                {orderItemData?.map((item) => <ProductCart key={item.id} product={item} />)}
            </div>
            <div className='p-3 mt-2'>
                {bill?.map((item) => (
                    <div key={item.label} className='grid grid-cols-2 gap-3 pb-3 border-b border-gray-300 mb-3 text-sm text-gray-700'>
                        <div>{item.label}</div>
                        <div className='text-right'>${item.amount}</div>
                    </div>
                ))}
                <div className='p-3 px-5 bg-white rounded-lg grid grid-cols-2 items-center'>
                    <div className='font-medium text-gray-800'>Total</div>
                    <div className='text-2xl font-semibold text-right text-green-600'>${total}</div>
                </div>
            </div>


        </div>
    )
}

export default ViewOrderProductListAndBill