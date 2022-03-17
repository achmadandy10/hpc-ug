import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"

const ProceduresEdit = () => {
    const { id } = useParams()
    const [store, setStore] = useState(false)
    const [detail, setDetail] = useState([])
    const [form, setForm] = useState({
        type: '',
        document_type: '',
        file: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const Type = [
        { value: "Penelitian TA", label: "Penelitian TA" },
        { value: "Penelitian Non TA", label: "Penelitian Non TA" },
        { value: "Pelatihan", label: "Pelatihan" },
        { value: "Kerjasama", label: "Kerjasama" },
    ]

    const DocumentType = [
        { value: "SOP", label: "SOP" },
        { value: "Surat Pengajuan", label: "Surat Pengajuan" },
        { value: "Dokumen Lain", label: "Dokumen Lain" },
    ]

    const GetDetail = (id) => {
        var url = ''
        if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        } else if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        }

        axios.get('/api/' + url + '/procedure/show/' + id).then(res => {
            setDetail(res.data.data.procedure)
        })
    }

    useEffect(() => {
        GetDetail(id)
    }, [id])

    const handleClick = () => {
        setStore(true)

        const data = new FormData()

        data.append('type', form.type)
        data.append('document_type', form.document_type)
        data.append('file', form.file)

        var url = ''
        if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        } else if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        }

        axios.post('/api/' + url + '/procedure/update/' + id, data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Prosedur berhasil diubah.',
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
            <PageHeader title={"Ubah Prosedur dan Template"}/>

            <div style={{ display: "flex", gap: "20px" }}>
                <Card>
                    <CardHeader title={"Detail Prosedur"}/>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <InputField
                            label={"Jenis"}
                            value={ detail.type }
                            readOnly
                        />
                        <InputField
                            label={"Jenis Dokumen"}
                            value={ detail.document_type }
                            readOnly
                        />
                        <InputField
                            label={"File"}
                            onClicked={ () => window.open(process.env.REACT_APP_API_URL + '/procedure/file/' + detail.file, "_blank") }
                            type={"see-file"}
                        />
                    </div>
                </Card>
                
                <Card>
                    <CardHeader title={"Ubah Prosedur"}/>

                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <InputField
                            label="Jenis"
                            id="type"
                            name="type"
                            value={form.type}
                            onChanged={inputChange}
                            type="select"
                            option={ Type }
                            placeholder={"Pilih Jenis"}
                            error={ form.error_list.type }
                        />
                        <InputField
                            label="Jenis Dokumen"
                            id="document_type"
                            name="document_type"
                            value={form.document_type}
                            onChanged={inputChange}
                            type="select"
                            option={ DocumentType }
                            placeholder={"Pilih Jenis"}
                            error={ form.error_list.document_type }
                        />
                        <InputField
                            label="File"
                            name="file"
                            id="file"
                            onChanged={ inputChange }
                            type="file"
                            error={ form.error_list.file }
                        />
                        <ButtonSubmit loading={ store } color="primary" onClicked={ handleClick }>
                            Ubah
                        </ButtonSubmit>
                    </div>
                </Card>
            </div>
        </PageLayout>
    )
}

export default ProceduresEdit