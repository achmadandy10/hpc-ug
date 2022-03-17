import { useState, useEffect } from "react"
import axios from "axios"
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import { ButtonIconLink, ButtonIconSubmit, ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Popup from "../../../components/popup/Popup"
import { InputField } from "../../../components/text_field/TextField"
import Table, { TableAction } from "../../../components/table/Table"

const Procedures = () => {
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState(false)
    const [popup, setPopup] = useState(false)
    const [data, setData] = useState([])
    const [form, setForm] = useState({
        type: '',
        document_type: '',
        upload_file: [],
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const GetData = () => {
        var url = ''
        if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        } else if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        }

        axios.get('/api/' + url + '/procedure/show-all').then(res => {
            setData(res.data.data.procedure)
            setForm({
                type: '',
                document_type: '',
                upload_file: [],
                error_list: [],
            })
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData()
    }, [])
    

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

    const handleSubmit = (e) => {
        e.preventDefault()

        setStore(true)

        const data = new FormData()

        data.append('type', form.type)
        data.append('document_type', form.document_type)
        data.append('file', form.upload_file)

        var url = ''
        if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        } else if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        }

        axios.post('/api/' + url + '/procedure/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Prosedur berhasil dibuat.',
                })
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    const handleDelete = (id) => {
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Benar ingin menghapus prosedur?',
            text: 'Pilih "Hapus" jika Anda benar ingin menghapus prosedur.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/procedure/delete/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Prosedur berhasil dihapus.',
                        })
                        GetData()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Prosedur gagal dihapus."
                        })
                    }
                })
            }
        })
    }

    const columns = [
        {
            field: 'type',
            headerName: 'Jenis',
            width: 200,
        },
        {
            field: 'document_type',
            headerName: 'Jenis Dokumen',
            width: 350,
        },
        {
            field: 'file',
            headerName: 'File',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <TableAction>
                            <ButtonIconSubmit onClicked={ () => window.open(process.env.REACT_APP_API_URL + '/procedure/file/' + params.row.file, "_blank") } color="info">
                                <FaEye/>
                            </ButtonIconSubmit>
                        </TableAction>
                    </>
                )
            },
        },
        {
            field: 'action',
            headerName: 'Aksi',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <TableAction>
                            <ButtonIconLink to={ `/admin/prosedur-template/${ params.row.id }` } color="info">
                                <FaEdit/>
                            </ButtonIconLink>
                            <ButtonIconSubmit onClicked={ () => handleDelete(params.row.id) } color="danger">
                                <FaTrash/>
                            </ButtonIconSubmit>
                        </TableAction>
                    </>
                )
            },
        },
    ]

    return (
        <>
            <PageLayout>
                <PageHeader title="Daftar Prosedur dan Template">
                    <ButtonSubmit color="primary" onClicked={ () => setPopup(!popup) }>
                        <FaPlus/>
                        Tambah Prosedur
                    </ButtonSubmit>
                    <Popup
                        trigger={ popup } 
                        setTrigger={ setPopup }
                        title="Tambah Prosedur"
                    >
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
                                placeholder={"Pilih Jenis Dokumen"}
                                error={ form.error_list.document_type }
                            />
                            <InputField
                                label="Unggah File"
                                name="upload_file"
                                id="upload_file"
                                onChanged={ inputChange }
                                type="file"
                                error={ form.error_list.file }
                            />
                            <div
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <ButtonSubmit onClicked={ handleSubmit } color="primary" loading={ store }>
                                    Tambah
                                </ButtonSubmit>
                            </div>
                        </div>
                    </Popup>
                </PageHeader>

                <Card>
                    <Table
                        tableColumns={ columns }
                        tableLoading={ loading }
                        tableRows={ data }
                    />
                </Card>
            </PageLayout>
        </>
    )
}

export default Procedures