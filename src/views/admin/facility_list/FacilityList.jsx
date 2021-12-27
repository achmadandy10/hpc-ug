import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { useEffect, useState } from "react"
import Table, { TableAction } from "../../../components/table/Table"
import { ButtonIconLink, ButtonIconSubmit, ButtonSubmit } from "../../../components/button/Button"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import axios from "axios"
import Popup from "../../../components/popup/Popup"
import { FacilityListPopup, FacilityListSubmit } from "./FacilityList.elements"
import { InputField } from "../../../components/text_field/TextField"
import { Facility } from "../../../Dummy"

const FacilityList = () => {
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState(false)
    const [popup, setPopup] = useState(false)
    const [rows, setRows] = useState([])
    const [form, setForm] = useState({
        facility_name: '',
        start_stock: '',
        mass_unit: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }
    
    const GetFacility = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get('/api/' + url + '/facility/show-all').then(res => {
            if (res.data.meta.code === 200) {
                setRows(res.data.data.facility)
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        GetFacility()
    }, [])

    const storeSubmit = () => {
        setStore(true)

        if (form.start_stock < 1) {
            Swal.fire({
                icon:'warning',
                title: 'Peringatan!',
                text:'Stok Awal tidak boleh < 1.',
            })
            setStore(false)
            return false
        }

        const data = new FormData()

        data.append('name', form.facility_name)
        data.append('start_stock', form.start_stock)
        data.append('mass_unit', form.mass_unit)

        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/facility/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon:'success',
                    title: 'Sukses!',
                    text:'Fasilitas berhasil ditambah.',
                })
                setForm({ 
                    ...form, 
                    facility_name: '',
                    start_stock: '',
                    mass_unit: [],
                    error_list: [],
                })
                GetFacility()
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    const deleteSubmit = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menghapus fasilitas?',
            text: 'Usulan yang berkaitan dengan fasilitas ini akan ikut terhapus juga.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                var url = ''
                if (sessionStorage.getItem('role') === "Proposal") {
                    url = 'admin-proposal'
                } else if (sessionStorage.getItem('role') === "Super") {
                    url = 'admin-super'
                }
                axios.post('/api/' + url + '/facility/delete/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Fasilitas berhasil dihapus.',
                        })
                        GetFacility()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Fasilitas gagal dihapus.',
                        })
                    }
                })
            }
        })
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Nama Fasilitas',
            width: 250,
        },
        {
            field: 'start_stock',
            headerName: 'Stok Awal',
            width: 150,
        },
        {
            field: 'use_stock',
            headerName: 'Stok Terpakai',
            width: 150,
        },
        {
            field: 'remaining_stock',
            headerName: 'Sisa Stok',
            width: 150,
        },
        {
            field: 'mass_unit',
            headerName: 'Satuan',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Aksi',
            width: 150,
            disableExport: true,
            filterable: false,
            renderCell: (params) => {
                return (
                    <TableAction>
                        <ButtonIconLink to={ "/admin/fasilitas/ubah/" + params.row.id } color="info">
                            <FaEdit/>
                        </ButtonIconLink>
                        <ButtonIconSubmit onClicked={ () => deleteSubmit(params.row.id) } color="danger">
                            <FaTrash/>
                        </ButtonIconSubmit>
                    </TableAction>
                )
            }
        },
    ]

    return (
        <PageLayout>
            <PageHeader title="Daftar Fasilitas">
                <ButtonSubmit color="primary" onClicked={ () => setPopup(!popup) }>
                    <FaPlus/>
                    Tambah Fasilitas
                </ButtonSubmit>
                <Popup
                    trigger={ popup } 
                    setTrigger={ setPopup }
                    title="Tambah Fasilitas"
                >
                    <FacilityListPopup>
                        <InputField
                            label="Nama"
                            id="facility_name"
                            name="facility_name"
                            value={ form.facility_name }
                            onChanged={ inputChange }
                            type="text"
                            error={ form.error_list.name }
                        />
                        <InputField
                            label="Stok Awal"
                            id="start_stock"
                            name="start_stock"
                            value={ form.start_stock }
                            onChanged={ inputChange }
                            type="number"
                            error={ form.error_list.start_stock }
                        />
                        <InputField
                            label="Satuan"
                            id="mass_unit"
                            name="mass_unit"
                            value={ form.mass_unit }
                            onChanged={ inputChange }
                            type="select"
                            option={ Facility }
                            placeholder="Pilih Satuan"
                            error={ form.error_list.mass_unit }
                        />
                        <FacilityListSubmit>
                            <ButtonSubmit color="primary" loading={ store } onClicked={ storeSubmit }>
                                Tambah
                            </ButtonSubmit>
                        </FacilityListSubmit>
                    </FacilityListPopup>
                </Popup>
            </PageHeader>

            <Card>
                <Table
                    tableColumns={ columns }
                    tableLoading={ loading }
                    tableRows={ rows }
                />
            </Card>
        </PageLayout>
    )
}

export default FacilityList