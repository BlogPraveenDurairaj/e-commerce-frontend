import React from 'react'
import { useNavigate } from 'react-router-dom'
import { handleCartAdd } from '../../slice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCartSvgIcon, StarSvgIcon } from '../../assets/svgComponent/SvgIcon1'
import Button from '../../components/UI/Button'

const PreviewInfo = ({ data, isCardItem }) => {
    const { category, description, image, price, title, rating_count, rating_rate } = data
    const { isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddToCart = (item) => {
        if (isAuthenticated) {
            if (isCardItem) {
                navigate('/cart')
            } else {
                dispatch(handleCartAdd({ ...item, quantity: 1 }))
            }
        } else {
            navigate('/register')
        }
    }

    return (
        <div className='container-custom'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-[#f5f5f5] rounded-2xl p-5 flex items-center justify-center h-[250px] md:h-[400px]'>
                    <img src={image} alt={title} className='w-full h-full object-contain' />
                </div>
                <div>
                    <p className='px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full inline-block mb-1.5'>{category}</p>
                    <p className='text-2xl md:text-3xl font-semibold mb-3 text-gray-800'>{title}</p>
                    {rating_rate && <div className='flex items-center text-base font-medium mb-2 gap-1.5 text-gray-700'><StarSvgIcon className="text-amber-400 w-4 h-4" /><div>{rating_rate} ({rating_count})</div></div>}
                    <p className='text-2xl md:text-3xl font-semibold mb-3 text-gray-900'>${price}</p>
                    <p className='text-gray-500 text-base mb-6 leading-relaxed'>{description}</p>
                    <Button
                        label={isCardItem ? "Go to card" : `Add to card - $${price}`}
                        Icon={ProductCartSvgIcon}
                        IconSize={20}
                        buttonAction={() => handleAddToCart(data)}
                    />
                </div>
            </div>


        </div>
    )
}

export default PreviewInfo