import styled from "styled-components";

export const AboutListContainer = styled.div`
    margin-bottom: 20px;
`

export const AboutListContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const AboutListContent = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    border: 1px solid var(--title-color);
    border-radius: 3px;
    color: var(--title-color);

    &:hover {
        box-shadow: var(--bs-smooth);
        border-color: transparent;
    }
`

export const AboutListContentImg = styled.img`
    width: 80px;
    height: 80px;
    border: 1px solid var(--title-color);
    border-radius: 3px;
    object-fit: cover;
`

export const AboutListContentDetail = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
`

export const AboutListContentDetailTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const AboutListContentDetailTitle = styled.div`
    font-size: var(--h2-font-size);
`

export const AboutListContentDetailFeature = styled.div`
    font-size: var(--h3-font-size);
    display: flex;
    align-items: center;
    gap: 5px;
`

export const AboutListContentDetailBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const AboutListContentDetailDate = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    & svg {
        font-size: 5px;
    }
`