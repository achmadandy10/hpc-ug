import { useEffect, useState } from "react"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { ButtonIconSubmit, ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Popup from "../../../components/popup/Popup"
import { InputField, inputFileClear, SearchField } from "../../../components/text_field/TextField"
import { CategoryListContainer, CategoryListContent, CategoryListDetail, CategoryListImg, CategoryListLabel, CategoryListPopup, CategoryListSearch, CategoryListSubmit } from "./CategoryList.elements"
import axios from "axios"
import Swal from "sweetalert2"
import { LoadingElement } from "../../../components/loading/Loading"

const CategoryList = () => {
    const [store, setStore] = useState(false)
    const [get, setGet] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState([])
    const [popup, setPopup] = useState(false)
    const [edit, setEdit] = useState(false)
    const [form, setForm] = useState({
        label: '',
        thumbnail: '',
        error_list: [],
    })
    const [form_edit, setFormEdit] = useState({
        id: '',
        label: '',
        thumbnail: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const editChange = (name, value) => {
        setFormEdit({ ...form_edit, [name]: value })
    }

    const searchInput = (value) => {
        setData(value)
    }

    async function GetCategory() {
        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        const res = await axios.get('/api/' + url +'/category/show-all')

        if (res.data.meta.code === 200) {
            setData(res.data.data.category)
            setSearch(res.data.data.category)
            setForm({ 
                ...form, 
                label: '',
                thumbnail: '',
                error_list: '',
            })
        }
        inputFileClear()
        setPopup(false)
    }
    
    useEffect(() => {
        const Category = () => {
            var url = ''
            if (localStorage.getItem('role') === "Content") {
                url = 'admin-content'
            } else if (localStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }

            axios.get('/api/' + url + '/category/show-all').then(res => {
                setData(res.data.data.category)
                setSearch(res.data.data.category)
            })
            setGet(false)
        }
        Category()
    }, [])

    const popupEdit = (id, label) => {
        setEdit(true)
        setFormEdit({
            ...form_edit,
            id: id,
            label: label,
            error_list: '',
        })
    }

    const storeCategory = () => {
        setStore(true)
        
        const data = new FormData()

        data.append('label', form.label)
        data.append('thumbnail', form.thumbnail)

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/category/store', data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Kategori berhasil ditambahkan."
                })
                GetCategory()
            } else {
                setForm({ ...form, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    const editCategory = () => {
        setStore(true)
        
        const data = new FormData()

        data.append('label', form_edit.label)
        data.append('thumbnail', form_edit.thumbnail)

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.post('/api/' + url + '/category/update/' + form_edit.id, data).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Kategori berhasil diubah."
                })
                GetCategory()
            } else {
                setFormEdit({ ...form_edit, error_list: res.data.data.validation_errors })
            }
            setStore(false)
        })
    }

    const deleteCategory = (id) => {
        setStore(true)

        var url = ''
        if (localStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }
        Swal.fire({
            icon: 'question',
            title: 'Benar ingin menghapus kategori?',
            text: 'Pilih "Hapus" jika Anda benar ingin menghapus kategori.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/category/delete/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Kategori berhasil dihapus.',
                        })
                        GetCategory()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Kategori gagal dihapus."
                        })
                    }
                    setStore(false)
                })
            }
        })
    }

    let contentElement = ''

    if (get) {
        contentElement = <LoadingElement/>
    } else {
        contentElement = data.map((value, index) => {
            return (
                <CategoryListContent key={ index }>
                    <CategoryListImg src={ value.thumbnail }/>
                    <CategoryListDetail>
                        <CategoryListLabel>{ value.label }</CategoryListLabel>
                        <div 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <ButtonIconSubmit 
                                color="info"
                                onClicked={ () => popupEdit(value.id, value.label) }
                            >
                                <FaEdit/>
                            </ButtonIconSubmit>
                            <ButtonIconSubmit 
                                color="danger"
                                onClicked={ () => deleteCategory(value.id) }
                            >
                                <FaTrash/>
                            </ButtonIconSubmit>
                        </div>
                    </CategoryListDetail>
                </CategoryListContent>
            )
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Daftar Kategori">
                <ButtonSubmit 
                    color="primary"
                    onClicked={ () => setPopup(!popup)}
                >
                    <FaPlus/>
                    Tambah Kategori
                </ButtonSubmit>
                <Popup 
                    trigger={ popup } 
                    setTrigger={ setPopup }
                    title="Tambah Kategori"
                >
                    <CategoryListPopup>
                        <InputField
                            label="Nama Kategori"
                            id="label"
                            name="label"
                            onChanged={ inputChange }
                            type="text"
                            placeholder="Masukkan Nama Kategori"
                            value={ form.label }
                            error={ form.error_list.label }
                        />
                        <InputField
                            label="Gambar Mini"
                            id="thumbnail"
                            name="thumbnail"
                            onChanged={ inputChange }
                            type="file"
                            error={ form.error_list.thumbnail }
                        />
                        
                        <CategoryListSubmit>
                            <ButtonSubmit
                                loading={ store }
                                color="primary"
                                onClicked={ storeCategory }
                            >
                                Tambah
                            </ButtonSubmit>
                        </CategoryListSubmit>
                    </CategoryListPopup>
                </Popup>
            </PageHeader>

            <Card>
                <CategoryListSearch>
                    <SearchField
                        data={ search }
                        onChanged={ searchInput }
                    />
                </CategoryListSearch>

                <CategoryListContainer>
                    { contentElement }
                    <Popup
                        trigger={ edit } 
                        setTrigger={ setEdit }
                        title="Ubah Kategori"
                    >
                        <CategoryListPopup>
                            <InputField
                                label="Nama Kategori"
                                id="label_edit"
                                name="label"
                                onChanged={ editChange }
                                type="text"
                                placeholder="Masukkan Nama Kategori"
                                value={ form_edit.label }
                                error={ form_edit.error_list.label }
                            />
                            <InputField
                                label="Gambar Mini"
                                id="thumbnail_edit"
                                name="thumbnail"
                                onChanged={ editChange }
                                type="file"
                                error={ form_edit.error_list.thumbnail }
                            />

                            <CategoryListSubmit>
                                <ButtonSubmit
                                    loading={ store }
                                    color="primary"
                                    onClicked={ editCategory }
                                >
                                    Ubah
                                </ButtonSubmit>
                            </CategoryListSubmit>
                        </CategoryListPopup>
                    </Popup>
                </CategoryListContainer>
            </Card>
        </PageLayout>
    )
}

export default CategoryList