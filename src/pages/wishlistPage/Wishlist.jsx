import { Link } from "react-router-dom"


const Wishlist = ({ wishListData ,handleDeleteItem}) => {

    if (!wishListData || wishListData.length === 0) {
        return (
            <div className='py-12 text-center text-gray-500'>
                <p className='text-lg font-medium'>Your wishlist is currently empty.</p>
                <Link to="/" className='text-emerald-600 underline mt-2 inline-block font-medium hover:text-emerald-700'>Discover Products</Link>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 min-[450px]:grid-cols-2 min-[680px]:grid-cols-3 min-[992px]:grid-cols-4 xl:grid-cols-5 gap-4 my-5'>
            {wishListData.map((item) => {
                const { id, title, price, category, image } = item
                return (
                    <div key={id} className='p-3 border border-gray-200 rounded-xl bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow'>
                        <div>
                            <div className='bg-emerald-100 text-emerald-800 rounded-lg inline-block px-2 py-0.5 text-xs font-medium mb-2'>{category}</div>
                            <Link to={`/product/${id}`} className='block h-40 bg-[#f5f5f5] rounded-xl p-4 mb-3'>
                                <img src={image} alt={title} className='w-full h-full object-contain' />
                            </Link>
                            <p className='text-sm font-medium text-gray-800 line-clamp-1 mb-1'>{title}</p>
                            <p className='text-base font-bold text-gray-900'>${price}</p>
                        </div>
                        <button className='mt-3 w-full bg-red-50 text-red-600 border border-red-200 rounded-lg py-1.5 text-xs font-semibold cursor-pointer hover:bg-red-100 transition-colors' onClick={()=>handleDeleteItem(id)}>Remove from Wishlist</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Wishlist