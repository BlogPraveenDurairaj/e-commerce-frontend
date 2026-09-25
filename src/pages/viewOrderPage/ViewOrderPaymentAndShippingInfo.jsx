import React from 'react'

const ViewOrderPaymentAndShippingInfo = ({ orderData }) => {
    return (
            <div className="flex gap-5 flex-col">

                {/* Shipping Address */}
                <div className="bg-[#f9fafb] border border-gray-100 rounded-2xl p-5 md:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">
                        Shipping address
                    </h2>

                    <div className="space-y-2">
                        <p className="font-medium text-gray-900">
                            {orderData?.shipping_name}
                        </p>

                        <p className="text-sm text-gray-600">
                            {orderData?.shipping_phone}
                        </p>

                        <p className="text-sm text-gray-600 leading-6">
                            {orderData?.shipping_address}
                        </p>

                        <p className="text-sm text-gray-600">
                            {orderData?.shipping_city}
                        </p>
                    </div>
                </div>


                {/* Payment Details */}
                <div className="bg-[#f9fafb] border border-gray-100 rounded-2xl p-5 md:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">
                        Payment details
                    </h2>

                    <div className="space-y-4">

                        {/* Payment Method */}
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                Payment method
                            </p>

                            <p className="text-sm font-medium text-gray-900">
                                {orderData?.payment_method}
                            </p>
                        </div>

                        {/* Payment Status */}
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                Payment status
                            </p>

                            <p
                                className={`text-sm font-medium ${orderData?.payment_method === "COD"
                                        ? "text-orange-600"
                                        : "text-green-600"
                                    }`}
                            >
                                {orderData?.payment_method === "COD"
                                    ? "Pending"
                                    : "Paid"}
                            </p>
                        </div>

                        {/* Transaction ID */}
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                Transaction ID
                            </p>

                            <p className="text-sm font-medium text-gray-900">
                                —
                            </p>
                        </div>

                    </div>
                </div>

            </div>
    )
}

export default ViewOrderPaymentAndShippingInfo