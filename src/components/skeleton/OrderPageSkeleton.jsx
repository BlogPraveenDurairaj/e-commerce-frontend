import React from 'react'
import Skeleton from '../UI/Skeleton'

const OrderPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Order Card */}
      {[1, 2].map((order) => (
        <div
          key={order}
          className="bg-[#f9fafb] rounded-2xl p-5 border border-gray-100"
        >
          {/* Order Header */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 w-[70%]">
              {/* Order ID */}
              <Skeleton
                width="330px"
                height="20px"
                borderRadius="5px"
              />

              {/* Date */}
              <Skeleton
                width="180px"
                height="16px"
                borderRadius="4px"
              />
            </div>

            {/* More button */}
            <Skeleton
              width="40px"
              height="40px"
              borderRadius="8px"
            />
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-3 items-center mt-5 mb-5">
            {/* Status */}
            <Skeleton
              width="90px"
              height="34px"
              borderRadius="20px"
            />

            {/* Payment */}
            <div className="flex justify-center">
              <Skeleton
                width="60px"
                height="20px"
                borderRadius="5px"
              />
            </div>

            {/* Total */}
            <div className="flex justify-end">
              <Skeleton
                width="65px"
                height="24px"
                borderRadius="5px"
              />
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white rounded-lg p-2"
              >
                {/* Product Image */}
                <Skeleton
                  width="70px"
                  height="70px"
                  borderRadius="10px"
                />

                {/* Product Info */}
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton
                    width="70%"
                    height="18px"
                    borderRadius="4px"
                  />

                  <Skeleton
                    width="100px"
                    height="16px"
                    borderRadius="4px"
                  />
                </div>

                {/* Product Price */}
                <Skeleton
                  width="45px"
                  height="18px"
                  borderRadius="4px"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderPageSkeleton

