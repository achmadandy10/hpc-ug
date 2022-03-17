import { useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import { CopyRight } from "../../../components/footer/Footer"
import TextField from "../../../components/text_field/TextField"
import { RegisterButtonContainer, RegisterButtonLink, RegisterContainer, RegisterContent, RegisterFieldName, RegisterForm, RegisterLeft, RegisterListContainer, RegisterListImg, RegisterRight, RegisterTitle } from "./Register.elements"
import Logo from '../../../images/logo.png'
import { useHistory } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import AuthCheck from "../../../services/AuthCheck"

const Register = () => {
    const history = useHistory()
    const [store, setStore] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        college: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    AuthCheck()

    const formSubmit = (e) => {
        e.preventDefault()
        setStore(true)
        
        const data = {
            first_name: form.first_name,
            last_name: form.last_name,
            college: form.college,
            phone_number: form.phone_number,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
        }

        axios.get(`/sanctum/csrf-cookie`).then(() => {
            axios.post('/api/register', data).then((res) => {
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
                    
                    localStorage.setItem('token', res.data.data.access_token);
                    localStorage.setItem('role', role);
                    localStorage.setItem('username', res.data.data.user.email.split("@")[0]);

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
                    setForm({ ...form, error_list: res.data.data.validation_errors })
                }
                setStore(false)
            })
        })
    }

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 500) {
            history.push('/500')
        }
        
        return Promise.reject(err)
    })

    return (
        <RegisterContainer>
            <RegisterLeft>
                <RegisterListContainer>
                    <RegisterListImg src={ Logo }/>
                </RegisterListContainer>
            </RegisterLeft>
            <RegisterRight>
                <RegisterContent>
                    <RegisterTitle>Buat akun HPC anda</RegisterTitle>
                
                    <RegisterForm onSubmit={ formSubmit }>
                        <RegisterFieldName>
                            <TextField
                                label="Nama Depan"
                                id="first_name"
                                name="first_name"
                                onChanged={ inputChange }
                                error={ form.error_list.first_name }
                            />
                            <TextField
                                label="Nama Belakang"
                                id="last_name"
                                name="last_name"
                                onChanged={ inputChange }
                                error={ form.error_list.last_name }
                            />
                        </RegisterFieldName>
                        <TextField
                            label="Instansi"
                            id="college"
                            name="college"
                            type="text"
                            onChanged={ inputChange }
                            error={ form.error_list.college }
                        />
                        <TextField
                            label="Nomor Handphone"
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            onChanged={ inputChange }
                            error={ form.error_list.phone_number }
                        />
                        <TextField
                            label="Alamat Email"
                            id="email"
                            name="email"
                            type="email"
                            onChanged={ inputChange }
                            error={ form.error_list.email }
                        />
                        <TextField
                            label="Kata Sandi"
                            id="password"
                            name="password"
                            type="password"
                            onChanged={ inputChange }
                            error={ form.error_list.password }
                        />
                        <TextField
                            label="Konfirmasi Kata Sandi"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            onChanged={ inputChange }
                            error={ form.error_list.password_confirmation }
                        />
                        <RegisterButtonContainer>
                            <ButtonSubmit
                                color="primary"
                                fullwidth
                                height={ 50 }
                                type="submit"
                                loading={ store }
                            >
                                Daftar
                            </ButtonSubmit>
                            <RegisterButtonLink to="/masuk">Sudah punya akun? masuk</RegisterButtonLink>
                        </RegisterButtonContainer>
                    </RegisterForm>
                </RegisterContent>
                <CopyRight/>
            </RegisterRight>
        </RegisterContainer>
    )
}

export default Register