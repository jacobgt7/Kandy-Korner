import { Stores } from "../stores/Stores"
import { Routes, Route, Outlet } from "react-router-dom"
import { Products } from "../products/Products"
import { AddProduct } from "../products/AddProduct"
import { Employees } from "../employees/Employees"
import { AddEmployee } from "../employees/AddEmployee"
import { Customers } from "../customers/Customers"
import { CustomerDetails } from "../customers/CustomerDetails"


export const EmployeeViews = () => {
    return <>

        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>


                    <Outlet />
                </>
            }>

                <Route path="stores" element={<Stores />} />
                <Route path="products" element={<Products />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="employees" element={<Employees />} />
                <Route path="addemployee" element={<AddEmployee />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customers/:userId" element={<CustomerDetails />} />


            </Route>
        </Routes>

    </>
}