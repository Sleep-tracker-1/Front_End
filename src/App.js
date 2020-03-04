import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import SignupForm from "./components/Signup.js";
import TestGraph from "./components/TestGraph";
import { bwReducer as reducer } from "./reducers/bwReducer";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import "./App.css";
import LandingPage from "./components/UserLandingPage/LandingPage.js";

const store = createStore(reducer, applyMiddleware(thunk));

// TODO: create list compojnent that lets you view previous date ranges and have them display on the graph

function App() {
    return (
        <Provider store={store}>
            {/* All of your jsx and components will be inside of Provider */}
            <Router>
                <div className="App">
                    <Route exact path="/" component={SignupForm} />
                    <PrivateRoute exact path="/home" component={LandingPage} />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
