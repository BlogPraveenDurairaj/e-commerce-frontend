import {
  HearSvgIcon,
  MenuSvgIcon,
  ProductCartSvgIcon
} from '../../assets/svgComponent/SvgIcon1';

import SearchFilter from './SearchFilter';
import MiniHeaderSearch from './MiniHeaderSearch';

import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { logout } from '../../slice/authSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';

const SearchHeader = ({
  isPrimaryOpen,
  handleMiniFilterClick,
  isNotSearchPage = true
}) => {
  const isMobile = window.matchMedia('(max-width:991px)').matches
  const dispatch = useDispatch()
  const { cart, filter } = useSelector((state) => state.products)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [menuShow,setMenuShow] = useState(false)

  const handleMenuShow = () =>{
    setMenuShow((pre)=>!pre)
  }


  const name = user?.user_metadata?.full_name || "guest"

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('logout failed')
      return
    }
    dispatch(logout())
    toast.success("Account successfully logout")
  }

  return (
    <header className="container">
      <Link to={'/'} className="Product_header_brand_name">
        ShopEasy
      </Link>
      {isNotSearchPage && !isMobile && <div className='hidden_search_filter_mobile'>
        <SearchFilter
          isPrimaryOpen={true}
          filter={filter}
        />
      </div>}
      {!isMobile && !isNotSearchPage && <div className='web_Search_header'>
        {isPrimaryOpen ? (
          <SearchFilter
            isPrimaryOpen={isPrimaryOpen}
            filter={filter}
          />
        ) : (
          <MiniHeaderSearch
            filter={filter}
            handleMiniFilterClick={handleMiniFilterClick}
          />
        )}
      </div>}


      <div className="product_header_icon_Wrapper">
        <Link to={'/cart'} className="header_cart_icon_wrapper">
          <ProductCartSvgIcon />
          Card
          {cart.cartData.length > 0 && (
            <span className="cart_count">
              {cart.cartData.length}
            </span>
          )}
        </Link>
        <div className='header_menu' onClick={()=>handleMenuShow()}>
          <MenuSvgIcon />
          <div className='header_user_profile'>{name.slice(0, 1).toUpperCase()}</div>
         {menuShow &&  <div className='header_menu_list'>
            {isAuthenticated ? <button onClick={() => handleLogout()}>Logout</button> : <>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Signup</Link>
            </>}
            <Link>WishList</Link>
          </div>}
        </div>

      </div>

    </header>
  );
};

export default SearchHeader;