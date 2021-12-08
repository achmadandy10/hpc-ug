import { Link } from "react-router-dom";
import styled from "styled-components";

export const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    font-size: var(--small-font-size);
    padding: 20px;
`

export const FooterCopyRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-light);
`

export const FooterInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

export const FooterLink = styled(Link)`
    color: var(--title-color);

    & svg {
        font-size: var(--h3-font-size);
    }
`

export const FooterSocial = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: var(--title-color);
`