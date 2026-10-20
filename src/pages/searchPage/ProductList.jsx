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

  if (productList?.length == 0) return null;
  return (
    <section >
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Discover Products</h2>
      <div className='grid grid-cols-1 min-[450px]:grid-cols-2 min-[680px]:grid-cols-3 min-[992px]:grid-cols-4 xl:grid-cols-5 gap-4 my-5'>
        {productList.map((item) => {
          const { id, title, price, category, image, rating_count, rating_rate } = item
          const isCardItem = cart.cartData.some((el) => el.id == id)
          const isWishListItem = data.some((el) => el.product_id == id)

            return (
              <div className='border border-gray-200 rounded-xl text-black no-underline bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between' key={id}>
                <div>
                  <div className='relative h-[230px] bg-[#f5f5f5] rounded-xl rounded-b-none flex items-center justify-center p-5'>
                   {item.best_seller && <span className="inline-flex items-center gap-1 rounded-full bg-green-800 px-3 py-1 text-xs font-semibold text-white absolute left-2.5 top-2.5 ">
                      BEST SELLER
                    </span>}
                    <img src={image} alt={title} className='object-contain w-full h-full' />
                    <button className={cx('absolute top-2.5 right-2.5 bg-white border-0 w-7 h-7 flex items-center justify-center rounded-full p-1.5 cursor-pointer shadow-sm hover:scale-105 transition-transform', isWishListItem && '[&_svg]:fill-red-500 [&_svg]:text-red-500')} onClick={() => handleWishlist(id)} title={isWishListItem ? "Saved" : "Save"}><HearSvgIcon /></button>
                  </div>
                  <div className='p-2'>
                    <div className='bg-emerald-100 text-emerald-800 my-2 rounded-lg inline-block px-2 py-0.5 text-xs font-medium self-start'>{category}</div>
                    <div className='text-sm font-medium leading-snug mb-2 line-clamp-1 text-gray-800' title={title}>{title}</div>
                    {rating_rate && <div className='flex items-center text-xs font-semibold mb-2 text-gray-600 gap-1'><StarSvgIcon className="text-amber-400 w-3.5 h-3.5" /><div>{rating_rate} ({rating_count})</div></div>}
                    <div className='text-base font-bold leading-normal text-gray-900'>${price}</div>
                    <div className='flex flex-col gap-2 mt-3'>
                      <Button label={'View Product'} type='link' to={`/product/${id}`} style={'secondary'} />
                      <Button label={isCardItem ? "Go to cart" : 'Add to card'} Icon={ProductCartSvgIcon} IconSize={18} buttonAction={() => handleAddToCart(item, isCardItem)} />
                    </div>
                  </div>

                </div>

              </div>
            )
          
        })}
      </div>

    </section>
  )
}

export default ProductList