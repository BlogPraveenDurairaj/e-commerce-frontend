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
    <div className='cart_bill_wrapper'>
      <p className='cart_bill_title'>Order Summary</p>
      {bill?.map((item) => <div key={item.label} className='cart_bill_item'><div>{item.label}</div><div>${item.amount}</div></div>)}
      <div className='cart_bill_total'><div>Total</div> <div>${total}</div></div>
      <Button label={`Proceed to checkout - $${total} `} buttonAction={() => setPaymentStatus(!paymentStatus)} containerClass={'cart_checkout_button'} />
    </div>

  )
}

export default CartBill