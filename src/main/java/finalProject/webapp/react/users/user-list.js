// this script will render and display all the users on the default screen

import userService from "./user-service"                            // import userService to talk to the server and retrieve data

const {Link, useHistory} = window.ReactRouterDOM;                   // import `Link` component to navigate screens with hyperlinks
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all

// import state-management React hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)

// function to render the User List on the default screen
const UserList = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking

    // instantiate useState() as an empty array to create a users state variable from scratch
    const [users, setUsers] = useState([])                          // `users` stores user data returned from findAllUsers()
                                                                    // `setUsers` is a setter method that can modify a user stored in `users`

    // FIND ALL USERS
    useEffect(() => {                                               // call findAllUsers() (local func.) when `UserList` first loads
        findAllUsers()
    }, [])

    // local function that executes SQL query to retrieve all users from schema, store results in local variable
    const findAllUsers = () =>
        userService.findAllUsers()                                  // use userService.findAllUsers() to retrieve users from server
            .then(users => setUsers(users))                         // populate the empty `users` variable with the retrieved user data

    // `return` only takes in/returns one thing, so we wrap everything we're returning in a <div> element
    return (
        <div>
            <h2>User List</h2>
            <button
                className="btn btn-primary"                         // gives blue color to the button
                onClick={() =>                                      // button that adds a new user when clicked (id is "new")
                    history.push("/user/new")}>
                Add User
            </button><br/>

            <ul>
                {
                    users.map(user =>                               // iterates over each user stored in the `users` list
                        <li key={user.userId} /*designates user ID as the PK*/ >
                            <Link to={`/user/${user.userId}`}>
                                {/* iteratively returns links that navigate to /user/<ID>, where <ID> is the user's ID.
                                iterate over the user list, for each user
                                add a line item tag <li> for each user (by their ID) and
                                render user's first name, last name, username, and role */}

                                {/*`&nbsp` is a JS character that inserts a whitespace between lines*/}
                                User ID: {user.userId},
                                &nbsp;Name: {user.firstName}
                                &nbsp;{user.lastName},
                                &nbsp;Role: {user.userRole}
                            </Link>
                        </li>)
                }
            </ul>
        </div>
    )
}

export default UserList;
