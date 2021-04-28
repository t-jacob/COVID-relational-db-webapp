// this script will render and display all the labs on the default screen

import labService from "./labs-service"                             // import labService to talk to the server and retrieve data

const {Link, useHistory} = window.ReactRouterDOM;                   // import `Link` component to navigate screens with hyperlinks.
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all

// import state-management React hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)

// function to render the Lab List on the default screen
const LabsList = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking

    // instantiate useState() as an empty array to create a labs state variable from scratch
    const [labs, setLabs] = useState([])                            // stores lab data in `labs` using the setter `setLabs`

    // FIND ALL LABS
    // Initialize local function and retrieve all labs
    useEffect(() => {                                               // call findAllLabs() (local func.) when `LabsList` first loads
        findAllLabs()
    }, [])

    // local function that executes SQL query to retrieve all labs from schema, store results in local variable
    const findAllLabs = () =>
        labService.findAllLabs()                                    // use userService.findAllLabs() to retrieve labs from server
            .then(labs => setLabs(labs))                            // populate the empty `labs` variable with the retrieved lab data

    // `return` only takes in/returns one thing, so we wrap everything we're returning in a <div> element
    return (
        <div>
            <h2>Lab List</h2>

            <button
                className="btn btn-primary"                         // gives blue color to the button
                onClick={() =>                                      // button that adds a new lab when clicked (id is "new")
                    history.push("/labs/new")}>
                Add Lab
            </button><br/>

            <ul>
                {
                    labs.map(lab =>                               // iterates over each lab stored in the `labs` list
                        <li key={lab.labId} /*designates lab ID as the PK*/ >
                            <Link to={`/labs/${lab.labId}`}>
                                {/* a link that navigates to /labs/<ID>, where <ID> is the lab's ID.
                                iterate over the lab list, for each labs
                                add a line item tag <li> for each lab (by its ID) and
                                render lab's ID and experiment */}

                                {/*`&nbsp` is a JS character that inserts a whitespace*/}
                                Lab ID: {lab.labId},
                                &nbsp;Experiment: {lab.experiment}
                            </Link>
                        </li>)
                }
            </ul>
        </div>
    )
}

export default LabsList;