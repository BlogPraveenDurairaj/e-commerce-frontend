import React from 'react'
import Input from '../../components/UI/Input'
import { useForm } from 'react-hook-form'
import Button from '../../components/UI/Button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderDetails, editOrderDetails } from '../../slice/orderSlice';
import toast from 'react-hot-toast';
const checkoutFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, "Name to long"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
    address: z.string().min(10, "Address must be at least 10 characters"),
    city: z.string().min(2, "City is required"),
    PIN_Code: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code")
})

const CheckoutForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(checkoutFormSchema), mode: 'onChange' });
    const { checkoutFormValid } = useSelector((state) => state.orders)

    const shippingInputs = [
        {
            label: "Name",
            name: 'name',
            placeholder: 'Enter your name'
        },
        {
            label: "Phone",
            name: 'phone',
            placeholder: 'Enter your phone no'
        },
        {
            label: "Address",
            name: 'address',
            placeholder: 'Enter your address',
            type: "textarea"
        },
        {
            label: "City",
            name: 'city',
            placeholder: 'Enter your city'
        },
        {
            label: "PIN Code",
            name: 'PIN_Code',
            placeholder: 'Enter your PIN code'
        },
    ]

    const handleCheckoutForm = (data) => {
        if (checkoutFormValid) {
            dispatch(editOrderDetails())
        } else {
            dispatch(addOrderDetails(
                {
                    shipping_name: data?.name,
                    shipping_phone: data?.phone,
                    shipping_address: data?.address,
                    shipping_city: data?.city,
                    shipping_pincode: data?.PIN_Code,
                    payment_method: "COD"
                }
            ))
            toast.success("Address added")
        }

    }
    return (
        <div className='bg-gray-50 p-5 rounded-2xl'>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>Shipping From</h2>
            <form onSubmit={handleSubmit(handleCheckoutForm)} >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {shippingInputs?.map((item) => {
                        return (
                            <Input disabled={checkoutFormValid} label={item.label} id={item.label} placeholder={item.placeholder} key={item.label} error={errors[item.name]?.message} {...register(item.name, { required: `${item.name} is required` })} />
                        )
                    })}
                </div>
                <div className='flex justify-end'>
                    <Button label={checkoutFormValid ? 'Edit' : 'Add'} style={'black'} actionType={'submit'} />
                </div>
            </form>

        </div>
    )
}

export default CheckoutForm