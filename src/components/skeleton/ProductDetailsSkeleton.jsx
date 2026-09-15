import Skeleton from "../UI/Skeleton";


const ProductDetailsSkeleton = () => {
  return (
    <div className="product-details-skeleton container">
      <div className="product-image-skeleton">
        <Skeleton
          width="440px"
          height="440px"
          borderRadius="0"
        />
      </div>

      <div className="product-info-skeleton">
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
        <div className="description-skeleton">
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