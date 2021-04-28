// this script will fetch the lab SQL data from the server

// TODO: declare URL where server listens for HTTP requests
const LABS_URL = "http://localhost:8080/api/labs"                   // URL where the server is listening for requests

// TODO: retrieve all labs from the server (implement findAllLabs)
export const findAllLabs = () =>
    fetch(LABS_URL)                                                 // send GET request to server
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: retrieve a single lab by its ID (implement findLabById)
export const findLabById = (id) =>                                  // send HTTP GET request to server (passes lab ID as param)
    fetch(`${LABS_URL}/${id}`)                                    // encode lab ID at end of path
        .then(response => response.json())                          // parse HTTP response body as JSON

// TODO: delete a lab by its ID
export const deleteLab = (id) =>                                    // deleteLab function accepts lab's ID
    fetch(`${LABS_URL}/${id}`, {                             // encode lab's ID at the end of the URL (path)
        method: "DELETE"                                            // specify that we want to send an HTTP DELETE request to the server
    })

// TODO: create a new lab
export const createLab = (lab) =>                                   // accept a lab object
    fetch(LABS_URL, {                                          // send lab object to server
        method: 'POST',                                             // specify that we want to use HTTP POST request
        body: JSON.stringify(lab),                                  // embed `lab` data in the body, encode data as a JSON string
        headers: {'content-type': 'application/json'}               // tell server to interpret this as a JSON object
    })
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: update a lab by its ID
export const updateLab = (id, lab) =>                               // update a lab with the given ID, new values are stored in `lab`
    fetch(`${LABS_URL}/${id}`, {                           // send request to server with ID embedded in URL
        method: 'PUT',                                              // specify that we want to send an HTTP PUT request
        body: JSON.stringify(lab),                                  // embed lab data in the BODY as JSON string
        headers: {'content-type': 'application/json'}               // tell server to interpret the lab object as JSON
    })
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: export all functions as the API to this service
export default {                                                    // export the following functions for others to import
    findAllLabs,
    findLabById,
    deleteLab,
    createLab,
    updateLab
}
