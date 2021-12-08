import styled from "styled-components";

export const SectionTwoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 80px;
`

export const SectionTwoInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 100px 0;
`

export const SectionTwoInfoTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
    text-align: center;
`

export const SectionTwoInfoDescription = styled.p`
    font-size: var(--normal-font-size);
    color: var(--text-color);
    text-align: center;
    margin-left: 200px;
    margin-right: 200px;
`

export const SectionTwoFeatureContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
`

export const SectionTwoLeft = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`

export const SectionTwoLeftLabel = styled.span`
    color: var(--first-color);
    font-weight: var(--font-semi-bold);
    font-size: var(--h3-font-size);
    text-transform: uppercase;
`

export const SectionTwoLeftTitle = styled.h2`
    font-size: var(--h1-font-size);
    color: var(--title-color);
    font-weight: var(--font-semi-bold);
`

export const SectionTwoLeftDataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`

export const SectionTwoLeftData = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 5px;
`

export const SectionTwoLeftDataTitle = styled.h4`
    font-size: var(--h3-font-size);
    color: var(--title-color);
    font-weight: 500;
`

export const SectionTwoLeftDataDescription = styled.p`
    font-size: var(--normal-font-size);
    color: var(--text-color);
    font-weight: 300;
`

export const SectionTwoRight = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    align-items: center;
    justify-content: center;
`

export const SectionTwoRightData = styled.div`
    background-color: #F9F9F9F9;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SectionTwoRightDataImg = styled.img`
    width: 200px;
`