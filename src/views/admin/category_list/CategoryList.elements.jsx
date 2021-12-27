import styled from "styled-components";

export const CategoryListSearch = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const CategoryListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
`

export const CategoryListContent = styled.div`
    border-radius: 3px;
    height: 200px;
    position: relative;

    &:hover {
        box-shadow: var(--bs-smooth);
        border-color: transparent;
    }
`

export const CategoryListImg = styled.img`
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 3px;
`

export const CategoryListDetail = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    color: var(--container-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`

export const CategoryListLabel = styled.h2`
    font-size: var(--h3-font-size);
    font-weight: 700;
    color: var(--container-color);
`

export const CategoryListPopup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const CategoryListSubmit = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`