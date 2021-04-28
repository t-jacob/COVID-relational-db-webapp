// this script lets us edit the attributes of any user that is retrieved from the DB

import userService from "./user-service"                            // import user-service so we can fetch a single user from the DB

// import React's hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)


const {useParams, useHistory, Link} = window.ReactRouterDOM;        // import `userParams` to parse parameters from URL
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all.
                                                                    // import `Link` component to navigate screens with hyperlinks.

const UserFormEditor = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking
    const {id} = useParams()                                        // parse "id" from URL as defined in URL pattern in index.js

    // declare local state variable `test` as an empty useState object
    const [tests, setTests] = useState([])                          // stores test data in `tests` using  the setter `setTest`


    // instantiate HTTP Get request for findTestForUser() on load
    useEffect(() => {
        if (id !== "new") {                                         // only load the test by User ID if the ID is not "new" (a new user)
        fetch(`http://localhost:8080/api/users/${id}/tests`)
            .then(response=>response.json())
            .then((tests) => {
                setTests(tests)
            })
        }
    }, []);


    // declare local state variable `user` as an empty useState object
    const [user, setUser] = useState({})                            // `user` stores user data returned from findAllUsers()
                                                                    // `setUser` is a setter method that can modify a user stored in `user`


    // Initialize local function and retrieve user by ID
    useEffect(() => {                                               // call findUserById when UserFormEditor first loads
        if (id !== "new") {                                         // only retrieve the user by ID if the ID is not "new" (a new user)
            findUserById(id)                                        // find the user by their ID encoded from browser's path
        }    }, []);

    // FIND USER BY ID
    const findUserById = (id) =>                                    // fetch a single user using their ID
        userService.findUserById(id)                                // use the `findUserById` method defined in user-service and pass the ID
            .then(user => setUser(user))                            // populate the empty `user` object with the retrieved user from the server

    // DELETE USER
    const deleteUser = (id) =>                                      // deleteUser event handler passes user's ID as a param
        userService.deleteUser(id)                                  // use the `deleteUser` method defined in user-service and pass the ID
            .then(() => history.goBack())                           // if successful, navigate back to user list

    // CREATE USER
    const createUser = (user) =>                                    // passes a user object as a param and connects to server via `userService`
        userService.createUser(user)                                // use defined `createUser()` method to pass the user object being created
            .then(() => history.goBack())                           // if successful, go back to the user list (default screen)

    // UPDATE USER
    const updateUser = (id, newUser) =>                             // update (modify) a user with the given ID and attributes (stored in `newUser`)
        userService.updateUser(id, newUser)                         // send new user to the server
            .then(() => history.goBack())                           // then go back to the user list

    return (
        <div>
            <h1>Northeastern University COVID-19 Testing Database</h1><br/>

            {/*Screen Heading*/}
            <h2>User Editor</h2>

            <label>Past COVID Tests administered to this User (Listed by Test ID):</label>

            <ul>
                {
                    tests.map(test => {
                        return(
                            <li>
                                <Link to={`/tests/${test.testId}`}>
                                {test.testId}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            <label>Id</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                value={user.userId}                                 // retrieves and displays the user's ID
            />
            <br/>

            <label>First Name</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setUser(user =>                                 // update local user object's first name attribute
                    ({...user, firstName: e.target.value}))}        // leave all attributes unchanged EXCEPT for the first name of the user
                value={user.firstName}                              // display the first name
            />
            <br/>

            <label>Last Name</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setUser(user =>                                 // update local user object's last name
                    ({...user,lastName: e.target.value}))}          // leave all attributes unchanged EXCEPT for the last name of the user
                value={user.lastName}                               // display the last name
            />
            <br/>

            <label>Username</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setUser(user =>                                 // update local user object's username
                        ({...user, userName: e.target.value}))}     // leave all attributes unchanged EXCEPT for the username
                value={user.userName}                               // display the username
            />
            <br/>

            <label>Password</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setUser(user =>                                 // update local user object's password
                    ({...user, password: e.target.value}))}         // leave all attributes unchanged EXCEPT for the password
                value={user.password}                               // display the password
            />
            <br/>

            <label>Email</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setUser(user =>                                 // update local user object's email
                        ({...user, email: e.target.value}))}        // leave all attributes unchanged EXCEPT for the email
                value={user.email}                                  // display the email
            />
            <br/>

            <label>Date Of Birth (yyyy-mm-dd)</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setUser(user =>                                 // update local user object's DOB
                        ({...user, dateOfBirth: e.target.value}))}  // leave all attributes unchanged EXCEPT for the DOB
                value={user.dateOfBirth}                            // display the DOB
            />
            <br/>

            <label>Role (must be either student, staff, or faculty)</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>                                    // as the user types in the input field
                    setUser(user =>                                 // update local user object's role
                        ({...user, userRole: e.target.value}))}     // leave all attributes unchanged EXCEPT for the role
                value={user.userRole}                               // display the role
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

            {/*DELETE USER BUTTON*/}
            <button                                                 // add a "Delete" button that activates `deleteUser()` method on click
                className="btn btn-danger"                          // stylizes the button (red)
                onClick={() => deleteUser(user.userId)}>
                Delete
            </button>

            {/*CREATE USER BUTTON*/}
            <button                                                 // add a "Create" button to create a new user
                className="btn btn-primary"                         // stylizes the button (blue)
                onClick={() => createUser(user)}                    /*when clicked, execute `createUser()` method and pass the user obj.*/>
                Create
            </button>

            {/*UPDATE USER BUTTON*/}
            <button                                                 // add a "Save" button to save and send updated user data to the server
                className="btn btn-success"                         // stylizes the button (green)
                onClick={() => updateUser(user.userId, user)}       /*when clicked, execute updateUser() method and pass user ID and the user obj.*/>
                Save
            </button>
        </div>
    )
}

export default UserFormEditor
