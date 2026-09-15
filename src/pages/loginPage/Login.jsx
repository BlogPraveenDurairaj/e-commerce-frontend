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
            <div className='login_signUp_form_wrapper'>
                <h1>Welcome Back !</h1>
                <form onSubmit={handleForm} className='login_signUp_form'>
                    <input className='common_Input' name='email' placeholder='Enter email' value={user.email} required onChange={handleInput} />
                    <input className='common_Input' name='password' type='password' placeholder='Enter password' value={user.password} required onChange={handleInput} />
                    <Button label={"Login"} actionType={'submit'} />
                </form>
                <div className='login_signUp_link'>Don't have account <Link to={'/register'}>Register</Link></div>
            </div>
        </LoginSignupWrapper>



    )
}

export default Login