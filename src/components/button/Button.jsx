import { ButtonIconLinkContainer, ButtonIconSubmitContainer, ButtonLinkContainer, ButtonSubmitContainer } from "./Button.elements"
import Loader from "react-loader-spinner";

export const ButtonLink = ({ children, to, height, width, fullWidth, btnType}) => {
    return (
        <ButtonLinkContainer to={ to } height={ height } width={ width } fullWidth={ fullWidth } type_button={ btnType }>
            { children }
        </ButtonLinkContainer>
    )
}

export const ButtonSubmit = ({ color, children, type, onClicked, height, fullWidth, width, btnType, loading }) => {
    return (
        <ButtonSubmitContainer color={ color } type={ type } onClick={ onClicked } height={ height } fullWidth={ fullWidth } width={ width } type_button={ btnType }>
            { 
                loading ? 
                    <Loader
                        type="TailSpin"
                        color="#FFFFFF"
                        height={30}
                        width={30}
                    />
                :
                    children
            }
        </ButtonSubmitContainer>
    )
}

export const ButtonIconLink = ({ children, to, color }) => {
    return (
        <ButtonIconLinkContainer to={ to } color={ color }>
            { children }
        </ButtonIconLinkContainer>
    )
}

export const ButtonIconSubmit = ({ children, onClicked, color }) => {
    return (
        <ButtonIconSubmitContainer onClick={ onClicked } color={ color }>
            { children }
        </ButtonIconSubmitContainer>
    )
}