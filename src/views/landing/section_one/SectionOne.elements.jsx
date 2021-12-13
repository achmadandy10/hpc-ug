import styled from "styled-components";

export const SectionOneContainer = styled.div`
    overflow: hidden;
    background: var(--body-color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 80px;
    gap: 20px;
    height: 90vh;

    @media only Screen and (max-width: 768px) {
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
    }
`

export const SectionOneContentLeft = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`

export const SectionOneTitle = styled.h2`
    font-size: var(--big-font-size);
    color: var(--title-color);
    font-weight: 700;
`

export const SectionOneTitleColor = styled.span`
    color: var(--first-color);
`

export const SectionOneDescription = styled.p`
    font-size: var(--h3-font-size);
    color: var(--text-color);
`

export const SectionOneButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 20px;

    @media only Screen and (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        width: 100%; 

        & a {
            width: auto;
        }
    }
`

export const SectionOneContentRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const SectionOneImg = styled.img`
    width: 100%;
    height: 100%;
`