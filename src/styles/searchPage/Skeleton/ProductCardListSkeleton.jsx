import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductCardListSkeleton = ({length=5}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: length }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}

export default ProductCardListSkeleton