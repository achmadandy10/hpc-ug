import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppStyle } from './App.elements';
import LoadingPage from './components/loading/Loading';
// import LandingLayout from './layouts/landing_layout/LandingLayout';
// import Login from './views/auth/login/Login';
// import Register from './views/auth/register/Register';
const LandingLayout = lazy(() => import('./layouts/landing_layout/LandingLayout'))
const Login = lazy(() => import('./views/auth/login/Login'))
const Register = lazy(() => import('./views/auth/register/Register'))


function App() {
  return (
    <>
      <AppStyle/>
      <Router>
        <Switch>
          <Suspense fallback={ <LoadingPage/> }>
            <Route exact path="/" component={ LandingLayout }/>
            
            <Route path="/masuk" component={ Login }/>
            <Route path="/daftar" component={ Register }/>
          </Suspense>
        </Switch>
      </Router>
    </>
  )
}

export default App;
