const ProductCardSkeleton = () => {
  return (
    <div className="p-3 border border-gray-200 rounded-2xl bg-white animate-pulse">
      <div className="w-full h-36 bg-gray-200 rounded-xl mb-3" />
      <div className="w-28 h-6 bg-gray-200 rounded-full mb-3.5" />
      <div className="w-[90%] h-4 bg-gray-200 rounded mb-2" />
      <div className="w-[80px] h-3.5 bg-gray-200 rounded mb-3.5" />
      <div className="w-[70px] h-5 bg-gray-200 rounded mb-4" />
      <div className="w-full h-9 bg-gray-200 rounded-xl" />
    </div>
  );
};

export default ProductCardSkeleton;