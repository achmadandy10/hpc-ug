import { ButtonLinkContainer, ButtonSubmitContainer } from "./Button.elements"

export const ButtonLink = ({ children, to, height, width, fullWidth, btnType}) => {
    return (
        <ButtonLinkContainer to={ to } height={ height } width={ width } fullWidth={ fullWidth } type_button={ btnType }>
            { children }
        </ButtonLinkContainer>
    )
}

export const ButtonSubmit = ({ children, type, onClicked, height, fullWidth, width, btnType }) => {
    return (
        <ButtonSubmitContainer type={ type } onClick={ onClicked } height={ height } fullWidth={ fullWidth } width={ width } type_button={ btnType }>
            { children }
        </ButtonSubmitContainer>
    )
}