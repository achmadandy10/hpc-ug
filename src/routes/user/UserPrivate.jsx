import axios from "axios"
import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { Redirect } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import LoadingPage from "../../components/loading/Loading"
import UserLayout from "../../layouts/user_layout/UserLayout"

const UserPrivateRoute = ({ ...res }) => {
    const [authState, setAuth] = useState(false)
    const [loadingState, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/check_user').then( res => {
            if (res.data.meta.code === 200) {
                setAuth(true)                
            }
            setLoading(false)
        })

        return () => {
            setAuth(false)
        }
    }, [])

    const history = useHistory();

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('username')

            history.push("/masuk")
        }

        return Promise.reject(err)
    })

    axios.interceptors.response.use(function (response) {
        return response;    
    }, function (error) {
        if ( error.response.status === 403 ) {
            Swal.fire({
                icon: 'warning',
                title: "Forbedden",
                text: error.response.data.message,
            })

            history.push("/403")
        } else if (error.response.status === 404 ) {
            Swal.fire({
                icon: 'warning',
                title: "404 Error",
            })

            history.push("/404")
        }

        return Promise.reject(error)
    })

    if (loadingState) {
        return (
            <LoadingPage />
        )
    }

    return (
        <Route 
            { ...res }

            render={ ({ props, location }) => 
                authState ?
                    ( <UserLayout { ...props }/> )
                :
                    ( <Redirect to={ {pathname: "/masuk", state: {from: location}} }/> )
            }
        />
    )
}

export default UserPrivateRoute