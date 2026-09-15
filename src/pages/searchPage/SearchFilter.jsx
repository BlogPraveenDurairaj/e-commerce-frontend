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
        console.log(filter.productNameFilter,'fff')
       
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/')
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        dispatch(getProductsData({ page: 1, category: filter.categoryFilter == 'All' ? '' : filter.categoryFilter, sort: filter.priceFilter, search: filter.productNameFilter }))
    },  [filter])

    const category = ["All",
        "Electronics",
        "Men's Clothing",
        "Women's Clothing",
        "Jewelry",
        "Home & Kitchen",
        "Sports & Fitness"]

    return (

        <form className={`search_form ${isPrimaryOpen ? "showPrimaryFilterExpand" : 'showPrimaryFilterShrink'}`} onSubmit={handleSubmit}>
            <input name='productNameFilter' value={filter.productNameFilter} onChange={handleInputs} placeholder='Search product' />
            <select name='categoryFilter' value={filter.categoryFilter} onChange={handleInputs}>
                {category?.map((item) => <option value={item} key={item} style={{ textTransform: "capitalize" }}>{item}</option>)}
            </select>
            <select name='priceFilter' value={filter.priceFilter} onChange={handleInputs}>
                <option value={'asc'}>Low to High</option>
                <option value={'desc'}>High to Low</option>
            </select>
            <button className='search_button'><SearchSvgIcon /></button>
        </form>

    )
}

export default SearchFilter