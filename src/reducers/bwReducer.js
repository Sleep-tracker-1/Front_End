import {
    FETCHING_USER,
    FETCH_USER_DATA,
    ERROR_FETCHING_USER_DATA,
} from "../actions/bwActions";

const initialState = {
    // initialize your state here
    user: {},
    moodEmojis: {
        great: {
            emoji: "😊",
            desc: "smiling face with smiling eyes",
        },
        ok: {
            emoji: "😐",
            desc: "neutral face",
        },
        bad: {
            emoji: "🙁",
            desc: "Sad frowning face",
        },
    },
    tirednessEmojis: {
        great: {
            emoji: "🥳",
            desc: "energetic party face",
        },
        ok: {
            emoji: "😐",
            desc: "neutral face",
        },
        bad: {
            emoji: "😴",
            desc: "Sleeping face",
        },
    },
    isLoading: false,
    error: "",
};

export const bwReducer = (state = initialState, action) => {
    switch (action.type) {
        // your cases here
        case FETCHING_USER:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_USER_DATA:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: "",
            };
        case ERROR_FETCHING_USER_DATA:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
