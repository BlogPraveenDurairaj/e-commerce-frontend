import React, { useState } from 'react'
import LoginSignupWrapper from '../../../components/UI/LoginSignupWrapper';
import adminLoginSideImage from '../../../assets/admin-login.webp'
import { useForm } from 'react-hook-form';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { supabase } from '../../../lib/supabaseClient';
import { useDispatch } from 'react-redux';
import { setAdminAuth } from '../../../slice/adminAuthSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleForm = async ({ email, password }) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        setLoading(false)
        if (error) {
            console.log(error, "Something went wrong")
            return
        }
        dispatch(setAdminAuth(data))
        navigate('/')
    }

    return (
        <LoginSignupWrapper panelImage={adminLoginSideImage}>
            <div className='max-w-[380px] mx-auto w-full text-center p-5 bg-white rounded-xl md:bg-transparent md:p-0'>
                <h1 className='text-2xl font-bold text-gray-800'>Admin Login</h1>
                <form onSubmit={handleSubmit(handleForm)} className='grid gap-3 mt-6'>
                    <Input label={"Email"} name={'email'} error={errors["email"]?.message} {...register("email", { required: '*Email is required' })} placeholder='Enter email' />
                    <Input label={'PassWord'} name={'password'} error={errors["password"]?.message} placeholder='Enter password' {...register('password', { required: '*Password is required' })} />
                    <Button label={`Submit ${loading && "loading"}`} actionType={'submit'} />
                </form>
            </div>
        </LoginSignupWrapper>
    )
}

export default AdminLogin