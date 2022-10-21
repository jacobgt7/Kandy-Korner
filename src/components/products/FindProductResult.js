import { useEffect, useState } from "react"

export const FindProductResult = ({ searchTerms }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currentCustomer, setCurrentCustomer] = useState({})

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch("http://localhost:8088/products")
                .then(res => res.json())
                .then(productsData => {
                    setProducts(productsData)
                })

            fetch(`http://localhost:8088/customers?userId=${kandyUserObject.id}`)
                .then(res => res.json())
                .then((singleCustomerArray) => {
                    setCurrentCustomer(singleCustomerArray[0])
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


    const purchaseButtonHandler = (currentProductId) => { //To do: create a new component to list "My Orders"
        const purchaseObject = {
            customerId: currentCustomer.id,
            productId: currentProductId,
            quantity: 1
        }

        fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseObject)
        }
        )
            .then(res => res.json())
            .then(() => {

            })

    }

    return <>
        {
            filteredProducts.map(
                product => {
                    return <div key={`product--${product.id}`} className="product">
                        <h3>{product.name}</h3>
                        <div>Price: ${product.price}   <button onClick={purchaseButtonHandler(product.id)}>Purchase</button></div>
                    </div>
                }
            )
        }
    </>

}
