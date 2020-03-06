import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

export const FETCHING_USER = "FETCHING_USER";
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const ERROR_FETCHING_USER_DATA = "ERROR_FETCHING_USER_DATA";
export const FETCHING_MAIN_DATA = "FETCHING_MAIIN_DATA";
export const FETCH_MAIN_DATA = "FETCH_MAIN_DATA";
export const ERROR_FETCHING_MAIN_DATA = "ERROR_FETCHING_MAIN_DATA";
export const POSTING_USER_INPUTS = "POSTING_USER_INPUTS";
export const POSTING_USER_INPUTS_SUCCESS = "POSTING_USER_INPUTS_SUCCESS";
export const POSTING_USER_INPUTS_FAILURE = "POSTING_USER_INPUTS_FAILURE";
export const UPDATING_USER_INPUTS = "UPDATING_USER_INPUTS";
export const UPDATING_USER_INPUTS_SUCCESS = "UPDATING_USER_INPUTS_SUCCESS";
export const UPDATING_USER_INPUTS_FAILURE = "UPDATING_USER_INPUTS_FAILURE";
export const DELETING_USER = "DELETING_USER";
export const DELETING_USER_SUCCESS = "DELETING_USER_SUCCESS";
export const DELETING_USER_FAILURE = "DELETING_USER_FAILURE";
export const FETCHING_DATE_RANGE_DATA = "FETCHING_DATE_RANGE_DATA";
export const FETCHING_DATE_RANGE_DATA_SUCCESS =
    "FETCHING_DATE_RANGE_DATA_SUCCESS";
export const FETCHING_DATE_RANGE_DATA_FAILURE =
    "FETCHING_DATE_RANGE_DATA_FAILURE";
export const UPDATING_MIDDAY_INPUTS = "UPDATING_MIDDAY_INPUTS";
export const UPDATING_MIDDAY_INPUTS_SUCCESS = "UPDATING_MIDDAY_INPUTS_SUCCESS";
export const UPDATING_MIDDAY_INPUTS_FAILURE = "UPDATING_MIDDAY_INPUTS_FAILURE";
export const ADD_USER = "ADDING_USER";
export const ADD_USER_SUCCESS = "ADDING_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADDING_USER_FAILURE";

export const getUserData = () => dispatch => {
    dispatch({ type: FETCHING_USER });

    axiosWithAuth()
        .get("/user")
        .then(res => {
            // console.log("res: ", res);
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
        })
        .catch(err => {
            console.log("err: ", err);
            dispatch({ type: ERROR_FETCHING_USER_DATA, payload: err });
        });
};

export const getDataFromDateRange = date => dispatch => {
    dispatch({ type: FETCHING_DATE_RANGE_DATA });
    // date comes in as YYYY-MM-DD
    // convert date to MM-DD-YYYY format
    let startDate = `${date.slice(5, date.length)}-${date.slice(0, 4)}`;

    // if month is single digit, it will have a zero
    // don't want the zero for the api request
    if (startDate[0] === 0 || startDate[0] === "0") {
        startDate = startDate.slice(1, startDate.length);
    }

    const startDateObj = new Date(startDate);

    // gets a Date object for 6 days from the startDate
    const endDateObj = new Date(
        startDateObj.setDate(startDateObj.getDate() + 7)
    );
    // convert to date string in MM-DD-YYYY format and replace / with -
    let endDate = endDateObj.toLocaleDateString().replace(/\//g, "-");
    console.log(`start date is ${startDate}, end date is ${endDate}`);

    // https://sleep-tracker-server.herokuapp.com/api/data?start=12-29-2019&end=2-26-2020 would return all data from 12/29/2019 - 2/26/2020.
    axiosWithAuth()
        .get(`/data?start=${startDate}&end=${endDate}`)
        .then(res => {
            // console.log("getDataFromDateRange res: ", res);
            console.log("here are the **** dates", res.data.dates);

            dispatch({
                type: FETCHING_DATE_RANGE_DATA_SUCCESS,
                payload: res.data.dates,
            });
        })
        .catch(err => {
            console.log("Error getting data from date range: ", err);
            dispatch({ type: FETCHING_DATE_RANGE_DATA_FAILURE, payload: err });
        });
};

export const getMainData = () => dispatch => {
    dispatch({ type: FETCHING_MAIN_DATA });

    axiosWithAuth()
        .get("/data")
        .then(res => {
            console.log("res: ", res.data);
            dispatch({ type: FETCH_MAIN_DATA, payload: res.data });
        })
        .catch(err => {
            console.log("err: ", err);
            dispatch({ type: ERROR_FETCHING_MAIN_DATA, payload: err });
        });
};

export const postBedtimeInputs = valuesObj => dispatch => {
    dispatch({ type: POSTING_USER_INPUTS });
    // console.log(valuesObj);

    axiosWithAuth()
        .post("/night", valuesObj)
        .then(res => {
            // console.log("postUserInputs res: ", res);
            dispatch({ type: POSTING_USER_INPUTS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error posting user inputs: ", err);
            dispatch({ type: POSTING_USER_INPUTS_FAILURE, payload: err });
        });
};

export const putWakeUpInputs = valuesObj => dispatch => {
    dispatch({ type: UPDATING_USER_INPUTS });

    axiosWithAuth()
        .put("/wake", valuesObj)
        .then(res => {
            // console.log("PUT request response: ", res);
            dispatch({ type: UPDATING_USER_INPUTS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error updating data: ", err);
            dispatch({ type: UPDATING_USER_INPUTS_FAILURE, payload: err });
        });
};

export const putMiddayInputs = valuesObj => dispatch => {
    dispatch({ type: UPDATING_MIDDAY_INPUTS });

    axiosWithAuth()
        .put("/midday", valuesObj)
        .then(res => {
            // console.log("PUT request in midday inputs: ", res);
            dispatch({ type: UPDATING_MIDDAY_INPUTS, payload: res.data });
        })
        .catch(err => {
            console.log("Error with PUT request for midday: ", err);
            dispatch({
                type: UPDATING_MIDDAY_INPUTS_FAILURE,
                payload: err.message,
            });
        });
};

export const deleteUserAccount = () => dispatch => {
    dispatch({ type: DELETING_USER });

    axiosWithAuth()
        .delete("/user/delete")
        .then(res => {
            // console.log("delete res: ", res);
            dispatch({ type: DELETING_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error deleting account: ", err);
            dispatch({ type: DELETING_USER_FAILURE, payload: err });
        });
};

export const addUser = () => dispatch => {
    dispatch({ type: ADD_USER });

    axios()
        .post("https://sleep-tracker-server.herokuapp.com/api/auth/register")
        .then(res => {
            console.log(res.data);
            dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: ADD_USER_FAILURE, payload: err });
        });
};
