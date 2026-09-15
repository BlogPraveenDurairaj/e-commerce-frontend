import React from 'react'
import { HearSvgIcon, ProductCartSvgIcon, StarSvgIcon } from '../../assets/svgComponent/SvgIcon1'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button'
import { useDispatch, useSelector } from 'react-redux';
import { handleCartAdd } from '../../slice/productSlice';

const ProductList = ({ productList }) => {
  const { cart } = useSelector((state) => state.products)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleAddToCart = (item, isCardItem) => {
    if (isAuthenticated) {
      if (isCardItem) {
        navigate('/cart')
      } else {
        dispatch(handleCartAdd({ ...item, quantity: 1 }))
      }
    }
    else {
      navigate('/register')
    }
  }


  if (productList?.length == 0) return
  return (
    <section className='container'>
      <h2>Discover Products</h2>
      <div className='product_list_grid'>
        {productList.map((item) => {
          const { id, title, price, category, image, rating } = item
          const isCardItem = cart.cartData.some((el) => el.id == id)
          return (
            <div className='product_card' key={id}>
              <div className='product_card_image_wrapper'>
                <img src={image} alt={title} />
                <button className='wishList_button'> <HearSvgIcon /></button>

              </div>
              <div className='product_category'>{category}</div>
              <div className='product_title' title={title}>{title}</div>
              {rating?.rate && <div className='product_rating'><StarSvgIcon /><div>{rating.rate} ({rating.count})</div></div>}
              <div className='product_price'>${price}</div>
              <div className='product_cart_buttons_Wrapper'>
                <Button label={'View Product'} type='link' to={`/product/${id}`} style={'secondary'} />
                <Button label={isCardItem ? "go to cart" : 'Add to card'} Icon={ProductCartSvgIcon} IconSize={18} buttonAction={() => handleAddToCart(item, isCardItem)} />
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}

export default ProductList