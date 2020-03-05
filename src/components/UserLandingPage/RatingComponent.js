import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
    box-sizing: border-box;
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: ${props => (props.isMiddayTiredness ? "10px" : "0")};
`;

const Heading = styled.h3`
    margin: 0;
`;

const EmojisWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
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
    isMoodForm,
    isMiddayTiredness, // for styling midday tiredness form
    moodEmojis,
    tirednessEmojis,
    handleChange,
    value,
}) => {
    const [ratingEmojis, setRatingEmojis] = useState({});

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
        <Wrapper isMiddayTiredness={isMiddayTiredness}>
            <Heading>{isMoodForm ? "Mood" : "Tiredness"}</Heading>
            {/* need to wait for ratingEmojis to be set */}
            {ratingEmojis.great && (
                <EmojisWrapper>
                    <Emoji
                        emoji={ratingEmojis.great.emoji}
                        ariaLabel={ratingEmojis.great.desc}
                        handleClick={() =>
                            handleChange(ratingEmojis.great.value)
                        }
                        isSelected={value === ratingEmojis.great.value}
                    />
                    <Emoji
                        emoji={ratingEmojis.ok.emoji}
                        ariaLabel={ratingEmojis.ok.desc}
                        handleClick={() => handleChange(ratingEmojis.ok.value)}
                        isSelected={value === ratingEmojis.ok.value}
                    />
                    <Emoji
                        emoji={ratingEmojis.bad.emoji}
                        ariaLabel={ratingEmojis.bad.desc}
                        handleClick={() => handleChange(ratingEmojis.bad.value)}
                        isSelected={value === ratingEmojis.bad.value}
                    />
                </EmojisWrapper>
            )}
        </Wrapper>
    );
};

const mapStateToProps = state => {
    return {
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
    };
};

export default connect(mapStateToProps, {})(RatingComponent);
