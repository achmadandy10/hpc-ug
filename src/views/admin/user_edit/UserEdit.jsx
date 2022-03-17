import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import Swal from "sweetalert2"
import { ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader } from "../../../components/card/Card"
import { LoadingElement } from "../../../components/loading/Loading"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"

const UserEdit = () => {
    const { id } = useParams()
    const [get, setGet] = useState(true)
    const [store, setStore] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        college: '',
        email: '',
        password: '',
        error_list: [],
    })
    const [detail, setDetail] = useState([])

    const GetDetail = (id) => {
        axios.get(`/api/admin-super/user/show-user/${id}`).then(res =>  {
            if (res.data.meta.code === 200) {
                setDetail(res.data.data.user)
                setGet(false)
            }
        })
    }

    useEffect(() => {
        GetDetail(id)
    }, [id])
    

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = () => {
        setStore(true)

        const data = new FormData()
    
        data.append('first_name', form.first_name)
        data.append('last_name', form.last_name)
        data.append('college', form.college)
        data.append('email', form.email)
        data.append('password', form.password)

        axios.post(`/api/admin-super/user/update-user/${id}`, data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Akun user berhasil diubah."
                })

                setForm({ 
                    ...form, 
                    first_name: '',
                    last_name: '',
                    role: '',
                    email: '',
                    password: '',
                    error_list: [],
                })
                GetDetail(id)
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }

            setStore(false)
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Ubah User"/>

            <div style={{
                display: "flex",
                gap: "20px"
            }}>
                <Card>
                    <CardHeader title="Detail User"/>

                    { get ? (
                        <LoadingElement/>
                    ) : (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        }}>
                            <div style={{
                                display: "flex",
                                gap: "20px",
                            }}>
                                <InputField
                                    label="Nama Depan"
                                    value={ detail.user_profile.first_name }
                                    styled={"flex"}
                                    readOnly
                                />
                                <InputField
                                    label="Nama Belakang"
                                    value={ detail.user_profile.last_name }
                                    styled={"flex"}
                                    readOnly
                                />
                            </div>

                            <InputField
                                label="Instansi"
                                value={detail.user_profile.college}
                                styled={"flex"}
                                readOnly
                            />
                            <InputField
                                label="Alamat Email"
                                value={detail.email}
                                styled={"flex"}
                                readOnly
                            />
                        </div>
                    )}
                </Card>
                
                <Card>
                    <CardHeader title="Ubah Detail"/>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}>
                        <div style={{
                            display: "flex",
                            gap: "20px",
                        }}>
                            <InputField
                                label="Nama Depan"
                                name="first_name"
                                id="first_name"
                                onChanged={ inputChange }
                                type="text"
                                value={ form.first_name }
                                error={ form.error_list.first_name }
                                placeholder="Masukkan Nama Depan"
                                styled={"flex"}
                            />
                            <InputField
                                label="Nama Belakang"
                                name="last_name"
                                id="last_name"
                                onChanged={ inputChange }
                                type="text"
                                value={ form.last_name }
                                error={ form.error_list.last_name }
                                placeholder="Masukkan Nama Belakang"
                                styled={"flex"}
                            />
                        </div>

                        <InputField
                            label="Instansi"
                            placeholder="Masukkan Instansi"
                            styled={"flex"}
                            id="college"
                            name="college"
                            value={form.college}
                            onChanged={inputChange}
                            type="text"
                            error={ form.error_list.college }
                        />
                        <InputField
                            label="Alamat Email"
                            name="email"
                            id="email"
                            onChanged={ inputChange }
                            value={ form.email }
                            type="text"
                            error={ form.error_list.email }
                            placeholder="Masukkan Alamat Email"
                            styled={"flex"}
                        />
                        <InputField
                            label="Kata Sandi"
                            name="password"
                            id="password"
                            onChanged={ inputChange }
                            type="password"
                            value={ form.password }
                            error={ form.error_list.password }
                            placeholder="Masukkan Kata Sandi"
                            styled={"flex"}
                        />

                        <ButtonSubmit loading={store} onClicked={ handleSubmit } color="primary">
                            Ubah
                        </ButtonSubmit>
                    </div>
                </Card>
            </div>
        </PageLayout>
    )
}

export default UserEdit