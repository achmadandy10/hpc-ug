import withReveal from 'react-reveal/withReveal'
import Fade from 'react-reveal/Fade'
import styled from "styled-components";

export const SectionFourContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    justify-content: center;
    align-items: center;
    padding: 10px 80px;
    margin-top: 100px;
    margin-bottom: 100px;
    overflow: hidden;
    @media only Screen and (max-width: 768px) {
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        margin-bottom: 20px;
    }
`

export const SectionFourRight = withReveal(styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`, <Fade bottom/>)

export const SectionFourImg = styled.img`
    width: 100%;
    height: 100%;
`

export const SectionFourLeft = withReveal(styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`, <Fade bottom/>)

export const SectionFourLabel = styled.span`
    color: var(--first-color);
    font-weight: var(--font-semi-bold);
    font-size: var(--h3-font-size);
    text-transform: uppercase;
`

export const SectionFourTitle = styled.h2`
    font-size: var(--h1-font-size);
    color: var(--title-color);
    font-weight: var(--font-semi-bold);
`

export const SectionFourDataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`

export const SectionFourData = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 5px;
`

export const SectionFourDataTitle = styled.h4`
    font-size: var(--h3-font-size);
    color: var(--title-color);
    font-weight: 500;
`

export const SectionFourDataDescription = styled.p`
    font-size: var(--normal-font-size);
    color: var(--text-color);
    font-weight: 300;
`