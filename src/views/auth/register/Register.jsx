import { useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import { CopyRight } from "../../../components/footer/Footer"
import TextField from "../../../components/text_field/TextField"
import { RegisterButtonContainer, RegisterButtonLink, RegisterContainer, RegisterContent, RegisterFieldName, RegisterForm, RegisterLeft, RegisterList, RegisterListContainer, RegisterListData, RegisterListDataContainer, RegisterListDescription, RegisterListIcon, RegisterListImg, RegisterListTitle, RegisterRight, RegisterTitle } from "./Register.elements"
import Logo from '../../../images/logo.png'
import { FaCheckCircle } from "react-icons/fa"

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        error_list: [],
    });

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
    }

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
                
                    <RegisterForm onSubmit={ formSubmit } method="POST">
                        <RegisterFieldName>
                            <TextField
                                label="Nama Depa"
                                id="first_name"
                                name="first_name"
                                onChanged={ inputChange }
                                required
                                error={ form.error_list.first_name }
                            />
                            <TextField
                                label="Nama Belakang"
                                id="last_name"
                                name="last_name"
                                onChanged={ inputChange }
                                required
                                error={ form.error_list.last_name }
                            />
                        </RegisterFieldName>
                        <TextField
                            label="Alamat Email"
                            id="email"
                            name="email"
                            type="email"
                            onChanged={ inputChange }
                            required
                            error={ form.error_list.email }
                        />
                        <TextField
                            label="Kata Sandi"
                            id="password"
                            name="password"
                            type="password"
                            onChanged={ inputChange }
                            required
                            error={ form.error_list.password }
                        />
                        <TextField
                            label="Konfirmasi Kata Sandi"
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            onChanged={ inputChange }
                            required
                            error={ form.error_list.confirm_password }
                        />
                        <RegisterButtonContainer>
                            <ButtonSubmit
                                fullWidth
                                height={ 50 }
                                type="submit"
                                loading={ loading }
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