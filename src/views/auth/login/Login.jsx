import { useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import TextField from "../../../components/text_field/TextField"
import { LoginButtonContainer, LoginButtonLink, LoginContainer, LoginContent, LoginForm, LoginImg, LoginTitle } from "./Login.elements"
import Logo from '../../../images/logo.png'
import { CopyRight } from "../../../components/footer/Footer"
import { useHistory } from "react-router-dom"

const Login = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const formSubmit = () => {
        setLoading(true)
        setTimeout(
            function() {
                history.push('/user/dasbor')
            }
            ,
            3000
        );
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
                            onClicked={ formSubmit }
                        >
                            Masuk
                        </ButtonSubmit>
                        <LoginButtonLink to="/daftar">Belum punya akun? daftar</LoginButtonLink>
                    </LoginButtonContainer>
                </LoginForm>
            </LoginContent>
            <CopyRight/>
        </LoginContainer>
    )
}

export default Login