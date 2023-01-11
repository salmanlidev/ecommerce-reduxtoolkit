import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addBasket } from "../store/features/basketSlice";




export const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(data => {
        setLoading(true)
        setProduct(data.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const backHome = () => {
    setProduct({})
    navigate(-1)
  }


  const addToBasket = () => {
    dispatch(addBasket({
      id: product?.id,
      title: product?.title,
      price: product?.price,
      image: product?.image
    }))
  }


  return (
    <>
      {loading ? <div className="w-full h-full flex items-center justify-center mt-56"><div className="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex gap-10 space-x-4">
          <div className="flex-1 space-y-20 py-1 ">
            <div className="h-2 bg-gray-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                <div className="h-2 bg-gray-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div></div> : <div>
        <section className="text-gray-600 body-font overflow-hidden mt-6">
          <div className="container px-5 py-24 mx-auto">
            <button type="button" onClick={backHome} className="flex items-center gap-x-2"><AiOutlineArrowLeft /> back</button>
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" type="button" onClick={addToBasket} >Buy</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>}
    </>
  )
}
