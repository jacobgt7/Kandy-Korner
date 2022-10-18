import { Locations } from "../locations/Locations"
import { Routes, Route, Outlet } from "react-router-dom"
import { Products } from "../products/Products"
import { AddProduct } from "../products/AddProduct"
import { EmployeeViews } from "./EmployeeViews.js"
import { CustomerViews } from "./CustomerViews.js"


export const ApplicationViews = () => {
	const localKandyUser = localStorage.getItem("kandy_user")
	const kandyUserObject = JSON.parse(localKandyUser)

	if (kandyUserObject.staff) {
		return <EmployeeViews />
	} else {
		return <CustomerViews />
	}
}

