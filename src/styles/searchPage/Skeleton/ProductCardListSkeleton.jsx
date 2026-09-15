import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton';
import './skeleton.css';

const ProductCardListSkeleton = () => {
    return (
        <div className="product_list_grid container">
            {Array.from({ length: 5 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}

export default ProductCardListSkeleton