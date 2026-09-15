import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCartAdd, handleCartDelete, handleCartMinus, handleRemoveAllCart } from '../../slice/productSlice'
import { DeleteIconSvg, MinusIconSvg, PlusIconSvg } from '../../assets/svgComponent/SvgIcon1';

const CartList = ({ cartData }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartData))
  }, [cartData])

  return (
    <div>
      <div className='cart_header_wrapper'>
        <h1>Your Cart <span>({cartData?.length} Items)</span></h1>
        <button className='cart_clear_button' onClick={()=>dispatch(handleRemoveAllCart())}>Clear All</button>
      </div>
      <div className='cart_Items_grid'>
        {
          cartData.map((item) => {
            const { id, title, price, image, quantity, category } = item
            return (
              <div className='cart_Item_wrapper' key={id}>
                <div className='cart_image_Wrapper'>
                  <img src={image} />
                </div>
                <div className='cart_content'>
                  <div className='cart_item_top_info_Wrapper'>
                    <div>
                      <p className='cart_category'>{category}</p>
                      <p className='cart_title'>{title}</p>
                    </div>
                    <div className='cart_price_Wrapper'>
                      <p className='cart_price'>${quantity * price}</p>
                      <p className='cart_each_price'>(${price} each)</p>
                    </div>
                  </div>
                  <div className='cart_bottom_button_wrapper'>
                    <div className='cart_increment_decrement_btn'>
                      <button disabled={quantity == 1} onClick={() => dispatch(handleCartMinus(item))}><MinusIconSvg /></button>
                      {quantity}
                      <button onClick={() => dispatch(handleCartAdd({ id }))}><PlusIconSvg /></button>
                    </div>
                    <button className='cart_delete_btn' onClick={() => dispatch(handleCartDelete(id))}><DeleteIconSvg /><span>Remove</span></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CartList