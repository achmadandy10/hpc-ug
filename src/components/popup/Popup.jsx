import { FaTimes } from "react-icons/fa"
import { PopupContainer, PopupInner, PopupClose, PopupTop, PopupTitle } from "./Popup.elements"

const Popup = ({ children, trigger, setTrigger, title }) => {
    return (
        <PopupContainer className={ trigger ? "active" : "" }>
            <PopupInner>
                <PopupTop>
                    <PopupTitle>{ title }</PopupTitle>
                    <PopupClose onClick={() => setTrigger(false)}><FaTimes/></PopupClose>
                </PopupTop>
                {children}
            </PopupInner>
        </PopupContainer>
    )
}

export default Popup