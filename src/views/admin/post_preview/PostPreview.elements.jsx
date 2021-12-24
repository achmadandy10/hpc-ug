import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostPreviewContentDetailTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const PostPreviewContentDetailDate = styled.span`
    font-size: var(--small-font-size);
    color: var(--text-color);
`

export const PostPreviewContentDetailThumbnail = styled.img`
    display: flex;
    margin: auto;
    width: 300px;
    height: 200px;
`

export const PostPreviewContentDetailBody = styled.div`
`

export const PostPreviewContentDetailCategory = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const PostPreviewContentDetailCategoryLink = styled(Link)`
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