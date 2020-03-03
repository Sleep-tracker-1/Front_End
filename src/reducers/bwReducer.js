const initialState = {
    // initialize your state here

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
};

export const bwReducer = (state = initialState, action) => {
    switch (action.type) {
        // your cases here
        default:
            return state;
    }
};
