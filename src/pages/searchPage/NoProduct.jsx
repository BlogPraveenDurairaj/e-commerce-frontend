import React from 'react';
import noProductsImage from '../../assets/No-product-found.webp';

const NoProduct = () => {
    return (
        <div className="min-h-[350px] flex flex-col items-center justify-center text-center py-10 px-5">
            
             <img src={noProductsImage} width={300} height={300} alt="No Products Found" className='h-auto w-[300px] object-contain mb-4' />

            <h3 className='m-0 mb-2 text-xl font-semibold text-gray-800'>No products found</h3>

            <p className='m-0 mb-5 text-gray-500 text-sm'>
                We couldn't find any products matching your search.
            </p>
           
            <button className='border-0 bg-black text-white px-4.5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors text-sm font-medium' onClick={() => window.location.reload()}>
                Clear filters
            </button>
        </div>
    )
}

export default NoProduct