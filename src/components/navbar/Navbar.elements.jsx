import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarTopContainer = styled.div`
    position: relative;
    top: 0;
    z-index: 4000;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: space-between;
    padding: 0 2% 0 2%;
    backdrop-filter: saturate(180%) blur(20px);
    width: 100%;

    @media only Screen and (max-width: 767px) {
        padding: 0px 15px 0 15px;
        top: 0;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #D6D6D6;
        background-color: #FFFFFF;
        z-index: 3000;
        display: flex;
    }
`

export const NavbarTopHamburgerContainer = styled.div`
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

export const NavbarTopHamburgerTop = styled.div`
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

export const NavbarTopHamburgerMiddle = styled.div`
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

export const NavbarTopHamburgerBottom = styled.div`
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

export const NavbarTopLeft = styled.div`
    display: flex;
    align-items: center;
    background: transparent;

    @media only Screen and (max-width: 767px) {
        position: absolute;
        top: 48px;
        width: 100%;
        left: -100%;
        background: #FFFFFF;
        flex-direction: column;
        border: 1px solid #D6D6D6;
        overflow: hidden;
        transition: .3s;
        
        &.show {
            display: flex;
            left: 0;
        }
    }
`

export const NavbarLogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: var(--font-semi-bold);
    padding-right: 16px;
    
    @media only Screen and (max-width: 767px) {
        font-size: 0;
    }
`

export const NavbarLogo = styled.img`
    height: 40px;
`

export const NavbarLinkVerticalPipe = styled.span`
    visibility: hidden;
    height: 10px;
    width: 3px;
    background: var(--first-color);
    position: absolute;
    bottom: 0;
    left: 50%;
    
    @media only Screen and (max-width: 767px) {
        display: none;    
    }
`

export const NavbarLinkSubitemContainer = styled.div`
    background-color: #FFFFFF;
    width: 450px;
    top: 55px;
    margin-left: -225px;
    left: 50%;
    visibility: hidden;
    position: absolute;
    z-index: var(--z-modal);
    border: 1px solid #D6D6D6;

    @media only Screen and (max-width: 767px) {
        position: relative;
        top: 0;
        height: 0;
    }
`

export const NavbarLinkSubitemBorderSlider = styled.div`
    background-color: var(--first-color);
    position: relative;
    z-index: var(--z-modal);
    height: 2px;
    margin: -1px auto 0 auto;
    margin-top: -1px;
    width: 0;
    transition: 0.3s;
`

export const NavbarLinkText = styled.span`
    line-height: 55px;
    height: 55px;
    display: inline-block;
    padding-top: 3px;
`

export const NavbarLinkContainer = styled.div`
    background: transparent;
    vertical-align: top;
    padding: 0 1.2vw 0 1.2vw;
    display: flex;
    position: relative;

    @media only Screen and (max-width: 767px) {
        flex-direction: column;
        transition: .1s ease-in-out;
        width: 100%;

        &:hover {
            background: var(--first-color);

            & ${ NavbarLinkText } {
                color: #FFFFFF;
            }
        }
    }

    &:hover ${ NavbarLinkVerticalPipe } {
        visibility: visible;
    }

    &:hover ${ NavbarLinkSubitemContainer } {
        visibility: visible;

        @media only Screen and (max-width: 767px) {
            height: 100%;
        }
    }
    
    &:hover ${ NavbarLinkSubitemBorderSlider } {
        width: 50%;
        
        @media only Screen and (max-width: 767px) {
            width: 100%;
        }
    }
`

export const NavbarLink = styled(Link)`
    text-align: center;
    color: var(--title-color);
    font-size: var(--small-font-size);
    display: block;
`

export const NavbarLinkSubitemTitle = styled.span`
    line-height: 1em;
    display: block;
    font-size: 16px;
    margin-bottom: 6px;
    color: var(--title-color);
    font-weight: normal;
`

export const NavbarLinkSubitem = styled(Link)`
    display: flex;
    align-items: flex-start;
    padding: 16px 32px;
    justify-content: space-between;

    &:first-of-type {
        margin-top: 16px;
    }

    &:hover {
        background: #F9F9F9F9;
    }

    &:hover ${ NavbarLinkSubitemTitle } {
        color: var(--first-color);
    }
`

export const NavbarLinkSubitemLeft = styled.span`
    width: 75px;
    display: inline-block;
    flex-shrink: 0;
    flex-grow: 0;
    text-align: center;
`

export const NavbarLinkSubitemImg = styled.img`
    max-width: 75px;
    max-height: 60px;
`

export const NavbarLinkSubitemRight = styled.span`
    padding-left: 24px;
`

export const NavbarLinkSubitemDescription = styled.span`
    display: block;
    line-height: 1.6em;
    font-size: 14px;
    font-weight: 300;
    color: var(--text-color);
`

export const NavbarTopRight = styled.div`
    display: flex;
    align-items: center;
    background: transparent;

    @media only Screen and (max-width: 767px) {
        display: none;
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
    margin-bottom: 32px;
    padding: 11px 2% 11px 2%;
`

export const NavbarTitle = styled(Link)`
    background: none;
    color: var(--title-color);
    font-size: var(--h2-font-size);
    font-weight: var(--font-semi-bold);
    line-height: 50px;
`

export const NavbarMenuContainer = styled.div`
    background: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
`

export const NavbarMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px
`

export const NavbarMenuLink = styled(Link)`
    color: var(--title-color);
    height: 50px;
    line-height: 50px;
`