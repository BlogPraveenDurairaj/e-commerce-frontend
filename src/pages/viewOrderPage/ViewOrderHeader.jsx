import React from 'react'
import { formatOrderDate } from '../../helper/formatOrderDate'

const ViewOrderHeader = ({ orderData }) => {

    return (
        <div>
            {/* Order Header */}
            <div className="flex flex-col gap-2 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 break-all">
                            #{orderData?.id}
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Placed on {formatOrderDate(orderData?.created_at)}
                        </p>
                    </div>

                    {/* Status */}
                    <span
                        className={`w-fit px-4 py-2 rounded-full text-sm font-medium ${orderData?.status === "delivered"
                                ? "bg-green-50 text-green-600"
                                : "bg-blue-50 text-blue-600"
                            }`}
                    >
                        {orderData?.status}
                    </span>
                </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#f9fafb] border border-gray-100 rounded-2xl p-4 md:p-6">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-0">

                    {/* Payment */}
                    <div className="md:px-5 lg:first:pl-0">
                        <p className="text-sm text-gray-500 mb-1">
                            Payment method
                        </p>

                        <p className="text-base font-medium text-gray-900">
                            {orderData?.payment_method}
                        </p>
                    </div>

                    {/* Amount */}
                    <div className="md:px-5 lg:border-l border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">
                            Total amount
                        </p>

                        <p className="text-lg font-semibold text-green-600">
                            ${orderData?.total_amount}
                        </p>
                    </div>

                    {/* Delivery */}
                    <div className="md:px-5 lg:border-l border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">
                            Delivery status
                        </p>

                        <p className="text-base font-medium text-gray-900">
                            Not delivered
                        </p>
                    </div>

                    {/* Date */}
                    <div className="md:px-5 lg:border-l border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">
                            Order date
                        </p>

                        <p className="text-base font-medium text-gray-900">
                            {formatOrderDate(orderData?.created_at)}
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ViewOrderHeader