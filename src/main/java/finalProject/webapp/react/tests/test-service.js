// this script will fetch the test SQL data from the server

// TODO: declare URL where server listens for HTTP requests
const TESTS_URL = "http://localhost:8080/api/tests"                 // URL where the server is listening for requests

// TODO: retrieve all tests from the server (implement findAllTests)
export const findAllTests = () =>
    fetch(TESTS_URL)                                                // send GET request to server
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: retrieve a single test by its ID (implement findTestById)
export const findTestById = (id) =>                                 // send HTTP GET request to server (passes test ID as param)
    fetch(`${TESTS_URL}/${id}`)                                     // encode test ID at end of path
        .then(response => response.json())                          // parse HTTP response body as JSON

// TODO: delete a test by its ID
export const deleteTest = (id) =>                                   // deleteTest function accepts test's ID
    fetch(`${TESTS_URL}/${id}`, {                                   // encode test's ID at the end of the URL (path)
        method: "DELETE"                                            // specify that we want to send an HTTP DELETE request to the server
    })

// TODO: create a new test
export const createTest = (test) =>                                 // accept a test object
    fetch(TESTS_URL, {                                              // send test object to server
        method: 'POST',                                             // specify that we want to use HTTP POST request
        body: JSON.stringify(test),                                 // embed `test` data in the body, encode data as a JSON string
        headers: {'content-type': 'application/json'}               // tell server to interpret this as a JSON object
    })
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: update a test by its ID
export const updateTest = (id, test) =>                             // update a test with the given ID, new values are stored in `test`
    fetch(`${TESTS_URL}/${id}`, {                                   // send request to server with ID embedded in URL
        method: 'PUT',                                              // specify that we want to send an HTTP PUT request
        body: JSON.stringify(test),                                 // embed test data in the BODY as JSON string
        headers: {'content-type': 'application/json'}               // tell server to interpret the test object as JSON
    })
        .then(response => response.json())                          // parse HTTP response from server as JSON


// TODO: export all functions as the API to this service
export default {                                                    // export the following functions for others to import
    findAllTests,
    findTestById,
    deleteTest,
    createTest,
    updateTest
}
