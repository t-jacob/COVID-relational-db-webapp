// this script lets us edit the attributes of any test that is retrieved from the DB

import testService from "./test-service"                            // import test-service so we can fetch a single test from the DB

// import React's hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)

const {useParams, useHistory, Link} = window.ReactRouterDOM;        // import `userParams` to parse parameters from URL
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all
                                                                    // `Link` lets us navigate between screens with hyperlinks.

const TestFormEditor = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking
    const {id} = useParams()                                        // parse "id" from URL as defined in URL pattern in index.js

    // declare local state variable `test` as an empty useState object
    const [test, setTest] = useState({})                            // stores test data in `test` using the setter `setTest`

    // declare local state variable `results` as an empty useState object
    const [results, setResults] = useState([])                      // stores result data in `results` using the setter `setResults`


    // instantiate HTTP Get Request for findResultForTest()
    useEffect(()=>{
        if (id !== "new") {                                         // only load the result by Test ID if the ID is not "new" (a new test)
            fetch(`http://localhost:8080/api/tests/${id}/results`)
                .then(response => response.json())
                .then((results) => {
                    setResults(results)
                })
        }
    }, []);

    // Initialize local function and retrieve test by ID
    useEffect(() => {                                               // call findTestById when TestFormEditor first loads
        if (id !== "new") {                                         // only load the test by ID if the ID is not "new" (a new test)
            findTestById(id)                                        // find the test by its ID encoded from browser's path
        }
    }, []);

    // FIND TEST BY ID
    const findTestById = (id) =>                                    // fetch a single test using its ID
        testService.findTestById(id)                                // use the `findTestById` method defined in test-service and pass the ID
            .then(test => setTest(test))                            // populate the empty `test` object with the retrieved test from the server

    // DELETE TEST
    const deleteTest = (id) =>                                      // deleteTest event handler passes test's ID as a param
        testService.deleteTest(id)                                  // use the `deleteTest` method defined in test-service and pass the ID
            .then(() => history.goBack())                           // if successful, navigate back to test list

    // CREATE TEST
    const createTest = (test) =>                                    // passes a test object as a param and connects to server via `testService`
        testService.createTest(test)                                // use defined `createTest()` method to pass the test object being created
            .then(() => history.goBack())                           // if successful, go back to the test list

    // UPDATE USER
    const updateTest = (id, newTest) =>                             // update (modify) a test with the given ID and attributes (stored in `newTest`)
        testService.updateTest(id, newTest)                         // send new test to the server
            .then(() => history.goBack())                           // then go back to the test list

    return (
        <div>
            <h1>Northeastern University COVID-19 Testing Database</h1><br/>

            <h2>Test Editor</h2>
            <label>User whom this COVID Test belongs to (Listed by User ID):</label>
            &nbsp;
            <Link to={`/user/${test.userId}`}>
                {/* a link that navigates to /user/<ID>, where <ID> is the user's ID for the given test*/}
                {test.userId}
            </Link>
            <br/><br/>

            <label>Lab-tested Results for this COVID Test (Listed by Result ID):</label>
            <ul>
                {
                    results.map(result => {
                        return(
                            <li>
                                <Link to={`/results/${result.id}`}>
                                    {result.id},
                                    COVID&nbsp;{result.result}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            <label>Id</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                value={test.testId}                                 // retrieves and displays the test's ID
            />
            <br/>

            <label>Location</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setTest(test =>                                 // update local test object's location attribute
                    ({...test, location: e.target.value}))}         // leave all attributes unchanged EXCEPT for the test's location
                value={test.location}                               // display the location
            />
            <br/>

            <label>Provider</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setTest(test =>                                 // update local test object's provider
                    ({...test,provider: e.target.value}))}          // leave all attributes unchanged EXCEPT for the test provider
                value={test.provider}                               // display the provider
            />
            <br/>

            <label>User Id</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setTest(test =>                                 // update local test object's user ID
                    ({...test, userId: e.target.value}))}           // leave all attributes unchanged EXCEPT for the test's userID
                value={test.userId}                                 // display the test's corresponding userID
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

            {/*DELETE TEST BUTTON*/}
            <button                                                 // add a "Delete" button that activates `deleteTest()` method on click
                className="btn btn-danger"                          // stylizes the button (red)
                onClick={() => deleteTest(test.testId)}>
                Delete
            </button>

            {/*CREATE TEST BUTTON*/}
            <button                                                 // add a "Create" button to create a new test
                className="btn btn-primary"                         // stylizes the button (blue)
                onClick={() => createTest(test)}                    /*when clicked, execute `createTest()` method and pass the test obj.*/>
                Create
            </button>

            {/*UPDATE TEST BUTTON*/}
            <button                                                 // add a "Save" button to save and send updated test data to the server
                className="btn btn-success"                         // stylizes the button (green)
                onClick={() => updateTest(test.testId, test)}       /*when clicked, execute updateTest() method and pass test ID and the test obj.*/>
                Save
            </button>
        </div>
    )
}

export default TestFormEditor
