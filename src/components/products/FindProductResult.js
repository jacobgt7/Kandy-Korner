import { useEffect, useState } from "react"

export const FindProductResult = ({ searchTerms }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/products")
                .then(res => res.json())
                .then(productsData => {
                    setProducts(productsData)
                })
        },
        []
    )

    useEffect(
        () => {
            const foundProducts = products.filter(product => product.name.startsWith(searchTerms))
            setFilteredProducts(foundProducts)
        },
        [searchTerms]
    )

    return <>
        {
            filteredProducts.map(
                product => {
                    return <div>
                        <h3>{product.name}</h3>
                        <div>Price: ${product.price}</div>
                    </div>
                }
            )
        }
    </>

}