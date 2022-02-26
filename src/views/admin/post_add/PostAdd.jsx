import { useState, useEffect } from "react"
import { MdSend, MdSendAndArchive } from "react-icons/md"
import { ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField, TextEditor } from "../../../components/text_field/TextField"
import { PostAddContent, PostAddContentLeft, PostAddContentRight } from "./PostAdd.elements"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

const PostAdd = () => {
    const history = useHistory()
    const [store, setStore] = useState(false)
    const [get, setGet] = useState(true)
    const [category, setCategory] = useState([])
    const [form, setForm] = useState({
        title: '',
        thumbnail: '',
        category: [],
        body: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    useEffect(() => {
        const getCategory = () => {
            var url = ''
            if (localStorage.getItem('role') === "Content") {
                url = 'admin-content'
            } else if (localStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }
            
            axios.get('/api/' + url + '/category/select').then(res => {
                if (res.data.meta.code === 200) {
                    setCategory(res.data.data.category)
                }
                setGet(false)
            })
        }

        getCategory()
    }, [])

    const postSubmit = () => {
        setStore(true)

        const data = new FormData()

        data.append('title', form.title)
        data.append('thumbnail', form.thumbnail)
        data.append('category', form.category)
        data.append('body', form.body)
        data.append('status', 'Post')

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/post/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Konten berhasil dipublikasi."
                })
                history.push('/admin/konten')
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
        data.append('category', form.category)
        data.append('body', form.body)
        data.append('status', 'Draft')

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/post/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Konten berhasil didraf."
                })
                history.push('/admin/konten')
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Buat Konten">
                <ButtonSubmit color="primary" loading={store} onClicked={postSubmit}>
                    <MdSend/>
                    Publikasikan
                </ButtonSubmit>
                <ButtonSubmit color="warning" loading={store} onClicked={draftSubmit}>
                    <MdSendAndArchive/>
                    Draf
                </ButtonSubmit>
            </PageHeader>

            <Card>
                <PostAddContent>
                    <PostAddContentLeft>
                        <InputField
                            label="Judul Konten"
                            name="title"
                            id="title"
                            onChanged={ inputChange }
                            type="text"
                            styled="flex"
                            error={ form.error_list.title }
                        />
                        <TextEditor
                            name="body"
                            onChanged={ inputChange }
                            error={ form.error_list.body }
                        />
                    </PostAddContentLeft>
                    <PostAddContentRight>
                        <InputField
                            label="Gambar Mini"
                            name="thumbnail"
                            id="thumbnail"
                            onChanged={ inputChange }
                            type="file"
                            styled="flex"
                            error={ form.error_list.thumbnail }
                        />
                        <InputField
                            label="Kategori"
                            name="category"
                            id="category"
                            onChanged={ inputChange }
                            type="multi-select"
                            styled="flex"
                            placeholder="Pilih Kategori"
                            isLoading={ get }
                            option={ category }
                            error={ form.error_list.category }
                        />
                    </PostAddContentRight>
                </PostAddContent>
            </Card>
        </PageLayout>
    )
}

export default PostAdd