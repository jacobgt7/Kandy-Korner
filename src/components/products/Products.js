import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css"

//Component to display a list of all products.
//User can filter list to see only products costing $2 or more.
export const Products = () => {
    //useState for products
    const [products, setProducts] = useState([])
    //useState for filtered products
    const [filteredProducts, setFilteredProducts] = useState([])
    //useState for top priced
    const [topPriced, setTopPriced] = useState(false)


    const navigate = useNavigate()

    //useEffect for initial render to fetch products
    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType&_sort=name")
                .then(res => res.json())
                .then(
                    fetchedProducts => {
                        setProducts(fetchedProducts)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            setFilteredProducts(products)
        },
        [products]
    )

    //useEffect to filter products dependent on Top Priced button
    useEffect(
        () => {
            if (topPriced) {
                const topPricedProducts = products.filter(product => product.price > 2.00)
                setFilteredProducts(topPricedProducts)
            } else {
                setFilteredProducts(products)
            }
        },
        [topPriced]
    )

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    //return jsx with buttons for employees to sort by price and list products
    return <>
        <h1>Products</h1>
        {
            kandyUserObject.staff ?
                <>
                    <button onClick={() => { setTopPriced(true) }}>Top Priced</button>
                    <button onClick={() => { setTopPriced(false) }}>All Products</button>
                    <button onClick={() => { navigate("/addProduct") }}>Add Product</button>
                </>
                : ""
        }
        <div className="products">
            {
                filteredProducts.map(
                    product => {
                        return <div className="product" key={product.id}>
                            <h3>{product.name}</h3>
                            <div>Price per unit: ${product.price}</div>
                            <div>Product Type: {product.productType.productType}</div>
                        </div>
                    }
                )
            }
        </div>
    </>
}