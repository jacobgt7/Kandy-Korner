import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Customers = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/users?isStaff=false")
                .then(res => res.json())
                .then(customerUserData => {
                    setCustomers(customerUserData)
                })
        },
        []
    )


    return <>
        <h1>Customers</h1>
        <section className="customers">
            {
                customers.map(
                    customer => {
                        return <div className="customer" key={`customer--${customer.id}`}>
                            <h3>
                                <Link to={`/customers/${customer.id}`}>{customer.name}</Link>
                            </h3>
                            <div>Email: {customer.email}</div>
                        </div>
                    }
                )
            }
        </section>
    </>
}