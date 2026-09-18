import { useCallback } from 'react';
import { SearchSvgIcon } from '../../assets/svgComponent/SvgIcon1';
import { useDispatch } from 'react-redux';
import { getProductsData, handleFilter } from '../../slice/productSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchFilter = ({ isPrimaryOpen, filter }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const handleInputs = (e) => {
        const { value, name } = e.target
        dispatch(handleFilter({ name, value }))
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/')
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        dispatch(getProductsData({ page: 1, category: filter.categoryFilter == 'All' ? '' : filter.categoryFilter, sort: filter.priceFilter, search: filter.productNameFilter }))
    },  [filter, location.pathname, navigate, dispatch])

    const category = ["All",
        "Electronics",
        "Men's Clothing",
        "Women's Clothing",
        "Jewelry",
        "Home & Kitchen",
        "Sports & Fitness"]

    return (

        <form className={`p-3.5 px-4 rounded-xl lg:rounded-[36px] shadow-md grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_50px] max-w-[800px] w-full gap-2.5 w-full bg-[#f5f5f5] lg:bg-white transition-all duration-300 ${isPrimaryOpen ? "animate-expand-primary" : 'hidden'}`} onSubmit={handleSubmit}>
            <input name='productNameFilter' value={filter.productNameFilter} onChange={handleInputs} placeholder='Search product' className='p-2.5 px-3 border border-gray-300 rounded-lg lg:rounded-l-full outline-emerald-600 text-sm bg-white' />
            <select name='categoryFilter' value={filter.categoryFilter} onChange={handleInputs} className='p-2.5 px-3 border border-gray-300 rounded-lg outline-emerald-600 text-sm select-custom-arrow bg-white cursor-pointer'>
                {category?.map((item) => <option value={item} key={item} style={{ textTransform: "capitalize" }}>{item}</option>)}
            </select>
            <select name='priceFilter' value={filter.priceFilter} onChange={handleInputs} className='p-2.5 px-3 border border-gray-300 rounded-lg outline-emerald-600 text-sm select-custom-arrow bg-white cursor-pointer'>
                <option value={'asc'}>Low to High</option>
                <option value={'desc'}>High to Low</option>
            </select>
            <button className='bg-theme-primary border-0 rounded-lg lg:rounded-r-full flex items-center justify-center text-white p-2.5 cursor-pointer hover:opacity-90 transition-opacity'><SearchSvgIcon /></button>
        </form>

    )
}

export default SearchFilter