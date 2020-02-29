import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
    box-sizing: border-box;
    padding: 10px;
    width: 150px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const HiddenInput = styled.input`
    visibility: hidden;
`;

const EmojiContainer = styled.div`
    cursor: pointer;
`;

const StyledEmoji = styled.span`
    font-size: ${props => (props.isSelected ? "1.5rem" : "initial")};
    text-shadow: ${props =>
        props.isSelected ? "0px 0px 6px cadetblue" : "none"};
`;

const Emoji = ({ ariaLabel, emoji, isSelected, handleClick }) => (
    <EmojiContainer onClick={handleClick}>
        <StyledEmoji role="img" aria-label={ariaLabel} isSelected={isSelected}>
            {emoji}
        </StyledEmoji>
    </EmojiContainer>
);

const RatingComponent = ({
    ratingId,
    isMoodForm,
    moodEmojis,
    tirednessEmojis,
    handleChange,
    value,
}) => {
    const [ratingEmojis, setRatingEmojis] = useState({});
    // const [isSelected, setIsSelected] = useState(null);

    // const handleSelection = (handleChange, emoji) => {
    //     handleChange();
    //     setIsSelected(emoji);
    // };

    // useEffect(() => {
    //     console.log("isSelected: ", isSelected);
    // }, [isSelected]);

    useEffect(() => {
        let emojis = {};

        if (isMoodForm) {
            emojis = { ...moodEmojis };
        } else {
            emojis = { ...tirednessEmojis };
        }

        setRatingEmojis(emojis);
    }, [isMoodForm, moodEmojis, tirednessEmojis]);
    return (
        <>
            {ratingEmojis.great && (
                <Wrapper>
                    <Emoji
                        emoji={ratingEmojis.great.emoji}
                        ariaLabel={ratingEmojis.great.desc}
                        handleClick={() => {
                            console.log("in emoji");
                            handleChange(1);
                        }}
                        isSelected={value === 1}
                    />
                    <Emoji
                        emoji={ratingEmojis.ok.emoji}
                        ariaLabel={ratingEmojis.ok.desc}
                        handleClick={() => handleChange(2)}
                        isSelected={value === 2}
                    />
                    <Emoji
                        emoji={ratingEmojis.bad.emoji}
                        ariaLabel={ratingEmojis.bad.desc}
                        handleClick={() => handleChange(3)}
                        isSelected={value === 3}
                    />
                    {/* <EmojiContainer
                        value={props.values.mood}
                        onClick={() =>
                            handleSelection(
                                props.handleChange,
                                ratingEmojis.ok.emoji
                            )
                        }
                        name={ratingId}
                    >
                        <Emoji
                            emoji={ratingEmojis.ok.emoji}
                            ariaLabel={ratingEmojis.ok.desc}
                        />
                    </EmojiContainer>

                    <EmojiContainer
                        value={props.values.mood}
                        onClick={() =>
                            handleSelection(
                                props.handleChange,
                                ratingEmojis.bad.emoji
                            )
                        }
                        name={ratingId}
                    >
                        <Emoji
                            emoji={ratingEmojis.bad.emoji}
                            ariaLabel={ratingEmojis.bad.desc}
                        />
                    </EmojiContainer> */}
                </Wrapper>
            )}
        </>
    );
};

const mapStateToProps = state => {
    return {
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
    };
};

export default connect(mapStateToProps, {})(RatingComponent);

{
    /* <fieldset
                    id={ratingId}
                    onChange={e => setSelection(e.target.value)}
                >
                    <label htmlFor={`${ratingId}Great`}>
                        <span role="img" aria-label={ratingEmojis.great.desc}>
                            {ratingEmojis.great.emoji}
                        </span>
                    </label>
                    <HiddenInput
                        id={`${ratingId}Great`}
                        name={ratingId}
                        type="radio"
                        value={3}
                        checked={selection === 3}
                    />

                    <label htmlFor={`${ratingId}Ok`}>
                        <span role="img" aria-label={ratingEmojis.ok.desc}>
                            {ratingEmojis.ok.emoji}
                        </span>
                    </label>
                    <HiddenInput
                        id={`${ratingId}Ok`}
                        name={ratingId}
                        type="radio"
                        value={2}
                        checked={selection === 2}
                    />

                    <label htmlFor={`${ratingId}Bad`}>
                        <span role="img" aria-label={ratingEmojis.bad.desc}>
                            {ratingEmojis.bad.emoji}
                        </span>
                    </label>
                    <HiddenInput
                        id={`${ratingId}Bad`}
                        name={ratingId}
                        type="radio"
                        value={1}
                        checked={selection === 1}
                    />
                </fieldset> */
}
