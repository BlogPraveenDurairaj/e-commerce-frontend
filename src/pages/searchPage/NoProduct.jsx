import React from 'react';
import noProductsImage from '../../assets/No-product-found.webp';

const NoProduct = () => {
    return (
        <div className="empty-product">
            
             <img src={noProductsImage} width={300} height={300}/>

            <h3>No products found</h3>

            <p>
                We couldn't find any products matching your search.
            </p>
           
            <button onClick={() => window.location.reload()}>
                Clear filters
            </button>
        </div>
    )
}

export default NoProduct