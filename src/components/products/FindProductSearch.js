export const FindProductSearch = ({ setSearchTerms }) => {

    return <label htmlFor="candySearch">
        What candy are you looking for?
        <input id="candySearch" type="text" onChange={
            (e) => {
                setSearchTerms(e.target.value)
            }
        }
        />
    </label>

}