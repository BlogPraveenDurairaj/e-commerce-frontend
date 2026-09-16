import React, { useEffect } from 'react'
import { HearSvgIcon, ProductCartSvgIcon, StarSvgIcon } from '../../assets/svgComponent/SvgIcon1'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button'
import { useDispatch, useSelector } from 'react-redux';
import { handleCartAdd } from '../../slice/productSlice';
import { addWishListItem, deleteWishlistItem, getWishlistData } from '../../slice/wishlistSlice';
import cx from 'classnames'

const ProductList = ({ productList }) => {
  const { cart } = useSelector((state) => state.products)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { data } = useSelector((state) => state.wishlist)
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
      navigate('/login')
    }
  }
  const handleWishlist = (id) => {
    if (isAuthenticated) {
      const isExistingProduct = data.find((item) => item.product_id == id)
      if (isExistingProduct) {
        dispatch(deleteWishlistItem(isExistingProduct.id))
      } else {
        dispatch(addWishListItem({ userId: user.id, productId: id }))
      }
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    if (user) {
      dispatch(getWishlistData(user.id))
    }
  }, [user, dispatch])

  if (productList?.length == 0) return
  return (
    <section className='container'>
      <h2>Discover Products</h2>
      <div className='product_list_grid'>
        {productList.map((item) => {
          const { id, title, price, category, image, rating_count, rating_rate } = item
          const isCardItem = cart.cartData.some((el) => el.id == id)
          const isWishListItem = data.some((el) => el.product_id == id)

          return (
            <div className='product_card' key={id}>
              <div className='product_card_image_wrapper'>
                <img src={image} alt={title} />
                <button className={cx('wishList_button', isWishListItem && 'fill_wishlist')} onClick={() => handleWishlist(id)}><HearSvgIcon /></button>
              </div>
              <div className='product_category'>{category}</div>
              <div className='product_title' title={title}>{title}</div>
              {rating_rate && <div className='product_rating'><StarSvgIcon /><div>{rating_rate} ({rating_count})</div></div>}
              <div className='product_price'>${price}</div>
              <div className='product_cart_buttons_Wrapper'>
                <Button label={'View Product'} type='link' to={`/product/${id}`} style={'secondary'} />
                <Button label={isCardItem ? "Go to cart" : 'Add to card'} Icon={ProductCartSvgIcon} IconSize={18} buttonAction={() => handleAddToCart(item, isCardItem)} />
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}

export default ProductList