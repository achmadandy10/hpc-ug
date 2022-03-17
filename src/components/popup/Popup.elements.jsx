import styled from "styled-components"

export const PopupInner = styled.div`
    position: relative;
    padding: 20px;
    width: 100%;
    max-width: 640px;
    background-color: var(--container-color);
    border-radius: 3px;
    transition: .2s;
    visibility: hidden;
    transform: scale(0);
    max-height: 90vh;
    overflow-y: auto;
`

export const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    visibility: hidden;
    
    &.active {
        visibility: visible;

        & ${PopupInner}{
            visibility: visible;
            transform: scale(1);
        }
    }
`

export const PopupClose = styled.button`
    background-color: transparent;
    font-size: var(--h3-font-size);
    color: var(--title-color);
    cursor: pointer;
`

export const PopupTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`

export const PopupTitle = styled.h2`
    font-size: var(--h3-font-size);
    color: var(--title-color);
    font-weight: 600;
`