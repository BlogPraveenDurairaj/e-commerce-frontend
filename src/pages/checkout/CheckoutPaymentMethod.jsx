import React from 'react'

const CheckoutPaymentMethod = () => {
  return (
    <div className='bg-gray-50 p-5 rounded-2xl'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Payment Method</h2>
      <div className='bg-[#00f13a1a] relative max-w-[200px] border border-green-600 rounded-[10px] p-3.5 text-sm font-semibold' >
        COD (cash on delivery)
        <input className='absolute inset-0 invisible ' type='radio' checked={true} />
      </div>
    </div>
  )
}

export default CheckoutPaymentMethod