import React, { useState } from 'react';
import Button from '../../components/UI/Button'

const CartBill = ({ cartData }) => {
  const subTotalPrice = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const [paymentStatus, setPaymentStatus] = useState(false)
  const getAmountByTotal = (total) => {
    return (percentage) => {
      return Math.floor(total * percentage / 100)
    }
  }
  const getOtherFee = getAmountByTotal(subTotalPrice)
  const total = subTotalPrice - (getOtherFee(10) - getOtherFee(20))
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
    }
  ]
  return (
    <div className='p-5 bg-[#f5f5f5] rounded-xl lg:sticky lg:top-[122px]'>
      <p className='text-xl font-semibold mb-3.5 text-gray-800'>Order Summary</p>
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
      <Button label={`Proceed to checkout - $${total} `} buttonAction={() => setPaymentStatus(!paymentStatus)} containerClass={'w-full'} />
    </div>

  )
}

export default CartBill