import { useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import TextField from "../../../components/text_field/TextField"
import { LoginButtonContainer, LoginButtonLink, LoginContainer, LoginContent, LoginForm, LoginImg, LoginTitle } from "./Login.elements"
import Logo from '../../../images/logo.png'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
    }

    return (
        <LoginContainer>
            <LoginImg src={ Logo }/>

            <LoginContent>
                <LoginTitle>Selamat Datang!</LoginTitle>

                <LoginForm>
                    <TextField
                        label="Alamat Email"
                        id="email"
                        name="email"
                        required
                        type="email"
                        onChanged={ inputChange }
                        error={ form.error_list.email }
                    />
                    <TextField
                        label="Kata Sandi"
                        id="password"
                        name="password"
                        type="password"
                        required
                        onChanged={ inputChange }
                        error={ form.error_list.password }
                    />

                    <LoginButtonContainer>
                        <ButtonSubmit
                            fullWidth
                            height={ 50 }
                            type="submit"
                            loading={ loading }
                        >
                            Masuk
                        </ButtonSubmit>
                        <LoginButtonLink to="/daftar">Belum punya akun? daftar</LoginButtonLink>
                    </LoginButtonContainer>
                </LoginForm>
            </LoginContent>
        </LoginContainer>
    )
}

export default Login