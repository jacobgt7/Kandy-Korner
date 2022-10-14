import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//component responsible for a form for creating a new product
export const AddProduct = () => {
    //useState for user choices
    const [userChoices, setUserChoices] = useState(
        {
            name: "",
            productTypeId: 0,
            price: 0.00
        }
    )

    //useState for product types
    const [productTypes, setProductTypes] = useState([])

    //use effect for initial state
    useEffect(
        () => {
            fetch("http://localhost:8088/productTypes")
                .then(res => res.json())
                .then(typesData => {
                    setProductTypes(typesData)
                })
        },
        []
    )

    //store useNavigate
    const navigate = useNavigate()

    //function to handle submit button
    const handleSubmit = (event) => {
        event.preventDefault()

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userChoices)
        }

        fetch("http://localhost:8088/products", fetchOptions)
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            })
    }

    //function to handle change in form fields
    const handleUserInput = (event) => {
        const copy = { ...userChoices }
        copy[event.target.name] = event.target.value
        setUserChoices(copy)
    }

    const handleUserInputSelect = (event) => {
        const copy = { ...userChoices }
        copy[event.target.name] = parseInt(event.target.value)
        setUserChoices(copy)
    }

    const handleUserInputPrice = (event) => {
        const copy = { ...userChoices }
        copy[event.target.name] = parseFloat(event.target.value)
        setUserChoices(copy)
    }

    //return jsx form
    return <>
        <h1>Add a New Product</h1>

        <form>
            <fieldset>
                <label htmlFor="newProductName"> Product Name
                    <input required type="text" id="newProductName" name="name" value={userChoices.name} onChange={handleUserInput} placeholder="Enter prodcut name here..." />
                </label>
            </fieldset>
            <fieldset>
                <label htmlFor="newProductType"> Product Type
                    <select required id="newProductType" name="productTypeId" onChange={handleUserInputSelect}>
                        <option value={0}>Select a product type</option>
                        {productTypes.map(
                            (productType) => {
                                return (<option key={productType.id} value={productType.id} >{productType.productType}</option>)
                            }
                        )
                        }
                    </select>
                </label>
            </fieldset>
            <fieldset>
                <label htmlFor="newProductPrice">Price
                    <input type="number" required id="newProductPrice" name="price" value={userChoices.price} onChange={handleUserInputPrice} />
                </label>
            </fieldset>

            <button onClick={handleSubmit}>Submit</button>
        </form>
    </>
}