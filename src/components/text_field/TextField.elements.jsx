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
    z-index: 0;
    
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

    & .css-1s2u09g-control {
        border-radius: 3px;
        border-color: ${({error}) => error ? 'var(--danger-color);' : 'var(--text-color);'};
        
        &:hover {
            border-color: ${({error}) => error ? 'var(--danger-color);' : 'var(--text-color);'};
        }
    }
    & .css-319lph-ValueContainer {
        padding: 6px 1.25rem;
    }
    & .css-14el2xx-placeholder {
        color: ${({error}) => error ? 'var(--danger-color);' : 'var(--text-color);'};
    }
    & .css-1okebmr-indicatorSeparator {
        background-color: var(--text-color);
    }
    & .css-tlfecz-indicatorContainer {
        color: var(--text-color);
    }
    & .css-1pahdxg-control:hover,
    & .css-1pahdxg-control {
        border: 2px solid var(--first-color);
        box-shadow: none;

        ${({error}) => {
            if (error) {
                return `border-color: var(--danger-color) !important;`
            }
        }}
    }
`

export const InputFieldContainer = styled.div`
    display: flex;
    gap: 10px;

    ${({style_input}) => {
        if (style_input === "flex") {
            return `
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
            `
        } else {
            return `
                align-items: center;
            `
        }
    }}

    @media only Screen and (max-width: 500px) {
        flex-direction: column;
        align-items: flex-start;
    }

    & .css-b62m3t-container {
        flex: 4;
        position: relative;
        width: 100%;
    }
    & .css-1s2u09g-control {
        border-radius: 3px;
        border-color: var(--text-color);
    }

    & .css-319lph-ValueContainer {
        padding: 10px;
    }
    & .css-1okebmr-indicatorSeparator {
        background-color: var(--text-color);
    }
    & .css-tlfecz-indicatorContainer {
        color: var(--text-color);
    }
    & .css-1pahdxg-control:hover,
    & .css-1pahdxg-control {
        border-color: var(--title-color);
        box-shadow: 0 0 1px var(--title-color);
    }
`

export const InputFieldError = styled.span`
    color: var(--danger-color);
    font-size: var(--small-font-size);
`

export const InputFieldLabel = styled.label`
    flex: 2;
    color: var(--title-color);
    font-size: var(--normal-font-size);
`

export const InputFieldForm = styled.input`
    font-size: var(--normal-font-size);
    padding: 10px;
    width: 100%;
`

export const InputFieldTextarea = styled.textarea`
    font-size: var(--normal-font-size);
    padding: 10px;
    resize: none;
    width: 100%;
    outline: none;
    max-height: 250px;
`

export const InputFieldSelect = styled.select`
    font-size: var(--normal-font-size);
    padding: 10px;
    width: 100%;
`

export const InputFieldFileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
`

export const InputFieldFileButton = styled.button`
    color: #FFFFFF;
    padding: 10px 20px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;
    font-size: var(--normal-font-size);
    background: var(--first-color);

    &:hover {
        box-shadow: 1px 1px 10px rgba(152, 0, 172, 0.308);
    }
`

export const InputFieldFileText = styled.span`
    font-size: var(--normal-font-size);
    color: var(--title-color);
`

export const InputFieldRadioContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const InputFieldRadioLabel = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
`

export const InputFieldRadio = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--title-color);
    border-radius: 50%;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 2px;

    &::after {
        content: "";
        width: 100%;
        height: 100%;
        display: block;
        background: var(--first-color);
        border-radius: 50%;
        transform: scale(0);
        transition: all .3s ease;
    }
`

export const InputFieldRadioHidden = styled.input`
    display: none;

    &:checked + ${InputFieldRadio}::after {
        transform: scale(1);
    }
`

export const InputFieldCheckbox = styled.input`
    font-size: var(--normal-font-size);
    padding: 10px;
`