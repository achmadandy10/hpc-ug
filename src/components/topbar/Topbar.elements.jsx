import { Link } from "react-router-dom";
import styled from "styled-components";

export const TopbarContainer = styled.div`
    width: 100%;
    height: 70px;
    background: var(--container-color);
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: var(--bs-smooth);

    @media only Screen and (max-width: 500px) {
        height: 50px;
    }
`

export const TopbarWrapper = styled.div`
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const TopbarLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

export const TopbarToggle = styled.div`
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    @media only Screen and (max-width: 500px) {
        display: flex;
    }
`

export const TopbarLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const TopbarLogoImg = styled.img`
    width: 50px;
    height: 50px;

    @media only Screen and (max-width: 500px) {
        width: 30px;
        height: 30px;
    }
`

export const TopbarLogoTitle = styled.span`
    font-size: var(--h3-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);

    @media only Screen and (max-width: 500px) {
        font-size: var(--normal-font-size);
    }

    @media only Screen and (max-width: 400px) {
        display: none;
    }
`

export const TopbarRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
`

export const TopbarFeauture = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const TopbarIconContainer = styled.div`
    position: relative;
    font-size: var(--h3-font-size);
    color: var(--title-color);

    & svg {
        cursor: pointer; 
    }
`

export const TopbarIconBag = styled.span`
    position: absolute;
    top: -12px;
    right: -12px;
    background-color: var(--info-color);
    color: #FFFFFF;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`

export const TopbarProfileDropdownContainer = styled.div`
    position: absolute;
    top: 70px;
    right: 0;
    background: var(--container-color);
    box-shadow: var(--bs-smooth);
    border-radius: 3px;
    padding: 10px;
    width: 150px;
    transition: .1s ease;
    visibility: hidden;
    transform: scale(0);
    
    &.show {
        visibility: visible;
        transform: scale(1);
    }

    @media only Screen and (max-width: 500px) {
        top: 50px;
        right: -10px;
    }
`

export const TopbarProfileDropdownList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const TopbarProfileDropdownLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--normal-font-size);
    color: var(--title-color);
    padding: 5px 10px;
    border-radius: 3px;

    &:hover {
        background: var(--first-color);
        color: #FFF !important;
    }

    & svg {
        font-size: var(--normal-font-size) !important;
    }
`

export const TopbarProfileDropdownLogout = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--normal-font-size);
    color: var(--title-color);
    padding: 7px 10px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background: var(--first-color);
        color: #FFF !important;
    }

    & svg {
        font-size: var(--h3-font-size) !important;
    }
`

export const TopbarProfile = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & svg {
        cursor: pointer;
        
        @media only Screen and (max-width: 500px) {
            font-size: var(--smaller-font-size);
        }
    }
`

export const TopbarProfileName = styled.span`
    font-size: var(--normal-font-size);
    color: var(--title-color);
`

export const TopbarProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;

    @media only Screen and (max-width: 500px) {
        width: 30px;
        height: 30px;
    }
`