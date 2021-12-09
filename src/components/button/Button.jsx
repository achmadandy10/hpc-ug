import { ButtonLinkContainer, ButtonSubmitContainer } from "./Button.elements"
import Loader from "react-loader-spinner";

export const ButtonLink = ({ children, to, height, width, fullWidth, btnType}) => {
    return (
        <ButtonLinkContainer to={ to } height={ height } width={ width } fullWidth={ fullWidth } type_button={ btnType }>
            { children }
        </ButtonLinkContainer>
    )
}

export const ButtonSubmit = ({ children, type, onClicked, height, fullWidth, width, btnType, loading }) => {
    return (
        <ButtonSubmitContainer type={ type } onClick={ onClicked } height={ height } fullWidth={ fullWidth } width={ width } type_button={ btnType }>
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