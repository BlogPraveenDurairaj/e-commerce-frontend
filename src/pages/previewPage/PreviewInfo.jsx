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
        <div className='container'>
            <div className='preview_wrapper'>
                <div className='preview_image_wrapper'>
                    <img src={image} alt={title} width={200} height={100} />
                </div>
                <div>
                    <p className='preview_category'>{category}</p>
                    <p className='preview_title'>{title}</p>
                    {rating_rate && <div className='preview_rating'><StarSvgIcon /><div>{rating_rate} ({rating_count})</div></div>}
                    <p className='preview_price'>${price}</p>
                    <p className='preview_description'>{description}</p>
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