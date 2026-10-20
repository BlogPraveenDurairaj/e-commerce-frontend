import React from 'react'
import { formatOrderDate } from '../../../helper/formatOrderDate'
import CustomTable from '../../../components/UI/CustomTable'
import { Link } from 'react-router-dom'
import cx from 'classnames';

const DashboardRecentOrders = ({ totalOrders, loading }) => {

    const columns = [
        {
            key: 'id',
            name: 'ID',
            render: (row) => {
                return (<span>#{row.id.slice(0, 8)}</span>)
            }
        },
        {
            key: 'shipping_name',
            name: 'User name'
        },
        {
            key: 'total_amount',
            name: "Total amount",
            render: (row) => {
                return `$${row.total_amount}`
            }
        },
        {
            key: 'status',
            name: 'Status',
            render: (row) => {
                return <span className={cx(orderStatus[row.status === "Out for delivery" ? "OutForDelivery" : row.status  ],'w-fit px-4 py-1 rounded-full text-sm font-medium')}>{row.status}</span>
            }
        },
        {
            key: 'created_at',
            name: 'Date',
            render: (row) => {
                return <>{formatOrderDate(row?.created_at)}</>
            }
        },
    ]
    const orderStatus = {
        Shipped: 'text-blue-600 bg-blue-50',
        Placed: 'text-yellow-600 bg-yellow-50',
        OutForDelivery: 'text-purple-600 bg-purple-50',
        Delivered:'bg-green-50 text-green-600'

    }
    return (
        <div className='bg-white rounded-2xl p-4 border border-gray-200'>
            <div className='flex justify-between gap-2 flex-wrap items-start mb-2'>
                <div>
                    <p className='text-sm font-bold mb-1'>Recent orders</p>
                    <p className='text-xs mb-2 font-medium text-gray-500'>Last 24 hours</p>
                </div>
                <Link to={'/manage-orders'} className=' bg-white rounded-md shadow p-1 px-2 text-sm border border-gray-100'>View all</Link>
            </div>
            <CustomTable
                columns={columns}
                data={totalOrders}
                loading={loading}
                customSkeletonLength={5}
            />
        </div>
    )
}

export default DashboardRecentOrders