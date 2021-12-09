import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { TextFieldContainer, TextFieldContent, TextFieldError, TextFieldIcon, TextFieldInput, TextFieldLabel } from "./TextField.elements"

const TextField = ({ label, type, id, name, value, readOnly, disabled, required, error, icon, onChanged}) => {
    const [visible, setVisible] = useState(true)

    const fieldChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        onChanged(fieldName, fieldValue)
    }

    const visibleClicked = () => {
        setVisible(!visible)
    }

    let IconField = ''

    if (type === "password") {
        IconField = (
            <TextFieldIcon password={ true } onClick={ visibleClicked }>
                {
                    visible ?
                        <FaEyeSlash/>
                    :
                        <FaEye/>
                }
            </TextFieldIcon>
        )
    } else if (icon) {
        IconField = (
            <TextFieldIcon>
                { icon }
            </TextFieldIcon>
        )
    }

    return (
        <TextFieldContainer>
            <TextFieldContent>
                {
                    type === "password" ?
                        <TextFieldInput 
                            type={ visible ? "password" : "text" } 
                            name={ name ? name : "label" } 
                            id={ id ? id : "label" } 
                            placeholder={ " " }
                            value={ value }
                            readOnly={ readOnly }
                            disabled={ disabled }
                            required={ required }
                            error={ error }
                            icon={ icon }
                            onChange={ fieldChange }
                        />
                    :
                        <TextFieldInput 
                            type={ type ? type : "text" } 
                            name={ name ? name : "label" } 
                            id={ id ? id : "label" } 
                            placeholder={ " " }
                            value={ value }
                            readOnly={ readOnly }
                            disabled={ disabled }
                            required={ required }
                            error={ error }
                            icon={ icon }
                            onChange={ fieldChange }
                        />

                }
                { IconField }
                <TextFieldLabel error={ error }>{ label ? label : "Label" }</TextFieldLabel>
            </TextFieldContent>
            { error && <TextFieldError>{ error }</TextFieldError>}
        </TextFieldContainer>
    )
}

export default TextField