import { Link } from "react-router-dom";
import styled from "styled-components";

export const ButtonLinkContainer = styled(Link)`
    color: #FFFFFF;
    padding: 10px 24px;
    border-radius: 8px;
    height: ${({height}) => height ? `${height}px` : 0 };
    width: ${({width}) => width ? `${width}px` : 0 };
    
    ${({bgColor}) => {
        if (bgColor === "transparent") {
            return `
                background: transparent;
            `
        } else if (bgColor === "border") {
            return `
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