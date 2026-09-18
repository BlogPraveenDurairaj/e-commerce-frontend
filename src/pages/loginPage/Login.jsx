import React, { useState } from 'react'
import { supabase } from '../../lib/supabaseClient';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuth } from '../../slice/authSlice';
import LoginSignupWrapper from '../../components/UI/LoginSignupWrapper';
import Button from '../../components/UI/Button';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((pre) => ({ ...pre, [name]: value }))
    }
    const handleForm = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        })

        if (error) {
            console.log("Error user login", error)
            toast.error(error.message || "Something went wrong")
            return
        }
        dispatch(setAuth({ user: data.user, session: data.session }))
        navigate('/')
    }

    return (
        <LoginSignupWrapper>
            <div className='max-w-[380px] mx-auto w-full text-center p-5 bg-white rounded-xl md:bg-transparent md:p-0'>
                <h1 className='text-2xl font-bold text-gray-800'>Welcome Back !</h1>
                <form onSubmit={handleForm} className='flex flex-col gap-3 mt-6'>
                    <input className='w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm' name='email' placeholder='Enter email' value={user.email} required onChange={handleInput} />
                    <input className='w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm' name='password' type='password' placeholder='Enter password' value={user.password} required onChange={handleInput} />
                    <Button label={"Login"} actionType={'submit'} />
                </form>
                <div className='text-gray-500 text-sm mt-5'>Don't have account <Link to={'/register'} className='text-emerald-600 underline font-medium hover:text-emerald-700'>Register</Link></div>
            </div>
        </LoginSignupWrapper>



    )
}

export default Login