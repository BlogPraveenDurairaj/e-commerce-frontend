import React, { useEffect, useState } from 'react'
import LoginSignupWrapper from '../../../components/UI/LoginSignupWrapper';
import adminLoginSideImage from '../../../assets/admin-login.webp'
import { useForm } from 'react-hook-form';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { supabase } from '../../../lib/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData, setAdminAuth } from '../../../slice/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.admin)

    const handleForm = async ({ email, password }) => {

        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            const adminAccess = await dispatch(getRoleData({ user_id: data.user.id, access_token: data.session.access_token })).unwrap()
            if (adminAccess) {
                if (adminAccess?.role == 'admin') {
                    dispatch(setAdminAuth(data))
                    navigate('/dashboard')
                }
            }
            if (error) {
                toast.error("something went wrong")
            }
        } catch (err) {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.log('logout failed')
                return
            }
            toast.error("you have not access")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated])

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