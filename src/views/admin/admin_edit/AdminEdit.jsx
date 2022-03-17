import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import Swal from "sweetalert2"
import { ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader } from "../../../components/card/Card"
import { LoadingElement } from "../../../components/loading/Loading"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"

const AdminEdit = () => {
    const { id } = useParams()
    const [get, setGet] = useState(true)
    const [store, setStore] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        role: '',
        email: '',
        password: '',
        error_list: [],
    })
    const [detail, setDetail] = useState([])

    const GetDetail = (id) => {
        axios.get(`/api/admin-super/user/show-admin/${id}`).then(res =>  {
            if (res.data.meta.code === 200) {
                setDetail(res.data.data.admin)
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

    const Role = [
        { value: 1, label: "Admin Konten" },
        { value: 2, label: "Admin Proposal" },
        { value: 3, label: "Admin Super" },
    ]

    const handleSubmit = () => {
        setStore(true)

        const data = new FormData()
    
        data.append('first_name', form.first_name)
        data.append('last_name', form.last_name)
        data.append('role', form.role)
        data.append('email', form.email)
        data.append('password', form.password)

        axios.post(`/api/admin-super/user/update-admin/${id}`, data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Akun admin berhasil diubah."
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
            <PageHeader title="Ubah Admin"/>

            <div style={{
                display: "flex",
                gap: "20px"
            }}>
                <Card>
                    <CardHeader title="Detail Admin"/>

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
                                    value={ detail.admin_profile.first_name }
                                    styled={"flex"}
                                    readOnly
                                />
                                <InputField
                                    label="Nama Belakang"
                                    value={ detail.admin_profile.last_name }
                                    styled={"flex"}
                                    readOnly
                                />
                            </div>

                            <InputField
                                label="Role"
                                value={detail.role === 1 ? "Admin Konten" : detail.role === 2 ? "Admin Proposal" : "Admin Super"}
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
                            label="Role"
                            placeholder="Pilih Role"
                            styled={"flex"}
                            id="role"
                            name="role"
                            value={form.role}
                            onChanged={inputChange}
                            type="select"
                            option={ Role }
                            error={ form.error_list.role }
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

export default AdminEdit