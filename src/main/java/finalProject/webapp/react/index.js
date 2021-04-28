// this script is the Root Component where the application first starts
// lets us navigate between default home screen and all other screens

// USERS
import UserList from "./users/user-list";                               // load UserList screen
import UserFormEditor from "./users/user-form-editor";                  // load UserFormEditor screen

// TEST
import TestList from "./tests/test-list"
import TestFormEditor from "./tests/test-form-editor";

// LAB
import LabsList from "./labs/labs-list";
import LabsFormEditor from "./labs/labs-form-editor";

// RESULT
import ResultsFormEditor from "./results/results-form-editor";
import ResultsList from "./results/results-list";

const {HashRouter, Route} = window.ReactRouterDOM;                      // libraries for screen navigation

// root component that loads the application
const App = () => {
    return (
        /*<div> element lets us group multiple components together while still returning one thing (returns <div> element)*/
        <div className="container-fluid">
            <HashRouter>                                                {/*navigate between different screens*/}

                {/*Home Screen-- default*/}
                <Route path={["/user", "/"]} exact={true}>              {/*if browser URL ends in "/users" or "/" EXACTLY,*/}
                    <h1>Northeastern University COVID-19 Testing Database</h1><br/>
                    <UserList/>

                    <TestList/>

                    <LabsList/>

                    <ResultsList/>

                </Route>

                {/*UserFormEditor Screen*/}
                <Route path="/user/:id" exact={true}>                   {/*if browser URL ends in "/users/:id" EXACTLY,*/}
                    <UserFormEditor/>                                   {/*then navigate to UserFormEditor screen
                                                                        where ":id" is a placeholder for a user's ID*/}
                </Route>

                {/*TestFormEditor Screen*/}
                <Route path="/tests/:id" exact={true}>                  {/*if browser URL ends in "/tests/:id" EXACTLY,*/}
                    <TestFormEditor/>                                   {/*then navigate to TestFormEditor screen
                                                                        where ":id" is a placeholder for a test's ID*/}
                </Route>

                {/*LabsFormEditor Screen*/}
                <Route path="/labs/:id" exact={true}>                   {/*if browser URL ends in "/labs/:id" EXACTLY,*/}
                    <LabsFormEditor/>                                   {/*then navigate to LabsFormEditor screen
                                                                        where ":id" is a placeholder for a lab's ID*/}
                </Route>

                {/*ResultFormEditor Screen*/}
                <Route path="/results/:id" exact={true}>                {/*if browser URL ends in "/results/:id" EXACTLY,*/}
                    <ResultsFormEditor/>                                {/*then navigate to ResultsFormEditor screen
                                                                        where ":id" is a placeholder for a result's ID*/}
                </Route>
            </HashRouter>
        </div>
    );
}
export default App;
