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
            <div className='login_signUp_form_wrapper'>
                 <h1>Register</h1>
                <form onSubmit={handleForm}>
                    <input className='common_Input' name='name' placeholder='Enter name' value={user.name} onChange={handleInput} />
                    <input className='common_Input' name='email' placeholder='Enter email' value={user.email} required onChange={handleInput} />
                    <input className='common_Input' name='password' type='password' placeholder='Enter password' value={user.password} required onChange={handleInput} />
                    <Button label={"Register"} actionType={'submit'} />
                </form>
                <div className='login_signUp_link'>Already have an account <Link to={'/login'}>Login</Link></div>
            </div>
        </LoginSignupWrapper >
    )
}

export default Register