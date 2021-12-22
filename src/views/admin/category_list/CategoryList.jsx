import { useEffect, useState } from "react"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { ButtonIconLink, ButtonIconSubmit, ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Popup from "../../../components/popup/Popup"
import { InputField, SearchField } from "../../../components/text_field/TextField"
import { CategoryListContainer, CategoryListContent, CategoryListDetail, CategoryListImg, CategoryListLabel, CategoryListPopup, CategoryListSearch, CategoryListSubmit } from "./CategoryList.elements"
import axios from "axios"
import Swal from "sweetalert2"

const CategoryList = () => {
    const [store, setStore] = useState(false)
    const [get, setGet] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState([])
    const [popup, setPopup] = useState(false)
    const [form, setForm] = useState({
        label: '',
        thumbnail: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const searchInput = (value) => {
        setData(value)
    }

    async function GetCategory() {
        const res = await axios.get('/api/admin-content/category/show-all')

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
        setPopup(false)
    }
    
    useEffect(() => {
        const Category = () => {
            axios.get('/api/admin-content/category/show-all').then(res => {
                setData(res.data.data.category)
                setSearch(res.data.data.category)
            })
            setGet(false)
        }
        Category()
    }, [])

    const storeCategory = () => {
        setStore(true)
        
        const data = new FormData()

        data.append('label', form.label)
        data.append('thumbnail', form.thumbnail)

        axios.post('/api/admin-content/category/store', data).then(res => {
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

    let contentElement = ''

    if (get) {
        contentElement = "loading..."
    } else {
        contentElement = data.map((value, index) => {
            return (
                <CategoryListContent key={ index }>
                    <CategoryListImg src={ value.thumbnail }/>
                    <CategoryListDetail>
                        <CategoryListLabel>{ value.label }</CategoryListLabel>
                        <div>
                            <ButtonIconLink>
                                <FaEdit/>
                            </ButtonIconLink>
                            <ButtonIconSubmit>
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
                    onClicked={ () => setPopup(!popup) }
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
                </CategoryListContainer>
            </Card>
        </PageLayout>
    )
}

export default CategoryList