import { Link } from "react-router-dom";
import styled from "styled-components";

export const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    font-size: var(--small-font-size);
    padding: 20px;

    @media only Screen and (max-width: 560px) {
        flex-direction: column-reverse;
        gap: 10px;
    }
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

    @media only Screen and (max-width: 560px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
`

export const FooterLink = styled(Link)`
    color: var(--title-color);

    & svg {
        font-size: var(--h3-font-size);
    }

    @media only Screen and (max-width: 560px) {
        text-align: center;
    }
`

export const FooterSocial = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: var(--title-color);
`