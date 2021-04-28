// this script will render and display all the results on the default screen

import resultService from "./results-service"                       // import resultService to talk to the server and retrieve data

const {Link, useHistory} = window.ReactRouterDOM;                   // import `Link` component to navigate screens with hyperlinks
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all

// import state-management React hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)

// function to render the Result List on the default screen
const ResultsList = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking

    // instantiate useState() as an empty array to create a results state variable from scratch
    const [results, setResults] = useState([])                      // stores result data in `results` using the setter `setResults`

    // FIND ALL RESULTS
    // Initialize local function and retrieve all results
    useEffect(() => {                                               // call findAllResults() (local func.) when `ResultsList` first loads
        findAllResults()
    }, [])

    // local function that executes SQL query to retrieve all results from schema, store results in local variable `results`
    const findAllResults = () =>
        resultService.findAllResults()                              // use resultService.findAllResults() to retrieve results from server
            .then(results => setResults(results))                   // populate the empty `results` variable with the retrieved result data

    // `return` only takes in/returns one thing, so we wrap everything we're returning in a <div> element
    return (
        <div>
            <h2>Results List</h2>
            <button
                className="btn btn-primary"                         // gives blue color to the button
                onClick={() =>                                      // button that adds a new result when clicked (id is "new")
                    history.push("/results/new")}>
                Add Result
            </button><br/>

            <ul>
                {
                    results.map(result =>                           // iterates over each `result` object stored in the `results` list
                        <li key={result.id} /*designates user ID as the PK*/ >
                            <Link to={`/results/${result.id}`}>
                                {/* iteratively returns links that navigate to /results/<ID>, where <ID> is the result's ID.
                                iterate over the result list, for each result
                                add a line item tag <li> for each result (by its ID) and
                                render result's id, result, finding, testId, and labId */}

                                {/*`&nbsp` is a JS character that inserts a whitespace between lines*/}
                                Result ID: {result.id},
                                &nbsp;Result: {result.result},
                                &nbsp;Test ID: {result.testId},
                                &nbsp;Lab ID: {result.labId}
                            </Link>
                        </li>)
                }
            </ul>
        </div>
    )
}

export default ResultsList;