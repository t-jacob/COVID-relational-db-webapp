// this script will fetch the user SQL data from the server

// TODO: declare URL where server listens for HTTP requests
const USERS_URL = "http://localhost:8080/api/user"                  // URL where the server is listening for requests

// TODO: retrieve all users from the server (implement findAllUsers)
export const findAllUsers = () =>
    fetch(USERS_URL)                                                // send GET request to server
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: retrieve a single user by their ID (implement findUserById)
export const findUserById = (id) =>                                 // send HTTP GET request to server (passes user ID as param)
    fetch(`${USERS_URL}/${id}`)                                     // encode user ID at end of path
        .then(response => response.json())                          // parse HTTP response body as JSON

// TODO: delete a user by their ID
export const deleteUser = (id) =>                                   // deleteUser function accepts user's ID
    fetch(`${USERS_URL}/${id}`, {                                   // encode user's ID at the end of the URL (path)
        method: "DELETE"                                            // specify that we want to send an HTTP DELETE request to the server
    })

// TODO: create a new user
export const createUser = (user) =>                                 // accept a user object
    fetch(USERS_URL, {                                              // send user object to server
        method: 'POST',                                             // specify that we want to use HTTP POST request
        body: JSON.stringify(user),                                 // embed `user` data in the body, encode data as a JSON string
        headers: {'content-type': 'application/json'}               // tell server to interpret this as a JSON object
    })
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: update a user by their ID
export const updateUser = (id, user) =>                             // update a user with the given ID, new values are stored in `user`
    fetch(`${USERS_URL}/${id}`, {                                   // send request to server with ID embedded in URL
        method: 'PUT',                                              // specify that we want to send an HTTP PUT request
        body: JSON.stringify(user),                                 // embed user data in the BODY as JSON string
        headers: {'content-type': 'application/json'}               // tell server to interpret the user object as JSON
    })
        .then(response => response.json())                          // parse HTTP response from server as JSON

// TODO: export all functions as the API to this service
export default {                                                    // export the following functions for others to import
    findAllUsers,
    findUserById,
    deleteUser,
    createUser,
    updateUser
}
