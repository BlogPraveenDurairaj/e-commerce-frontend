import React from 'react';
import noCartImage from '../../assets/No-cart-item.webp'
import { useNavigate } from 'react-router-dom';

const NoCard = () => {
    const navigate = useNavigate()
  return (
     <div className="empty-product">
               
                <img src={noCartImage} width={300} height={300}/>
   
               <h3>Cart is empty</h3>
               <button onClick={() => navigate('/')}>
                   Go to shopping
               </button>
           </div>
  )
}

export default NoCard