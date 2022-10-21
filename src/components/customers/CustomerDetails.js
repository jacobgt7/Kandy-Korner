import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const [customer, setCustomer] = useState({})

    const { userId } = useParams()


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${userId}&_expand=user`)
                .then(res => res.json())
                .then(customerData => {
                    setCustomer(customerData[0])
                })
        },
        []
    )

    const updateButtonHandler = () => {
        fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        }
        )
            .then(res => res.json())
            .then(() => {

            })

    }

    return <>
        <h1>Customer Details</h1>
        <div>
            <h3>{customer?.user?.name}</h3>
            <div>Email: {customer?.user?.email}</div>
            <label htmlFor="loyaltyNumber"> Loyalty Number
                <input type="text" id="loyaltyNumber" onChange={
                    (e) => {
                        const copy = { ...customer }
                        copy.loyaltyNumber = parseInt(e.target.value)
                        setCustomer(copy)
                    }
                } value={customer.loyaltyNumber} />
                <button onClick={updateButtonHandler}>Update</button>
            </label>
        </div>
    </>
}


