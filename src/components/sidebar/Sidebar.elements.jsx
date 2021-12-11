import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.div`
    padding: 20px 0 20px 20px;
    color: var(--title-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`

export const SidebarMenuContainer = styled.div`
    max-height: 65vh;
    overflow-y: auto;
`

export const SidebarDashboard = styled(NavLink)`
    padding: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--title-color);
    font-size: var(--normal-font-size);
    border-radius: 3px;
    margin-bottom: 10px;

    & svg {
        font-size: var(--h3-font-size);
    }

    &:hover,
    &.active {
        background: var(--first-color);
        color: var(--container-color);
    }
`

export const SidebarMenu = styled.div`
    margin-bottom: 10px;
`

export const SidebarTitle = styled.h3`
    font-size: var(--normal-font-size);
    color: var(--text-color);
`

export const SidebarList = styled.ul`
    list-style: none;
    padding: 5px 0;
`

export const SidebarListItem = styled(NavLink)`
    cursor: pointer;
    padding: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 3px;
    color: var(--title-color);
    font-size: var(--normal-font-size);

    & svg {
        font-size: var(--h3-font-size);
    }

    &:hover,
    &.active {
        background: var(--first-color);
        color: var(--container-color);
    }
`

export const SidebarLogout = styled.button`
    padding: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--title-color);
    font-size: var(--normal-font-size);
    border-radius: 3px;
    cursor: pointer;
    width: 100%;

    & svg {
        font-size: var(--h3-font-size);
    }

    &:hover,
    &.active {
        background: var(--first-color);
        color: var(--container-color);
    }
`