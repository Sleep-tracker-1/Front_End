import {
    FETCHING_USER,
    FETCH_USER_DATA,
    ERROR_FETCHING_USER_DATA,
    POSTING_USER_INPUTS,
    POSTING_USER_INPUTS_SUCCESS,
    POSTING_USER_INPUTS_FAILURE,
    UPDATING_USER_INPUTS,
    UPDATING_USER_INPUTS_SUCCESS,
    UPDATING_USER_INPUTS_FAILURE,
    DELETING_USER,
    DELETING_USER_SUCCESS,
    DELETING_USER_FAILURE,
} from "../actions/bwActions";

const initialState = {
    // initialize your state here
    user: {
        userId: "",
        username: "",
        email: "",
        sleepRecommendation: "", // after 30+ days of data
        dates: [
            {
                date: "",
                dateId: "",
                totalTimeInBed: 0,
                wakeUp: {
                    time: "",
                    mood: 0,
                    tiredness: 0,
                },
                midday: {
                    mood: 0,
                    tiredness: 0,
                },
                bedtime: {
                    time: "",
                    mood: 0,
                    tiredness: 0,
                },
            },
        ],
    },

    // need to add their numeric values here for the DS model
    // pass the value for the `isSelected` prop in the Emoji component in RatingComponent
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
        case POSTING_USER_INPUTS:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case POSTING_USER_INPUTS_SUCCESS:
            let datesArray = [...state.user.dates];

            // get the index of the date object we want to update
            const dateIndex = datesArray.findIndex(
                day => day.dateId === action.payload.dateId
            );

            // check if date exists -- if it's a new day, it shouldn't exist yet
            // add the new date to the end of the array
            datesArray = [...datesArray, action.payload.dateObj];

            // update just that date object
            datesArray[dateIndex].midday.mood = 3; // ...do our updating

            return {
                ...state,
                user: {
                    ...state.user,
                    dates: datesArray,
                },
                isLoading: false,
                error: "",
            };
        case POSTING_USER_INPUTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case UPDATING_USER_INPUTS:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case UPDATING_USER_INPUTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: "",
            };
        case UPDATING_USER_INPUTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case DELETING_USER:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case DELETING_USER_SUCCESS:
            // we should probably reset the user object to its initial state after the user has been deleted
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: "",
            };
        case DELETING_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
