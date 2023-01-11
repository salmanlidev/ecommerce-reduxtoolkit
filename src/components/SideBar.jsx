import { useDispatch, useSelector } from "react-redux";
import { increaseItemCount, reduceItemCount, removeItem } from "../store/features/basketSlice";
import { AiOutlineClose } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export const SideBar = ({ side, setSide }) => {
    const { basket } = useSelector(state => state.basket)
    const dispatch = useDispatch()

    let checkOut = 0

    for (let x in basket) {
        let y = basket[x]?.count
        checkOut += y * basket[x]?.price
    }



    return (
        <div className={`sideBar ${side ? "translate-x-0" : "translate-x-[420px]"} transition-transform z-50 flex flex-col gap-5`}>
            <div className="flex items-center justify-between">
                <h1 className="text-center text-2xl font-bold">Basket</h1>
                <button type="button" onClick={() => setSide(false)} className="btn border-none text-red-700 text-2xl hover:text-white hover:bg-red-700" ><AiOutlineClose /></button>
            </div>
            <div className="w-96 h-[500px]  overflow-y-auto">
                {basket.map(b => (
                    <div key={b.id} className="flex items-center justify-between gap-3 w-80 border-y py-5">
                        <img alt="icon" className="w-20 h-20 rounded-sm" src={b.image} />
                        <div className="w-[100px] flex flex-col gap-3">
                            <h3 className="text-[12px] truncate">{b.title.split("-")[0]}</h3>
                            <div className="flex items-center justify-center gap-x-2">
                                <button onClick={() => dispatch(reduceItemCount(b.id))} type="button" className="btn px-2 py-0">-</button>
                                <span className="border border-gray-700 px-2 py-0 rounded-lg">{b.count}</span>
                                <button onClick={() => dispatch(increaseItemCount(b.id))} type="button" className="btn px-2 py-0">+</button>
                            </div>
                        </div>
                        <h1>{parseFloat(b.price * b.count).toFixed(2)} $</h1>
                        <button onClick={() => dispatch(removeItem(b.id))} type="button" className="text-red-700 text-2xl"><FaTrashAlt /></button>
                    </div>
                ))}
            </div>
            <div className="flex gap-5 items-center">

                CheckOut : <span>{parseFloat(checkOut).toFixed(2)} $</span>
                <button className="text-white bg-green-600 px-5 py-1 rounded">Buy</button>
            </div>
        </div>
    )
}
