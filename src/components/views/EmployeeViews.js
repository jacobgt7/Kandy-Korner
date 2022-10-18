import { Locations } from "../locations/Locations"
import { Routes, Route, Outlet } from "react-router-dom"
import { Products } from "../products/Products"
import { AddProduct } from "../products/AddProduct"
import { Employees } from "../employees/Employees"
import { AddEmployee } from "../employees/AddEmployee"


export const EmployeeViews = () => {
    return <>

        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>


                    <Outlet />
                </>
            }>

                <Route path="locations" element={<Locations />} />
                <Route path="products" element={<Products />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="employees" element={<Employees />} />
                <Route path="addemployee" element={<AddEmployee />} />


            </Route>
        </Routes>

    </>
}