import { ButtonLinkContainer } from "./Button.elements"

export const ButtonLink = ({ children, to, height, width, bgColor }) => {
    return (
        <>
            <ButtonLinkContainer to={ to } height={ height } width={ width } bgColor={ bgColor ? bgColor : "default" }>
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