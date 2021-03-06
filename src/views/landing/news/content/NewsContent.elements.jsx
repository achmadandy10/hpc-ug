import { Link } from "react-router-dom";
import styled from "styled-components";

export const NewsContentContainer = styled.div`
    width: 100%;
    overflow: hidden;
    background: var(--body-color);
    display: flex;
    padding: 10px 80px;
    gap: 20px;
`

export const NewsContentDetail = styled.div`
    flex: 4;
    border-radius: 3px;
    box-shadow: var(--bs-smooth);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const NewsContentDetailTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const NewsContentDetailDate = styled.span`
    font-size: var(--small-font-size);
    color: var(--text-color);
`

export const NewsContentDetailThumbnail = styled.img`
    display: flex;
    margin: auto;
    width: 300px;
    height: 200px;
`

export const NewsContentDetailBody = styled.div`
`

export const NewsContentDetailCategory = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const NewsContentDetailCategoryLink = styled(Link)`
    font-size: var(--small-font-size);
    padding: 5px 14px;
    color: var(--title-color);
    border-radius: 3px;
    border: 1px solid var(--title-color);

    &:hover {
        border-color: transparent;
        background-color: var(--first-color);
        color: #FFF;
    }
`

export const NewsContentFeature = styled.div`
    flex: 1.5;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const NewsContentFeatureCard = styled.div`
    background: var(--container-color);
    box-shadow: var(--bs-smooth);
    padding: 10px;
    display: flex;
    gap: 10px;
`

export const NewsContentFeatureCardImg = styled.img`
    height: 100%;
    width: 70px;
`

export const NewsContentFeatureCardDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const NewsContentFeatureCardTitle = styled.h3`
    font-size: var(--h3-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const NewsContentFeatureCardBody = styled.p`
    font-size: var(--small-font-size);
    font-weight: 300;
    color: var(--text-color);
`

export const NewsContentFeatureCardButton = styled.div`
    margin-top: 10px;
`