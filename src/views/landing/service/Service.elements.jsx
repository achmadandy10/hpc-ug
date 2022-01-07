import styled from "styled-components";

export const ServiceContainer = styled.div`
    width: 100%;
    overflow: hidden;
    background: var(--body-color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px 80px;
    gap: 20px;
`

export const ServiceTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const ServiceContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

export const ServiceContentItem = styled.div`
    flex: 1 1 400px;
    position: relative;
    width: 400px;
    height: 300px;
    border-radius: 3px;
    box-shadow: var(--bs-smooth);
`

export const ServiceContentImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    box-shadow: var(--bs-smooth);
`

export const ServiceContentOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    opacity: 0;
    transition: .3s;

    & > * {
        transform: translateY(20px);
        transition: .3s;
    }

    &:hover {
        opacity: 1;
    }

    &:hover > * {
        transform: translateY(0);
    }
`

export const ServiceContentTitle = styled.h4`
    color: #FFF;
    font-size: var(--h2-font-size);
    font-weight: 500;
`