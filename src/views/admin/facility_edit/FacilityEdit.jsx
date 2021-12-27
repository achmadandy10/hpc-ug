import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import Swal from "sweetalert2"
import { ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader } from "../../../components/card/Card"
import { LoadingElement } from "../../../components/loading/Loading"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"
import { Facility } from "../../../Dummy"
import { FacilityEditContainer, FacilityEditForm, FacilityEditSubmit } from "./FacilityEdit.elements"

const FacilityEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [store, setStore] = useState(false)
    const [get, setGet] = useState(true)
    const [detail, setDetail] = useState({})
    const [form, setForm] = useState({
        'facility_name': '',
        'start_stock': '',
        'mass_unit': '',
        'error_list': [],
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

        axios.get('/api/' + url + '/facility/show/' + id).then(res => {
            if (res.data.meta.code === 200) {
                setDetail(res.data.data.facility)
            }
        })
    }

    useEffect(() => {
        const GetDetail = () => {
            var url = ''
            if (sessionStorage.getItem('role') === "Proposal") {
                url = 'admin-proposal'
            } else if (sessionStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }
    
            axios.get('/api/' + url + '/facility/show/' + id).then(res => {
                if (res.data.meta.code === 200) {
                    setDetail(res.data.data.facility)
                }
                setGet(false)
            })
        }
        
        GetDetail()
    }, [id])

    const updateSubmit = () => {
        setStore(true)

        if (form.start_stock !== '') {
            if (detail.use_stock === 0 && form.start_stock < 1) {
                Swal.fire({
                    icon:'warning',
                    title: 'Peringatan!',
                    text:'Stok Awal tidak boleh < 1.',
                })
                setStore(false)
                return false
            } else if (form.start_stock < detail.use_stock) {
                Swal.fire({
                    icon:'warning',
                    title: 'Peringatan!',
                    text:'Stok Awal tidak boleh < ' + detail.use_stock + '.',
                })
                setStore(false)
                return false
            }
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

        axios.post('/api/' + url + '/facility/update/' + id, data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon:'success',
                    title: 'Sukses!',
                    text:'Fasilitas berhasil diperbarui.',
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

    const deleteSubmit = () => {
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
                        history.push('/admin/fasilitas')
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

    return (
        <PageLayout>
            <PageHeader title="Ubah Fasilitas">
                <ButtonSubmit color="danger" loading={ store } onClicked={ deleteSubmit }>
                    <FaTrash/>
                    Hapus Fasilitas
                </ButtonSubmit>
            </PageHeader>

            <FacilityEditContainer>
                <Card>
                    <CardHeader title="Detail Fasilitas"/>
                    {
                        get ?
                            <LoadingElement/>
                        :
                            <FacilityEditForm>
                                <InputField
                                    label="Nama"
                                    value={detail.name}
                                    disabled
                                />
                                <InputField
                                    label="Stok Awal"
                                    value={detail.start_stock}
                                    disabled
                                />
                                <InputField
                                    label="Stok Terpakai"
                                    value={detail.use_stock}
                                    disabled
                                />
                                <InputField
                                    label="Sisa Stok"
                                    value={detail.remaining_stock}
                                    disabled
                                />
                                <InputField
                                    label="Satuan"
                                    value={detail.mass_unit}
                                    disabled
                                />
                            </FacilityEditForm>
                    }
                </Card>
                <Card>
                    <CardHeader title="Perbarui Fasilitas"/>

                    <FacilityEditForm>
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
                    </FacilityEditForm>
                    <FacilityEditSubmit>
                        <ButtonSubmit color="primary" loading={ store } onClicked={ updateSubmit }>
                            Perbarui
                        </ButtonSubmit>
                    </FacilityEditSubmit>
                </Card>
            </FacilityEditContainer>
        </PageLayout>
    )
}

export default FacilityEdit