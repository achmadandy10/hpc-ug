import { useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import { CopyRight } from "../../../components/footer/Footer"
import TextField from "../../../components/text_field/TextField"
import { RegisterButtonContainer, RegisterButtonLink, RegisterContainer, RegisterContent, RegisterFieldName, RegisterForm, RegisterLeft, RegisterList, RegisterListContainer, RegisterListData, RegisterListDataContainer, RegisterListDescription, RegisterListIcon, RegisterListImg, RegisterListTitle, RegisterRight, RegisterTitle } from "./Register.elements"
import Logo from '../../../images/logo.png'
import { FaCheckCircle } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

const Register = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const formSubmit = () => {
        setLoading(true)
        
        const data = {
            first_name: form.first_name,
            last_name: form.last_name,
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

                    if (res.data.data.user.role === "Admin Content" || res.data.data.user.role === "Admin Proposal Submission" || res.data.data.user.role === "Admin Super") {
                        history.push('/admin')
                    } else {
                        history.push('/user')
                    }
                } else {
                    setForm({ ...form, error_list: res.data.data.validation_errors })
                }
                setLoading(false)
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

                    <RegisterList>
                        <RegisterListDataContainer>
                            <RegisterListIcon>
                                <FaCheckCircle/>
                            </RegisterListIcon>
                            <RegisterListData>
                                <RegisterListTitle>Hingga 50% lebih sedikit dari AWS, GCP, dan Azure</RegisterListTitle>
                                <RegisterListDescription>Tidak diperlukan komitmen tahunan atau instans spot yang tidak terduga</RegisterListDescription>
                            </RegisterListData>
                        </RegisterListDataContainer>
                        <RegisterListDataContainer>
                            <RegisterListIcon>
                                <FaCheckCircle/>
                            </RegisterListIcon>
                            <RegisterListData>
                                <RegisterListTitle>Dipercaya oleh 3000+ peneliti dan insinyur</RegisterListTitle>
                                <RegisterListDescription>94% universitas riset top AS menggunakan Lambda</RegisterListDescription>
                            </RegisterListData>
                        </RegisterListDataContainer>
                        <RegisterListDataContainer>
                            <RegisterListIcon>
                                <FaCheckCircle/>
                            </RegisterListIcon>
                            <RegisterListData>
                                <RegisterListTitle>Penagihan per jam</RegisterListTitle>
                                <RegisterListDescription>Bayar hanya untuk apa yang Anda gunakan. Mulai dari $1,25 per jam</RegisterListDescription>
                            </RegisterListData>
                        </RegisterListDataContainer>
                        <RegisterListDataContainer>
                            <RegisterListIcon>
                                <FaCheckCircle/>
                            </RegisterListIcon>
                            <RegisterListData>
                                <RegisterListTitle>Dibangun untuk pembelajaran yang mendalam</RegisterListTitle>
                                <RegisterListDescription>PyTorch dan Tensorflow sudah diinstal sebelumnya di setiap instans GPU</RegisterListDescription>
                            </RegisterListData>
                        </RegisterListDataContainer>
                    </RegisterList>
                </RegisterListContainer>
            </RegisterLeft>
            <RegisterRight>
                <RegisterContent>
                    <RegisterTitle>Buat akun HPC anda</RegisterTitle>
                
                    <RegisterForm>
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
                                loading={ loading }
                                onClicked={ formSubmit }
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