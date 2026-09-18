import {
  HearSvgIcon,
  MenuSvgIcon,
  ProductCartSvgIcon
} from '../../assets/svgComponent/SvgIcon1';

import SearchFilter from './SearchFilter';
import MiniHeaderSearch from './MiniHeaderSearch';

import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()

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
    window.location.href = '/'
    toast.success("Account successfully logout")
  }

  return (
    <header className="flex justify-between items-center px-4 !py-2 container-custom">
      <Link to={'/'} className="bg-theme-primary !bg-clip-text text-transparent text-xl font-bold no-underline">
        ShopEasy
      </Link>
      {isNotSearchPage && !isMobile && <div className='hidden lg:block'>
        <SearchFilter
          isPrimaryOpen={true}
          filter={filter}
        />
      </div>}
      {!isMobile && !isNotSearchPage && <div className='hidden lg:block'>
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


      <div className="flex gap-2.5 items-center">
        <Link to={'/cart'} className="relative bg-white px-3 py-2 rounded-l-2xl rounded-r-md flex items-center gap-1.5 text-black no-underline text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <ProductCartSvgIcon />
          <span>Card</span>
          {cart.cartData.length  > 0 && isAuthenticated &&  (
            <span className="bg-theme-primary w-4 h-4 flex items-center justify-center rounded-full text-white text-[10px] font-bold">
              {cart.cartData.length}
            </span>
          )}
        </Link>
        <div className='flex items-center gap-1.5 bg-white rounded-l-md rounded-r-2xl p-1 pl-2 relative cursor-pointer hover:bg-gray-50 transition-colors shadow-sm' onClick={()=>handleMenuShow()}>
          <MenuSvgIcon />
          <div className='h-8 w-8 bg-[#f5f5f5] flex items-center justify-center rounded-full font-semibold text-gray-700 text-xs'>{name.slice(0, 1).toUpperCase()}</div>
         {menuShow &&  <div className='absolute top-[calc(100%+10px)] p-1 bg-white flex flex-col rounded-xl right-0 w-36 gap-1 shadow-lg z-20 border border-gray-100'>
            {isAuthenticated ? <button className='text-gray-800 px-3 py-1.5 bg-white text-left hover:bg-gray-100 font-medium rounded-lg text-sm border-0 cursor-pointer' onClick={() => handleLogout()}>Logout</button> : <>
              <Link to={'/login'} className='text-gray-800 px-3 py-1.5 bg-white text-left hover:bg-gray-100 font-medium rounded-lg text-sm no-underline block'>Login</Link>
              <Link to={'/register'} className='text-gray-800 px-3 py-1.5 bg-white text-left hover:bg-gray-100 font-medium rounded-lg text-sm no-underline block'>Signup</Link>
            </>}
            <Link to={'/wishlist'} className='text-gray-800 px-3 py-1.5 bg-white text-left hover:bg-gray-100 font-medium rounded-lg text-sm no-underline block'>WishList</Link>
          </div>}
        </div>

      </div>

    </header>
  );
};

export default SearchHeader;