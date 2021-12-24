import { useState, useEffect } from "react"
import { MdSend, MdSendAndArchive, MdUpdate } from "react-icons/md"
import { ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField, TextEditor } from "../../../components/text_field/TextField"
import { PostEditContent, PostEditContentLeft, PostEditContentRight } from "./PostEdit.elements"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import { useQuery } from "../../../services/QueryParams"

const PostEdit = () => {
    let query = useQuery()
    const history = useHistory()
    const [store, setStore] = useState(false)
    const [get, setGet] = useState(true)
    const [category, setCategory] = useState([])
    const [option, setOption] = useState([])
    const [post, setPost] = useState({})
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
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        const getCategory = () => {
            axios.get('/api/' + url + '/category/select').then(res => {
                if (res.data.meta.code === 200) {
                    setCategory(res.data.data.category)
                }
            })
        }

        const getPost = () => {
            axios.get('/api/' + url + '/post/show/' + query.get('id') + '/' + query.get('slug')).then(res => {
                if (res.data.meta.code === 200) {
                    setPost(res.data.data.post)

                    let arrCtg = []

                    if (res.data.data.post.categories !== []) {
                        res.data.data.post.categories.map(v => (arrCtg.push(v.id)))
                    }

                    setForm({
                        title: res.data.data.post.title === null ? '' : res.data.data.post.title,
                        thumbnail: '',
                        category: arrCtg,
                        body: res.data.data.post.body === null ? '' : res.data.data.post.body,
                        error_list: [],
                    })

                    if (res.data.data.post.categories !== []) {
                        res.data.data.post.categories.map(v => (
                            setOption(option => [...option, {value: v.id, label: v.label}])
                        ))
                    }
                }
                setGet(false)
            })
        }

        getCategory()
        getPost()
    }, [query])

    const updateSubmit = () => {
        setStore(true)

        const data = new FormData()

        data.append('title', form.title)
        data.append('thumbnail', form.thumbnail)
        data.append('category', form.category)
        data.append('body', form.body)
        data.append('status', post.status)

        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/post/update/' + query.get('id') + '/' + query.get('slug'), data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Konten berhasil diperbarui."
                })
                history.push('/admin/konten')
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
        data.append('category', form.category)
        data.append('body', form.body)
        data.append('status', 'Post')

        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/post/update/' + query.get('id') + '/' + query.get('slug'), data).then(res => {
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
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/post/update/' + query.get('id') + '/' + query.get('slug'), data).then(res => {
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
            <PageHeader title="Ubah Konten">
                <ButtonSubmit color="info" loading={store} onClicked={updateSubmit}>
                    <MdUpdate/>
                    Perbarui
                </ButtonSubmit>
                {
                    post.status === "Draft" ?
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
                <PostEditContent>
                    <PostEditContentLeft>
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
                        <TextEditor
                            name="body"
                            onChanged={ inputChange }
                            value={ form.body }
                            error={ form.error_list.body }
                        />
                    </PostEditContentLeft>
                    <PostEditContentRight>
                        <InputField
                            label="Gambar Mini"
                            name="thumbnail"
                            id="thumbnail"
                            onChanged={ inputChange }
                            type="file"
                            styled="flex"
                            error={ form.error_list.thumbnail }
                        />
                        {
                            get ? 
                                ""
                            :
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
                                    defaultValue={ option }
                                    error={ form.error_list.category }
                                />
                        }
                    </PostEditContentRight>
                </PostEditContent>
            </Card>
        </PageLayout>
    )
}

export default PostEdit