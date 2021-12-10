import { Link } from "react-router-dom";
import styled from "styled-components";

export const TopbarContainer = styled.div`
    width: 100%;
    background: var(--container-color);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0 auto;
    z-index: 1000;
`

export const TopbarLogo = styled.img`
    width: 3rem;
    height: 3rem;
`

export const TopbarSearchContainer = styled.div`
    display: flex;
    align-items: center;
    background: #F2F2F2;
    width: 32vw;
    border-radius: 3px;
    gap: 1rem;
    color: var(--text-color);
    padding: 10px 20px;
    position: absolute;
    left: 15%;
    color: var(--title-color);
`

export const TopbarSearchInput = styled.input`
    color: var(--title-color);
    background: transparent;
    outline: none;
    border: none;
    width: 100%;
    font-size: var(--normal-font-size);

    &::placeholder {
        color: var(--text-color-light);
    }
`

export const TopbarFeatureArea = styled.div`
    display: flex;
    align-items: center;
    gap: 4rem;
`

export const TopbarFeatureContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const TopbarFeautureMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: var(--h3-font-size);
    cursor: pointer;

    &:hover {
        color: var(--first-color);
    }
`

export const TopbarFeautureMenuBadge = styled.div`
    position: absolute;
    top: -12px;
    right: -10px;
    font-size: var(--smaller-font-size);
    background-color: var(--info-color);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: var(--container-color);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TopbarSeparator = styled.div`
    border-left: 1px solid var(--title-color);
    height: 30px;
`

export const TopbarProfileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;

    & svg {
        cursor: pointer;
    }
`

export const TopbarProfileImg = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: block;
    overflow: hidden;
`

export const TopbarProfileName = styled.h5`
    font-size: var(--normal-font-size);
    font-weight: 500;
`

export const TopbarProfileDropdownContainer = styled.div`
    position: absolute;
    top: 55px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: var(--container-color);
    border-radius: 3px;
    transition: .2s ease;
    right: -10px;
    box-shadow: var(--bs-smooth);
    gap: 20px;
    visibility: hidden;
    opacity: 0;

    &.active {
        visibility: visible;
        opacity: 1;
    }

    &::before {
        content: "";
        position: absolute;
        top: -10px;
        right: 10px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid var(--first-color);
    }
`

export const TopbarProfileDropdownItem = styled(Link)`
    font-size: var(--normal-font-size);
    background: transparent;
    color: var(--title-color);
    gap: 10px;
    display: flex;
    align-items: center; 

    & svg {
        font-size: var(--h3-font-size);
    }

    &:hover {
        color: var(--first-color);
    }
`

export const TopbarProfileDropdownItemLogout = styled.button`
    font-size: var(--normal-font-size);
    background: transparent;
    color: var(--title-color);
    gap: 10px;
    display: flex;
    align-items: center;
    cursor: pointer; 

    & svg {
        font-size: var(--h3-font-size);
    }

    &:hover {
        color: var(--first-color);
    }
`

export const TopbarMenuButton = styled.button`
    display: none;
`