import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { InputFieldCheckbox, InputFieldContainer, InputFieldFileButton, InputFieldFileContainer, InputFieldFileText, InputFieldForm, InputFieldLabel, InputFieldRadio, InputFieldRadioContainer, InputFieldRadioHidden, InputFieldRadioLabel, InputFieldSelect, InputFieldTextarea, TextFieldContainer, TextFieldContent, TextFieldError, TextFieldIcon, TextFieldInput, TextFieldLabel } from "./TextField.elements"

export const InputField = ({ label, type, id, name, value, readOnly, disabled, required, error, onChanged, placeholder }) => {
    let InputType = ''

    const fieldChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        onChanged(fieldName, fieldValue)
    }

    useEffect(() => {
        const textarea = document.querySelector("textarea")
        textarea.addEventListener("keyup", e => {
            textarea.style.height = `auto`
            let height = e.target.scrollHeight
            textarea.style.height = `${height}px`
        })
    }, [])

    const chooseFile = () => {
        const realFile = document.getElementById("real-file")
        const fileName = document.getElementById("file-name")        
        
        realFile.click()
        
        realFile.addEventListener("change", function() {
            if (realFile.value) {
                fileName.innerHTML = realFile.value
            } else {
                fileName.innerHTML = "Belum memilih file."
            }
        })
    }
    
    if (type === "textarea") {
        InputType = (
            <InputFieldTextarea
                id={id}
                name={name}
                required={required}
                disabled={disabled}
                onChange={ fieldChange }
                readOnly={readOnly}
                error={error}
                placeholder={placeholder}
            />
        )
    } else if (type === "select") {
        InputType = (
            <InputFieldSelect
                id={id}
                name={name}
                required={required}
                disabled={disabled}
                onChange={ fieldChange }
                readOnly={readOnly}
                error={error}
                defaultValue={""}
            >
                <option value="" disabled>-- Pilih --</option>
            </InputFieldSelect>
        )
    } else if (type === "file") {
        InputType = (
            <InputFieldFileContainer>
                <input 
                    type="file" 
                    id="real-file" 
                    hidden="hidden"
                    name={name}
                    disabled={disabled}
                    value={value}
                    onChange={fieldChange}
                    error={error}
                    required={required}
                    readOnly={readOnly}
                />
                <InputFieldFileButton onClick={ chooseFile }>Pilih File</InputFieldFileButton>
                <InputFieldFileText id="file-name">Belum memilih file.</InputFieldFileText>
            </InputFieldFileContainer>
        )
    } else if (type === "radio") {
        let Radio = ''
        Radio = value.map((value, idx) => {
            return (
                <InputFieldRadioLabel key={idx} htmlFor={id+idx}>
                    <InputFieldRadioHidden 
                        type="radio"
                        id={id+idx} 
                        name={name}
                        disabled={disabled}
                        value={value}
                        onChange={fieldChange}
                        error={error}
                        required={required}
                        readOnly={readOnly}
                    />
                    <InputFieldRadio/>
                    {value}
                </InputFieldRadioLabel>
            )
        })
        InputType = (
            <InputFieldRadioContainer>
                { Radio }
            </InputFieldRadioContainer>
        )
    } else if (type === "checkbox") {
        InputType = (
            <InputFieldCheckbox 
                type="checkbox"
                id={id} 
                name={name}
                disabled={disabled}
                value={value}
                onChange={fieldChange}
                error={error}
                required={required}
                readOnly={readOnly}
            />
        )
    } else {
        InputType = (
            <InputFieldForm 
                type={type}
                id={id} 
                name={name}
                disabled={disabled}
                value={value}
                onChange={fieldChange}
                error={error}
                required={required}
                readOnly={readOnly}
                placeholder={placeholder}
            />
        )
    }

    return (
        <InputFieldContainer>
            <InputFieldLabel htmlFor={id}>{ label }</InputFieldLabel>
            { InputType }
        </InputFieldContainer>
    )
}

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