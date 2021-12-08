import { useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import { CopyRight } from "../../../components/footer/Footer"
import TextField from "../../../components/text_field/TextField"
import { RegisterButtonContainer, RegisterContainer, RegisterContent, RegisterForm, RegisterLeft, RegisterRight, RegisterTitle } from "./Register.elements"

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    return (
        <RegisterContainer>
            <RegisterLeft>

            </RegisterLeft>
            <RegisterRight>
                <RegisterContent>
                    <RegisterTitle>Buat akun HPC anda</RegisterTitle>
                
                    <RegisterForm>
                        <TextField
                            label="Nama Lengkap"
                            id="name"
                            name="name"
                            onChanged={ inputChange }
                            required
                            message={ form.error_list.name }
                        />
                        <TextField
                            label="Alamat Email"
                            id="email"
                            name="email"
                            type="email"
                            onChanged={ inputChange }
                            required
                            // error={ form.error_list.email }
                        />
                        <TextField
                            label="Kata Sandi"
                            id="password"
                            name="password"
                            type="password"
                            onChanged={ inputChange }
                            required
                            // error={ form.error_list.password }
                        />
                        <TextField
                            label="Konfirmasi Kata Sandi"
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            onChanged={ inputChange }
                            required
                            // error={ form.error_list.confirm_password }
                        />
                        <RegisterButtonContainer>
                            <ButtonSubmit
                                fullWidth
                                height={ 50 }
                                type="submit"
                            >
                                Daftar
                            </ButtonSubmit>
                        </RegisterButtonContainer>
                    </RegisterForm>
                </RegisterContent>
                <CopyRight/>
            </RegisterRight>
        </RegisterContainer>
    )
}

export default Register