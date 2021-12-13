import { useState } from "react"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { InputField, TextEditor } from "../../../components/text_field/TextField"
import { CategorySelect } from "../../../Dummy"
import { PostAddContent, PostAddContentLeft, PostAddContentRight } from "./PostAdd.elements"

const PostAdd = () => {
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

    return (
        <PageLayout>
            <PageHeader title="Buat Konten"/>

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
                        />
                        <TextEditor
                            name="body"
                            onChanged={ inputChange }
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
                        />
                        <InputField
                            label="Kategori"
                            name="category"
                            id="category"
                            onChanged={ inputChange }
                            type="multi-select"
                            styled="flex"
                            placeholder="Pilih Kategori"
                            option={ CategorySelect.category }
                        />
                    </PostAddContentRight>
                </PostAddContent>
            </Card>
        </PageLayout>
    )
}

export default PostAdd