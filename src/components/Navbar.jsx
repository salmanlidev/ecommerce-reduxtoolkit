import { Input } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { BiSearch, BiShoppingBag, BiMenu } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../store/features/productSlice";


function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export const Navbar = ({ setSide, side }) => {
    const { basket } = useSelector(state => state.basket)
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [nav, setNav] = useState(false)

    const size = useWindowSize()

    let finallyCount = 0

    for (let x in basket) {
        finallyCount += basket[x]?.count
    }

    useEffect(() => {
        if (window.innerWidth >= 961) {
            setNav(true)
        }
        else {
            setNav(false)
        }
    }, [size])


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchProduct(query.toLowerCase()))
        navigate(`/search/${query}`)
        setQuery("")
    }

    const shoppingBag = () => {
        setSide(!side)
    }

    return (
        <>

            <div className="w-full flex-col fixed top-0 z-30 bg-white px-10 flex h-28 items-center justify-center lg:relative">
                <div className="w-full flex items-center justify-between">
                    <a href="/" className="font-bold text-xl">
                        SAMMIExpress
                    </a>
                    <div className={`nav-content ${nav ? "" : "hidden"}`}>
                        <nav className="nav-links">
                            <a href="/" className="nav-item">Home</a>
                            <a href="/shop" className="nav-item">Shop</a>
                        </nav>
                        <div className="nav-form">
                            {size.width > 961 ? <form onClick={(e) => e.preventDefault()} onSubmit={(e) => handleSubmit(e)} className="w-[300px]">
                                <Input onClick={(e) => e.preventDefault()} label="Search" value={query} onChange={(e) => {
                                    e.preventDefault()
                                    setQuery(e.target.value)
                                }} icon={<BiSearch />} />
                            </form> : null}
                            <button type="button" className="shoppingBag" onClick={shoppingBag}>
                                <BiShoppingBag />
                                <span className="absolute -top-1 right-0 text-sm bg-red-500 px-1 py-0 text-white rounded-full">{finallyCount === 0 ? null : finallyCount}</span>
                            </button>
                        </div>
                    </div>
                    <button onClick={() => setNav(!nav)} className="nav-bars">{nav ? <VscClose /> : <BiMenu />}</button>
                </div>
                {size.width < 961 ? <form onClick={(e) => e.preventDefault()} onSubmit={(e) => handleSubmit(e)} className="w-[300px]">
                    <Input onClick={(e) => e.preventDefault()} label="Search" value={query} onChange={(e) => {
                        e.preventDefault()
                        setQuery(e.target.value)
                    }} icon={<BiSearch />} />
                </form> : null}
            </div>
        </>
    )
}
