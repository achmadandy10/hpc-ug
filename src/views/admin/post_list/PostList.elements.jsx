import styled from "styled-components";

export const PostListContainer = styled.div`
    margin-bottom: 20px;
`

export const PostListContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const PostListContent = styled.div`
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

export const PostListContentImg = styled.img`
    width: 80px;
    height: 80px;
    border: 1px solid var(--title-color);
    border-radius: 3px;
    object-fit: cover;
`

export const PostListContentDetail = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
`

export const PostListContentDetailTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const PostListContentDetailTitle = styled.div`
    font-size: var(--h2-font-size);
`

export const PostListContentDetailFeature = styled.div`
    font-size: var(--h3-font-size);
    display: flex;
    align-items: center;
    gap: 5px;
`

export const PostListContentDetailBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const PostListContentDetailDate = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    & svg {
        font-size: 5px;
    }
`

export const PostListContentDetailCategory = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const PostListContentCategory = styled.div`
    border: 1px solid var(--title-color);
    font-size: var(--smaller-font-size);
    padding: 7px 14px;
    border-radius: 3px;

    &:hover {
        background-color: var(--first-color);
        color: var(--container-color);
    }
`