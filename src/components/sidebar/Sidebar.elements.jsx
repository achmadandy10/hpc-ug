import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 83vh;
`

export const SidebarButtonClose = styled.button`
    display: none;
`

export const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const SidebarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 15px;
    height: 40px;
    color: var(--title-color);
    position: relative;
    transition: all 300ms ease;
    font-weight: 400;
    padding: 25px 0;

    &.active {
        background-color: var(--container-color);
        color: var(--first-color);
        border-radius: 3px;
        box-shadow: var(--bs-smooth);

        &::before {
            content: "";
            width: 6px;
            height: 100%;
            position: absolute;
            background-color: var(--first-color);
            border-top-left-radius: 3px;
        }
    }

    & svg {
        transition: all 300ms ease;
        font-size: var(--h2-font-size);
        margin-left: 30px;
    }

    &:hover {
        color: var(--first-color);

        & svg {
            margin-left: 20px;
        }
    }
`

export const SidebarLogoutButton = styled.button`
    background-color: var(--container-color);
    padding: 20px;
    border-radius: 3px;
    cursor: pointer;
    font-size: var(--normal-font-size);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: var(--title-color);
    transition: all 300ms ease;
    box-shadow: var(--bs-smooth);

    & svg {
        font-size: var(--h2-font-size);
    }

    &:hover {
        background-color: var(--first-color);
        color: var(--container-color)
    }
`