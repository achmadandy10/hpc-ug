import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.header`
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 0 80px;

    &.scroll {
        border-bottom: 1px solid rgb(214, 214, 214);
    }

    @media only Screen and (max-width: 767px) {
        padding: 10px 20px;
    }
`

export const NavbarHamburgerContainer = styled.div`
    cursor: pointer;
    width: 30px;
    height: 48px;
    justify-content: center;
    align-items: center;
    display: none;
    flex-direction: column;
    position: relative;
    z-index: 2;

    @media only Screen and (max-width: 767px) {
        display: flex;
    }
`

export const NavbarHamburgerTop = styled.div`
    margin-bottom: 6px;
    position: relative;
    height: 4px;
    border-radius: 4px;
    background: #333;
    line-height: 25px;
    width: 100%;
    transition: all 350ms, background 150ms;

    &.x {
        transform: translateY(10px) rotate(-45deg);
        transition: all 350ms ease 0s, background 150ms ease 0s;
        animation: 0.5s ease 0s 1 normal none running topBarX;
    }
`

export const NavbarHamburgerMiddle = styled.div`
    position: relative;
    height: 4px;
    border-radius: 4px;
    background: #333;
    line-height: 25px;
    width: 100%;
    transition: all 350ms, background 150ms;

    &.x {
        opacity: 0;
    }
`

export const NavbarHamburgerBottom = styled.div`
    margin-top: 6px;
    position: relative;
    height: 4px;
    border-radius: 4px;
    background: #333;
    line-height: 25px;
    width: 100%;
    transition: all 350ms, background 150ms;

    &.x {
        transform: translateY(-10px) rotate(45deg);
        transition: all 350ms ease 0s, background 150ms ease 0s;
        animation: 0.5s ease 0s 1 normal none running bottomBarX;
    }
`

export const NavbarLogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: var(--font-semi-bold);
    padding-right: 16px;
    font-size: var(--h3-font-size);
    color: var(--first-color);

    @media only Screen and (max-width: 767px) {
        font-size: 0;
    }
`

export const NavbarLogo = styled.img`
    height: 50px;

    @media only Screen and (max-width: 768px) {
        height: 30px;
    }
`

export const NavbarMenu = styled.nav`
    @media only Screen and (max-width: 767px) {
        display: none;
    }

    &.show {
        position: absolute;
        top: 65px;
        left: 0;
        right: 0;
        display: block;
        background: var(--container-color);
        padding: 20px;
    }
`

// Submenu
export const NavbarSubMenuList = styled.ul`
    position: absolute;
    left: 0;
    width: 250px;
    background: var(--container-color);
    border-radius: 3px;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    padding: 10px;
    transition: .3s;
    display: none;

    @media only Screen and (max-width: 767px) {
        position: relative;
        width: 100%;
    }
`

export const NavbarSubMenuLink = styled(Link)`
    display: flex;
    width: 100%;
    color: var(--title-color);
    padding: 10px;
`

export const NavbarSubMenuItem = styled.li`
    width: 100%;
    border-radius: 3px;
    
    &:hover {
        background: var(--first-color);
        
        & ${NavbarSubMenuLink} {
            color: var(--container-color);
        }
    }
`

// Menu
export const NavbarMenuList = styled.ul`
    height: 100%;
    display: flex;
    align-items: center;

    @media only Screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
    }
`

export const NavbarMenuItem = styled.li`
    position: relative;
    float: left;

    & svg {
        margin-left: 5px;
        font-size: var(--small-font-size);
    }

    &:hover ${NavbarSubMenuList} {
        display: inline-block;
    }
`

export const NavbarMenuLink = styled(Link)`
    padding: 20px;
    font-size: var(--normal-font-size);
    color: var(--title-color);
    display: block;
`