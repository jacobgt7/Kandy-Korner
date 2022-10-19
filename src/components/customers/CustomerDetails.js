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
                    setCustomer(customerData)
                })
        },
        []
    )

    return <>
        <h1>Customer Details</h1>
        <div>
            <h3>{customer[0]?.user?.name}</h3>
            <div>Email: {customer[0]?.user?.email}</div>
            <div>Loyalty Number: {customer[0]?.loyaltyNumber}</div>
        </div>
    </>
}