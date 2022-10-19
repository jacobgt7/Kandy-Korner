import { Stores } from "../stores/Stores"
import { Routes, Route, Outlet } from "react-router-dom"
import { Products } from "../products/Products"
import { AddProduct } from "../products/AddProduct"
import { FindProduct } from "../products/FindProduct"


export const CustomerViews = () => {
    return <>

        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>


                    <Outlet />
                </>
            }>

                <Route path="stores" element={<Stores />} />
                <Route path="findproduct" element={<FindProduct />} />


            </Route>
        </Routes>

    </>
}