// this script will fetch the result SQL data from the server

// TODO: declare URL where server listens for HTTP requests
const RESULTS_URL = "http://localhost:8080/api/results"                 // URL where the server is listening for requests

// TODO: retrieve all results from the server (implement findAllResults)
export const findAllResults = () =>
    fetch(RESULTS_URL)                                                  // send GET request to server
        .then(response => response.json())                              // parse HTTP response from server as JSON

// TODO: retrieve a single result by its ID (implement findResultById)
export const findResultById = (id) =>                                   // send HTTP GET request to server (passes result ID as param)
    fetch(`${RESULTS_URL}/${id}`)                                       // encode result ID at end of path
        .then(response => response.json())                              // parse HTTP response body as JSON

// TODO: delete a result by its ID
export const deleteResult = (id) =>                                     // deleteResult function accepts result's ID
    fetch(`${RESULTS_URL}/${id}`, {                                     // encode result's ID at the end of the URL (path)
        method: "DELETE"                                                // specify that we want to send an HTTP DELETE request to the server
    })

// TODO: create a new result
export const createResult = (result) =>                                 // accept a result object
    fetch(RESULTS_URL, {                                                // send result object to server
        method: 'POST',                                                 // specify that we want to use HTTP POST request
        body: JSON.stringify(result),                                   // embed `result` data in the body, encode data as a JSON string
        headers: {'content-type': 'application/json'}                   // tell server to interpret this as a JSON object
    })
        .then(response => response.json())                              // parse HTTP response from server as JSON

// TODO: update a result by its ID
export const updateResult = (id, result) =>                             // update a result with the given ID, new values are stored in `result`
    fetch(`${RESULTS_URL}/${id}`, {                                     // send request to server with ID embedded in URL
        method: 'PUT',                                                  // specify that we want to send an HTTP PUT request
        body: JSON.stringify(result),                                   // embed result data in the BODY as JSON string
        headers: {'content-type': 'application/json'}                   // tell server to interpret the result object as JSON
    })
        .then(response => response.json())                              // parse HTTP response from server as JSON

// TODO: export all functions as the API to this service
export default {                                                        // export the following functions for others to import
    findAllResults,
    findResultById,
    deleteResult,
    createResult,
    updateResult
}
