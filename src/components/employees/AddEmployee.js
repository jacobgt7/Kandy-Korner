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

    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then(locationsData => {
                    setLocations(locationsData)
                })
        },
        []
    )

    const handleUserInput = (e) => {
        const copy = { ...userChoices }
        copy[e.target.name] = e.target.value
        setUserChoices(copy)
    }

    const handleSubmit = (e) => {
        e.preventDefault()


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
                        <option value={0}>Select a location...</option>
                        {
                            locations.map(
                                location => <option value={location.id} key={`location--${location.id}`}>{location.address}</option>
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

            <button>Submit</button>
        </form>
    </>
}