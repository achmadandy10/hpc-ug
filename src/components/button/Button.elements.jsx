import { Link } from "react-router-dom";
import styled from "styled-components";

export const ButtonLinkContainer = styled(Link)`
    color: #FFFFFF;
    padding: 10px 24px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    
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
        box-shadow: 1px 1px 10px rgba(152, 0, 172, 0.308)
    }
`