import { useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import TextField from "../../../components/text_field/TextField"
import { LoginButtonContainer, LoginButtonLink, LoginContainer, LoginContent, LoginError, LoginForm, LoginImg, LoginTitle } from "./Login.elements"
import Logo from '../../../images/logo.png'
import { CopyRight } from "../../../components/footer/Footer"
import { useHistory } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"
import AuthCheck from "../../../services/AuthCheck"

const Login = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
        error_list: false,
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    AuthCheck()

    const formSubmit = () => {
        setLoading(true)
        
        const data = {
            email: form.email, 
            password: form.password, 
        }

        axios.get(`/sanctum/csrf-cookie`).then(() => {
            axios.post('/api/login', data).then((res) => {
                if (res.data.meta.code === 200) {
                    var role = ''
                    if (res.data.data.user.role === 1) {
                        role = 'Content'
                    } else if (res.data.data.user.role === 2) {
                        role = 'Proposal'
                    } else if (res.data.data.user.role === 3) {
                        role = 'Super'
                    } else if (res.data.data.user.role === 4) {
                        role = 'Internal'
                    } else if (res.data.data.user.role === 5) {
                        role = 'External'
                    }

                    sessionStorage.setItem('token', res.data.data.access_token);
                    sessionStorage.setItem('role', role);

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                      
                    Toast.fire({
                        icon: 'success',
                        title: 'Anda berhasil masuk'
                    })

                    if (res.data.data.user.role === 1 || res.data.data.user.role === 2 || res.data.data.user.role === 3) {
                        history.push('/admin')
                    } else {
                        history.push('/user')
                    }
                } else {
                    setForm({ ...form, error_list: true })
                }
                setLoading(false)
            })
        })
    }

    return (
        <LoginContainer>
            <LoginImg src={ Logo }/>

            <LoginContent>
                <LoginTitle>Selamat Datang!</LoginTitle>
                {
                    form.error_list ? 
                        <LoginError>
                            Email / Kata Sandi salah.
                        </LoginError>
                    :
                        ""
                }
                <LoginForm>
                    <TextField
                        label="Alamat Email"
                        id="email"
                        name="email"
                        type="text"
                        onChanged={ inputChange }
                    />
                    <TextField
                        label="Kata Sandi"
                        id="password"
                        name="password"
                        type="password"
                        onChanged={ inputChange }
                    />

                    <LoginButtonContainer>
                        <ButtonSubmit
                            color="primary"
                            fullwidth
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