import { ButtonLinkContainer } from "./Button.elements"

export const ButtonLink = ({ children, to, height, width, btnType}) => {
    return (
        <>
            <ButtonLinkContainer to={ to } height={ height } width={ width } type_button={ btnType }>
                { children }
            </ButtonLinkContainer>
        </>
    )
}

export const ButtonSubmit = () => {
    return (
        <>
            2fsafasfasfas
        </>
    )
}