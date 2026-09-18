import React from 'react';
import noCartImage from '../../assets/No-cart-item.webp'
import { useNavigate } from 'react-router-dom';

const NoCard = () => {
    const navigate = useNavigate()
  return (
     <div className="flex flex-col items-center justify-center text-center py-12 px-4">
                <img src={noCartImage} width={300} height={300} alt="Empty Cart" className='max-w-full h-auto object-contain mb-4' />
                <h3 className='text-xl font-semibold mb-3 text-gray-800'>Cart is empty</h3>
                <button className='bg-theme-primary text-white font-medium px-6 py-2.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity' onClick={() => navigate('/')}>
                    Go to shopping
                </button>
     </div>
  )
}

export default NoCard