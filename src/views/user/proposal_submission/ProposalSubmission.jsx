import { useEffect, useState } from "react"
import { ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField } from "../../../components/text_field/TextField"
import { Facility } from "../../../Dummy"
import { ProposalSubmissionFormButton, ProposalSubmissionFormContainer } from "./ProposalSubmission.elements"

const ProposalSubmission = () => {
    const [loading, setLoading] = useState({
        getFacility: true,
        storeForm: false,
    })
    const [facility, setFacility] = useState(null)

    useEffect(() => {
        setFacility(Facility.facility)
        setLoading({ getFacility: false })
    }, [])

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
        proposal_file: '',
    })

    const radioOption = ["Iya", "Tidak"]

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        setLoading({ storeForm: true })
    }

    return (
        <>
            <PageLayout>
                <PageHeader title="Pengajuan Usulan"/>

                <Card>
                    <CardHeader title="Formulir Pengajuan Usulan"/>
                    <ProposalSubmissionFormContainer>
                        <InputField
                            label="Nomor Handphone"
                            id="phone_number"
                            name="phone_number"
                            onChanged={ inputChange }
                            type="text"
                            placeholder="Masukkan Nomor Handphone"
                        />
                        <InputField
                            label="Bidang Penelitian"
                            id="research_field"
                            name="research_field"
                            onChanged={ inputChange }
                            type="text"
                            placeholder="Masukkan Bidang Penelitian"
                        />
                        <InputField
                            label="Deskripsi Singkat Penelitian"
                            id="short_description"
                            name="short_description"
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Deskripsi Singkat Penelitian"
                        />
                        <InputField
                            label="Deskripsi Data"
                            id="data_description"
                            name="data_description"
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Deskripsi Data"
                        />
                        <InputField
                            label="Menggunakan Data Bersama"
                            id="shared_data"
                            name="shared_data"
                            onChanged={ inputChange }
                            type="radio"
                            option={ radioOption }
                        />
                        <InputField
                            label="Rencana Kegiatan"
                            id="activity_plan"
                            name="activity_plan"
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Rencana Kegiatan"
                        />
                        <InputField
                            label="Rencana Output Penelitian"
                            id="output_plan"
                            name="output_plan"
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Rencana Output Penelitian"
                        />
                        <InputField
                            label="Pengalaman Penelitian Sebelumnya"
                            id="previous_experience"
                            name="previous_experience"
                            onChanged={ inputChange }
                            type="textarea"
                            placeholder="Masukkan Pengalaman Penelitian Sebelumnya"
                        />
                        <InputField
                            label="Kebutuhan Fasilitas"
                            id="facility_needs"
                            name="facility_needs"
                            onChanged={ inputChange }
                            type="select"
                            option={ facility }
                            placeholder={"Pilih Kebutuhan"}
                            isLoading={ loading.getFacility }
                        />
                        <InputField
                            label="Unggah Proposal"
                            id="proposal_file"
                            name="proposal_file"
                            onChanged={ inputChange }
                            type="file"
                        />
                        <ProposalSubmissionFormButton>
                            <ButtonSubmit
                                color="primary"
                                fullWidth
                                height={ 50 }
                                type="submit"
                                loading={ loading.storeForm }
                                onClicked={ formSubmit }
                            >
                                Kirim
                            </ButtonSubmit>
                        </ProposalSubmissionFormButton>
                    </ProposalSubmissionFormContainer>
                </Card>
            </PageLayout>
        </>
    )
}

export default ProposalSubmission