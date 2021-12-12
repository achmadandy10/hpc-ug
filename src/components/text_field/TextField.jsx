import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { InputFieldCheckbox, InputFieldContainer, InputFieldFileButton, InputFieldFileContainer, InputFieldFileText, InputFieldForm, InputFieldLabel, InputFieldRadio, InputFieldRadioContainer, InputFieldRadioHidden, InputFieldRadioLabel, InputFieldSelect, InputFieldTextarea, TextFieldContainer, TextFieldContent, TextFieldError, TextFieldIcon, TextFieldInput, TextFieldLabel } from "./TextField.elements"
import Select from "react-select"
import { Editor } from '@tinymce/tinymce-react';

export const InputField = ({ styled, label, type, id, name, value, option, readOnly, disabled, required, error, onChanged, placeholder, isLoading }) => {
    let InputType = ''

    const fieldChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        onChanged(fieldName, fieldValue)
    }

    const mselectChange = (value) => {
        const fieldName = name
        const fieldValue = value.map((data) => {
            return data.value
        })

        onChanged(fieldName, fieldValue)
    }

    useEffect(() => {
        if (type === "textarea") {
            const textarea = document.querySelector("textarea")
            textarea.addEventListener("keyup", e => {
                textarea.style.height = `auto`
                let height = e.target.scrollHeight
                textarea.style.height = `${height}px`
            })
        }
    }, [type])

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
                {
                    isLoading ?
                        <option value="" disabled>Loading...</option>
                    :
                        <>
                            <option value="" disabled>-- Pilih --</option>
                            {
                                option.map((data, idx) => {
                                    return (
                                        <option key={idx} value={data.value}>{ data.label }</option>
                                    )
                                })
                            }
                        </>
                }
            </InputFieldSelect>
        )
    } else if (type === "multi-select") {
        InputType = (
            <Select
                closeMenuOnSelect={false}
                isMulti
                options={option}
                placeholder={placeholder}
                isLoading={ isLoading }
                onChange={ mselectChange }
            />
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
        Radio = option.map((value, idx) => {
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
        <InputFieldContainer style_input={ styled }>
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

export const TextEditor = ({ value, name, onChanged, message }) => {
    return (
        <Editor
            apiKey='fnabl7d5djugpqwk8afwh93fbc0bfvuqjm81pm6ai3an5xmy'
            initialValue={ value }
            onEditorChange={ (value) => onChanged(name, value) }
            init={{
                height: 500,
                selector: 'textarea#open-source-plugins',
                imagetools_cors_hosts: ['picsum.photos'],
                menubar: 'file edit view insert format tools table help',
                plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                toolbar_sticky: true,
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                image_advtab: true,
                image_caption: true,
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link image imagetools table',
                media_live_embeds: true,
                image_title: true,
                automatic_uploads: true,
                images_reuse_filename: true,
                // images_upload_handler: function (blobInfo, success, failure) {
                //     var xhr, formData;
                //     xhr = new XMLHttpRequest();
                //     xhr.withCredentials = false;
                //     xhr.open('POST', 'link-upload');
                //     var token = '{{ csrf_token() }}';
                //     xhr.setRequestHeader("X-CSRF-Token", token);
                //     xhr.onload = function() {
                //         var json;
                //         if (xhr.status !== 200) {
                //             failure('HTTP Error: ' + xhr.status);
                //             return;
                //         }
                //         json = JSON.parse(xhr.responseText);
        
                //         if (!json || typeof json.location !== 'string') {
                //             failure('Invalid JSON: ' + xhr.responseText);
                //             return;
                //         }
                //         success(json.location);
                //     };
                //     formData = new FormData();
                //     formData.append('file', blobInfo.blob(), blobInfo.filename());
                //     xhr.send(formData);
                // },
            }}
        />
    )
}

export default TextField