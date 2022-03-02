import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { useEffect, useState } from "react"
import Table, { TableStatus } from "../../../components/table/Table"
import { ButtonSubmit } from "../../../components/button/Button"
import { FaPlus } from "react-icons/fa"
import Swal from "sweetalert2"
import Popup from "../../../components/popup/Popup"
import { FacilityListPopup, FacilityListSubmit } from "./FacilityList.elements"
import { InputField } from "../../../components/text_field/TextField"

const FacilityList = () => {
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState(false)
    const [popup, setPopup] = useState(false)
    const [rows, setRows] = useState([])
    const [form, setForm] = useState({
        machine_name: '',
        url: '',
        description: '',
        gpu: '',
        mig_pergpu: '',
        error_list: [],
    })

    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }
    
    const GetFacility = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(`${process.env.REACT_APP_API_URL_2}/mesin`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setRows(result.data)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        GetFacility()
    }, [])

    const storeSubmit = (e) => {
        e.preventDefault()

        setStore(true)
        
        var formdata = new FormData();

        formdata.append("nama_mesin", form.machine_name);
        formdata.append("url", form.url);
        formdata.append("description", form.description);
        formdata.append("gpu", form.gpu);
        formdata.append("mig_pergpu", form.mig_pergpu);

        const requestOptions = {
            method: 'POST',
            body: formdata,
        };

        fetch(`${process.env.REACT_APP_API_URL_2}/mesin`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon:'success',
                title: 'Sukses!',
                text:'Mesin berhasil ditambah.',
            })
            setForm({ 
                ...form, 
                machine_name: '',
                url: '',
                description: '',
                gpu: '',
                mig_pergpu: '',
                error_list: [],
            })
            setStore(false)
        })
        .catch(error => {
            if (error.status === 422) {
                Swal.fire({
                    icon:'warning',
                    title: error.statusText,
                    text:'harap lengkapi form.',
                })
                setStore(false)
            }
        });
    }

    const columns = [
        {
            field: 'id_mesin',
            headerName: 'ID Mesin',
            width: 300,
        },
        {
            field: 'nama_mesin',
            headerName: 'Nama Mesin',
            width: 150,
        },
        {
            field: 'url',
            headerName: 'URL',
            width: 200,
        },
        {
            field: 'description',
            headerName: 'Deskripsi',
            width: 170,
        },
        {
            field: 'gpu',
            headerName: 'GPU',
            width: 100,
        },
        {
            field: 'mig_pergpu',
            headerName: 'Mig PerGPU',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            valueGetter: (params) => {
                let newStatus = ''
                if (params.row.status === "active") {
                    newStatus = "Aktif"
                }

                return newStatus
            },
            renderCell: (params) => {
                let newStatus = ''
                if (params.row.status === "active") {
                    newStatus = "Aktif"
                }

                return (
                    <>
                        <TableStatus status={ params.row.status }>
                            { newStatus }
                        </TableStatus>
                    </>
                )
            },
        },
    ]

    return (
        <PageLayout>
            <PageHeader title="Daftar Fasilitas">
                <ButtonSubmit color="primary" onClicked={ () => setPopup(!popup) }>
                    <FaPlus/>
                    Tambah Mesin
                </ButtonSubmit>
                <Popup
                    trigger={ popup } 
                    setTrigger={ setPopup }
                    title="Tambah Mesin"
                >
                    <FacilityListPopup>
                        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} method="POST" onSubmit={ storeSubmit }>
                            <InputField
                                label="Nama Mesin"
                                id="machine_name"
                                name="machine_name"
                                value={ form.machine_name }
                                onChanged={ inputChange }
                                type="text"
                            />
                            <InputField
                                label="URL"
                                id="url"
                                name="url"
                                value={ form.url }
                                onChanged={ inputChange }
                                type="text"
                            />
                            <InputField
                                label="Deskripsi"
                                id="description"
                                name="description"
                                value={ form.deskripsi }
                                onChanged={ inputChange }
                                type="text"
                            />
                            <InputField
                                label="GPU"
                                id="gpu"
                                name="gpu"
                                value={ form.gpu }
                                onChanged={ inputChange }
                                type="text"
                            />
                            <InputField
                                label="Mig PerGPU"
                                id="mig_pergpu"
                                name="mig_pergpu"
                                value={ form.mig_pergpu }
                                onChanged={ inputChange }
                                type="text"
                            />
                            <FacilityListSubmit>
                                <ButtonSubmit color="primary" loading={ store }>
                                    Tambah
                                </ButtonSubmit>
                            </FacilityListSubmit>
                        </form>
                    </FacilityListPopup>
                </Popup>
            </PageHeader>

            <Card>
                <Table
                    tableColumns={ columns }
                    tableLoading={ loading }
                    tableRows={ rows }
                    tableId={ "id_mesin" }
                />
            </Card>
        </PageLayout>
    )
}

export default FacilityList