import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useOnClickOutside from "../hooks/useOnClickOutside";

import { FaCloudMoon } from "react-icons/fa";

// giving the header a hard coded height breaks the hamburger nav
// workaround = giving a hard height to the ImageLink
const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #d2d1cf;
    box-shadow: 2px 0px 9px 6px rgba(187, 187, 187, 0.6);
`;

const HeaderWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 950px) {
        width: 90%;
    }
    @media (max-width: 830px) {
        width: 100%;
        height: 100%;
        margin: 0;
        display: grid;
        grid-template-areas:
            "title   title   hamburger"
            "nav     nav     nav";
        & > * {
            flex-grow: 1;
        }
    }
`;

const LinkWrapper = styled.div`
    max-width: 270px;
    margin-left: 0;

    @media (max-width: 830px) {
        margin-left: 1.5rem;
        grid-area: title;
        width: 115px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const Heading = styled.h3`
    font-size: 1.5rem;
`;

const ImageLink = styled.a`
    display: none;
    width: 0;
    font-size: 2rem;

    @media (max-width: 830px) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 75px;
        height: 75px;
        cursor: pointer;
    }
`;

const NameLink = styled.a`
    text-shadow: none;
    background-image: none;
    text-decoration: none;
    height: 75px;
    display: flex;
    cursor: pointer;

    @media (max-width: 830px) {
        display: none;
    }
`;

const Nav = styled.nav`
    width: 350px;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;

    @media (max-width: 830px) {
        grid-area: nav;
        max-height: 0;
        max-width: unset;
        width: 100%;
        transition: max-height 0.2s ease-out;
        overflow: hidden;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;

        li:last-of-type {
            border-bottom: none;
        }
    }
`;

const Input = styled.input`
    position: absolute;
    top: -100%;
    left: -100%;

    @media (max-width: 830px) {
        display: none;

        &:checked ~ nav {
            max-height: 240px;
            background-color: #d2d1cf;
        }

        &:checked ~ label span {
            background: transparent;
        }

        &:checked ~ label span:before {
            transform: rotate(-45deg);
        }

        &:checked ~ label span:after {
            transform: rotate(45deg);
        }

        &:checked ~ label span:before,
        &:checked ~ label span:after {
            top: 0;
        }
    }
`;

const Label = styled.label`
    visibility: hidden;

    @media (max-width: 830px) {
        grid-area: hamburger;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
        padding: 30px 10px;
        margin-right: calc(1.5rem - 10px);
        position: relative;
        user-select: none;
        visibility: visible;
    }
`;

const Span = styled.span`
    @media (max-width: 830px) {
        background: #333;
        display: block;
        height: 3px;
        width: 20px;
        position: relative;
        &:before {
            top: 6px;
        }
        &:after {
            top: -6px;
        }
        &:before,
        &:after {
            background: #333;
            display: block;
            width: 100%;
            height: 100%;
            content: "";
            position: absolute;
            transition: all 0.2s ease-out;
        }
    }
`;

// container for nav link
const NavItem = styled.div`
    background: #d2d1cf;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    cursor: pointer;
    @media (max-width: 830px) {
        padding: 20px 20px;
        width: 100%;
        text-align: center;
        border-bottom: solid 1px rgba(45,156,219, 0.4);
`;

const NavLinkContainer = styled(NavLink)`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-image: none;
    width: 100%;
`;

const ListLink = props => {
    return (
        <NavItem>
            <NavLinkContainer to={props.to}>{props.val}</NavLinkContainer>
        </NavItem>
    );
};

export default props => {
    const headerRef = useRef(null);
    const [menuIsOpen, toggleMenu] = useState(false);

    useOnClickOutside(headerRef, () => toggleMenu(false));

    const handleLogoutClick = e => {
        localStorage.clear();
        // localStorage.removeItem("token");
        props.history.push("/");
    };

    return (
        <Header ref={headerRef}>
            <HeaderWrapper>
                <LinkWrapper>
                    <ImageLink to="/">
                        <FaCloudMoon />
                    </ImageLink>
                    <NameLink to="/">
                        <Heading>{props.headerText}</Heading>
                    </NameLink>
                </LinkWrapper>
                <Input
                    type="checkbox"
                    id="menu-btn"
                    aria-label="Checkbox to open and close hamburger menu"
                    checked={menuIsOpen}
                    onChange={() => toggleMenu(menuIsOpen)}
                />
                <Label
                    htmlFor="menu-btn"
                    onClick={() => toggleMenu(!menuIsOpen)}
                >
                    <Span />
                </Label>
                <Nav>
                    <ListLink to="/" val="View History" />
                    <ListLink to="/" val="Account" />
                    <ListLink
                        to="/bees"
                        val="Sign Out"
                        onClick={handleLogoutClick}
                    />
                </Nav>
            </HeaderWrapper>
        </Header>
    );
};
