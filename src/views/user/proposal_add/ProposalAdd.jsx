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
    const [study, setStudy] = useState([])
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
        proposal_file: '',
        term_1: '',
        term_2: '',
        term_3: '',
        error_list: [],
    })

    const type_of_proposal = [
        { label: 'Penelitian TA', value: 'Penelitian TA' },
        { label: 'Penelitian Non TA', value: 'Penelitian Non TA' },
        { label: 'Kerjasama Industri', value: 'Kerjasama Industri' },
    ]

    const educational_level = [
        { label: 'D3', value: 'D3' },
        { label: 'S1', value: 'S1' },
        { label: 'S2', value: 'S2' },
        { label: 'S3', value: 'S3' },
        { label: 'Kerjasama Industri', value: 'Kerjasama Industri' },
        { label: 'Profesi', value: 'Profesi' },
    ]

    const study_program = [
        { label: 'S2-Manajemen', value: 'S2-Manajemen' },
        { label: 'S2-Manajemen Sistem Informasi', value: 'S2-Manajemen Sistem Informasi' },
        { label: 'S1-Kebidanan', value: 'S1-Kebidanan' },
        { label: 'Profesi-Bidan', value: 'Profesi-Bidan' },
        { label: 'S3-Ilmu Ekonomi', value: 'S3-Ilmu Ekonomi' },
        { label: 'S1-Teknik Elektro', value: 'S1-Teknik Elektro' },
        { label: 'D-III-Akuntansi', value: 'D-III-Akuntansi' },
        { label: 'S3-Ilmu Psikologi', value: 'S3-Ilmu Psikologi' },
        { label: 'S2-Teknik Elektro', value: 'S2-Teknik Elektro' },
        { label: 'S1-Manajemen', value: 'S1-Manajemen' },
        { label: 'S1-Sistem Informasi', value: 'S1-Sistem Informasi' },
        { label: 'S1-Farmasi', value: 'S1-Farmasi' },
        { label: 'S2-Psikologi Profesi', value: 'S2-Psikologi Profesi' },
        { label: 'D-III-Manajemen Informatika', value: 'D-III-Manajemen Informatika' },
        { label: 'S3-Teknologi Informasi', value: 'S3-Teknologi Informasi' },
        { label: 'S2-Arsitektur', value: 'S2-Arsitektur' },
        { label: 'S1-Kedokteran', value: 'S1-Kedokteran' },
        { label: 'S1-Dokter', value: 'S1-Dokter' },
        { label: 'S1-Teknik Informatika', value: 'S1-Teknik Informatika' },
        { label: 'S1-Ekonomi Syariah', value: 'S1-Ekonomi Syariah' },
        { label: 'S1-Desain Interior', value: 'S1-Desain Interior' },
        { label: 'S2-Ilmu Komunikasi', value: 'S2-Ilmu Komunikasi' },
        { label: 'S1-Sistem Komputer', value: 'S1-Sistem Komputer' },
        { label: 'S1-Akuntansi', value: 'S1-Akuntansi' },
        { label: 'S1-Sastra Tiongkok', value: 'S1-Sastra Tiongkok' },
        { label: 'D-III-Manajemen Pemasaran', value: 'D-III-Manajemen Pemasaran' },
        { label: 'S1-Teknik Industri', value: 'S1-Teknik Industri' },
        { label: 'S1-Teknik Sipil', value: 'S1-Teknik Sipil' },
        { label: 'S1-Psikologi', value: 'S1-Psikologi' },
        { label: 'S1-Pariwisata', value: 'S1-Pariwisata' },
        { label: 'S1-Agroteknologi', value: 'S1-Agroteknologi' },
        { label: 'S2-Teknik Sipil', value: 'S2-Teknik Sipil' },
        { label: 'S2-Psikologi', value: 'S2-Psikologi' },
        { label: 'D-III-Teknik Komputer', value: 'D-III-Teknik Komputer' },
        { label: 'S1-Sastra Inggris', value: 'S1-Sastra Inggris' },
        { label: 'D-III-Kebidanan', value: 'D-III-Kebidanan' },
        { label: 'S1-Ilmu Komunikasi', value: 'S1-Ilmu Komunikasi' },
        { label: 'S2-Teknik Mesin', value: 'S2-Teknik Mesin' },
        { label: 'D-III-Manajemen Keuangan', value: 'D-III-Manajemen Keuangan' },
        { label: 'S1-Arsitektur', value: 'S1-Arsitektur' },
        { label: 'S1-Teknik Mesin', value: 'S1-Teknik Mesin' },
        { label: 'Kerjasama Industri', value: 'Kerjasama Industri' },
    ]

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    const radioOption = [
        { value: "yes", label: "Iya" },
        { value: "no", label: "Tidak" },
    ]

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const selectInputChange = (name, value) => {
        setStudy(study_program.filter(function (el) {
            if (value === "D3") {
                return el.label.includes("D-III-")
            } else if (value === "S1") {
                return el.label.includes("S1-")
            } else if (value === "S2") {
                return el.label.includes("S2-")
            } else if (value === "S3") {
                return el.label.includes("S3-")
            } else if (value === "Profesi") {
                return el.label.includes("Profesi-")
            } else if (value === "Kerjasama Industri") {
                return el.label.includes("Kerjasama Industri")
            } else {
                return []
            }
        } ))
        setForm({ ...form, [name]: value })
    }

    const formSubmit = () => {
        var term_and_condition = ''

        if (form.term_1 === '' || form.term_2 === '' || form.term_3 === '') {
            Swal.fire({
                icon: "warning",
                title: "Peringatan!",
                text: "Harap lengkapi form terlebih dahulu."
            })
            
            return false
        } else {
            term_and_condition = 'agree'
        }

        setStore(true)

        const data = new FormData()

        data.append('type_of_proposal', form.type_of_proposal)
        data.append('phone_number', form.phone_number)
        data.append('educational_level', form.educational_level)
        data.append('application_file', form.application_file)
        data.append('study_program', form.study_program)
        data.append('gpu', form.gpu)
        data.append('ram', form.ram)
        data.append('storage', form.storage)
        data.append('partner', form.partner)
        data.append('duration', form.duration)
        data.append('research_field', form.research_field)
        data.append('short_description', form.short_description)
        data.append('data_description', form.data_description)
        data.append('shared_data', form.shared_data)
        data.append('activity_plan', form.activity_plan)
        data.append('output_plan', form.output_plan)
        data.append('previous_experience', form.previous_experience)
        data.append('research_fee', form.research_fee)
        data.append('docker_image', form.docker_image)
        data.append('proposal_file', form.proposal_file)
        data.append('term_and_condition', term_and_condition)

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
                            label="Jenis Penelitian"
                            id="type_of_proposal"
                            name="type_of_proposal"
                            value={form.type_of_proposal}
                            onChanged={inputChange}
                            type="select"
                            option={ type_of_proposal.sort(dynamicSort("label")) }
                            placeholder="Masukkan Jenis Penelitian"
                            error={form.error_list.type_of_proposal}
                        />
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
                            label="Jenjang Pendidikan"
                            id="educational_level"
                            name="educational_level"
                            value={form.educational_level}
                            onChanged={selectInputChange}
                            type="select"
                            option={ educational_level.sort(dynamicSort("label")) }
                            placeholder="Masukkan Jenjang Pendidikan"
                            error={form.error_list.educational_level}
                        />
                        <InputField
                            label="Program Studi"
                            id="study_program"
                            name="study_program"
                            value={form.study_program}
                            onChanged={inputChange}
                            type="select"
                            option={ study }
                            placeholder="Masukkan Program Studi"
                            error={form.error_list.study_program}
                        />
                        <InputField
                            label="Unggah Surat Pengajuan Penggunaan DGX"
                            id="application_file"
                            name="application_file"
                            onChanged={inputChange}
                            type="file"
                            error={form.error_list.application_file}
                        />
                        <InputField
                            label="Jumlah GPU / (GB)"
                            id="gpu"
                            name="gpu"
                            value={form.gpu}
                            onChanged={inputChange}
                            type="number"
                            placeholder="Masukkan Jumlah GPU"
                            error={form.error_list.gpu}
                        />
                        <InputField
                            label="Jumlah RAM / (GB)"
                            id="ram"
                            name="ram"
                            value={form.ram}
                            onChanged={inputChange}
                            type="number"
                            placeholder="Masukkan Jumlah RAM"
                            error={form.error_list.ram}
                        />
                        <InputField
                            label="Jumlah Storage / (GB)"
                            id="storage"
                            name="storage"
                            value={form.storage}
                            onChanged={inputChange}
                            type="number"
                            placeholder="Masukkan Jumlah Storage"
                            error={form.error_list.storage}
                        />
                        <InputField
                            label="Nama Partner / Mahasiswa"
                            id="partner"
                            name="partner"
                            value={form.partner}
                            onChanged={inputChange}
                            type="text"
                            placeholder="Masukkan Nama Partner / Mahasiswa"
                            error={form.error_list.partner}
                        />
                        <InputField
                            label="Durasi / (Hari)"
                            id="duration"
                            name="duration"
                            value={form.duration}
                            onChanged={inputChange}
                            type="number"
                            placeholder="Masukkan Durasi"
                            error={form.error_list.duration}
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
                            label="Docker Image"
                            id="docker_image"
                            name="docker_image"
                            value={form.docker_image}
                            onChanged={inputChange}
                            type="text"
                            placeholder="Masukkan Docker Image"
                            error={form.error_list.docker_image}
                            disabled
                        />
                        <InputField
                            label="Biaya Penelitian"
                            id="research_fee"
                            name="research_fee"
                            value={form.research_fee}
                            onChanged={inputChange}
                            type="currency"
                            placeholder="Masukkan Biaya Penelitian"
                            error={form.error_list.research_fee}
                        />
                        <InputField
                            label="Unggah Proposal"
                            id="proposal_file"
                            name="proposal_file"
                            onChanged={inputChange}
                            type="file"
                            error={form.error_list.proposal_file}
                        />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            marginTop: "20px",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                        }}>
                            <InputField
                                label="Saya bersedia mematuhi tata cara penggunaan DGX yang telah ditetapkan, dan tidak akan memindahkan account login ke orang lain"
                                id="term_1"
                                name="term_1"
                                value={1}
                                onChanged={inputChange}
                                type="checkbox"
                                error={form.error_list.term_1}
                            />
                            <InputField
                                label="Saya akan mengumpulkan laporan akhir pada masa berakhirnya penggunaan DGX pada penelitian"
                                id="term_2"
                                name="term_2"
                                value={1}
                                onChanged={inputChange}
                                type="checkbox"
                                error={form.error_list.term_2}
                            />
                            <InputField
                                label="Saya telah mencoba membuat docker sesuai kebutuhan penggunaan di DGX dan akan mengirimkan kepada Tim Pengembangan DGX"
                                id="term_3"
                                name="term_3"
                                value={1}
                                onChanged={inputChange}
                                type="checkbox"
                                error={form.error_list.term_3}
                            />
                        </div>
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