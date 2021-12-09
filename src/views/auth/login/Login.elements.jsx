import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`

export const LoginImg = styled.img`
    width: 70px;
    height: 70px;
`

export const LoginContent = styled.div`
    background: var(--body-color);
    box-shadow: var(--bs-smooth);
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 3px;
`

export const LoginTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const LoginForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`

export const LoginButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`

export const LoginButtonLink = styled(Link)`
    margin-top: 10px;
    width: 100%;
    color: var(--text-color);
    transition: .3s;

    &:hover {
        color: var(--first-color);
    }
`
