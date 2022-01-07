import styled from "styled-components";

export const ServiceContentContainer = styled.div`
    width: 100%;
    overflow: hidden;
    background: var(--body-color);
    padding: 10px 80px;
`

export const ServiceContentCard = styled.div`
    padding: 50px;
    border-radius: 3px;
    box-shadow: var(--bs-smooth);
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const ServiceContentTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const ServiceContentThumbnail = styled.img`
    width: 300px;
    height: 200px;
    display: flex;
    margin: auto;
`