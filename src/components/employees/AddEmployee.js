import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddEmployee = () => {
    const navigate = useNavigate()

    const [userChoices, setUserChoices] = useState(
        {
            name: "",
            email: "",
            isStaff: true
        }
    )

    const [employeeChoices, setEmployeeChoices] = useState(
        {
            userId: 0,
            startDate: new Date(),
            payRate: 0,
            storeId: 0
        }
    )

    const [stores, setStores] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/stores")
                .then(res => res.json())
                .then(storesData => {
                    setStores(storesData)
                })
        },
        []
    )

    const handleUserInput = (e) => {
        const copy = { ...userChoices }
        copy[e.target.name] = e.target.value
        setUserChoices(copy)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userChoices)
        }

        await fetch("http://localhost:8088/users", fetchOptions)
            .then(res => res.json())
            .then(userObj => {
                employeeChoices.userId = userObj.id
            })

        fetchOptions.body = JSON.stringify(employeeChoices)

        await fetch("http://localhost:8088/employees", fetchOptions)
            .then(res => res.json())
            .then(() => {
                navigate("/employees")
            })
    }

    return <>
        <h1>Add New Employee</h1>
        <form>
            <fieldset>
                <label htmlFor="newEmployeeName">
                    Name
                    <input required type="text" id="newEmployeeName" name="name" value={userChoices.name} onChange={handleUserInput} />
                </label>
            </fieldset>

            <fieldset>
                <label htmlFor="newEmployeeEmail">
                    Email
                    <input required type="email" id="newEmployeeEmail" name="email" value={userChoices.email} onChange={handleUserInput} />
                </label>
            </fieldset>

            <fieldset>
                <label htmlFor="newEmployeeStore">
                    Store
                    <select required id="newEmployeeStore" onChange={
                        (e) => {
                            const copy = { ...employeeChoices }
                            copy.storeId = parseInt(e.target.value)
                            setEmployeeChoices(copy)
                        }
                    }>
                        <option value={0}>Select a store...</option>
                        {
                            stores.map(
                                store => <option value={store.id} key={`store--${store.id}`}>{store.address}</option>
                            )
                        }
                    </select>
                </label>
            </fieldset>

            <fieldset>
                <label htmlFor="newEmployeeRate">
                    Pay Rate
                    <input required type="number" value={employeeChoices.payRate} id="newEmployeeRate" name="payRate" onChange={
                        (e) => {
                            const copy = { ...employeeChoices }
                            copy.payRate = parseFloat(e.target.value)
                            setEmployeeChoices(copy)
                        }
                    } />
                </label>
            </fieldset>

            <button onClick={handleSubmit}>Submit</button>
        </form>
    </>
}