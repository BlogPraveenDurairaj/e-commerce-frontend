import Skeleton from "../UI/Skeleton";


const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full container-custom">
      <div className="flex justify-center items-center p-6 bg-[#f5f5f5] rounded-2xl h-[250px] lg:h-[440px]">
        <Skeleton
          width="100%"
          height="100%"
          borderRadius="12px"
        />
      </div>

      <div className="flex flex-col gap-4">
        {/* Category */}
        <Skeleton
          width="105px"
          height="34px"
          borderRadius="20px"
        />

        {/* Title */}
        <Skeleton
          width="80%"
          height="32px"
          borderRadius="6px"
        />

        {/* Price */}
        <Skeleton
          width="70px"
          height="28px"
          borderRadius="5px"
        />

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Skeleton width="95%" height="16px" />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="65%" height="16px" />
        </div>

        {/* Button */}
        <Skeleton
          width="175px"
          height="50px"
          borderRadius="12px"
        />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;