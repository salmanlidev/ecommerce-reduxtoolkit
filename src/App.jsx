import { useState } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { SideBar } from "./components/SideBar"
import { HomeContainer } from "./containers/HomeContainer"
import { Home } from "./pages/home"
import { ProductDetail } from "./pages/productDetail";
import { SearchResult } from "./pages/searchResult";
import { Shop } from "./pages/shop";


const App = () => {
  const [side , setSide] = useState(false)

  return (
    <>
    <Navbar setSide={setSide} side={side} />
    <HomeContainer>
      <SideBar side={side} setSide={setSide} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search/:query" element={<SearchResult />}  />
      </Routes>
    </HomeContainer>
    </>
  )
}

export default App
