import React from 'react'
import leftImage from '../../assets/loginSingupImage.webp'

const LoginSignupWrapper = ({children}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-[36px] h-screen items-center bg-[#f5f5f5] md:bg-transparent p-2 md:p-0'>
        <div className='hidden md:flex items-center justify-center bg-[#f5f5f5] p-5 h-full'>
            <img src={leftImage} alt="Authentication side visual" className='w-full h-full object-cover rounded-xl object-left' />
        </div>
        {children}
    </div>
  )
}

export default LoginSignupWrapper