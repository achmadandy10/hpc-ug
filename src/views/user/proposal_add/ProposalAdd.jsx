import { useEffect, useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"
import { ProposalAddFormButton, ProposalAddFormContainer } from "./ProposalAdd.elements"
import axios from "axios"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"

const ProposalAdd = () => {
    const history = useHistory()
    const [store, setStore] = useState(false)
    const [get, setGet] = useState(true)
    const [facility, setFacility] = useState([])
    const [detail, setDetail] = useState({})
    const [form, setForm] = useState({
        phone_number: '',
        research_field: '',
        short_description: '',
        data_description: '',
        shared_data: '',
        activity_plan: '',
        output_plan: '',
        previous_experience: '',
        facility_needs: '',
        use_stock: '',
        proposal_file: '',
        error_list: [],
    })

    useEffect(() => {
        const GetFacility = () => {
            var url = ''
            if (sessionStorage.getItem('role') === "Internal") {
                url = 'user-internal'
            } else if (sessionStorage.getItem('role') === "External") {
                url = 'user-external'
            }

            axios.get('/api/' + url + '/facility/select').then(res => {
                if (res.data.meta.code === 200) {
                    setFacility(res.data.data.facility)
                }
                setGet(false)
            })
        }

        GetFacility()
    }, [])

    const radioOption = [
        { value: "yes", label: "Iya" },
        { value: "no", label: "Tidak" },
    ]

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const selectChange = (name, value) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Internal") {
            url = 'user-internal'
        } else if (sessionStorage.getItem('role') === "External") {
            url = 'user-external'
        }

        axios.get('/api/' + url + '/facility/show/' + value).then(res => {
            if (res.data.meta.code === 200) {
                setForm({ ...form, [name]: value })
                setDetail(res.data.data.facility)
            }
        })
    }

    const formSubmit = () => {
        setStore(true)

        if (form.use_stock > detail.remaining_stock) {
            Swal.fire({
                icon:'warning',
                title: 'Peringatan!',
                text:'Jumlah Kebutuhan tidak boleh > ' + detail.remaining_stock + '.',
            })
            setStore(false)
            return false
        } else if (form.use_stock < 1) {
            Swal.fire({
                icon:'warning',
                title: 'Peringatan!',
                text:'Jumlah Kebutuhan tidak boleh < 1.',
            })
            setStore(false)
            return false
        }

        const data = new FormData()

        data.append('phone_number', form.phone_number)
        data.append('research_field', form.research_field)
        data.append('short_description', form.short_description)
        data.append('data_description', form.data_description)
        data.append('shared_data', form.shared_data)
        data.append('activity_plan', form.activity_plan)
        data.append('output_plan', form.output_plan)
        data.append('previous_experience', form.previous_experience)
        data.append('facility_needs', form.facility_needs)
        data.append('use_stock', form.use_stock)
        data.append('proposal_file', form.proposal_file)

        var url = ''
        if (sessionStorage.getItem('role') === "Internal") {
            url = 'user-internal'
        } else if (sessionStorage.getItem('role') === "External") {
            url = 'user-external'
        }

        axios.post('/api/' + url + '/proposal-submission/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon:'success',
                    title: 'Sukses!',
                    text:'Usulan berhasil diajukan.',
                })
                history.push('/user/dasbor')
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    return (
        <>
            <PageLayout>
                <PageHeader title="Pengajuan Usulan"/>

                <Card>
                    <CardHeader title="Formulir Pengajuan Usulan"/>
                    <ProposalAddFormContainer>
                        <InputField
                            label="Nomor Handphone"
                            id="phone_number"
                            name="phone_number"
                            value={ form.phone_number }
                            onChanged={ inputChange }
                            type="text"
                            placeholder="Masukkan Nomor Handphone"
                            error={ form.error_list.phone_number }
                        />
                        <InputField
                            label="Bidang Penelitian"
                            id="research_field"
                            name="research_field"
                            value={ form.research_field }
                            onChanged={ inputChange }
                            type="text"
                            placeholder="Masukkan Bidang Penelitian"
                            error={ form.error_list.research_field }
                        />
                        <InputField
                            label="Deskripsi Singkat Penelitian"
                            id="short_description"
                            name="short_description"
                            value={ form.short_description }
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Deskripsi Singkat Penelitian"
                            error={ form.error_list.short_description }
                        />
                        <InputField
                            label="Deskripsi Data"
                            id="data_description"
                            name="data_description"
                            value={ form.data_description }
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Deskripsi Data"
                            error={ form.error_list.data_description }
                        />
                        <InputField
                            label="Menggunakan Data Bersama"
                            id="shared_data"
                            name="shared_data"
                            value={ form.shared_data }
                            onChanged={ inputChange }
                            type="radio"
                            option={ radioOption }
                            error={ form.error_list.shared_data }
                        />
                        <InputField
                            label="Rencana Kegiatan"
                            id="activity_plan"
                            name="activity_plan"
                            value={ form.activity_plan }
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Rencana Kegiatan"
                            error={ form.error_list.activity_plan }
                        />
                        <InputField
                            label="Rencana Output Penelitian"
                            id="output_plan"
                            name="output_plan"
                            value={ form.output_plan }
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Rencana Output Penelitian"
                            error={ form.error_list.output_plan }
                        />
                        <InputField
                            label="Pengalaman Penelitian Sebelumnya"
                            id="previous_experience"
                            name="previous_experience"
                            value={ form.previous_experience }
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Pengalaman Penelitian Sebelumnya"
                            error={ form.error_list.previous_experience }
                        />
                        <InputField
                            label="Kebutuhan Fasilitas"
                            id="facility_needs"
                            name="facility_needs"
                            value={ form.facility_needs }
                            onChanged={ selectChange }
                            type="select"
                            option={ facility }
                            placeholder={"Pilih Kebutuhan"}
                            isLoading={ get }
                            error={ form.error_list.facility_needs }
                        />
                        {
                            form.facility_needs !== "" ?
                                <>
                                    <InputField
                                        label="Sisa Stok"
                                        value={ detail.remaining_stock + " " + detail.mass_unit }
                                        disabled
                                    />
                                    <InputField
                                        label={"Jumlah Kebutuhan / " + detail.mass_unit}
                                        id="use_stock"
                                        name="use_stock"
                                        value={ form.use_stock }
                                        onChanged={ inputChange }
                                        type="number"
                                        placeholder="Masukkan Jumlah Kebutuhan"
                                        error={ form.error_list.use_stock }
                                    />
                                </>
                            :
                                ""
                        }
                        <InputField
                            label="Unggah Proposal"
                            id="proposal_file"
                            name="proposal_file"
                            onChanged={ inputChange }
                            type="file"
                            error={ form.error_list.proposal_file }
                        />
                        <ProposalAddFormButton>
                            <ButtonSubmit
                                color="primary"
                                fullwidth
                                height={ 50 }
                                type="submit"
                                loading={ store }
                                onClicked={ formSubmit }
                            >
                                Kirim
                            </ButtonSubmit>
                        </ProposalAddFormButton>
                    </ProposalAddFormContainer>
                </Card>
            </PageLayout>
        </>
    )
}

export default ProposalAdd