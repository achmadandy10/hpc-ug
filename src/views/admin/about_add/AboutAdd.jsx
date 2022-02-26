import { useState } from "react"
import { MdSend, MdSendAndArchive } from "react-icons/md"
import { ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField, TextEditor } from "../../../components/text_field/TextField"
import { AboutAddContent, AboutAddContentBottom, AboutAddContentTop } from "./AboutAdd.elements"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

const AboutAdd = () => {
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
        data.append('type', 'About')
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
                    text: "Tentang berhasil dipublikasi."
                })
                history.push('/admin/tentang')
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
        data.append('type', 'About')
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
                    text: "Tentang berhasil didraf."
                })
                history.push('/admin/tentang')
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
                <AboutAddContent>
                    <AboutAddContentTop>
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
                    </AboutAddContentTop>
                    <AboutAddContentBottom>
                        <TextEditor
                            name="body"
                            onChanged={ inputChange }
                            error={ form.error_list.body }
                        />
                    </AboutAddContentBottom>
                </AboutAddContent>
            </Card>
        </PageLayout>
    )
}

export default AboutAdd