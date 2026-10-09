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

const ProductForm = ({ data, type = "ADD", id }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.products)
    const { register, control, formState: { errors }, handleSubmit, watch, reset } = useForm({
        defaultValues:
            { images: [{ imageUrl: '', imageAltText: '' }] }
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
    ]

    const handleForm = async (data) => {
        if (type == "ADD") {
            try {
                const newProduct = {
                    ...data,
                    rating_rate: '0',
                    rating_count: '0'
                }
                const res = await dispatch(createProductData(newProduct)).unwrap()
                if (res) {
                    toast.success('Product added')
                }
                reset()
                navigate('/manage-products')
            } catch (err) {
                toast.error(err.message || 'something went wrong')
                console.log(err)
            }
        } else {
            try {
                const newProduct = {
                    ...data,
                    rating_rate: '0',
                    rating_count: '0'
                }
                const res = await dispatch(updateProductData({ id, data: newProduct })).unwrap()
                if (res) {
                    toast.success('Product updated')
                }
                reset()
                navigate('/manage-products')
            } catch (err) {
                toast.error(err.message || 'something went wrong')
                console.log(err)
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
                <div className='grid grid-cols-2 gap-5 items-start'>
                    <div className={cx('bg-gray-50 rounded-2xl min-h-[200px] flex justify-center items-center')}>
                        {formData?.image ? <img src={formData?.image} alt={formData?.altText} /> : <div className='font-bold'>Upload Image</div>}
                    </div>
                    <div className='grid gap-4'>
                        <Input
                            label={"Image"}
                            id={'Image'}
                            placeholder={'Image url'}
                            key={'Image'}
                            error={errors["image"]?.message}
                            {...register('image', { required: `${'image'} is required` })}
                        />
                        <Input
                            label={"Alt text"}
                            id={'Alt text'}
                            placeholder={'Enter Alt text'}
                            key={'Alt text'}
                            error={errors["altText"]?.message}
                            {...register('altText', { required: `${'Alt text'} is required` })}
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-end mt-5'>
                <Button label={type == "ADD" ? 'Add Product' : "Update Product"} style={'black'} actionType='submit' Icon={loading?.addLoading && Spinner} />
            </div>
        </form>
    )
}

export default ProductForm