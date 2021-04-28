// this script lets us edit the attributes of any result that is retrieved from the DB

import resultService from "./results-service"                       // import results-service so we can fetch a single result from the DB

// import React's hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)

const {useParams, useHistory, Link} = window.ReactRouterDOM;        // import `useParams` to parse parameters from URL
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all.
                                                                    // `Link` lets us navigate between screens with hyperlinks.

const ResultsFormEditor = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking
    const {id} = useParams()                                        // parse "id" from URL as defined in URL pattern in index.js

    // declare local state variable `result` as an empty useState object
    const [result, setResult] = useState({})                        // stores result data in `result` using the setter `setResult`

    // Initialize local function and retrieve result by ID
    useEffect(() => {                                               // on load
        if (id !== "new") {                                         // only load the result by ID if the ID is not "new" (a new result)
            findResultById(id)                                      // find the result by its ID encoded from browser's path
        }
    }, []);

    // FIND RESULT BY ID
    const findResultById = (id) =>                                  // fetch a single result using its ID
        resultService.findResultById(id)                            // use the `findResultById` method defined in result-service and pass the ID
            .then(result => setResult(result))                      // populate the empty `result` object with the retrieved result from the server

    // DELETE RESULT
    const deleteResult = (id) =>                                    // deleteResult event handler passes result's ID as a param
        resultService.deleteResult(id)                              // use the `deleteResult` method defined in result-service and pass the ID
            .then(() => history.goBack())                           // if successful, navigate back to result list

    // CREATE USER
    const createResult = (result) =>                                // passes a result object as a param and connects to server via `resultService`
        resultService.createResult(result)                          // use defined `createResult()` method to pass the user object being created
            .then(() => history.goBack())                           // if successful, go back to the default screen

    // UPDATE RESULT
    const updateResult = (id, newResult) =>                         // update (modify) a result with the given ID and attributes (stored in `newResult`)
        resultService.updateResult(id, newResult)                   // send new result to the server
            .then(() => history.goBack())                           // then go back to the result list

    return (
        <div>
            <h1>Northeastern University COVID-19 Testing Database</h1><br/>
            <h2>Result Editor</h2>
            <label>Lab which reported this Result (Listed by Lab ID):</label>
            &nbsp;
            <Link to={`/labs/${result.labId}`}>
                {/* a link that navigates to /labs/<ID>, where <ID> is the result's labId for the given lab*/}
                {result.labId}
            </Link>
            <br/><br/>

            <label>COVID Test that this Result belongs to (Listed by Test ID):</label>
            &nbsp;
            <Link to={`/tests/${result.testId}`}>
                {/* a link that navigates to /tests/<ID>, where <ID> is the result's testId for the given test*/}
                {result.testId}
            </Link>
            <br/><br/>

            <label>Id</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                value={result.id}                                   // retrieves and displays the result's ID
            />
            <br/>

            <label>Date Received (yyyy-mm-dd)</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setResult(result =>                             // update local result object's dateReceived attribute
                    ({...result, dateReceived: e.target.value}))}   // leave all attributes unchanged EXCEPT for the dateReceived
                value={result.dateReceived}                         // display the dateReceived
            />
            <br/>

            <label>Date Reported (yyyy-mm-dd)</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setResult(result =>                             // update local result object's dateReported
                    ({...result,dateReported: e.target.value}))}    // leave all attributes unchanged EXCEPT for the dateReported
                value={result.dateReported}                         // display the dateReported
            />
            <br/>

            <label>Result</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setResult(result =>                             // update local result object's result
                    ({...result, result: e.target.value}))}         // leave all attributes unchanged EXCEPT for the result
                value={result.result}                               // display the result
            />
            <br/>

            <label>Finding</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setResult(result =>                             // update local result object's finding
                    ({...result, finding: e.target.value}))}        // leave all attributes unchanged EXCEPT for the finding
                value={result.finding}                              // display the finding
            />
            <br/>

            <label>Test Id</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setResult(result =>                             // update local result object's testId
                        ({...result,testId: e.target.value}))}      // leave all attributes unchanged EXCEPT for the testId
                value={result.testId}                               // display the testId
            />
            <br/>

            <label>Lab Id</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setResult(result =>                             // update local result object's labId
                        ({...result,labId: e.target.value}))}       // leave all attributes unchanged EXCEPT for the labId
                value={result.labId}                                // display the labId
            />
            <br/>


            {/*---BUTTONS---*/}

            {/*CANCEL BUTTON*/}
            <button                                                 // add a "Cancel" button
                className="btn btn-warning"                         // stylizes the button (yellow)
                onClick={() => {                                    // uses `history` to go back when the button is clicked
                    history.goBack()
                }}>
                Cancel
            </button>

            {/*DELETE RESULT BUTTON*/}
            <button                                                 // add a "Delete" button that activates `deleteResult()` method on click
                className="btn btn-danger"                          // stylizes the button (red)
                onClick={() => deleteResult(result.id)}>
                Delete
            </button>

            {/*CREATE RESULT BUTTON*/}
            <button                                                 // add a "Create" button to create a new result
                className="btn btn-primary"                         // stylizes the button (blue)
                onClick={() => createResult(result)}                /*when clicked, execute `createResult()` method and pass the result obj.*/>
                Create
            </button>

            {/*UPDATE RESULT BUTTON*/}
            <button                                                 // add a "Save" button to save and send updated result data to the server
                className="btn btn-success"                         // stylizes the button (green)
                onClick={() => updateResult(result.id, result)}     /*when clicked, execute updateResult() method and pass result ID and the result obj.*/>
                Save
            </button>
        </div>
    )
}

export default ResultsFormEditor
