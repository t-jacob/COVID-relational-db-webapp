// this script will render and display all the tests on the default screen

import testService from "./test-service"                            // import testService to talk to the server and retrieve data

const {Link, useHistory} = window.ReactRouterDOM;                   // import `Link` component to navigate screens with hyperlinks
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all

// import state-management React hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)

// function to render the Test List on the default screen
const TestList = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking

    // instantiate useState() as an empty array to create a tests state variable from scratch
    const [tests, setTests] = useState([])                          // `tests` stores user data returned from findAllTests()
                                                                    // `setTests` is a setter method that can modify a user stored in `tests`

    // FIND ALL TESTS
    // Initialize local function and retrieve all users
    useEffect(() => {                                               // call findAllTests() (local func.) when `TestsList` first loads
        findAllTests()
    }, [])

    // local function that executes SQL query to retrieve all tests from schema, store results in local variable
    const findAllTests = () =>
        testService.findAllTests()                                  // use testService.findAllTests() to retrieve tests from server
            .then(tests => setTests(tests))                         // populate the empty `tests` variable with the retrieved test data

    // `return` only takes in/returns one thing, so we wrap everything we're returning in a <div> element
    return (
        <div>
            <h2>Test List</h2>
            <button
                className="btn btn-primary"                         // gives blue color to the button
                onClick={() =>                                      // button that adds a new user when clicked (id is "new")
                    history.push("/tests/new")}>
                Add Test
            </button><br/>

            <ul>
                {
                    tests.map(test =>                               // iterates over each `test` object stored in the `tests` list
                        <li key={test.testId} /*designates test ID as the PK*/ >
                            <Link to={`/tests/${test.testId}`}>
                                {/* iteratively returns links that navigate to /tests/<ID>, where <ID> is the given test's ID.
                                iterate over the test list, for each test
                                add a line item tag <li> for each test (by its ID) and
                                render test's id, location, provider, and userId */}

                                {/*`&nbsp` is a JS character that inserts a whitespace between lines*/}
                                Test ID: {test.testId},
                                &nbsp;User ID: {test.userId}
                            </Link>
                        </li>)
                }
            </ul>
        </div>
    )
}

export default TestList;