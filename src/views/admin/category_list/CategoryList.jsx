import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { ButtonSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Popup from "../../../components/popup/Popup"
import { InputField, SearchField } from "../../../components/text_field/TextField"
import { ListCategory } from "../../../Dummy"
import { CategoryListContainer, CategoryListContent, CategoryListDetail, CategoryListImg, CategoryListLabel, CategoryListPopup, CategoryListSearch, CategoryListSubmit } from "./CategoryList.elements"

const CategoryList = () => {
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        setData(ListCategory.category)
        setSearch(ListCategory.category)
        setLoading(false)
    }, [])

    let contentElement = ''

    if (loading) {
        contentElement = "loading..."
    } else {
        contentElement = data.map((value, index) => {
            return (
                <CategoryListContent key={ index }>
                    <CategoryListImg src={ value.thumbnail }/>
                    <CategoryListDetail>
                        <CategoryListLabel>{ value.label }</CategoryListLabel>
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
                        />
                        <InputField
                            label="Gambar Mini"
                            id="thumbnail"
                            name="thumbnail"
                            onChanged={ inputChange }
                            type="file"
                        />
                        
                        <CategoryListSubmit>
                            <ButtonSubmit
                                color="primary"
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