import { useEffect, useState } from "react"
import { FindProductResult } from "./FindProductResult"
import { FindProductSearch } from "./FindProductSearch"

export const FindProduct = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <h1>Search Products</h1>
        <div className="search"><FindProductSearch setSearchTerms={setSearchTerms} /></div>
        <div className="result"><FindProductResult searchTerms={searchTerms} /></div>
    </>

}