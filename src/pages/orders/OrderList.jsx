import React from 'react';
import cx from 'classnames'
import { formatOrderDate } from '../../helper/formatOrderDate';
import { ThreeDotSvgIcon } from '../../assets/svgComponent/SvgIcon1';
import OrderItems from './OrderItems';
import OrderPageSkeleton from '../../components/skeleton/OrderPageSkeleton';
import { Link } from 'react-router-dom';

const OrderList = ({ ordersData, loading }) => {
    const statusBadge = {
        "Placed": 'bg-blue-100 text-blue-800'
    }
    if (loading) {
        return <OrderPageSkeleton />
    }
    return (
        <div className='grid gap-3'>{ordersData?.map((item) => {

            return (
                <Link
                    key={item?.id}
                    className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden"
                    to={`/orders/${item.id}`}
                >
                    <div className="p-5 relative">
                        <div className="min-w-[180px] mb-3">
                            <p className="font-semibold text-gray-900">
                                #{item?.id}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {formatOrderDate(item?.created_at)}
                            </p>
                        </div>
                        <div className="grid items-center sm:grid-cols-2 md:grid-cols-4 gap-4">

                            <div>
                                <span
                                    className={cx(
                                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                                        statusBadge[item?.status]
                                    )}
                                >
                                    <span className="w-2 h-2 rounded-full bg-current" />
                                    {item?.status}
                                </span>
                            </div>
                            <p className="font-medium text-gray-800">
                                {item?.payment_method}
                            </p>

                            <p className="text-lg font-bold text-green-600">
                                ${item?.total_amount}
                            </p>
                        </div>
                        <OrderItems orderItems={item?.orderItems} />
                    </div>
                </Link>
            )
        })}</div>
    )
}

export default OrderList