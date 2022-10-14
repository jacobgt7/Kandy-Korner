import { useState, useEffect } from "react"
import "./Locations.css"

//Component displays a list of all locations including address and square footage.
export const Locations = () => {
    //useSate for locations
    const [locations, setLocations] = useState([])
    //useEffect for initial state, fetch locations
    useEffect(() => {
        fetch("http://localhost:8088/locations")
            .then(res => res.json())
            .then(storeLocations => {
                setLocations(storeLocations)
            })
    },
        [])
    //Return jsx for store list
    return <div className="locations">
        <h1>Store Locations</h1>
        <div className="locations-container">
            {
                locations.map(
                    location => {
                        return <div className="location" key={location.id}>
                            <h3>Store {location.id}</h3>
                            <div className="location-address">{location.address}</div>
                            <div className="location-size">{location.squareFootage} square feet</div>
                        </div>
                    }
                )
            }
        </div>
    </div>
}