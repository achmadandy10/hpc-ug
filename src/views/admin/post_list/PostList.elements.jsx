import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostListContainer = styled.div`
        
`

export const PostListContentContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const PostListContent = styled(Link)`
    display: flex;
    gap: 20px;
    border: 1px solid var(--title-color);
    border-radius: 3px;
    padding: 20px;
    height: 100%;

    &:hover {
        border-color: transparent;
        box-shadow: var(--bs-smooth);
    }
`

export const PostListContentLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const PostListContentImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 3px;
    object-fit: cover;
`

export const PostListContentRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const PostListContentTitle = styled.h2`
    font-size: var(--h3-font-size);
    color: var(--title-color);
    font-weight: 600;
`

export const PostListContentBody = styled.p`
    font-size: var(--small-font-size);
    color: var(--text-color);
    font-weight: 400;
`

export const PostListContentCategoryContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const PostListContentCategory = styled(Link)`
    border: 1px solid var(--title-color);
    padding: 3px 12px;
    border-radius: 3px;
    color: var(--title-color);

    &:hover {
        border-color: transparent;
        background-color: var(--first-color);
        color: #FFF;
    }
`