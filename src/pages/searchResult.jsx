import React from 'react'
import { useSelector } from 'react-redux'
import { ProductItem } from '../components/ProductItem'


export const SearchResult = () => {
    const { filteredProduct } = useSelector(state => state.product)

    return (
        <div className="flex gap-5 flex-wrap items-center justify-center py-5 mt-20 lg:mt-0">
            { filteredProduct.map(product => (
                 <ProductItem key={product?.id} product={product} />
            )) }
        </div>
    )
}
