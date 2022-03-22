import { ButtonSubmit } from "../../../components/button/Button"
import { VerifyButtonContainer, VerifyContainer, VerifyContent, VerifyForm, VerifyImg, VerifySuccess, VerifyTitle } from "./Verify.elements"
import Logo from '../../../images/logo.png'
import { CopyRight } from "../../../components/footer/Footer"
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import { useQuery } from "../../../services/QueryParams"

const Verify = () => {
    const query = useQuery()
    const [verified, setVerified] = useState(true) 
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [condition, setCondition] = useState(false)

    useEffect(() => {
        const CheckUser = () => {
            if (query.get('verified' !== true)) {
                setVerified(false)
            } else{
                axios.get(`/api/profile`).then(res => {
                    if (res.data.meta.code === 200) {
                        if (res.data.data.profile.email_verified_at !== null) {
                            history.push('/masuk')
                        } else {
                            setEmail(res.data.data.profile.email)
                        }
                    }
                }).catch(err => {
                    if (err.response.request.status === 401) {
                        history.push('/masuk')
                    }
                })
            }
        }

        CheckUser()
    }, [history, query])        

    const resendMail = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.get(`/sanctum/csrf-cookie`).then(() => {
            axios.post('/api/email/verification-notification').then((res) => {
                setCondition(true)
                setLoading(false)
            })
        })
    }

    if (!verified) {
        return (
            <>Gagal Verifikasi</>       
        )
    }

    return (
        <VerifyContainer>
            <VerifyImg src={ Logo }/>

            <VerifyContent>
                { condition && (
                    <VerifySuccess>Kami telah mengirimkan email kepada {email}, silahkan periksa email anda untuk melakukan verifikasi.</VerifySuccess>
                ) }
                <VerifyTitle>Verifikasi alamat email Anda</VerifyTitle>
                <VerifyForm onSubmit={ resendMail }>
                    <VerifyButtonContainer>
                        <p style={{ marginBottom: "20px" }}>
                            Sebelum melanjutkan, harap periksa email Anda untuk tautan verifikasi. 
                            jika Anda tidak menerima surat, silahkan klik kirim ulang.
                        </p>
                        <ButtonSubmit
                            color="primary"
                            fullwidth
                            height={ 50 }
                            type="submit"
                            loading={ loading }
                        >
                            Kirim Ulang
                        </ButtonSubmit>
                    </VerifyButtonContainer>
                </VerifyForm>
            </VerifyContent>
            <CopyRight/>
        </VerifyContainer>
    )
}

export default Verify