import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import LoginSignupWrapper from '../../components/UI/LoginSignupWrapper';
import Button from '../../components/UI/Button';
import toast from 'react-hot-toast';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((pre) => ({ ...pre, [name]: value }))
    }

    const handleForm = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    full_name: user.name
                }
            }
        })

        if (error) {
            
            console.log("Error user not created", error)
            toast.error(error.message)
            return
        }
        navigate('/login')
    }

    return (
        <LoginSignupWrapper>
            <div className='max-w-[380px] mx-auto w-full text-center p-5 bg-white rounded-xl md:bg-transparent md:p-0'>
                 <h1 className='text-2xl font-bold text-gray-800'>Register</h1>
                <form onSubmit={handleForm} className='flex flex-col gap-3 mt-6'>
                    <input className='w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm' name='name' placeholder='Enter name' value={user.name} onChange={handleInput} />
                    <input className='w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm' name='email' placeholder='Enter email' value={user.email} required onChange={handleInput} />
                    <input className='w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm' name='password' type='password' placeholder='Enter password' value={user.password} required onChange={handleInput} />
                    <Button label={"Register"} actionType={'submit'} />
                </form>
                <div className='text-gray-500 text-sm mt-5'>Already have an account <Link to={'/login'} className='text-emerald-600 underline font-medium hover:text-emerald-700'>Login</Link></div>
            </div>
        </LoginSignupWrapper >
    )
}

export default Register