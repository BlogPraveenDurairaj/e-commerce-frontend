import React, { useEffect } from 'react'
import cx from 'classnames'
import { useFieldArray, useForm } from 'react-hook-form'
import { category } from '../../../static'
import Input from '../../../components/UI/Input'
import Select from '../../../components/UI/Select'
import Button from '../../../components/UI/Button'
import { createProductData, updateProductData } from '../../../slice/productSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../../../assets/svgComponent/SvgIcon2'
import { DeleteIconSvg, PlusIconSvg } from '../../../assets/svgComponent/SvgIcon1'

const ProductForm = ({ data, type = "ADD", id }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.products)
    const { register, control, formState: { errors }, handleSubmit, watch, reset } = useForm({
        defaultValues:
            { images: [{ url: '', altText: '' }] }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'images'
    })

    const formData = watch()
    const basicInformation = [
        {
            name: 'title',
            label: 'Product Name',
            type: 'text',
            placeholder: 'Enter product name'
        },
        {
            name: 'price',
            label: 'Product price',
            type: 'number',
            placeholder: 'Enter product price'
        },
        {
            name: 'description',
            label: 'Product description',
            type: 'text',
            placeholder: 'Enter product description'
        },
        {
            name: 'availability',
            label: 'Availability',
            type: 'text',
            inputType: 'select',
            options: <>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </>,
        },
        {
            name: 'category',
            label: 'Category',
            type: 'text',
            placeholder: 'Enter product category',
            inputType: 'select',
            options: category,
        },
        {
            name: 'rating_rate',
            label: 'Product Rating',
            type: 'text',
            placeholder: 'Enter product rating'
        },
        {
            name: 'rating_count',
            label: 'Product Rating Count',
            type: 'text',
            placeholder: 'Enter product rating count'
        },
        {
            name: 'best_seller',
            label: 'Best Seller',
            type: 'text',
            inputType: 'select',
            options: <>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </>,
        },
    ]

    const handleForm = async (data) => {
        if (type == "ADD") {
            try {
                const newProduct = {
                    ...data
                }
                const res = await dispatch(createProductData(newProduct)).unwrap()
                if (res) {
                    toast.success('Product added')
                }
                reset()
                navigate('/manage-products')
            } catch (err) {
                toast.error(err.message || 'something went wrong')
            }
        } else {
            try {
                const newProduct = {
                    ...data
                }
                const res = await dispatch(updateProductData({ id, data: newProduct })).unwrap()
                if (res) {
                    toast.success('Product updated')
                }
                reset()
                navigate('/manage-products')
            } catch (err) {
                toast.error(err.message || 'something went wrong')
            }

        }

    }

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data])

    return (
        <form onSubmit={handleSubmit(handleForm)}>
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {
                        basicInformation?.map((item) => {
                            return (
                                item.inputType == "select" ?
                                    <Select
                                        label={item.label}
                                        id={item.label}
                                        key={item.label}
                                        error={errors[item.name]?.message}
                                        {...register(item.name, { required: `${item.name} is required` })}
                                        options={item.options}
                                    />
                                    :
                                    <Input
                                        label={item.label}
                                        id={item.label}
                                        placeholder={item.placeholder}
                                        key={item.label}
                                        error={errors[item.name]?.message}
                                        {...register(item.name, { required: `${item.name} is required` })}
                                    />

                            )
                        })
                    }
                </div>
            </div>
            <div className='bg-white rounded-2xl p-5 mt-5 border border-gray-200'>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Product Images</h2>
                <div className='grid gap-4'>
                    {fields?.map((item, index) => {
                        return (
                            <div className='grid grid-cols-2 gap-5 items-start border border-gray-200 p-2 rounded-2xl' key={item.id}>
                                <div className={cx('bg-gray-50 rounded-2xl flex justify-center items-center  h-[200px]')}>
                                    {formData?.images[index].url ? <img src={formData?.images[index].url} alt={formData?.images[index].altText} className='object-contain h-full' /> : <div className='font-bold'>Upload Image</div>}
                                </div>
                                <div className='grid gap-4'>
                                    <Input
                                        label={`Image`}
                                        id={'Image'}
                                        placeholder={'Image url'}
                                        key={'Image'}
                                        error={errors[`images.${index}.url`]?.message}
                                        {...register(`images.${index}.url`, { required: `${'image'} is required` })}
                                    />

                                    <Input
                                        label={"Alt text"}
                                        id={'Alt text'}
                                        placeholder={'Enter Alt text'}
                                        key={'Alt text'}
                                        error={errors[`images.${index}.altText`]?.message}
                                        {...register(`images.${index}.altText`, { required: `${'Alt text'} is required` })}
                                    />
                                    {!(index == 0) && 
                                     <Button containerClass={'ms-auto'} buttonAction={() => remove(index)} label={'Remove'} Icon={DeleteIconSvg} style={'gray'} />}

                                </div>

                            </div>
                        )
                    })}


                </div>
                <div className='flex justify-end mt-3'>
                    <Button buttonAction={() => append({ url: '', altText: '' })} Icon={PlusIconSvg} label={'Add Image'} style={'gray'} />
                </div>
            </div>
            <div className='flex justify-end mt-5'>
                <Button label={type == "ADD" ? 'Add Product' : "Update Product"} style={'black'} actionType='submit' Icon={loading?.addLoading && Spinner} />
            </div>
        </form>
    )
}

export default ProductForm