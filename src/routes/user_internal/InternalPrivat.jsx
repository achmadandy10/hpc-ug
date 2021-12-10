import axios from "axios"
import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { Redirect } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import LoadingPage from "../../components/loading/Loading"
import UserLayout from "../../layouts/user_layout/UserLayout"

const InternalPrivateRoute = ({ ...res }) => {
    const history = useHistory()
    const [credential, setCredential] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/user_internal")
        .then( res => {
            if (res.data.meta.code === 200) {
                setCredential(true)                
            }
            setLoading(false)
        })

        return () => {
            setCredential(false)
        }
    }, [])

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            Swal.fire({
                icon: "warning",
                title: err.response.data.message,
            })

            history.push("/login")
        }
        
        return Promise.reject(err)
    })

    axios.interceptors.response.use(function (response) {
        return response
    }), function (err) {
        if (err.response.status === 403) {
            Swal.fire({
                icon: "warning",
                title: "Forbidden",
                text: err.response.data.message,
            })

            history.push("/403")
        } else if (err.response.status === 404) {
            Swal.fire({
                icon: "warning",
                title: "404 Error",
                text: err.response.data.message,
            })
            
            history.push("/404")

            return Promise.reject(err)
        }
    }

    if (loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <Route
            { ...res }
            render={ ({ props, location }) => {
                credential ?
                    <UserLayout { ...props } />
                :
                    <Redirect to={ { pathname: "/login", state: {from: location} } } />
            }}
        />
    )
}

export default InternalPrivateRoute