import React from 'react';
import cx from 'classnames'
import { formatOrderDate } from '../../helper/formatOrderDate';
import { ThreeDotSvgIcon } from '../../assets/svgComponent/SvgIcon1';

const OrderList = ({ ordersData }) => {
    const statusBadge = {
        "Placed": 'bg-blue-100 text-blue-800'
    }
    return (
        <div>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>My orders</h1>
            <div className='grid gap-3'>{ordersData?.map((item) => {

                return (
                    <div
                        key={item?.id}
                        className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden"
                    >
                        {/* Order Header */}
                        <div className="p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-[180px]">
                                    <p className="font-semibold text-gray-900">
                                        #{item?.id}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {formatOrderDate(item?.created_at)}
                                    </p>
                                </div>
                                <span
                                    className={cx(
                                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                                        statusBadge[item?.status]
                                    )}
                                >
                                    <span className="w-2 h-2 rounded-full bg-current" />
                                    {item?.status}
                                </span>

                                    <p className="font-medium text-gray-800">
                                        {item?.payment_method}
                                    </p>

                                    <p className="text-lg font-bold text-green-600">
                                        ${item?.total_amount}
                                    </p>

                                <div className="relative">
                                    <button
                                        type="button"
                                        className='bg-white shadow border border-gray-200 rounded-md py-1'
                                    >
                                      <ThreeDotSvgIcon/>
                                    </button>

                                </div>
                            </div>
                        </div>


                    </div>
                )
            })}</div>
        </div>

    )
}

export default OrderList