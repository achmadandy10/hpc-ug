import { useState } from "react"
import { MdSend, MdSendAndArchive } from "react-icons/md"
import { ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField, TextEditor } from "../../../components/text_field/TextField"
import { ServiceAddContent, ServiceAddContentBottom, ServiceAddContentTop } from "./ServiceAdd.elements"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

const ServiceAdd = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        thumbnail: '',
        body: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const postSubmit = () => {
        setLoading(true)

        const data = new FormData()

        data.append('title', form.title)
        data.append('thumbnail', form.thumbnail)
        data.append('body', form.body)
        data.append('type', 'Service')
        data.append('status', 'Post')

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/content/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Layanan berhasil dipublikasi."
                })
                history.push('/admin/layanan')
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setLoading(false)
        })
    }

    const draftSubmit = () => {
        setLoading(true)

        const data = new FormData()

        data.append('title', form.title)
        data.append('thumbnail', form.thumbnail)
        data.append('body', form.body)
        data.append('type', 'Service')
        data.append('status', 'Draft')

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/content/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Layanan berhasil didraf."
                })
                history.push('/admin/layanan')
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setLoading(false)
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Buat Tentang">
                <ButtonSubmit color="primary" loading={loading} onClicked={postSubmit}>
                    <MdSend/>
                    Publikasikan
                </ButtonSubmit>
                <ButtonSubmit color="warning" loading={loading} onClicked={draftSubmit}>
                    <MdSendAndArchive/>
                    Draf
                </ButtonSubmit>
            </PageHeader>

            <Card>
                <ServiceAddContent>
                    <ServiceAddContentTop>
                        <InputField
                            label="Judul Tentang"
                            name="title"
                            id="title"
                            onChanged={ inputChange }
                            type="text"
                            styled="flex"
                            error={ form.error_list.title }
                        />
                        <InputField
                            label="Gambar Mini"
                            name="thumbnail"
                            id="thumbnail"
                            onChanged={ inputChange }
                            type="file"
                            styled="flex"
                            error={ form.error_list.thumbnail }
                        />
                    </ServiceAddContentTop>
                    <ServiceAddContentBottom>
                        <TextEditor
                            name="body"
                            onChanged={ inputChange }
                            error={ form.error_list.body }
                        />
                    </ServiceAddContentBottom>
                </ServiceAddContent>
            </Card>
        </PageLayout>
    )
}

export default ServiceAdd