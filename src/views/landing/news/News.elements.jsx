import { Link } from "react-router-dom";
import styled from "styled-components";

export const NewsContainer = styled.div`
    width: 100%;
    overflow: hidden;
    background: var(--body-color);
    padding: 10px 80px;
    gap: 20px;
`

export const NewsHeader = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const NewsContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`

export const NewsDetail = styled.div`
    box-shadow: var(--bs-smooth);
    border-radius: 3px;
    padding: 20px;
    display: flex;
    width: 100%;
    gap: 20px;
`

export const NewsDetailImg = styled.img`
    width: 200px;
    height: 200px;
`

export const NewsDetailData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const NewsDetailTitle = styled.h4`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const NewsDetailDate = styled.span`
    font-size: var(--small-font-size);
    color: var(--text-color);
`

export const NewsDetailBody = styled.p`
    margin-top: 10px;
    font-size: var(--normal-font-size);
    font-weight: 300;
    color: var(--title-color);
`

export const NewsDetailButtonRead = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--first-color);
    color: #FFF;
    border-radius: 3px;
    padding: 7px 14px;
    gap: 5px;
    transition: .3s;
    width: 100px;

    &:hover {
        transform: translateX(5px);
        box-shadow: var(--bs-first);
    }
`