// this script lets us edit the attributes/fields of any lab that is retrieved from the DB

import labService from "./labs-service"                            // import lab-service so we can fetch a single lab from the DB

// import React's hooks
const {useState, useEffect} = React;                                // `useState` lets us declare local state variables
                                                                    // `useEffect` lets us initialize a given function/method (similar to _init_)

const {useParams, useHistory, Link} = window.ReactRouterDOM;        // import `useParams` to parse parameters from URL
                                                                    // `useHistory` tracks all pages we've visited in our browser through
                                                                    // our application. Lets us navigate between them all.
                                                                    // `Link` lets us navigate between screens with the hyperlinks.

const LabsFormEditor = () => {
    const history = useHistory()                                    // instantiate useHistory() as a local constant to enable backtracking.
    const {id} = useParams()                                        // parse "id" from URL as defined in URL pattern in index.js

    // declare local state variable `lab` as an empty useState object
    const [lab, setLab] = useState({})                              // stores lab data in `lab` using the setter `setLab`

    const [results, setResults] = useState([])                      // stores result data in `results` using `setResults` setter method

    // instantiate HTTP Get Request for findResultsForLab()
    useEffect(()=>{
        if (id !== "new") {                                         // only load the result by Lab ID if the ID is not "new" (a new lab)
            fetch(`http://localhost:8080/api/labs/${id}/results`)
                .then(response => response.json())
                .then((results) => {
                    setResults(results)
                })
        }
    },[]);

    // Initialize local function and retrieve lab by ID
    useEffect(() => {                                               // call findLabById when LabsFormEditor first loads
        if (id !== "new") {                                         // only load the lab by ID if the ID is not "new" (a new lab)
            findLabById(id)                                         // find the labs by its ID encoded from browser's path
        }
    }, []);

    // FIND LAB BY ID
    const findLabById = (id) =>                                     // fetch a single lab using its ID
        labService.findLabById(id)                                  // use the `findLabById` method defined in labs-service and pass the ID
            .then(lab => setLab(lab))                               // populate the empty `lab` object with the retrieved lab from the server

    // DELETE LAB
    const deleteLab = (id) =>                                       // deleteLab event handler passes lab's ID as a param
        labService.deleteLab(id)                                    // use the `deleteLab` method defined in labs-service and pass the ID
            .then(() => history.goBack())                           // if successful, navigate back to labs list

    // CREATE LAB
    const createLab = (lab) =>                                      // passes a lab object as a param and connects to server via `userService`
        labService.createLab(lab)                                   // use defined `createLab()` method to pass the lab object being created
            .then(() => history.goBack())                           // if successful, go back to the labs list

    // UPDATE LAB
    const updateLab = (id, newLab) =>                               // update (modify) a lab with the given ID and attributes (stored in `newLab`)
        labService.updateLab(id, newLab)                            // send new lab to the server
            .then(() => history.goBack())                           // then go back to the labs list

    return (
        <div>
            <h1>Northeastern University COVID-19 Testing Database</h1><br/>

            <h2>Lab Editor</h2>
            <label> COVID Test Results Reported By This Lab (Listed by Result ID):</label>
            <ul>
                {
                    results.map(result => {
                        return(
                            <li>
                                <Link to={`/results/${result.id}`}>
                                    {result.id}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            <label>Id</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                value={lab.labId}                                   // retrieves and displays the lab's ID
            />
            <br/>

            <label>Experiment</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>          // as the user types in the input field
                    setLab(lab =>                                   // update local lab object's experiment
                    ({...lab, experiment: e.target.value}))}        // leave all attributes unchanged EXCEPT for the experiment
                value={lab.experiment}                              // display the experiment
            />
            <br/>

            <label>Researcher</label>
            <input
                className="form-control"                            // extend input field to length of whole screen
                onChange={(e) =>            // as the user types in the input field
                    setLab(lab =>                                   // update local lab object's researcher
                    ({...lab,researcher: e.target.value}))}         // leave all attributes unchanged EXCEPT for the researcher
                value={lab.researcher}                              // display the researcher
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

            {/*DELETE LAB BUTTON*/}
            <button                                                 // add a "Delete" button that activates `deleteUser()` method on click
                className="btn btn-danger"                          // stylizes the button (red)
                onClick={() => deleteLab(lab.labId)}>
                Delete
            </button>

            {/*CREATE LAB BUTTON*/}
            <button                                                 // add a "Create" button to create a new lab
                className="btn btn-primary"                         // stylizes the button (blue)
                onClick={() => createLab(lab)}                      /*when clicked, execute `createLab()` method and pass the user obj.*/>
                Create
            </button>

            {/*UPDATE LAB BUTTON*/}
            <button                                                 // add a "Save" button to save and send updated lab data to the server
                className="btn btn-success"                         // stylizes the button (green)
                onClick={() => updateLab(lab.labId, lab)}           /*when clicked, execute updateLab() method and pass lab ID and the lab obj.*/>
                Save
            </button>
        </div>
    )
}

export default LabsFormEditor