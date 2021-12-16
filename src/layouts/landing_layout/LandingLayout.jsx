import { Redirect, Route, Switch } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
// import ThemeChange from "../../components/theme_change/ThemeChange"
import { LandingRouter } from "../../routes/landing/LandingRouter"

const LandingLayout = () => {
    return (
        <>
            <Navbar/>
            <Switch>
                {
                    LandingRouter.map((route, idx ) => {
                        return (
                            route.component && (
                                <Route
                                    key={ idx }
                                    path={ route.path }
                                    exact={ route.exact }
                                    name={ route.name }
                                    render={ (props) =>
                                        <route.component { ...props } />
                                    }
                                />
                            )
                        )
                    })
                }
                <Redirect from="/" to="/"/>
            </Switch>
            {/* <ThemeChange/> */}
            <Footer/>
        </>
    )
}

export default LandingLayout