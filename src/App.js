import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import SignupForm from "./components/Signup.js";
import { bwReducer as reducer } from "./reducers/bwReducer";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import "./App.css";
import LandingPage from "./components/UserLandingPage/LandingPage.js";
import NewUser from "./components/UserLandingPage/NewUserLanding.js";
import AccountPage from "./components/AccountPage.js";

const store = createStore(reducer, applyMiddleware(thunk));

// TODO: create list compojnent that lets you view previous date ranges and have them display on the graph

function App() {
    return (
        <Provider store={store}>
            {/* All of your jsx and components will be inside of Provider */}
            <Router>
                <Header headerText="Sleep Tracker" />
                <div className="App">
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={SignupForm} />
                    <PrivateRoute exact path="/new" component={NewUser} />
                    <PrivateRoute exact path="/home" component={LandingPage} />
                    <PrivateRoute exact path="/account" component={AccountPage} />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
