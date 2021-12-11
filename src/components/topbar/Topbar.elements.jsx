import styled from "styled-components";

export const TopbarContainer = styled.div`
    width: 100%;
    height: 70px;
    background: var(--container-color);
    position: sticky;
    top: 0;
    z-index: 10001;
    box-shadow: var(--bs-smooth);
`

export const TopbarWrapper = styled.div`
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const TopbarLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TopbarLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const TopbarLogoImg = styled.img`
    width: 50px;
    height: 50px;
`

export const TopbarLogoTitle = styled.span`
    font-size: var(--h3-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const TopbarRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
`

export const TopbarFeauture = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const TopbarIconContainer = styled.div`
    position: relative;
    font-size: var(--h3-font-size);
    color: var(--title-color);
`

export const TopbarIconBag = styled.span`
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: var(--info-color);
    color: #FFFFFF;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`

export const TopbarProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & svg {
        font-size: var(--smaller-font-size);
        color: var(--title-color);
        cursor: pointer;
    }
`

export const TopbarProfileName = styled.span`
    font-size: var(--normal-font-size);
    color: var(--title-color);
`

export const TopbarProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`