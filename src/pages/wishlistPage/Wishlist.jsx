import { Link } from "react-router-dom"


const Wishlist = ({ wishListData ,handleDeleteItem}) => {

    return (
        <div>
            {wishListData.map((item) => {
                const { id, title, price, category, image, rating_count, rating_rate } = item
                return (
                    <div key={id}>
                        <div>{category}</div>
                        <Link to={`/product/${id}`}><img src={image} width={200} height={200}/></Link>
                        <p>{title}</p>
                        <p>{price}</p>
                        <button onClick={()=>handleDeleteItem(id)}>delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Wishlist