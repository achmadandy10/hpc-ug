import { useState } from "react"
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
        docker_image: '',
        proposal_file: '',
        error_list: [],
    })

    const radioOption = [
        { value: "yes", label: "Iya" },
        { value: "no", label: "Tidak" },
    ]

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const formSubmit = () => {
        setStore(true)

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
        data.append('docker_image', form.docker_image)
        data.append('proposal_file', form.proposal_file)

        var url = ''
        if (localStorage.getItem('role') === "Internal") {
            url = 'user-internal'
        } else if (localStorage.getItem('role') === "External") {
            url = 'user-external'
        }

        axios.post('/api/' + url + '/proposal-submission/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Usulan berhasil diajukan.',
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
                <PageHeader title="Pengajuan Usulan" />

                <Card>
                    <CardHeader title="Formulir Pengajuan Usulan" />
                    <ProposalAddFormContainer>
                        <InputField
                            label="Nomor Handphone"
                            id="phone_number"
                            name="phone_number"
                            value={form.phone_number}
                            onChanged={inputChange}
                            type="text"
                            placeholder="Masukkan Nomor Handphone"
                            error={form.error_list.phone_number}
                        />
                        <InputField
                            label="Bidang Penelitian"
                            id="research_field"
                            name="research_field"
                            value={form.research_field}
                            onChanged={inputChange}
                            type="text"
                            placeholder="Masukkan Bidang Penelitian"
                            error={form.error_list.research_field}
                        />
                        <InputField
                            label="Deskripsi Singkat Penelitian"
                            id="short_description"
                            name="short_description"
                            value={form.short_description}
                            onChanged={inputChange}
                            type="textarea"
                            placeholder="Masukkan Deskripsi Singkat Penelitian"
                            error={form.error_list.short_description}
                        />
                        <InputField
                            label="Deskripsi Data"
                            id="data_description"
                            name="data_description"
                            value={form.data_description}
                            onChanged={inputChange}
                            type="textarea"
                            placeholder="Masukkan Deskripsi Data"
                            error={form.error_list.data_description}
                        />
                        <InputField
                            label="Menggunakan Data Bersama"
                            id="shared_data"
                            name="shared_data"
                            value={form.shared_data}
                            onChanged={inputChange}
                            type="radio"
                            option={radioOption}
                            error={form.error_list.shared_data}
                        />
                        <InputField
                            label="Rencana Kegiatan"
                            id="activity_plan"
                            name="activity_plan"
                            value={form.activity_plan}
                            onChanged={inputChange}
                            type="textarea"
                            placeholder="Masukkan Rencana Kegiatan"
                            error={form.error_list.activity_plan}
                        />
                        <InputField
                            label="Rencana Output Penelitian"
                            id="output_plan"
                            name="output_plan"
                            value={form.output_plan}
                            onChanged={inputChange}
                            type="textarea"
                            placeholder="Masukkan Rencana Output Penelitian"
                            error={form.error_list.output_plan}
                        />
                        <InputField
                            label="Pengalaman Penelitian Sebelumnya"
                            id="previous_experience"
                            name="previous_experience"
                            value={form.previous_experience}
                            onChanged={inputChange}
                            type="textarea"
                            placeholder="Masukkan Pengalaman Penelitian Sebelumnya"
                            error={form.error_list.previous_experience}
                        />
                        <InputField
                            label="Kebutuhan Fasilitas"
                            id="facility_needs"
                            name="facility_needs"
                            value={form.facility_needs}
                            onChanged={inputChange}
                            type="text"
                            placeholder="Masukkan Kebutuhan Fasilitas"
                            error={form.error_list.facility_needs}
                        />
                        <InputField
                            label="Docker Image"
                            id="docker_image"
                            name="docker_image"
                            value={form.docker_image}
                            onChanged={inputChange}
                            type="text"
                            placeholder="Masukkan Docker Image"
                            error={form.error_list.docker_image}
                        />
                        <InputField
                            label="Unggah Proposal"
                            id="proposal_file"
                            name="proposal_file"
                            onChanged={inputChange}
                            type="file"
                            error={form.error_list.proposal_file}
                        />
                        <ProposalAddFormButton>
                            <ButtonSubmit
                                color="primary"
                                fullwidth
                                height={50}
                                type="submit"
                                loading={store}
                                onClicked={formSubmit}
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