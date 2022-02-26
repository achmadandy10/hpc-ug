import { useState, useEffect } from "react"
import { MdSend, MdSendAndArchive, MdUpdate } from "react-icons/md"
import { ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField, TextEditor } from "../../../components/text_field/TextField"
import { ServiceEditContent, ServiceEditContentBottom, ServiceEditContentTop } from "./ServiceEdit.elements"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import { useQuery } from "../../../services/QueryParams"
import { LoadingElement } from "../../../components/loading/Loading"

const ServiceEdit = () => {
    let query = useQuery()
    const history = useHistory()
    const [store, setStore] = useState(false)
    const [get, setGet] = useState(true)
    const [service, setService] = useState({})
    const [form, setForm] = useState({
        title: '',
        thumbnail: '',
        body: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    useEffect(() => {
        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        const getService = () => {
            axios.get('/api/' + url + '/content/show/' + query.get('id') + '/' + query.get('slug')).then(res => {
                if (res.data.meta.code === 200) {
                    setService(res.data.data.content)

                    setForm({
                        title: res.data.data.content.title === null ? '' : res.data.data.content.title,
                        thumbnail: '',
                        body: res.data.data.content.body === null ? '' : res.data.data.content.body,
                        error_list: [],
                    })
                }
                setGet(false)
            })
        }

        getService()
    }, [query])

    const updateSubmit = () => {
        setStore(true)

        const data = new FormData()

        data.append('title', form.title)
        data.append('thumbnail', form.thumbnail)
        data.append('body', form.body)
        data.append('status', service.status)

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/content/update/' + query.get('id') + '/' + query.get('slug'), data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Layanan berhasil diperbarui."
                })
                history.push('/admin/layanan')
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    const postSubmit = () => {
        setStore(true)

        const data = new FormData()

        data.append('title', form.title)
        data.append('thumbnail', form.thumbnail)
        data.append('body', form.body)
        data.append('status', 'Post')

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/content/update/' + query.get('id') + '/' + query.get('slug'), data).then(res => {
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
            setStore(false)
        })
    }

    const draftSubmit = () => {
        setStore(true)

        const data = new FormData()

        data.append('title', form.title)
        data.append('thumbnail', form.thumbnail)
        data.append('body', form.body)
        data.append('status', 'Draft')

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/content/update/' + query.get('id') + '/' + query.get('slug'), data).then(res => {
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
            setStore(false)
        })
    }

    if (get) {
        return <LoadingElement/>
    }

    return (
        <PageLayout>
            <PageHeader title="Ubah Layanan">
                <ButtonSubmit color="info" loading={store} onClicked={updateSubmit}>
                    <MdUpdate/>
                    Perbarui
                </ButtonSubmit>
                {
                    service.status === "Draft" ?
                        <ButtonSubmit color="primary" loading={store} onClicked={postSubmit}>
                            <MdSend/>
                            Publikasikan
                        </ButtonSubmit>
                    :
                        <ButtonSubmit color="warning" loading={store} onClicked={draftSubmit}>
                            <MdSendAndArchive/>
                            Draf
                        </ButtonSubmit>
                }
            </PageHeader>

            <Card> 
                <ServiceEditContent>
                    <ServiceEditContentTop>
                        <InputField
                            label="Judul Konten"
                            name="title"
                            id="title"
                            value={ form.title }
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
                    </ServiceEditContentTop>
                    <ServiceEditContentBottom>
                        <TextEditor
                            name="body"
                            onChanged={ inputChange }
                            value={ form.body }
                            error={ form.error_list.body }
                        />
                    </ServiceEditContentBottom>
                </ServiceEditContent>
            </Card>
        </PageLayout>
    )
}

export default ServiceEdit