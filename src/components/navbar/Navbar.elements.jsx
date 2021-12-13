import styled from "styled-components";
import { Link } from "react-router-dom";

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
`

export const NavbarMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media only Screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
`

export const NavbarMenuContainer = styled.div`
    background: none;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 20px;

    @media only Screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }
`

export const NavbarContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 2000;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 11px 2% 11px 2%;

    &.scroll {
        border-bottom: 1px solid rgb(214, 214, 214);
        
        @media only Screen and (max-width: 768px) {
            flex-direction: row;

            & ${NavbarMenuContainer} {
                align-items: flex-end;
                justify-content: flex-end;
            }

            & ${NavbarMenu} {
                display: none;
            }
        }

    }

    @media only Screen and (max-width: 768px) {
        padding-left: 15px;
        padding-right: 15px;
        flex-direction: column;
    }
`

export const NavbarTitle = styled(Link)`
    background: none;
    color: var(--title-color);
    font-size: var(--h2-font-size);
    font-weight: var(--font-semi-bold);
    line-height: 50px;

    @media only Screen and (max-width: 768px) {
        line-height: 40px;
    }
`

export const NavbarMenuLink = styled(Link)`
    color: var(--title-color);
    height: 50px;
    line-height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;

    @media only Screen and (max-width: 768px) {
        height: 40px;
        line-height: 40px;
    }

    &:hover div {
        visibility: visible;
        transform: scale(1);
    }
`

export const NavbarSubmenuLinkContainer = styled.div`
    position: absolute;
    top: 50px;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    border: 1px solid var(--title-color);
    border-radius: 3px;
    transition: .3s;
    visibility: hidden;
    transform: scale(0);
`

export const NavbarSubmenuLink = styled(Link)`
    color: var(--title-color);
    line-height: normal;
    padding: 10px;

    &:hover {
        color: var(--container-color);
        background-color: var(--first-color);
    }
`