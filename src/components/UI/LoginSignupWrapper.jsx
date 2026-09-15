import React from 'react'
import leftImage from '../../assets/loginSingupImage.webp'

const LoginSignupWrapper = ({children}) => {
  return (
    <div className='login_sigUp_wrapper'>
        <div className='login_sigUp_image_wrapper'>
            <img src={leftImage} />
        </div>
        {children}
    </div>
  )
}

export default LoginSignupWrapper