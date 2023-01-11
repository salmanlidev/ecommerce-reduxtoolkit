import { useDispatch, useSelector } from "react-redux"
import { nextSlide, prevSlide , dotSlide } from "../store/features/productSlice"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"

export const Slider = () => {
    const { sliderContent , slider } = useSelector(state => state.product)
    const dispatch = useDispatch()

  

    return (
        <div className="w-full bg-gray-200 flex mt-28 lg:p-10 items-center justify-center relative rounded-lg lg:my-10">
            <div className="flex w-full lg:w-max">
                {sliderContent.map((content, index) => (
                    slider === index ?
                        <img key={content.id} alt="sliderPoster" src={content.image} className="w-full lg:w-[700px] h-[500px] duration-500 mix-blend-multiply transition-all scale-100 ease-in-out" /> : <img alt="sliderPoster" src={content.image} key={content.id} className="w-full lg:w-[700px] h-[500px] mix-blend-multiply scale-75 opacity-0 duration-500 absolute transition-all ease-in-out" />
                ))}
            </div>
            <div className="absolute flex bottom-3 gap-x-4">
                {sliderContent.map((content, index) => (
                    slider === index ?
                    <span key={content.id} onClick={() => dispatch(dotSlide(index))} className="p-2 border border-gray-800 cursor-pointer duration-500 ease-in-out transition-colors bg-gray-600 rounded-full"></span> :    <span onClick={() => dispatch(dotSlide(index))} key={content.id} className="p-2 border cursor-pointer hover:bg-gray-700 duration-500 ease-in-out transition-colors border-gray-800 rounded-full" ></span>
                ))}
            </div>
            <div className="absolute flex justify-between w-full px-4">
                <button className="flex items-center justify-center border-none text-6xl hover:text-gray-600 transition-colors" type="button" onClick={() => dispatch(prevSlide())} ><MdArrowBackIos /></button>
                <button className="flex items-center justify-center border-none text-6xl hover:text-gray-600 transition-colors" type="button" onClick={() => dispatch(nextSlide())} ><MdArrowForwardIos /></button>
            </div>
        </div>
    )
}
