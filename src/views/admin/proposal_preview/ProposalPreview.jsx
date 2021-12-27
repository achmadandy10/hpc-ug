import { useEffect, useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"
import { ProposalPreviewFormButton, ProposalPreviewFormContainer } from "./ProposalPreview.elements"
import axios from "axios"
import Swal from "sweetalert2"
import { useParams } from "react-router-dom"
import { LoadingElement } from "../../../components/loading/Loading"
import { FaCheck, FaCheckDouble, FaTimes } from "react-icons/fa"

const ProposalPreview = () => {
    const { id } = useParams()
    const [get, setGet] = useState(true)
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
        previous_proposal_file: '',
        proposal_file: '',
        status: '',
        error_list: [],
    })

    const GetUpdate = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get('/api/' + url + '/proposal-submission/show/' + id).then(res => {
            if (res.data.meta.code === 200) {
                setDetail(res.data.data.submission.facility)
                setForm({
                    phone_number: res.data.data.submission.phone_number,
                    research_field: res.data.data.submission.research_field,
                    short_description: res.data.data.submission.short_description,
                    data_description: res.data.data.submission.data_description,
                    shared_data: res.data.data.submission.shared_data === 1 ? "yes" : "no",
                    activity_plan: res.data.data.submission.activity_plan,
                    output_plan: res.data.data.submission.output_plan,
                    previous_experience: res.data.data.submission.previous_experience,
                    facility_needs: res.data.data.submission.facility_id,
                    use_stock: res.data.data.submission.use_stock,
                    previous_proposal_file: res.data.data.submission.proposal_file,
                    proposal_file: '',
                    status: res.data.data.submission.status,
                    error_list: [],
                })
            }
            setGet(false)
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

            axios.get('/api/' + url + '/proposal-submission/show/' + id).then(res => {
                if (res.data.meta.code === 200) {
                    setDetail(res.data.data.submission.facility)
                    setForm({
                        phone_number: res.data.data.submission.phone_number,
                        research_field: res.data.data.submission.research_field,
                        short_description: res.data.data.submission.short_description,
                        data_description: res.data.data.submission.data_description,
                        shared_data: res.data.data.submission.shared_data === 1 ? "yes" : "no",
                        activity_plan: res.data.data.submission.activity_plan,
                        output_plan: res.data.data.submission.output_plan,
                        previous_experience: res.data.data.submission.previous_experience,
                        facility_needs: res.data.data.submission.facility_id,
                        use_stock: res.data.data.submission.use_stock,
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

    if (get) {
        return <LoadingElement/>
    }

    const approvedSubmit = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menyetujui?',
            text: 'Harap periksa data baik-baik sebelum menyetujui.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setuju',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/proposal-submission/approved/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil disetujui.',
                        })
                        GetUpdate()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal disetujui.',
                        })
                    }
                })
            }
        })
    }

    const rejectedSubmit = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menolak?',
            text: 'Harap periksa data baik-baik sebelum menyetujui.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setuju',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/proposal-submission/rejected/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil ditolak.',
                        })
                        GetUpdate()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal ditolak.',
                        })
                    }
                })
            }
        })
    }
    
    const finishedSubmit = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menolak?',
            text: 'Harap periksa data baik-baik sebelum menyetujui.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setuju',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/proposal-submission/finished/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil ditolak.',
                        })
                        GetUpdate()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal ditolak.',
                        })
                    }
                })
            }
        })
    }

    var status = ''

    if (form.status === "Pending") {
        status = "Tertunda"
    } else if (form.status === "Approved") {
        status = "Disetujui"
    } else if (form.status === "Rejected") {
        status = "Ditolak"
    } else if (form.status === "Finished") {
        status = "Selesai"
    }

    let element = ''

    if (form.status === "Pending") {
        element = (
            <>
                <ButtonSubmit
                    color="success"
                    fullwidth
                    height={ 50 }
                    type="submit"
                    onClicked={ approvedSubmit }
                >
                    <FaCheck/>
                    Setujui
                </ButtonSubmit>
                <ButtonSubmit
                    color="danger"
                    fullwidth
                    height={ 50 }
                    type="submit"
                    onClicked={ rejectedSubmit }
                >
                    <FaTimes/>
                    Tolak
                </ButtonSubmit>
            </>
        )
    } else if (form.status === "Approved") {
        element = (
            <ButtonSubmit
                color="primary"
                fullwidth
                height={ 50 }
                type="submit"
                onClicked={ finishedSubmit }
            >
                <FaCheckDouble/>
                Selesai
            </ButtonSubmit>
        )
    }

    return (
        <>
            <PageLayout>
                <PageHeader title="Pratinjau Usulan"/>

                <Card>
                    <CardHeader title="Formulir Pengajuan Usulan"/>
                    <ProposalPreviewFormContainer>
                        <InputField
                            label="Nomor Handphone"
                            value={ form.phone_number }
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
                            label="Kebutuhan Fasilitas"
                            value={ detail.name }
                            readOnly
                        />
                        <InputField
                            label={"Jumlah Kebutuhan / " + detail.mass_unit}
                            value={ form.use_stock }
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
                            onClicked={ () => window.open(form.previous_proposal_file, "_blank") }
                        />
                    </ProposalPreviewFormContainer>
                    <ProposalPreviewFormButton>
                        { element }
                    </ProposalPreviewFormButton>
                </Card>
            </PageLayout>
        </>
    )
}

export default ProposalPreview