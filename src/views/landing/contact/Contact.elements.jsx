import styled from "styled-components";

export const ContactContainer = styled.div`
    width: 100%;
    background: var(--container-color);
    padding: 10px 80px;
`

export const ContactHeader = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const ContactContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`

export const ContactDetail = styled.div`
    display: flex;
    flex-direction: column;
`