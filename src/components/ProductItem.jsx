import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addBasket } from "../store/features/basketSlice"

export const ProductItem = ({ product }) => {
    const dispatch = useDispatch()
    const { basket } = useSelector(state => state.basket)
    const navigate = useNavigate()
    const currentProduct = basket.find(o => o.id === product.id)

    const addToBasket = () => {
        dispatch(addBasket({
            id: product?.id ,
            title : product?.title ,
            price : product?.price ,
            image : product?.image 
        }))
    }

    const goDetail = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <div  className="flex flex-col items-center gap-5 w-72 border p-2 relative  group">
            <img onClick={() => goDetail(product.id)} className="w-52 h-60 cursor-pointer hover:scale-110 transition-transform" alt="product-img" src={product?.image} />
            <div className="flex flex-col gap-5 w-[200px]">
                <h2 className="truncate">{product.title.split("-")[0]}</h2>
                <p className="text-sm truncate">{product?.description}</p>
                <h1 className="text-2xl text-green-600 text-center">{product?.price} $</h1>
            </div>
            <button onClick={addToBasket} type="button" className="btn absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">Add to Cart <span>{currentProduct ? currentProduct.count : 0}</span></button>
        </div>
    )
}
