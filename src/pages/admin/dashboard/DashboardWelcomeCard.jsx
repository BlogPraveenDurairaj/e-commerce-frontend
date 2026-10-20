import React, { useEffect, useState } from 'react'
import { platformCurrency } from '../../../static'
import { BackArrow } from '../../../assets/svgComponent/SvgIcon2';
import cx from 'classnames';
import Skeleton from '../../../components/UI/Skeleton';

const DashboardWelcomeCard = ({ orderItemData,loading }) => {
    const [show, setShow] = useState(false)
    const bestSellingProducts = Object.values(
        orderItemData?.reduce((acc, item) => {
            const newProduct = {
                price: item?.price,
                image: item?.product_image,
                name: item.product_name
            }
            if (!acc[item.product_id]) {
                acc[item.product_id] = { ...newProduct, count: 1 }
            } else {
                acc[item.product_id].count++
            }
            return acc
        }, {})
    ).sort((a, b) => b.count - a.count).slice(0, show ? 10 : 3)
    return (
        <div className='rounded-2xl border border-gray-200 grid grid-cols-1 lg:grid-cols-[1fr_2fr] bg-green-50 '>
            <div className='p-5'>
                <h1 className='text-2xl font-bold text-gray-800 mb-2'>Welcome back, <span className='text-green-600'>Admin 👋</span></h1>
                <p className='text-sm'>Here's whats happening with your store today</p>
            </div>
            <div className=' bg-green-600 p-0.5 rounded-xl '>
                <div className='flex justify-between items-center flex-wrap mb-1'>
                    <p className='text-white p-2 text-md font-bold mb-1'>🏆 Top {show ? 10 : 3} Bestselling Products</p>
                    <button className=' bg-black text-white rounded-4xl shadow-md p-2 px-2 text-sm cursor-pointer inline-flex gap-1 ' onClick={()=>setShow((pre)=>!pre)}>{show ? "Show less" : "Show more"} <span className={cx('bg-white text-black rounded-3xl transition-all duration-300 ease-in-out',show ? "rotate-90":'rotate-270')}><BackArrow className={'w-5 h-5'} /></span></button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 bg-gray-100 rounded-xl p-1'>
                    {loading && [1,2,3].map((item)=><Skeleton height={70} bgColor={'white'} key={item}/>) }
                    {!loading && bestSellingProducts?.map((item, index) => {
                        return (
                            <div className='bg-white rounded-xl flex gap-3 items-center p-1' key={item.name}>
                                <div className='bg-gray-100 rounded-md'>
                                    <img className='w-15 h-15' src={item.image} alt={item.name} />
                                </div>
                                <div>
                                    <p className='text-xs font-semibold mb-0.5'>{item.name}</p>
                                    <p className='text-sm font-bold text-green-600'>{platformCurrency}{item.price}</p>
                                    <span class="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-600">#{index + 1} Bestseller</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default DashboardWelcomeCard