import React from 'react';
import { ProductIcon, OrderIcon, BackArrow, RevenueIcon } from '../../../assets/svgComponent/SvgIcon2';
import { Link } from 'react-router-dom';
import { platformCurrency } from '../../../static';
import Skeleton from '../../../components/UI/Skeleton';
import cx from 'classnames';
const StatesCard = ({ item,loading }) => {
    const Icon = item.Icon
    return (
        <Link to={item.navigation} className='flex gap-4 justify-between items-start bg-white rounded-2xl p-4 border border-gray-200'>
            <div className='flex gap-4 grow'>
                <div style={{ background: item.iconBg }} className='w-10 h-10 flex items-center justify-center rounded-md  shadow shrink-0'>
                    <Icon className='w-6 h-6 text-white' />
                </div>
                <div className='grow'>
                    <p className='text-sm font-bold mb-0.5'>{item.title}</p>
                    <p className='text-xs mb-2 font-medium'>{item.des}</p>
                  {loading ? <Skeleton height={32} width={100} /> : <p className='text-2xl font-bold'>{item.Total}</p> }  
                    <div className='flex gap-3 mt-2 text-xs font-medium w-full flex-wrap'>
                        {item?.miniCart?.map((el) => {
                            return (
                                <div className={cx('flex items-center gap-1 flex-col  rounded-md p-2 grow', el.bg)}>
                                    <span>{el.label}</span>
                                    {loading ? <Skeleton height={16} width={100} bgColor='bg-gray-300' /> : <span className={cx('font-bold', el.text)}>{el.value}</span>}
                                    
                                </div>
                            )
                        })}
                    </div>

                    {item?.Children}
                </div>
            </div>
            <div className='rotate-180  bg-white rounded-md shadow p-1 text-sm border border-gray-100' style={{ color: item.iconBg }} ><BackArrow className={'w-5 h-5'} /></div>
        </Link>
    )
}

const DashboardStates = ({ ordersProductsData, loading }) => {
    const activeProducts = ordersProductsData?.totalProducts?.reduce((acc, item) => {
        if (item?.availability) acc++
        return acc
    }, 0)
    const deliveredProducts = ordersProductsData?.totalOrders?.reduce((acc, item) => {
        if (item.status === "Delivered") acc++
        return acc
    }, 0)
    const TotalRevenue = ordersProductsData?.totalOrders?.reduce((acc, item) => {
        return acc + item.total_amount
    }, 0)
    const deliveredRevenue = ordersProductsData?.totalOrders?.reduce((acc, item) => {
        if (item.status === "Delivered") return acc + item.total_amount
        return acc
    }, 0)

    const statesData = [
        {
            title: 'Revenue',
            des: 'Total Revenue',
            Total: `${platformCurrency} ${TotalRevenue}`,
            navigation: '/manage-products',
            Icon: RevenueIcon,
            iconBg: '#53bd92',
            chartImage: '',
            miniCart: [
                {
                    label: 'Delivered',
                    value: `${platformCurrency}${deliveredRevenue}`,
                    bg: 'bg-green-100',
                    text: 'text-green-600'
                },
                {
                    label: 'Upcoming',
                    value: `${platformCurrency}${TotalRevenue - deliveredRevenue}`,
                    bg: 'bg-blue-100',
                    text: 'text-blue-600'
                }
            ]
        },
        {
            title: 'Products',
            des: 'Total Products',
            Total: ordersProductsData?.totalProducts?.length,
            navigation: '/manage-products',
            Icon: ProductIcon,
            iconBg: '#EF864F',
            chartImage: '',
             miniCart: [
                {
                    label: 'Active',
                    value: `${activeProducts}`,
                    bg: 'bg-green-100',
                    text: 'text-green-600'
                },
                {
                    label: 'Inactive',
                    value: `${ordersProductsData?.totalProducts?.length - activeProducts}`,
                    bg: 'bg-gray-100',
                    text: 'text-black-600'
                }
            ],
        },
        {
            title: 'Orders',
            des: 'Total Orders',
            Total: ordersProductsData?.totalOrders?.length,
            navigation: '/manage-orders',
            Icon: OrderIcon,
            iconBg: '#5089fc',
            cartBg: '#f3f8fe',
            chartImage: '',
             miniCart: [
                {
                    label: 'Delivered',
                    value: `${deliveredProducts}`,
                    bg: 'bg-green-100',
                    text: 'text-green-600'
                },
                {
                    label: 'Processing',
                    value: `${ordersProductsData?.totalOrders?.length - deliveredProducts}`,
                    bg: 'bg-blue-100',
                    text: 'text-blue-600'
                }
            ]
        }
    ]
    return (
        <section className='mt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {statesData?.map((item) => {
                    return (
                        <StatesCard key={item.title} item={item} loading={loading} />
                    )
                })}
            </div>

        </section>
    )
}

export default DashboardStates