import { Link } from "react-router-dom";
import styled from "styled-components";

export const RegisterContainer = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    height: 100vh;

    @media only Screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const RegisterLeft = styled.div`
    background: var(--first-color);
    padding: 20px;
    @media only Screen and (max-width: 768px) {
        display: none;
    }
`

export const RegisterListContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
`

export const RegisterListImg = styled.img`
    width: 250px;
    height: 250px;
`

export const RegisterRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

export const RegisterContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    height: 100%;
`

export const RegisterTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const RegisterForm = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`

export const RegisterButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`

export const RegisterButtonLink = styled(Link)`
    margin-top: 10px;
    width: 100%;
    color: var(--text-color);
    transition: .3s;

    &:hover {
        color: var(--first-color);
    }
`

export const RegisterFieldName = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
`