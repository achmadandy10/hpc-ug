import { useEffect, useState } from "react"
import Card, { CardHeader } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"
import { ProposalPreviewFormContainer } from "./ProposalPreview.elements"
import axios from "axios"
import { useParams } from "react-router-dom"
import { LoadingElement } from "../../../components/loading/Loading"

const ProposalPreview = () => {
    const { id } = useParams()
    const [get, setGet] = useState(true)
    const [form, setForm] = useState({
        type_of_proposal: '',
        phone_number: '',
        educational_level: '',
        application_file: '',
        study_program: '',
        gpu: '',
        ram: '',
        storage: '',
        partner: '',
        duration: '',
        research_field: '',
        short_description: '',
        data_description: '',
        shared_data: '',
        activity_plan: '',
        output_plan: '',
        previous_experience: '',
        research_fee: '',
        docker_image: '',
        previous_proposal_file: '',
        proposal_file: '',
        status: '',
        error_list: [],
    })
    
    useEffect(() => {
        const GetDetail = () => {
            var url = ''
            if (localStorage.getItem('role') === "Internal") {
                url = 'user-internal'
            } else if (localStorage.getItem('role') === "External") {
                url = 'user-external'
            }
            
            axios.get('/api/' + url + '/proposal-submission/show/' + id).then(res => {
                if (res.data.meta.code === 200) {
                    setForm({
                        type_of_proposal: res.data.data.submission.type_of_proposal,
                        phone_number: res.data.data.submission.phone_number,
                        educational_level: res.data.data.submission.educational_level,
                        application_file: res.data.data.submission.application_file,
                        study_program: res.data.data.submission.study_program,
                        gpu: res.data.data.submission.gpu,
                        ram: res.data.data.submission.ram,
                        storage: res.data.data.submission.storage,
                        partner: res.data.data.submission.partner,
                        duration: res.data.data.submission.duration,
                        research_field: res.data.data.submission.research_field,
                        short_description: res.data.data.submission.short_description,
                        data_description: res.data.data.submission.data_description,
                        shared_data: res.data.data.submission.shared_data === 1 ? "yes" : "no",
                        activity_plan: res.data.data.submission.activity_plan,
                        output_plan: res.data.data.submission.output_plan,
                        previous_experience: res.data.data.submission.previous_experience,
                        research_fee: res.data.data.submission.research_fee,
                        docker_image: res.data.data.submission.docker_image,
                        previous_proposal_file: res.data.data.submission.proposal_file,
                        proposal_file: '',
                        status: res.data.data.submission.status,
                        error_list: [],
                    })
                }
                setGet(false)
            })
        }

        GetDetail()
    }, [id])

    var status = ''

    if (form.status === "Pending") {
        status = "Belum Disetujui"
    } else if (form.status === "Approved") {
        status = "Disetujui"
    } else if (form.status === "Rejected") {
        status = "Ditolak"
    } else if (form.status === "Revision") {
        status = "Revisi"
    } else if (form.status === "Finished") {
        status = "Selesai"
    }

    if (get) {
        return <LoadingElement/>
    }

    return (
        <>
            <PageLayout>
                <PageHeader title="Pratinjau Usulan"/>

                <Card>
                    <CardHeader title="Formulir Pengajuan Usulan"/>
                    <ProposalPreviewFormContainer>
                        <InputField
                            label="Jenis Penelitian"
                            value={ form.type_of_proposal }
                            readOnly
                        />
                        <InputField
                            label="Nomor Handphone"
                            value={ form.phone_number }
                            readOnly
                        />
                        <InputField
                            label="Jenjang Pendidikan"
                            value={ form.educational_level }
                            readOnly
                        />
                        <InputField
                            label="File Permohonan"
                            type="see-file"
                            onClicked={ () => window.open(process.env.REACT_APP_API_URL + '/application_dgx/file/' + form.application_file, "_blank") }
                        />
                        <InputField
                            label="Program Studi"
                            value={ form.study_program }
                            readOnly
                        />
                        <InputField
                            label="Jumlah GPU / (GB)"
                            value={ form.gpu }
                            readOnly
                        />
                        <InputField
                            label="Jumlah RAM / (GB)"
                            value={ form.ram }
                            readOnly
                        />
                        <InputField
                            label="Jumlah Storage / (GB)"
                            value={ form.storage }
                            readOnly
                        />
                        <InputField
                            label="Nama Partner / Mahasiswa"
                            value={ form.partner }
                            readOnly
                        />
                        <InputField
                            label="Durasi / (Hari)"
                            value={ form.duration }
                            readOnly
                        />
                        <InputField
                            label="Bidang Penelitian"
                            value={ form.research_field }
                            readOnly
                        />
                        <InputField
                            label="Deskripsi Singkat Penelitian"
                            value={ form.short_description }
                            id="short_description"
                            type="textarea"
                            readOnly
                        />
                        <InputField
                            label="Deskripsi Data"
                            value={ form.data_description }
                            id="data_description"
                            type="textarea"
                            readOnly
                        />
                        <InputField
                            label="Menggunakan Data Bersama"
                            value={ form.shared_data === "yes" ? "Iya" : "Tidak" }
                            readOnly
                        />
                        <InputField
                            label="Rencana Kegiatan"
                            value={ form.activity_plan }
                            id="activity_plan"
                            type="textarea"
                            readOnly
                        />
                        <InputField
                            label="Rencana Output Penelitian"
                            value={ form.output_plan }
                            id="output_plan"
                            type="textarea"
                            readOnly
                        />
                        <InputField
                            label="Pengalaman Penelitian Sebelumnya"
                            value={ form.previous_experience }
                            id="revious_experience"
                            type="textarea"
                            readOnly
                        />
                        <InputField
                            label="Docker Image"
                            value={ form.docker_image }
                            readOnly
                        />
                        <InputField
                            label="Biaya Penelitian"
                            value={ form.research_fee }
                            type="currency"
                            readOnly
                        />
                        <InputField
                            label="Status"
                            value={ status }
                            readOnly
                        />
                        <InputField
                            label="File Proposal"
                            type="see-file"
                            onClicked={ () => window.open(process.env.REACT_APP_API_URL + '/proposal/file/' + form.previous_proposal_file, "_blank") }
                        />
                    </ProposalPreviewFormContainer>
                </Card>
            </PageLayout>
        </>
    )
}

export default ProposalPreview