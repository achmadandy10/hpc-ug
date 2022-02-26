import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { InputFieldCheckbox, InputFieldContainer, InputFieldError, InputFieldFileButton, InputFieldFileContainer, InputFieldFileText, InputFieldForm, InputFieldLabel, InputFieldRadio, InputFieldRadioContainer, InputFieldRadioHidden, InputFieldRadioLabel, InputFieldSelect, InputFieldTextarea, TextFieldContainer, TextFieldContent, TextFieldError, TextFieldIcon, TextFieldInput, TextFieldLabel } from "./TextField.elements"
import Select from "react-select"
import { Editor } from '@tinymce/tinymce-react';
import IconButton from '@mui/material/IconButton';
import { TextField as TextFieldMui } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonSubmit } from "../button/Button";

export const inputFileClear = () => {
    const inputFile = document.querySelectorAll('input[type=file]')
    const fileName = document.getElementsByClassName('file-name')
    Array.from(inputFile, x => x.value = '')
    Array.from(fileName, y => y.innerHTML = 'Belum memilih file.')
}

export const InputField = ({ onClicked, initialValue, defaultValue, styled, label, type, id, name, value, option, readOnly, disabled, required, error, onChanged, placeholder, isLoading }) => {
    let InputType = ''

    const fieldChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        onChanged(fieldName, fieldValue)
    }

    const fieldImageChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.files[0]
        
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
            const textarea = document.getElementById(id)

            textarea.addEventListener("keyup", e => {
                textarea.style.height = `auto`
                let height = e.target.scrollHeight
                textarea.style.height = `${height}px`
            })
        }
    }, [type, id])

    const chooseFile = () => {
        const realFile = document.getElementById(id)
        const fileName = document.getElementById(id + "-file-name")        
        
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
                value={ value }
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
                value={ value }
                defaultValue={ value }
            >
                {
                    isLoading ?
                        <option value="" disabled>Loading...</option>
                    :
                        <>
                            <option value="" disabled>-- {placeholder} --</option>
                            {
                                option.map((data, idx) => {
                                    return (
                                        <option key={idx} value={data.value} selected={ data.value === value }>{ data.label }</option>
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
                defaultValue={ defaultValue }
                value={ value }
                initialValue={ initialValue }
            />
        )
    } else if (type === "file") {
        InputType = (
            <InputFieldFileContainer>
                <input 
                    type="file" 
                    id={id}
                    hidden="hidden"
                    name={name}
                    disabled={disabled}
                    onChange={fieldImageChange}
                    error={error}
                    required={required}
                    readOnly={readOnly}
                />
                <InputFieldFileButton onClick={ chooseFile }>Pilih File</InputFieldFileButton>
                <InputFieldFileText className="file-name" id={id + "-file-name"}>Belum memilih file.</InputFieldFileText>
                <br/>
            </InputFieldFileContainer>
        )
    } else if (type === "radio") {
        let Radio = ''
        Radio = option.map((option, idx) => {
            return (
                <InputFieldRadioLabel key={idx} htmlFor={id+idx}>
                    <InputFieldRadioHidden
                        type="radio"
                        id={id+idx}
                        name={name}
                        disabled={disabled}
                        value={option.value}
                        checked={ option.value === value }
                        onChange={fieldChange}
                        error={error}
                        required={required}
                        readOnly={readOnly}
                    />
                    <InputFieldRadio/>
                    {option.label}
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
    } else if (type === "see-file") {
        InputType = (
            <ButtonSubmit color="primary" onClicked={ onClicked }>
                Lihat
            </ButtonSubmit>
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
            <div 
                style={{
                    flex: "4",
                    width: "100%"
                }}
            >
                { InputType }
                { error && <InputFieldError>{ error }</InputFieldError>}
            </div>
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
                <TextFieldLabel htmlFor={id} error={ error }>{ label ? label : "Label" }</TextFieldLabel>
            </TextFieldContent>
            { 
                error ? 
                    <TextFieldError>{ error }</TextFieldError>
                :
                    ""
            }
        </TextFieldContainer>
    )
}

export const TextEditor = ({ value, name, onChanged, error }) => {
    return (
        <>
            <Editor
                apiKey='fnabl7d5djugpqwk8afwh93fbc0bfvuqjm81pm6ai3an5xmy'
                value={ value }
                // initialValue={ value }
                onEditorChange={ (value) => onChanged(name, value) }
                init={{
                    height: 500,
                    selector: 'textarea#open-source-plugins',
                    imagetools_cors_hosts: ['picsum.photos'],
                    menubar: 'file edit view insert format tools table help',
                    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
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
                    contextmenu: 'link image table',
                    media_live_embeds: true,
                    image_title: true,
                    automatic_uploads: true,
                    images_reuse_filename: true,
                    images_upload_handler: function (blobInfo, success, failure) {
                        var xhr, formData;
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;
                        
                        var url = ''
                        if (localStorage.getItem('role') === "Content") {
                            url = '/api/admin-content/upload-image'
                        } else if (localStorage.getItem('role') === "Super") {
                            url = '/api/admin-super/upload-image'
                        }

                        xhr.open('POST', process.env.REACT_APP_API_URL + url);
                        // var token = '{{ csrf_token() }}';
                        // xhr.setRequestHeader("X-CSRF-Token", token);
                        var auth = localStorage.getItem('token');
                        xhr.setRequestHeader('Authorization', auth ? `Bearer ${auth}` : '' );
                        xhr.onload = function() {
                            var json;
                            if (xhr.status !== 200) {
                                failure('HTTP Error: ' + xhr.status);
                                return;
                            }
                            json = JSON.parse(xhr.responseText);
            
                            if (!json || typeof json.location !== 'string') {
                                failure('Invalid JSON: ' + xhr.responseText);
                                return;
                            }
                            success(json.location);
                        };
                        formData = new FormData();
                        formData.append('file', blobInfo.blob(), blobInfo.filename());
                        xhr.send(formData);
                    },
                }}
            />
            { 
                error ? 
                    <TextFieldError>{ error }</TextFieldError>
                :
                    ""
            }
        </>
    )
}

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const SearchField = ({data, onChanged}) => {
    const [searchText, setSearchText] = useState('');
    const requestSearch = (value) => {
        setSearchText(value)
        const searchRegex = new RegExp(escapeRegExp(value), 'i');
        const filteredRows = data.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        onChanged(filteredRows)
    };
    
    return (
        <TextFieldMui
            variant="standard"
            value={searchText}
            onChange={(e) => requestSearch(e.target.value)}
            placeholder="Cari…"
            InputProps={{
                startAdornment: <SearchIcon fontSize="small" />,
                endAdornment: (
                    <IconButton
                        title="Clear"
                        aria-label="Clear"
                        size="small"
                        style={{ visibility: searchText ? 'visible' : 'hidden' }}
                        onClick={() => requestSearch('')}
                    >
                    <ClearIcon fontSize="small" />
                    </IconButton>
                ),
            }}
            sx={{
            width: {
                xs: 1,
                sm: 'auto',
            },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
                mr: 0.5,
            },
            '& .MuiInput-underline:before': {
                borderBottom: 1,
                borderColor: 'divider',
            },
            }}
        />
    )
}

export const SelectField = ({ error, placeholder, isDisabled, isLoading, isClearable, isRtl, isSearchable, name, value, onChanged, onInputChanged, option }) => {
    const selectChange = (value) => {
        const fieldName = name
        const fieldValue = value

        console.log(value)

        onChanged(fieldName, fieldValue)
    }

    const inputChange = (value) => {
        const fieldValue = value
        
        onInputChanged(fieldValue)
    }

    return (
        <TextFieldContainer error={ error }>
            <Select
                className="basic-single"
                classNamePrefix="select"
                value={ value }
                isDisabled={ isDisabled }
                isLoading={ isLoading }
                isClearable={ isClearable }
                isRtl={ isRtl }
                isSearchable={ isSearchable }
                name={ name }
                options={ option }
                placeholder={ placeholder }
                onChange={ selectChange }
                onInputChange={ inputChange }
            /> 
            { 
                error ? 
                    <TextFieldError>{ error }</TextFieldError>
                :
                    ""
            }
        </TextFieldContainer>
    )
}

export default TextField