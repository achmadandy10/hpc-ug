import { Link } from "react-router-dom";
import styled from "styled-components";

export const ButtonLinkContainer = styled(Link)`
    color: #FFFFFF;
    padding: 10px 24px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;
    font-size: var(--normal-font-size);
    
    ${({height}) => {
        if (height) {
            return `height: ${height}px;`
        }
    }}

    ${({width}) => {
        if (width) {
            return `width: ${width}px;`
        }
    }}

    ${({fullWidth}) => {
        if (fullWidth) {
            return `width: 100% !important;`
        }
    }}
    
    ${({type_button}) => {
        if (type_button === "transparent") {
            return `
                background: transparent;
                color: var(--first-color);
            `
        } else if (type_button === "border") {
            return `
                color: var(--first-color);
                border: 1px solid var(--first-color);
                background: transparent;
            `
        } else {
            return `
                background: var(--first-color);
            `
        }
    }}

    &:hover {
        box-shadow: ${({type_button}) => type_button === "transparent" ? "none;" : "var(--bs-first);"}
    }
`

export const ButtonSubmitContainer = styled.button`
    color: #FFFFFF;
    padding: 10px 24px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;
    font-size: var(--normal-font-size);
    
    ${({height}) => {
        if (height) {
            return `height: ${height}px;`
        }
    }}

    ${({width}) => {
        if (width) {
            return `width: ${width}px;`
        }
    }}

    ${({fullWidth}) => {
        if (fullWidth) {
            return `width: 100% !important;`
        }
    }}
    
    ${({type_button}) => {
        if (type_button === "transparent") {
            return `
                background: transparent;
                color: var(--first-color);
            `
        } else if (type_button === "border") {
            return `
                color: var(--first-color);
                border: 1px solid var(--first-color);
                background: transparent;
            `
        }
    }}

    ${({color}) => {
        if (color === "primary") {
            return `
                background: var(--first-color);
                &:hover {
                    box-shadow: var(--bs-first);
                }
            `
        } else if (color === "warning") {
            return `
                background: var(--warning-color);
                &:hover {
                    box-shadow: 1px 1px 10px rgba(161, 172, 0, 0.308);
                }
            `
        } else if (color === "danger") {
            return `
                background: var(--danger-color);
                &:hover {
                    box-shadow: 1px 1px 10px rgba(172, 0, 0, 0.308);
                }
            `
        } else if (color === "success") {
            return `
                background: var(--success-color);
                &:hover {
                    box-shadow: 1px 1px 10px rgba(40, 172, 0, 0.308);
                }
            `
        } else {
            return `
                background: var(--text-color-light);
                &:hover {
                    box-shadow: 1px 1px 10px rgba(86, 84, 87, 0.308);
                }
            `
        }
    }}

`

export const ButtonIconLinkContainer = styled(Link)`
    color: #FFFFFF;
    padding: 5px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;
    font-size: var(--normal-font-size);

    ${({color}) => {
        if (color === "info") {
            return `
                background: var(--info-color);
            `
        } else if (color === "danger") {
            return `
                background: var(--danger-color);
            `
        } else if (color === "success") {
            return `
                background: var(--success-color);
            `
        } else if (color === "warning") {
            return `
                background: var(--warning-color);
            `
        } else if (color === "primary") {
            return `
                background: var(--first-color);
            `
        } else {
            return `
                background: var(--text-color-light);
            `
        }
    }}
`

export const ButtonIconSubmitContainer = styled.button`
    color: #FFFFFF;
    padding: 5px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;
    font-size: var(--normal-font-size);
    
    ${({color}) => {
        if (color === "info") {
            return `
                background: var(--info-color);
            `
        } else if (color === "danger") {
            return `
                background: var(--danger-color);
            `
        } else if (color === "success") {
            return `
                background: var(--success-color);
            `
        } else if (color === "warning") {
            return `
                background: var(--warning-color);
            `
        } else if (color === "primary") {
            return `
                background: var(--first-color);
            `
        } else {
            return `
                background: var(--text-color-light);
            `
        }
    }}
`