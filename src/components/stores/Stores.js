import { useState, useEffect } from "react"
import "./Stores.css"

//Component displays a list of all stores including address and square footage.
export const Stores = () => {
    //useSate for stores
    const [stores, setStores] = useState([])
    //useEffect for initial state, fetch stores
    useEffect(() => {
        fetch("http://localhost:8088/stores")
            .then(res => res.json())
            .then(storesData => {
                setStores(storesData)
            })
    },
        [])
    //Return jsx for store list
    return <div className="stores">
        <h1>Store stores</h1>
        <div className="stores-container">
            {
                stores.map(
                    store => {
                        return <div className="store" key={store.id}>
                            <h3>Store {store.id}</h3>
                            <div className="store-address">{store.address}</div>
                            <div className="store-size">{store.squareFootage} square feet</div>
                        </div>
                    }
                )
            }
        </div>
    </div>
}