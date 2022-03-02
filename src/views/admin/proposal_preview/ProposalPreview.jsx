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
import Popup from "../../../components/popup/Popup"

const ProposalPreview = () => {
    const { id } = useParams()
    const [get, setGet] = useState(true)
    const [days, setDays] = useState([])
    const [machine, setMachine] = useState([])
    const [loadingApproved, setLoadingApproved] = useState(false)
    const [popupApproved, setPopupApproved] = useState(false)
    const [formApproved, setFormApproved] = useState({
        docker_image: '',
        username: '',
        id_hari: '',
        durasi: '',
        id_mesin: '',
    })
    const [form, setForm] = useState({
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

    const inputApprovedChange = (name, value) => {
        setFormApproved({ ...formApproved, [name]: value })
    }

    const GetUpdate = () => {
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get('/api/' + url + '/proposal-submission/show/' + id).then(res => {
            if (res.data.meta.code === 200) {
                setForm({
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

    useEffect(() => {
        const GetDetail = () => {
            var url = ''
            if (localStorage.getItem('role') === "Proposal") {
                url = 'admin-proposal'
            } else if (localStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
              
            fetch(`${process.env.REACT_APP_API_URL_2}/hari`, requestOptions)
            .then(response => response.json())
            .then(result => {
                result.data.map(v => {
                    const data = {
                        label: v.nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                            return letter.toUpperCase()
                        }),
                        value: v.id,
                    }
    
                    return setDays(days => [...days, data])
                })
            })
            .catch(error => console.log('error', error));
              
            fetch(`${process.env.REACT_APP_API_URL_2}/mesin`, requestOptions)
            .then(response => response.json())
            .then(result => {
                result.data.map(v => {
                    const data = {
                        label: v.nama_mesin,
                        value: v.id_mesin,
                    }
    
                    return setMachine(machine => [...machine, data])
                })
            })
            .catch(error => console.log('error', error));

            axios.get('/api/' + url + '/proposal-submission/show/' + id).then(res => {
                if (res.data.meta.code === 200) {
                    setFormApproved({
                        id_proposal: id,
                        docker_image: res.data.data.submission.docker_image,
                        username: res.data.data.submission.user.email.split("@")[0],
                        id_hari: '',
                        durasi: '',
                        id_mesin: '',
                    })
                    setForm({
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

    if (get) {
        return <LoadingElement/>
    }

    const approvedSubmit = () => {
        setLoadingApproved(false)
        
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
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
                if (result.isConfirmed) {
                    var formdata = new FormData();
    
                    formdata.append("DockerImages", formApproved.docker_image);
                    formdata.append("username", formApproved.username);
                    formdata.append("id_hari", formApproved.id_hari);
                    formdata.append("durasi", formApproved.durasi);
                    formdata.append("id_mesin", formApproved.id_mesin);
    
                    var requestOptions = {
                        method: 'POST',
                        body: formdata,
                        redirect: 'follow'
                    };
    
                    fetch(`${process.env.REACT_APP_API_URL_2}/approval`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw response;
                        }
                        return response.json();
                    })
                    .then(result => {
                        if (result.error === true) {
                            Swal.fire({
                                icon:'warning',
                                title: result.message,
                            })
                        } else {
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
                    .catch(error => {
                        if (error.status === 422) {
                            Swal.fire({
                                icon:'warning',
                                title: error.statusText,
                                text:'harap lengkapi form.',
                            })
                        }
                        return false
                    });
                }
            }
        })
    }

    const rejectedSubmit = () => {
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
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
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
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
                    onClicked={ () => setPopupApproved(!popupApproved) }
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
                            value={ form.partner }
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
                    <Popup
                        trigger={ popupApproved } 
                        setTrigger={ setPopupApproved }
                        title="Tambah Mesin"
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <InputField
                                label="Docker Image"
                                id="docker_image"
                                name="docker_image"
                                value={ formApproved.docker_image }
                                onChanged={ inputApprovedChange }
                                type="text"
                                readOnly
                            />
                            <InputField
                                label="Username"
                                id="username"
                                name="username"
                                value={ formApproved.username }
                                onChanged={ inputApprovedChange }
                                type="text"
                                readOnly
                            />
                            <InputField
                                label="Hari"
                                id="id_hari"
                                name="id_hari"
                                value={formApproved.id_hari}
                                onChanged={inputApprovedChange}
                                type="select"
                                option={days}
                                placeholder={"Pilih Hari"}
                                isLoading={get}
                            />
                            <InputField
                                label="Durasi"
                                id="durasi"
                                name="durasi"
                                value={ formApproved.durasi }
                                onChanged={ inputApprovedChange }
                                type="number"
                            />
                            <InputField
                                label="Mesin"
                                id="id_mesin"
                                name="id_mesin"
                                value={formApproved.id_mesin}
                                onChanged={inputApprovedChange}
                                type="select"
                                option={machine}
                                placeholder={"Pilih Mesin"}
                                isLoading={get}
                            />
                            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                                <ButtonSubmit color="primary" loading={ loadingApproved } onClicked={ approvedSubmit }>
                                    Tambah
                                </ButtonSubmit>
                            </div>
                        </div>
                    </Popup>
                    <ProposalPreviewFormButton>
                        { element }
                    </ProposalPreviewFormButton>
                </Card>
            </PageLayout>
        </>
    )
}

export default ProposalPreview