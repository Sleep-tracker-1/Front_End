import { axiosWithAuth } from "../utils/axiosWithAuth";

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

export const getUserData = () => dispatch => {
    dispatch({ type: FETCHING_USER });

    axiosWithAuth()
        .get("/user")
        .then(res => {
            console.log("res: ", res);
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
        })
        .catch(err => {
            console.log("err: ", err);
            dispatch({ type: ERROR_FETCHING_USER_DATA, payload: err });
        });
};

export const getMainData = () => dispatch => {
    dispatch({ type: FETCHING_MAIN_DATA });

    axiosWithAuth()
        .get("/data")
        .then(res => {
            console.log("res: ", res);
            dispatch({ type: FETCH_MAIN_DATA, payload: res.data });
        })
        .catch(err => {
            console.log("err: ", err);
            dispatch({ type: ERROR_FETCHING_MAIN_DATA, payload: err });
        });
};

export const postUserInputs = () => dispatch => {
    dispatch({ type: POSTING_USER_INPUTS });

    axiosWithAuth()
        .post("")
        .then(res => {
            console.log("postUserInputs res: ", res);
            dispatch({ type: POSTING_USER_INPUTS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error posting user inputs: ", err);
            dispatch({ type: POSTING_USER_INPUTS_FAILURE, payload: err });
        });
};

export const updateUserInputs = () => dispatch => {
    dispatch({ type: UPDATING_USER_INPUTS });

    axiosWithAuth()
        .put("")
        .then(res => {
            console.log("PUT request response: ", res);
            dispatch({ type: UPDATING_USER_INPUTS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error updating data: ", err);
            dispatch({ type: UPDATING_USER_INPUTS_FAILURE, payload: err });
        });
};

export const deleteUserAccount = () => dispatch => {
    dispatch({ type: DELETING_USER });

    axiosWithAuth()
        .delete()
        .then(res => {
            console.log("delete res: ", res);
            dispatch({ type: DELETING_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error deleting account: ", err);
            dispatch({ type: DELETING_USER_FAILURE, payload: err });
        });
};
