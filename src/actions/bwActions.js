import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCHING_USER = "FETCHING_USER";
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const ERROR_FETCHING_USER_DATA = "ERROR_FETCHING_USER_DATA";

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
