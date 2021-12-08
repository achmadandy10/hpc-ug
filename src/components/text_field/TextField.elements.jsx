import styled from "styled-components";

export const TextFieldError = styled.span`
    color: var(--danger-color);
`

export const TextFieldLabel = styled.label`
    position: absolute;
    left: 1rem;
    top: 0.75rem;
    padding: 0 0.25rem;
    background-color: var(--body-color);
    color: var(--text-color);
    font-size: var(--normal-font-size);
    transition: 0.3s;
    cursor: text;

    ${({error}) => {
        if (error) {
            return `
                color: var(--danger-color) !important;
            `
        }
    }}
`

export const TextFieldIcon = styled.div`
    position: absolute;
    right: 1rem;
    top: .85rem;
    z-index: 100;
    cursor: ${({password}) => password ? "pointer" : "default"};
`

export const TextFieldInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: var(--normal-font-size);
    border: 1px solid var(--text-color);
    border-radius: 3px;
    outline: none;
    padding: 1.25rem;
    background: none;
    z-index: 1;

    ${({type, icon}) => {
        if (type === "password" || icon) {
            return `
                padding-right: 2.5rem !important;
            `
        }
    }}

    ${({error}) => {
        if (error) {
            return `
                border-color: var(--danger-color) !important;
            `
        }
    }}

    &:hover {
        border-color: var(--first-color);
    }

    &:focus,
    &:not(:placeholder-shown) {
        border: 2px solid var(--first-color);
    }

    &:focus ~ ${TextFieldLabel},
    &:not(:placeholder-shown):not(:focus) ~ ${TextFieldLabel} {
        top: -0.5rem;
        left: 0.8rem;
        color:  var(--first-color);
        font-size: var(--small-font-size);
        font-weight: var(--font-medium);
        z-index: 10;
    }
`

export const TextFieldContent = styled.div`
    position: relative;
    height: 48px;
`

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1.5rem;

    &:last-of-type {
        margin-bottom: 0;
    }
`