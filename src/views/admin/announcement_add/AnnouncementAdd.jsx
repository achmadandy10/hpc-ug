import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import { ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField, TextEditor } from "../../../components/text_field/TextField"

const AnnouncementAdd = () => {
    const [store, setStore] = useState(false)
    const [form, setForm] = useState({
        subject: '',
        announcement: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setStore(true)

        const data = new FormData()

        data.append('subject', form.subject)
        data.append('announcement', form.announcement)

        axios.post(`/api/admin-super/announcement/store`, data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Pengumuman berhasil dikirim."
                })
                setForm({
                    subject: '',
                    announcement: '',
                    error_list: [],
                })

                setStore(false)
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Buat Pengumuman"/>

            <Card>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <InputField
                        label="Subjek"
                        name="subject"
                        id="subject"
                        onChanged={ inputChange }
                        type="text"
                        value={ form.subject }
                        styled="flex"
                        error={ form.error_list.subject }
                    />
                    <TextEditor
                        name="announcement"
                        onChanged={ inputChange }
                        value={ form.announcement }
                        error={ form.error_list.announcement }
                    />
                    <ButtonSubmit loading={ store } color="primary" onClicked={ handleSubmit }>
                        Buat
                    </ButtonSubmit>
                </div>
            </Card>
        </PageLayout>
    )
}

export default AnnouncementAdd