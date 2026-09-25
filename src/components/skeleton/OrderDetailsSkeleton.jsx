import Skeleton from "../UI/Skeleton";

const OrderDetailsSkeleton = () => {
  return (
    <div className="container-custom w-full flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-3">
        <Skeleton
          width="280px"
          height="28px"
          borderRadius="6px"
        />

        <Skeleton
          width="190px"
          height="16px"
          borderRadius="4px"
        />

        <Skeleton
          width="90px"
          height="32px"
          borderRadius="20px"
        />
      </div>

      {/* Summary */}
      <div className="bg-[#f9fafb] rounded-2xl p-5 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <Skeleton
                width="100px"
                height="14px"
                borderRadius="4px"
              />

              <Skeleton
                width="80px"
                height="20px"
                borderRadius="5px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left */}
        <div className="flex flex-col gap-4">
          <Skeleton
            width="160px"
            height="22px"
            borderRadius="5px"
          />

          <div className="bg-[#f9fafb] rounded-2xl p-5 flex flex-col gap-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <Skeleton
                  width="80px"
                  height="80px"
                  borderRadius="10px"
                />

                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton
                    width="60%"
                    height="18px"
                    borderRadius="5px"
                  />

                  <Skeleton
                    width="100px"
                    height="15px"
                    borderRadius="4px"
                  />
                </div>

                <Skeleton
                  width="50px"
                  height="18px"
                  borderRadius="4px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#f9fafb] rounded-2xl p-5 flex flex-col gap-3">
            <Skeleton
              width="150px"
              height="22px"
              borderRadius="5px"
            />

            <Skeleton
              width="80%"
              height="16px"
              borderRadius="4px"
            />

            <Skeleton
              width="60%"
              height="16px"
              borderRadius="4px"
            />

            <Skeleton
              width="70%"
              height="16px"
              borderRadius="4px"
            />
          </div>

          <div className="bg-[#f9fafb] rounded-2xl p-5 flex flex-col gap-3">
            <Skeleton
              width="140px"
              height="22px"
              borderRadius="5px"
            />

            <Skeleton
              width="100%"
              height="16px"
              borderRadius="4px"
            />

            <Skeleton
              width="80%"
              height="16px"
              borderRadius="4px"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;